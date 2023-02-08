import { Message, IHeaders } from 'kafkajs'

export class KafkaMessage implements Message {

    public key?: Buffer | string | null
    public value: Buffer | string | null
    public partition?: number
    public headers?: IHeaders
    public timestamp?: string

    public constructor(value: Buffer | string | null) {
        this.value = value
    }
} 