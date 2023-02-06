import { utils } from "ethers";
import * as protobuf from "@bufbuild/protobuf"

import { Contract } from "../src/types";
import * as testABI from './test.abi.json';

test('creates new ethereum Contract object', function () {
    // AAVE lending pool contract
    let adr = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"
    let ABI = new utils.Interface(testABI)
    var c = new Contract(ABI, adr, function (): protobuf.Message { return new protobuf.Message })

    expect(c.ABI).toBe(testABI)
    expect(c.address).toBe(adr)
    expect(c.parser).toBeTruthy()
})