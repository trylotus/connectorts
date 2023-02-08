import { ethers } from "ethers"
import { Interface } from "ethers/lib/utils"
import * as protobuf from "@bufbuild/protobuf"

export interface CLIConfig {
    connectorName?: string,
    blockchainName?: string,
    fromBlock?: number,
    numBlocks?: number,
    help?: boolean,
}

export class Contract {
    private _ABI: Interface
    private _address: string
    private _parser: (vLog: ethers.providers.Log, timestamp: number) => protobuf.Message

    public constructor(ABI: Interface, address: string, parser: (vLog: ethers.providers.Log, timestamp: number) => protobuf.Message) {
        this._ABI = ABI
        this._address = address
        this._parser = parser
    }

    get ABI(): Interface {
        return this._ABI
    }

    get address(): string {
        return this._address
    }

    get parser(): (vLog: ethers.providers.Log, timestamp: number) => protobuf.Message {
        return this._parser
    }
}