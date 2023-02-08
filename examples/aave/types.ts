import * as protobuf from "@bufbuild/protobuf"

import * as lp from "./smart-contracts/lendingpool/lendingpool_pb"

export var contractAddresses = {
    lendingpool: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"
}

export const protobufDefinitions: protobuf.Message[] = [
    new lp.Borrow({}),
    new lp.Deposit({}),
    new lp.RebalanceStableBorrowRate({}),
    new lp.ReserveUsedAsCollateralDisabled({}),
    new lp.ReserveUsedAsCollateralEnabled({}),
    new lp.Withdraw({}),
    new lp.ReserveDataUpdated({}),
    new lp.Swap({}),
    new lp.Unpaused({}),
    new lp.LiquidationCall({}),
    new lp.Repay({}),
    new lp.FlashLoan({}),
    new lp.Paused({}),
]