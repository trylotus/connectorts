import { BigNumber } from "ethers"
import * as bigintConversion from 'bigint-conversion'

export enum InputType {
    ADDRESS = "address",
    UINT256 = "uint256",
    UINT32 = "uint256",
    UINT16 = "uint16",
    BOOL = "bool"
}

export function parseInput(inputType: string, value: any) {
    switch (inputType) {
        case 'address':
            return Uint8Array.from(Buffer.from(value))
        case 'uint256':
            return Uint8Array.from(bigintConversion.bigintToBuf(BigNumber.from(value).toBigInt()) as Buffer)
        case 'uint16':
        case 'uint32':
        case 'bool':
        default:
            return value
    }
}
