import * as fs from 'fs';
import { join } from 'path';
import { request } from 'http'
import { Message } from "@bufbuild/protobuf"

import { MsgType } from "../../kafkautils/src/types"

export type TopicTypes = { [tt: string]: Message }

type TopicProtoMsg = {
    msg_type: MsgType
    topic: string
    proto_msg: string
    file_descriptor_proto?: Message
    descriptor: string
}

/**
 * registerDynamicTopics() stores protobuf definitions and creates kafka topics for them.
 * 
 * @param host URL to protoregistry host
 * @param topicTypes topic name to protobuf definition map
 * @param msgType {@link MsgType} kafka message type
 */
export function registerDynamicTopics(URL: string, topicTypes: TopicTypes, msgType: MsgType, protoPath: string): void {
    let tpmList = buildTopicProtoMsgs(topicTypes, msgType, protoPath)
    if (!tpmList.length) return

    let [host, port] = URL.split(":")

    let payload = JSON.stringify(tpmList)
    let req = request({
        hostname: host,
        port: port,
        path: '/v1/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    }, (res) => {
        if (res.statusCode === 200) {
            console.log("uploaded protobuf definitions successfully")
        }
    })

    req.on('error', (e: Error) => {
        console.error(`protoregistry call failed. error: ${e.message}`);
    });

    req.write(payload)
    req.end()
}

/**
 * 
 * @param topicTypes map of kafka topic name to protobuf definition
 * @param msgType {@link MsgType} kafkautils message type
 * @returns array of topic proto messages
 */
export function buildTopicProtoMsgs(topicTypes: TopicTypes, msgType: MsgType, protoPath: string): TopicProtoMsg[] {
    var tpmList = [] as TopicProtoMsg[]

    let protoDescPath = getProtoDescPath(protoPath)
    if (protoDescPath == '') return []

    let protoDesc = fs.readFileSync(protoDescPath, 'base64')

    for (let k of Object.keys(topicTypes)) {
        let tpm: TopicProtoMsg = {
            msg_type: msgType,
            topic: k,
            proto_msg: parseProtoName(k),
            // file_descriptor_proto: v,
            descriptor: protoDesc
        }

        tpmList.push(tpm)
    }
    return tpmList
}

/**
 * 
 * @param topic topic name in the format of e.g. lotus.uniswapv2.0_0_0.liquiditypool_Change
 * @returns proto_msg name in the format of e.g. lotus.uniswapv2.liquiditypool.Change
 */
function parseProtoName(topic: string): string {
    let t = topic.split(".")
    t.splice(2, 1)
    return t.slice(2).join(".").replaceAll("_", ".")
}

function getProtoDescPath(protoPath: string): string {
    let protoDescPath = ''
    const files = fs.readdirSync(protoPath, { withFileTypes: true });
    for (const file of files) {
        let fileSplit = file.name.split('.')
        if (fileSplit.length == 3 && fileSplit[2] == "desc")
            protoDescPath = join(protoPath, file.name)
    }
    return protoDescPath
}