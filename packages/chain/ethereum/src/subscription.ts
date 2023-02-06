import { Mutex } from 'async-mutex';
import { Provider } from '@ethersproject/abstract-provider';
import { Message } from "@bufbuild/protobuf"

import { MsgType } from '../../../kafkautils/src/types'
import { Connector } from '../../../connector/src/connector';
import { Contract } from './types'

export class Subscription {
    private _provider: Provider
    protected _connector: Connector

    private constructor(provider: Provider, connector: Connector) {
        this._provider = provider
        this._connector = connector
    }

    public static create(provider: Provider, connector: Connector): Subscription {
        let subscription = new Subscription(provider, connector)
        return subscription
    }

    public async getBlockTime(blockNumber: number) {
        let block = await this._provider.getBlock(blockNumber)
        return block.timestamp
    }

    public subscribe(contracts: Contract[]) {
        const mutex = new Mutex()
        let blockNumber = 0
        let messages: Message[] = []

        for (let contract of contracts) {
            let filter = {
                address: contract.address
            }

            this._provider.on(filter, async (vLog) => {
                let ts = await this.getBlockTime(vLog.blockNumber)

                let msg = contract.parser(vLog, ts)

                let release = await mutex.acquire()

                messages.push(msg)
                if (blockNumber != vLog.blockNumber) {
                    this._connector.produceMessages(MsgType.FCT, messages)
                    blockNumber = vLog.blockNumber
                    messages = []
                }

                release()
            })

        }

    }
}

// await provider.getBlock(100004)

// {
//   _difficulty: { BigNumber: "3849295379889" },
//   difficulty: 3849295379889,
//   extraData: '0x476574682f76312e302e312d39383130306634372f6c696e75782f676f312e34',
//   gasLimit: { BigNumber: "3141592" },
//   gasUsed: { BigNumber: "21000" },
//   hash: '0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63',
//   miner: '0x909755D480A27911cB7EeeB5edB918fae50883c0',
//   nonce: '0x1a455280001cc3f8',
//   number: 100004,
//   parentHash: '0x73d88d376f6b4d232d70dc950d9515fad3b5aa241937e362fdbfd74d1c901781',
//   timestamp: 1439799168,
//   transactions: [
//     '0x6f12399cc2cb42bed5b267899b08a847552e8c42a64f5eb128c1bcbd1974fb0c'
//   ]
// }

// await provider.getBlockWithTransactions(100004)

// {
//   _difficulty: { BigNumber: "3849295379889" },
//   difficulty: 3849295379889,
//   extraData: '0x476574682f76312e302e312d39383130306634372f6c696e75782f676f312e34',
//   gasLimit: { BigNumber: "3141592" },
//   gasUsed: { BigNumber: "21000" },
//   hash: '0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63',
//   miner: '0x909755D480A27911cB7EeeB5edB918fae50883c0',
//   nonce: '0x1a455280001cc3f8',
//   number: 100004,
//   parentHash: '0x73d88d376f6b4d232d70dc950d9515fad3b5aa241937e362fdbfd74d1c901781',
//   timestamp: 1439799168,
//   transactions: [
//     {
//       accessList: null,
//       blockHash: '0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63',
//       blockNumber: 100004,
//       chainId: 0,
//       confirmations: 16317986,
//       creates: null,
//       data: '0x',
//       from: '0xcf00A85f3826941e7A25BFcF9Aac575d40410852',
//       gasLimit: { BigNumber: "90000" },
//       gasPrice: { BigNumber: "54588778004" },
//       hash: '0x6f12399cc2cb42bed5b267899b08a847552e8c42a64f5eb128c1bcbd1974fb0c',
//       nonce: 25,
//       r: '0xb23adc880d3735e4389698dddc953fb02f1fa9b57e84d3510a2a4b3597ac2486',
//       s: '0x4e856f95c4e2828933246fb4765a5bfd2ca5959840643bef0e80b4e3a243d064',
//       to: '0xD9666150A9dA92d9108198a4072970805a8B3428',
//       transactionIndex: 0,
//       type: 0,
//       v: 27,
//       value: { BigNumber: "5000000000000000000" },
//       wait: [Function (anonymous)]
//     }
//   ]
// }