import { ethers } from "ethers"
import { Message } from "@bufbuild/protobuf"
import { Filter, Provider } from '@ethersproject/abstract-provider';

import { Connector } from '../../../connector/src/connector';
import { MsgType } from '../../../kafkautils/src/types'
import { Subscription } from "./subscription";
import { Contract } from './types';

const BLOCK_CHUNK_SIZE = 2000 // Some RPC nodes limit to 2000 but there are also event count and/or response size limitations.
const INITIAL_BACKOFF_DURATION = 1000 // Initial backoff duration before re-hitting RPC node, 1 second in millisecods
const MAX_BACKOFF_DURATION = 3600000   // Maximum backoff duration before resetting, 1 hour in milliseconds

export class EthereumConnector {
    public provider: Provider
    public connector: Connector
    public static subscription: Subscription

    public constructor(URL: string) {
        this.connector = Connector.create()
        this.provider = new ethers.providers.WebSocketProvider(URL)
    }

    public static create(URL: string): EthereumConnector {
        let conn = new EthereumConnector(URL)
        this.subscription = new Subscription(conn)
        return conn
    }

    public async getBlockTime(blockNumber: number) {
        let block = await this.provider.getBlock(blockNumber)
        return block.timestamp
    }

    /**
     * backfillEvents queries past blocks for the events emitted by the given contract addresses.
     * These events are then fed into the given parser function and then pushed to Kafka.
     * @param contracts smart contracts to be queried for events
     * @param fromBlock starting block number
     * @param toBlock last block number
     * @param backoff wait period before making the call
     */
    public async backfillEvents(contracts: Contract[], fromBlock: number, toBlock: number, backoff: number) {
        console.log(`backfill from ${fromBlock} to ${toBlock}`)

        if (backoff < INITIAL_BACKOFF_DURATION || backoff > MAX_BACKOFF_DURATION) {
            backoff = INITIAL_BACKOFF_DURATION
        }

        setTimeout
        if (toBlock - fromBlock > BLOCK_CHUNK_SIZE) {
            await this.backfillEvents(contracts, fromBlock, fromBlock + BLOCK_CHUNK_SIZE, backoff)
            await this.backfillEvents(contracts, fromBlock + BLOCK_CHUNK_SIZE, toBlock, backoff)
            return
        }

        for (let contract of contracts) {

            let filter: Filter = {
                address: contract.address,
                fromBlock: fromBlock,
                toBlock: toBlock,
            }

            try {
                let logs = await this.provider.getLogs(filter)

                let blockNumber = 0
                let messages: Message[] = []

                for (let vLog of logs) {
                    let ts = await this.getBlockTime(vLog.blockNumber)

                    let msg = contract.parser(vLog, ts)

                    messages.push(msg)
                    if (blockNumber != vLog.blockNumber) {
                        this.connector.produceMessages(MsgType.BF, messages)
                        blockNumber = vLog.blockNumber
                        messages = []
                    }
                }
            } catch (e) {
                console.log("call failed, retrying interval. error:" + JSON.stringify(e))
                let mid = (fromBlock + toBlock) / 2
                setTimeout(async () => { await this.backfillEvents(contracts, fromBlock, mid, backoff << 1) }, backoff)
                setTimeout(async () => { await this.backfillEvents(contracts, mid, toBlock, backoff << 1) }, backoff)
                return
            }
        }
    }

    /**
     * backfillEventsWithQueryParams determines block interval from query params and calls {@link backfillEvents}.
     * fromBlock > 0 && numBlocks > 0 => Backfill from fromBlock to fromBlock+numBlocks
     * fromBlock > 0 && numBlocks = 0 => Backfill from fromBlock to current latest block
     * fromBlock = 0 && numBlocks > 0 => Backfill last numBlocks blocks
     * @param contracts smart contracts to be queried for events
     * @param fromBlock starting block number
     * @param numBlocks number of blocks to process
     */
    public async backfillEventsWithQueryParams(contracts: Contract[], fromBlock: number, numBlocks: number) {
        let toBlock = await this.provider.getBlockNumber()

        if (fromBlock > 0 && numBlocks > 0 && fromBlock + numBlocks < toBlock) {
            toBlock = fromBlock + numBlocks
        } else if (fromBlock == 0 && numBlocks > 0) {
            fromBlock = toBlock - numBlocks
        }

        await this.backfillEvents(contracts, fromBlock, toBlock, 0)
    }
}