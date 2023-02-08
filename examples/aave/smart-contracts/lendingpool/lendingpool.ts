const Timestamp = require('google-protobuf/google/protobuf/timestamp_pb')
import * as protobuf from "@bufbuild/protobuf"
import { ethers, utils } from "ethers"

import lpABI from "./lendingpool.abi.json"
import * as lp from "./lendingpool_pb"

export function message(vLog: ethers.providers.Log, ts: typeof Timestamp): protobuf.Message {
    let icontract = new utils.Interface(lpABI)
    let parsedLog = icontract.parseLog(vLog)
    let args = parsedLog.args

    switch (parsedLog.name) {
        case 'Borrow':
            return new lp.Borrow({
                ts: ts,
                reserve: args[0],
                user: args[1],
                onBehalfOf: args[2],
                amount: args[3],
                borrowRateMode: args[4],
                borrowRate: args[5],
                referral: args[6],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case 'Deposit':
            return new lp.Deposit({
                ts: ts,
                reserve: args[0],
                user: args[1],
                onBehalfOf: args[2],
                amount: args[3],
                referral: args[4],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case 'RebalanceStableBorrowRate':
            return new lp.RebalanceStableBorrowRate({
                ts: ts,
                reserve: args[0],
                user: args[1],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case 'ReserveUsedAsCollateralDisabled':
            return new lp.ReserveUsedAsCollateralDisabled({
                ts: ts,
                reserve: args[0],
                user: args[1],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })


        case 'ReserveUsedAsCollateralEnabled':
            return new lp.ReserveUsedAsCollateralEnabled({
                ts: ts,
                reserve: args[0],
                user: args[1],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case "Withdraw":
            return new lp.Withdraw({
                ts: ts,
                reserve: args[0],
                user: args[1],
                to: args[2],
                amount: args[3],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case "ReserveDataUpdated":
            return new lp.ReserveDataUpdated({
                ts: ts,
                reserve: args[0],
                liquidityRate: args[1],
                stableBorrowRate: args[2],
                variableBorrowRate: args[3],
                liquidityIndex: args[4],
                variableBorrowIndex: args[5],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case 'Swap':
            return new lp.Swap({
                ts: ts,
                reserve: args[0],
                user: args[1],
                rateMode: args[2],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case 'Unpaused':
            return new lp.Unpaused({
                ts: ts,
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case 'LiquidationCall':
            return new lp.LiquidationCall({
                ts: ts,
                collateralAsset: args[0],
                debtAsset: args[1],
                user: args[2],
                debtToCover: args[3],
                liquidatedCollateralAmount: args[4],
                liquidator: args[5],
                receiveAToken: args[6],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case 'Repay':
            return new lp.Repay({
                ts: ts,
                reserve: args[0],
                user: args[1],
                repayer: args[2],
                amount: args[3],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case 'FlashLoan':
            return new lp.FlashLoan({
                ts: ts,
                target: args[0],
                initiator: args[1],
                asset: args[2],
                amount: args[3],
                premium: args[4],
                referralCode: args[5],
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })

        case 'Paused':
            return new lp.Paused({
                ts: ts,
                blockNumber: BigInt(vLog.blockNumber),
                logIndex: BigInt(vLog.logIndex),
                txHash: vLog.transactionHash,
            })
    }

    return new protobuf.Message()
}