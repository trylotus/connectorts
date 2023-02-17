import * as protobuf from "@bufbuild/protobuf"

import * as chain from "./smart-contracts/chain/chain_pb"

export const chainProtoPath = './smart-contracts/chain'

export const chainProtos: protobuf.Message[] = [
    new chain.Block({}),
    new chain.Transaction({}),
]