import { utils } from "ethers"

import { MsgType } from "../../packages/kafkautils/src/types"
import { CLIConfig, Contract } from "../../packages/chain/ethereum/src/types"
import { Subscription } from "../../packages/chain/ethereum/src/subscription"

import { contractAddresses, protobufDefinitions } from "./types"
import lpABI from "./smart-contracts/lendingpool/lendingpool.abi.json"
import * as lendingpool from './smart-contracts/lendingpool/lendingpool'


export class Aave {
    private config: CLIConfig

    public constructor(conf: CLIConfig) {
        this.config = conf
    }

    public async start() {
        let subscription = new Subscription()

        subscription.ethConnector.connector.registerProtos(MsgType.BF, ...protobufDefinitions)

        let contracts = [
            new Contract(
                new utils.Interface(lpABI),
                contractAddresses.lendingpool,
                lendingpool.message
            ),
        ]

        if (!this.config.fromBlock && !this.config.numBlocks) {
            // LIVE DATA

            subscription.ethConnector.connector.registerProtos(MsgType.FCT, ...protobufDefinitions)

            // Backfill last 100 blocks at every start
            await subscription.ethConnector.backfillEventsWithQueryParams(contracts, 0, 100)

            subscription.subscribeEvents(contracts)
        } else {
            // HISTORICAL DATA

            await subscription.ethConnector.backfillEventsWithQueryParams(contracts, this.config.fromBlock, this.config.numBlocks)
        }
    }
}




