import * as protobuf from "@bufbuild/protobuf"

import { EthereumConnector } from "../../packages/chain/ethereum/src/ethereum";
import { MsgType } from "../../packages/kafkautils/src/types"
import { CLIConfig } from "../../packages/chain/ethereum/src/types"

import * as chain from "./smart-contracts/chain/chain"
import * as types from "./types"


export class Ethereum {
    private config: CLIConfig
    private ethConnector: EthereumConnector

    public constructor(conf: CLIConfig) {
        this.config = conf
        this.ethConnector = new EthereumConnector()
    }

    public async start() {

        this.ethConnector.connector.registerProtos(types.chainProtoPath, MsgType.BF, ...types.chainProtos)

        if (!this.config.fromBlock && !this.config.numBlocks) {
            // LIVE DATA

            this.ethConnector.connector.registerProtos(types.chainProtoPath, MsgType.FCT, ...types.chainProtos)

            // Backfill last 100 blocks at every start
            await this.backfill(0, 100)

            await this.listenBlocks()

        } else {

            // HISTORICAL DATA
            await this.backfill(this.config.fromBlock!, this.config.numBlocks!)
        }
    }

    private async backfill(fromBlock: number, numBlocks: number) {
        if (fromBlock == 0 && numBlocks == 0) return

        // Calculate block interval for historical data
        let startingBlock = fromBlock
        let toBlock = await this.ethConnector.provider.getBlockNumber()

        if (fromBlock > 0 && numBlocks > 0) {
            let lastBlock = fromBlock + numBlocks

            if (lastBlock < toBlock) {
                toBlock = lastBlock
            }

        } else if (numBlocks > 0 && numBlocks < toBlock) {
            startingBlock = toBlock - numBlocks
        }

        while (startingBlock < toBlock) {
            await this.process(toBlock, MsgType.BF)
            toBlock--
        }
    }


    private async listenBlocks() {
        this.ethConnector.provider.on("block", async (blockNumber: number) => {
            await this.process(blockNumber, MsgType.FCT)
        })
    }

    private async process(blockNumber: number, msgType: MsgType) {

        let block = await this.ethConnector.provider.getBlockWithTransactions(blockNumber)
        let blockMsg = chain.parseBlock(block)
        console.log("BLOCK : " + JSON.stringify(block))
        let messages: protobuf.Message[] = [blockMsg]

        let transactions = block.transactions

        for (let tx of transactions) {
            let txMsg = chain.parseTransaction(tx, block.timestamp)
            messages.push(txMsg)
        }

        this.ethConnector.connector.produceMessages(msgType, messages)

    }
}

