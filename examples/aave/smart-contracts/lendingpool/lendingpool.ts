import * as protobuf from "@bufbuild/protobuf"
import { utils } from "ethers"

import { parseInput, InputType } from "../../../../packages/chain/ethereum/src/event"
import { ILog } from "../../../../packages/chain/ethereum/src/types"

import lpABI from "./lendingpool.abi.json"
import * as lp from "./lendingpool_pb"

const iContract = new utils.Interface(lpABI)

export function message(vLog: ILog, timestamp: number): protobuf.Message {
    let parsedLog = iContract.parseLog(vLog)
    let args = parsedLog.args

    let ts = new protobuf.Timestamp()
    ts.seconds = BigInt(timestamp)

    switch (parsedLog.name) {
        case 'Borrow':

            let borrow = new lp.Borrow()

            borrow.ts = ts
            borrow.reserve = parseInput(InputType.ADDRESS, args[0])
            borrow.user = parseInput(InputType.ADDRESS, args[1])
            borrow.onBehalfOf = parseInput(InputType.ADDRESS, args[2])
            borrow.amount = parseInput(InputType.UINT256, args[3])
            borrow.borrowRateMode = parseInput(InputType.UINT256, args[4])
            borrow.borrowRate = parseInput(InputType.UINT256, args[5])
            borrow.referral = parseInput(InputType.UINT16, args[6])
            borrow.blockNumber = BigInt(vLog.blockNumber)
            borrow.logIndex = BigInt(vLog.logIndex)
            borrow.txHash = vLog.transactionHash

            return borrow

        case 'Deposit':

            let deposit = new lp.Deposit()

            deposit.ts = ts
            deposit.reserve = parseInput(InputType.ADDRESS, args[0])
            deposit.user = parseInput(InputType.ADDRESS, args[1])
            deposit.onBehalfOf = parseInput(InputType.ADDRESS, args[2])
            deposit.amount = parseInput(InputType.UINT256, args[3])
            deposit.referral = parseInput(InputType.UINT16, args[4])
            deposit.blockNumber = BigInt(vLog.blockNumber)
            deposit.logIndex = BigInt(vLog.logIndex)
            deposit.txHash = vLog.transactionHash

            return deposit

        case 'RebalanceStableBorrowRate':

            let rsbr = new lp.RebalanceStableBorrowRate()

            rsbr.ts = ts
            rsbr.reserve = parseInput(InputType.ADDRESS, args[0])
            rsbr.user = parseInput(InputType.ADDRESS, args[1])
            rsbr.blockNumber = BigInt(vLog.blockNumber)
            rsbr.logIndex = BigInt(vLog.logIndex)
            rsbr.txHash = vLog.transactionHash

            return rsbr

        case 'ReserveUsedAsCollateralDisabled':

            let ruacd = new lp.ReserveUsedAsCollateralDisabled()

            ruacd.ts = ts
            ruacd.reserve = parseInput(InputType.ADDRESS, args[0])
            ruacd.user = parseInput(InputType.ADDRESS, args[1])
            ruacd.blockNumber = BigInt(vLog.blockNumber)
            ruacd.logIndex = BigInt(vLog.logIndex)
            ruacd.txHash = vLog.transactionHash

            return ruacd

        case 'ReserveUsedAsCollateralEnabled':

            let ruace = new lp.ReserveUsedAsCollateralEnabled()

            ruace.ts = ts
            ruace.reserve = parseInput(InputType.ADDRESS, args[0])
            ruace.user = parseInput(InputType.ADDRESS, args[1])
            ruace.blockNumber = BigInt(vLog.blockNumber)
            ruace.logIndex = BigInt(vLog.logIndex)
            ruace.txHash = vLog.transactionHash

            return ruace

        case "Withdraw":

            let withdraw = new lp.Withdraw()

            withdraw.ts = ts
            withdraw.reserve = parseInput(InputType.ADDRESS, args[0])
            withdraw.user = parseInput(InputType.ADDRESS, args[1])
            withdraw.to = parseInput(InputType.ADDRESS, args[2])
            withdraw.amount = parseInput(InputType.UINT256, args[3])
            withdraw.blockNumber = BigInt(vLog.blockNumber)
            withdraw.logIndex = BigInt(vLog.logIndex)
            withdraw.txHash = vLog.transactionHash

            return withdraw

        case "ReserveDataUpdated":

            let rdu = new lp.ReserveDataUpdated()

            rdu.ts = ts
            rdu.reserve = parseInput(InputType.ADDRESS, args[0])
            rdu.liquidityRate = parseInput(InputType.UINT256, args[1])
            rdu.stableBorrowRate = parseInput(InputType.UINT256, args[2])
            rdu.variableBorrowRate = parseInput(InputType.UINT256, args[3])
            rdu.liquidityIndex = parseInput(InputType.UINT256, args[4])
            rdu.variableBorrowIndex = parseInput(InputType.UINT256, args[5])
            rdu.blockNumber = BigInt(vLog.blockNumber)
            rdu.logIndex = BigInt(vLog.logIndex)
            rdu.txHash = vLog.transactionHash

            return rdu

        case 'Swap':

            let swap = new lp.Swap()

            swap.ts = ts
            swap.reserve = parseInput(InputType.ADDRESS, args[0])
            swap.user = parseInput(InputType.ADDRESS, args[1])
            swap.rateMode = parseInput(InputType.UINT256, args[2])
            swap.blockNumber = BigInt(vLog.blockNumber)
            swap.logIndex = BigInt(vLog.logIndex)
            swap.txHash = vLog.transactionHash

            return swap

        case 'Unpaused':

            let unpaused = new lp.Unpaused()

            unpaused.ts = ts
            unpaused.blockNumber = BigInt(vLog.blockNumber)
            unpaused.logIndex = BigInt(vLog.logIndex)
            unpaused.txHash = vLog.transactionHash

            return unpaused

        case 'LiquidationCall':

            let lc = new lp.LiquidationCall()

            lc.ts = ts
            lc.collateralAsset = parseInput(InputType.ADDRESS, args[0])
            lc.debtAsset = parseInput(InputType.ADDRESS, args[1])
            lc.user = parseInput(InputType.ADDRESS, args[2])
            lc.debtToCover = parseInput(InputType.UINT256, args[3])
            lc.liquidatedCollateralAmount = parseInput(InputType.UINT256, args[4])
            lc.liquidator = parseInput(InputType.ADDRESS, args[5])
            lc.receiveAToken = parseInput(InputType.BOOL, args[6])
            lc.blockNumber = BigInt(vLog.blockNumber)
            lc.logIndex = BigInt(vLog.logIndex)
            lc.txHash = vLog.transactionHash

            return lc

        case 'Repay':

            let repay = new lp.Repay()

            repay.ts = ts
            repay.reserve = parseInput(InputType.ADDRESS, args[0])
            repay.user = parseInput(InputType.ADDRESS, args[1])
            repay.repayer = parseInput(InputType.ADDRESS, args[2])
            repay.amount = parseInput(InputType.UINT256, args[3])
            repay.blockNumber = BigInt(vLog.blockNumber)
            repay.logIndex = BigInt(vLog.logIndex)
            repay.txHash = vLog.transactionHash

            return repay

        case 'FlashLoan':

            let fl = new lp.FlashLoan()

            fl.ts = ts
            fl.target = parseInput(InputType.ADDRESS, args[0])
            fl.initiator = parseInput(InputType.ADDRESS, args[1])
            fl.asset = parseInput(InputType.ADDRESS, args[2])
            fl.amount = parseInput(InputType.UINT256, args[3])
            fl.premium = parseInput(InputType.UINT256, args[4])
            fl.referralCode = parseInput(InputType.UINT32, args[5])
            fl.blockNumber = BigInt(vLog.blockNumber)
            fl.logIndex = BigInt(vLog.logIndex)
            fl.txHash = vLog.transactionHash

            return fl

        case 'Paused':

            let paused = new lp.Paused()

            paused.ts = ts
            paused.blockNumber = BigInt(vLog.blockNumber)
            paused.logIndex = BigInt(vLog.logIndex)
            paused.txHash = vLog.transactionHash

            return paused
    }

    return new protobuf.Message()
}