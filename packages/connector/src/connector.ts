import { getConfig, IConfig } from '../../config/config'
import { loadManifest, Manifest } from './manifest'
import { Env, MsgType, ConsumerOptions } from '../../kafkautils/src/types'
import { newConsumer } from '../../kafkautils/src/consumer'
import { newProducer } from '../../kafkautils/src/producer'
import { Topic } from '../../kafkautils/src/topic'
import { TopicTypes, registerDynamicTopics } from '../../protoregistry/src/client'
// import { Monitor } from '../../monitor/src/monitor'
import { startMonitor } from '../../monitor/src/monitor'
import * as protobuf from "@bufbuild/protobuf"


import { Consumer, Producer, KafkaMessage, ProducerBatch } from 'kafkajs'


export class Connector {
    private _config: IConfig
    private env: Env
    private manifest: Manifest
    private readonly kafkaUrl: string
    private readonly protoRegistryHost: string
    private readonly _rpcs: any

    private consumer?: Consumer
    private producer?: Producer
    // private monitor?: Monitor

    protected constructor(config: IConfig, env: Env, kafkaUrl: string, manifest: Manifest, rpcs: any, protoRegistryHost: string) {
        this._config = config
        this.env = env
        this.manifest = manifest
        this.kafkaUrl = kafkaUrl
        this.protoRegistryHost = protoRegistryHost
        this._rpcs = rpcs
    }

    /**
     * create() builds a new Connector instance.
     * 
     * @param options functions to apply to connector instance
     * @returns new connector instance
     */
    public static create(...options: ((c: Connector) => void)[]): Connector {
        let conf = getConfig()
        let m = loadManifest()

        let c = new Connector(
            conf,
            conf.kafka.env,
            conf.kafka.url,
            m,
            conf.rpcs,
            conf.protoregistry.host || "http://localhost:9191"
        )

        this.parseOptions(c, ...options)

        if (!c.manifest) {
            throw new Error('missing manifest.yaml')
        }

        return c
    }

    /**
     * parseOption() applies custom functions to the Connector instance.
     * 
     * @param connector connector instance 
     * @param options functions to apply to the connector instance
     */
    private static parseOptions(connector: Connector, ...options: ((c: Connector) => void)[]): void {
        for (let option of options) {
            option(connector)
        }
    }

    /**
     * withManifest() returns a function that will be applied manually to Connector instance.
     * @param manifest connector metadata
     * @returns function to be applied to connector
     */
    public static withManifest(manifest: Manifest): (c: Connector) => void {
        return (c: Connector) => {
            c.manifest = manifest
        }
    }

    /**
     * id() returns a unique id for this Connector instance, based on the manifest.
     * @returns Connector ID string
     */
    private id(): string {
        return `${this.manifest.author}-${this.manifest.name}-${this.manifest.version}-${this.env}`
    }

    get rpcs(): any {
        return this._rpcs
    }

    get config(): IConfig {
        return this._config
    }

    /**
     * generateTopicFromProto generates message queue topic names based on the protobuf message.
     * Event names should be prefixed with contract_ or category_ when appropriate.
     * 
     * @param msgType kafkautils message type
     * @param msg  protobuf message
     * @returns Topic object
     */
    private generateTopicFromProto(msgType: MsgType, msg: protobuf.Message): Topic {
        return new Topic(
            this.env,
            msgType,
            this.manifest.author,
            this.manifest.name,
            this.manifest.version,
            msg,
        )
    }

    /**
 * registerProtos generates kafka topic and protobuf type mappings from proto.Message and registers them dynamically.
 * @param msgType kafkautils message type
 * @param protos protocol buffer definitions
 * @returns 
 */
    public registerProtos(msgType: MsgType, ...protos: protobuf.Message[]): void {
        if (this.env == Env.DEV) {
            console.log("protoregistry is disabled in dev mode, set kafka.env to other values (e.g., test, staging) to enable it")
            return
        }

        let tts: TopicTypes = {}
        for (let proto of protos) {
            console.log("tttss: " + this.generateTopicFromProto(msgType, proto).schema())
            tts[this.generateTopicFromProto(msgType, proto).schema()] = proto
        }

        try {
            registerDynamicTopics(this.protoRegistryHost, tts, msgType)
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * startProducer() creates a new kafka producer instance.
     */
    private async startProducer() {
        console.log("initializing kafka producer. transactionID: ", this.id())
        // this.monitor = await Monitor.startMonitor(this.id())
        // await startMonitor(this.id())
        this.producer = newProducer(this.kafkaUrl, this.id())
        await this.producer.connect()
    }

    /**
     * produceMessages() wraps incoming messages with a kafka transaction and sends them to kafka. 
     * 
     * @param msgType kafkautils message type
     * @param messages messages to be pushed to kafka
     */
    public async produceMessages(msgType: MsgType, messages: protobuf.Message[]) {
        if (!this.producer) await this.startProducer()

        let batch = messages.map(msg => {
            console.log("NEW MESSAGE: ", this.generateTopicFromProto(msgType, msg).toString())
            return {
                topic: this.generateTopicFromProto(msgType, msg).toString(),
                messages: [msg]
            }
        })

        const transaction = await this.producer?.transaction()

        try {
            await transaction?.sendBatch(batch as ProducerBatch)
            await transaction?.commit()
            console.log("commited messages ")

        } catch (e) {
            await transaction?.abort()
        }

        // this.monitor?.setMetricsForKafkaLastWriteTime()
        // await setMetricsForKafkaLastWriteTime()
    }

    /**
     * startConsumer() creates a new kafka consumer instance.
     * 
     * @param overrideOpts a dict to override default kafka consumer options
     */
    private async startConsumer(overrideOpts: ConsumerOptions) {
        console.log("initializing kafka producer. groupID: ", this.id())
        // this.monitor = await Monitor.startMonitor(this.id())
        await startMonitor(this.id())

        this.consumer = newConsumer(this.kafkaUrl, this.id(), overrideOpts)
    }

    /**
     * subscribe() subscribes the connector to given kafka topics and 
     * applies the provided function to each incoming message.
     * 
     * @param topics kafka topics to subscribe to
     * @param fn a function to apply to each message
     * @param overrideOpts a dict to override default kafka consumer options
     */
    public async subscribe(topics: Topic[], fn: (msg: KafkaMessage) => void, overrideOpts: ConsumerOptions) {
        if (!this.consumer) await this.startConsumer(overrideOpts)

        await this.consumer?.subscribe({ topics: topics.map(a => { return a.toString() }) })
        await this.consumer?.run({
            eachBatchAutoResolve: true,
            eachBatch: async ({
                batch,
                resolveOffset,
                heartbeat,
                commitOffsetsIfNecessary,
                uncommittedOffsets,
                isRunning,
                isStale,
                pause,
            }) => {
                for (let message of batch.messages) {
                    fn(message)
                    resolveOffset(message.offset)
                    await heartbeat()
                }
            },
        })
    }

}