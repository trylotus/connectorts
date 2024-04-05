import { utils } from "ethers"

import { MsgType } from "@trylotus/connectorts/packages/kafkautils/src/types"
import { CLIConfig, Contract } from "@trylotus/connectorts/packages/chain/ethereum/src/types"
import { Subscription } from "@trylotus/connectorts/packages/chain/ethereum/src/subscription"

import lpABI from "./smart-contracts/lendingpool/lendingpool.abi.json"
import * as lendingpool from './smart-contracts/lendingpool/lendingpool'
import * as types from "./types"

export class Aave {
    private config: CLIConfig

    public constructor(conf: CLIConfig) {
        this.config = conf
    }

    public async start() {
        let subscription = new Subscription()

        subscription.ethConnector.connector.registerProtos(types.lendingPoolProtoDescPath, MsgType.BF, ...types.lendingPoolProtos)

        let contracts = [
            new Contract(
                new utils.Interface(lpABI),
                types.contractAddresses.lendingpool,
                lendingpool.message
            ),
        ]

        if (!this.config.fromBlock && !this.config.numBlocks) {
            // LIVE DATA

            subscription.ethConnector.connector.registerProtos(types.lendingPoolProtoDescPath, MsgType.FCT, ...types.lendingPoolProtos)

            // Backfill last 100 blocks at every start
            await subscription.ethConnector.backfillEventsWithQueryParams(contracts, 0, 100)

            subscription.subscribeEvents(contracts)
        } else {
            // HISTORICAL DATA

            await subscription.ethConnector.backfillEventsWithQueryParams(contracts, this.config.fromBlock, this.config.numBlocks)
        }
    }
}




