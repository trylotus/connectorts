const SemVer = require('semver/classes/semver')
import { Message } from "@bufbuild/protobuf"

import { Env, MsgType, CONTEXT_SEPARATOR } from './types'

export class Topic {
    readonly env: Env
    readonly msgType: MsgType
    readonly author: string
    readonly connectorName: string
    readonly version: typeof SemVer
    readonly eventName: string

    public constructor(
        env: Env,
        msgType: MsgType,
        author: string,
        connectorName: string,
        version: typeof SemVer,
        pb: Message
    ) {
        this.env = env
        this.msgType = msgType
        this.author = author
        this.connectorName = connectorName
        this.version = version
        this.eventName = pb.getType().typeName.replace(".", "_")
    }

    // Schema generates the schema string
    public schema(): string {
        return [
            this.author,
            this.connectorName,
            this.version?.toString().replaceAll(".", "_"),
            this.eventName].join(CONTEXT_SEPARATOR)
    }

    // String generates the topic string
    public toString(): string {
        return [this.env, this.msgType, this.schema()].join(CONTEXT_SEPARATOR)
    }
}