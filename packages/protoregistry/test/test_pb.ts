// @generated by protoc-gen-es v1.0.0 with parameter "target=ts"
// @generated from file test.proto (package test, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64, Timestamp } from "@bufbuild/protobuf";

/**
 * Mint represents a Mint event raised by the Compound contract.
 *
 * @generated from message test.Mint
 */
export class Mint extends Message<Mint> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: uint64 block = 2;
   */
  block = protoInt64.zero;

  /**
   * @generated from field: uint64 idx = 3;
   */
  idx = protoInt64.zero;

  /**
   * tx hash
   *
   * @generated from field: bytes tx = 4;
   */
  tx = new Uint8Array(0);

  /**
   * The address that minted the assets
   *
   * @generated from field: bytes minter = 5;
   */
  minter = new Uint8Array(0);

  /**
   * @generated from field: bytes mintAmount = 6;
   */
  mintAmount = new Uint8Array(0);

  /**
   * @generated from field: bytes mintTokens = 7;
   */
  mintTokens = new Uint8Array(0);

  constructor(data?: PartialMessage<Mint>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "test.Mint";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "block", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "idx", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "tx", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "minter", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "mintAmount", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 7, name: "mintTokens", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Mint {
    return new Mint().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Mint {
    return new Mint().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Mint {
    return new Mint().fromJsonString(jsonString, options);
  }

  static equals(a: Mint | PlainMessage<Mint> | undefined, b: Mint | PlainMessage<Mint> | undefined): boolean {
    return proto3.util.equals(Mint, a, b);
  }
}

/**
 * Redeem represents a Borrow event raised by the Compound contract.
 *
 * @generated from message test.Redeem
 */
export class Redeem extends Message<Redeem> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: uint64 block = 2;
   */
  block = protoInt64.zero;

  /**
   * @generated from field: uint64 idx = 3;
   */
  idx = protoInt64.zero;

  /**
   * tx hash
   *
   * @generated from field: bytes tx = 4;
   */
  tx = new Uint8Array(0);

  /**
   * The address that redeemed the assets
   *
   * @generated from field: bytes redeemer = 5;
   */
  redeemer = new Uint8Array(0);

  /**
   * @generated from field: bytes redeemAmount = 6;
   */
  redeemAmount = new Uint8Array(0);

  /**
   * @generated from field: bytes redeemTokens = 7;
   */
  redeemTokens = new Uint8Array(0);

  constructor(data?: PartialMessage<Redeem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "test.Redeem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "block", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "idx", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "tx", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "redeemer", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "redeemAmount", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 7, name: "redeemTokens", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Redeem {
    return new Redeem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Redeem {
    return new Redeem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Redeem {
    return new Redeem().fromJsonString(jsonString, options);
  }

  static equals(a: Redeem | PlainMessage<Redeem> | undefined, b: Redeem | PlainMessage<Redeem> | undefined): boolean {
    return proto3.util.equals(Redeem, a, b);
  }
}
