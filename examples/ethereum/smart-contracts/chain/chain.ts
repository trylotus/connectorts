import * as protobuf from "@bufbuild/protobuf"
import { BlockWithTransactions, TransactionResponse } from '@ethersproject/abstract-provider';

import { parseInput, InputType } from "../../../../packages/chain/ethereum/src/event"

import * as chain from "./chain_pb"

export function parseTransaction(transaction: TransactionResponse, timestamp: number): protobuf.Message {
    let ts = new protobuf.Timestamp()
    ts.seconds = BigInt(timestamp)

    let tx = new chain.Transaction()

    tx.ts = ts
    if (transaction.from) tx.From = parseInput(InputType.ADDRESS, transaction.from)
    tx.Hash = parseInput(InputType.ADDRESS, transaction.hash)
    // tx.Size = transaction.
    tx.AccountNonce = BigInt(transaction.nonce)
    tx.Price = transaction.gasPrice!.toBigInt()
    tx.GasLimit = transaction.gasLimit.toBigInt()
    tx.Recipient = transaction.to ? parseInput(InputType.ADDRESS, transaction.to) : null
    tx.Amount = parseInput(InputType.UINT256, transaction.value)
    tx.Payload = parseInput(InputType.ADDRESS, transaction.data)
    tx.V = BigInt(transaction.v || 0)
    tx.R = parseInput(InputType.UINT256, transaction.r)
    tx.S = parseInput(InputType.UINT256, transaction.s)

    return tx
}

export function parseBlock(block: BlockWithTransactions): protobuf.Message {
    let ts = new protobuf.Timestamp()
    ts.seconds = BigInt(block.timestamp)

    let bl = new chain.Block()

    bl.ts = ts
    bl.Hash = block.hash
    bl.Difficulty = block._difficulty.toBigInt()
    bl.Number = BigInt(block.number)
    bl.GasLimit = block.gasLimit.toBigInt()
    bl.GasUsed = block.gasUsed.toBigInt()
    bl.Nonce = BigInt(block.nonce)

    return bl
}