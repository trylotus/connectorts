// Code generated - DO NOT EDIT.
// This file is a generated protobuf definition and any manual changes will be lost.

// @generated by protoc-gen-es v1.0.0 with parameter "target=ts"
// @generated from file lendingpool.proto (package lendingpool, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message lendingpool.Borrow
 */
export class Borrow extends Message<Borrow> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes reserve = 2;
   */
  reserve = new Uint8Array(0);

  /**
   * @generated from field: bytes user = 3;
   */
  user = new Uint8Array(0);

  /**
   * @generated from field: bytes onBehalfOf = 4;
   */
  onBehalfOf = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes amount = 5;
   */
  amount = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes borrowRateMode = 6;
   */
  borrowRateMode = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes borrowRate = 7;
   */
  borrowRate = new Uint8Array(0);

  /**
   * @generated from field: uint32 referral = 8;
   */
  referral = 0;

  /**
   * @generated from field: uint64 blockNumber = 9;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 10;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 11;
   */
  txHash = "";

  constructor(data?: PartialMessage<Borrow>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.Borrow";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "reserve", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "user", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "onBehalfOf", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "amount", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "borrowRateMode", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 7, name: "borrowRate", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 8, name: "referral", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 9, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 10, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 11, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Borrow {
    return new Borrow().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Borrow {
    return new Borrow().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Borrow {
    return new Borrow().fromJsonString(jsonString, options);
  }

  static equals(a: Borrow | PlainMessage<Borrow> | undefined, b: Borrow | PlainMessage<Borrow> | undefined): boolean {
    return proto3.util.equals(Borrow, a, b);
  }
}

/**
 * @generated from message lendingpool.Deposit
 */
export class Deposit extends Message<Deposit> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes reserve = 2;
   */
  reserve = new Uint8Array(0);

  /**
   * @generated from field: bytes user = 3;
   */
  user = new Uint8Array(0);

  /**
   * @generated from field: bytes onBehalfOf = 4;
   */
  onBehalfOf = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes amount = 5;
   */
  amount = new Uint8Array(0);

  /**
   * @generated from field: uint32 referral = 6;
   */
  referral = 0;

  /**
   * @generated from field: uint64 blockNumber = 7;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 8;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 9;
   */
  txHash = "";

  constructor(data?: PartialMessage<Deposit>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.Deposit";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "reserve", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "user", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "onBehalfOf", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "amount", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "referral", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 7, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 8, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 9, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Deposit {
    return new Deposit().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Deposit {
    return new Deposit().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Deposit {
    return new Deposit().fromJsonString(jsonString, options);
  }

  static equals(a: Deposit | PlainMessage<Deposit> | undefined, b: Deposit | PlainMessage<Deposit> | undefined): boolean {
    return proto3.util.equals(Deposit, a, b);
  }
}

/**
 * @generated from message lendingpool.RebalanceStableBorrowRate
 */
export class RebalanceStableBorrowRate extends Message<RebalanceStableBorrowRate> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes reserve = 2;
   */
  reserve = new Uint8Array(0);

  /**
   * @generated from field: bytes user = 3;
   */
  user = new Uint8Array(0);

  /**
   * @generated from field: uint64 blockNumber = 4;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 5;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 6;
   */
  txHash = "";

  constructor(data?: PartialMessage<RebalanceStableBorrowRate>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.RebalanceStableBorrowRate";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "reserve", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "user", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 6, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RebalanceStableBorrowRate {
    return new RebalanceStableBorrowRate().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RebalanceStableBorrowRate {
    return new RebalanceStableBorrowRate().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RebalanceStableBorrowRate {
    return new RebalanceStableBorrowRate().fromJsonString(jsonString, options);
  }

  static equals(a: RebalanceStableBorrowRate | PlainMessage<RebalanceStableBorrowRate> | undefined, b: RebalanceStableBorrowRate | PlainMessage<RebalanceStableBorrowRate> | undefined): boolean {
    return proto3.util.equals(RebalanceStableBorrowRate, a, b);
  }
}

/**
 * @generated from message lendingpool.ReserveUsedAsCollateralDisabled
 */
export class ReserveUsedAsCollateralDisabled extends Message<ReserveUsedAsCollateralDisabled> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes reserve = 2;
   */
  reserve = new Uint8Array(0);

  /**
   * @generated from field: bytes user = 3;
   */
  user = new Uint8Array(0);

  /**
   * @generated from field: uint64 blockNumber = 4;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 5;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 6;
   */
  txHash = "";

  constructor(data?: PartialMessage<ReserveUsedAsCollateralDisabled>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.ReserveUsedAsCollateralDisabled";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "reserve", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "user", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 6, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReserveUsedAsCollateralDisabled {
    return new ReserveUsedAsCollateralDisabled().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReserveUsedAsCollateralDisabled {
    return new ReserveUsedAsCollateralDisabled().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReserveUsedAsCollateralDisabled {
    return new ReserveUsedAsCollateralDisabled().fromJsonString(jsonString, options);
  }

  static equals(a: ReserveUsedAsCollateralDisabled | PlainMessage<ReserveUsedAsCollateralDisabled> | undefined, b: ReserveUsedAsCollateralDisabled | PlainMessage<ReserveUsedAsCollateralDisabled> | undefined): boolean {
    return proto3.util.equals(ReserveUsedAsCollateralDisabled, a, b);
  }
}

/**
 * @generated from message lendingpool.ReserveUsedAsCollateralEnabled
 */
export class ReserveUsedAsCollateralEnabled extends Message<ReserveUsedAsCollateralEnabled> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes reserve = 2;
   */
  reserve = new Uint8Array(0);

  /**
   * @generated from field: bytes user = 3;
   */
  user = new Uint8Array(0);

  /**
   * @generated from field: uint64 blockNumber = 4;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 5;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 6;
   */
  txHash = "";

  constructor(data?: PartialMessage<ReserveUsedAsCollateralEnabled>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.ReserveUsedAsCollateralEnabled";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "reserve", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "user", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 6, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReserveUsedAsCollateralEnabled {
    return new ReserveUsedAsCollateralEnabled().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReserveUsedAsCollateralEnabled {
    return new ReserveUsedAsCollateralEnabled().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReserveUsedAsCollateralEnabled {
    return new ReserveUsedAsCollateralEnabled().fromJsonString(jsonString, options);
  }

  static equals(a: ReserveUsedAsCollateralEnabled | PlainMessage<ReserveUsedAsCollateralEnabled> | undefined, b: ReserveUsedAsCollateralEnabled | PlainMessage<ReserveUsedAsCollateralEnabled> | undefined): boolean {
    return proto3.util.equals(ReserveUsedAsCollateralEnabled, a, b);
  }
}

/**
 * @generated from message lendingpool.Withdraw
 */
export class Withdraw extends Message<Withdraw> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes reserve = 2;
   */
  reserve = new Uint8Array(0);

  /**
   * @generated from field: bytes user = 3;
   */
  user = new Uint8Array(0);

  /**
   * @generated from field: bytes to = 4;
   */
  to = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes amount = 5;
   */
  amount = new Uint8Array(0);

  /**
   * @generated from field: uint64 blockNumber = 6;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 7;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 8;
   */
  txHash = "";

  constructor(data?: PartialMessage<Withdraw>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.Withdraw";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "reserve", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "user", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "to", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "amount", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 7, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 8, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Withdraw {
    return new Withdraw().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Withdraw {
    return new Withdraw().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Withdraw {
    return new Withdraw().fromJsonString(jsonString, options);
  }

  static equals(a: Withdraw | PlainMessage<Withdraw> | undefined, b: Withdraw | PlainMessage<Withdraw> | undefined): boolean {
    return proto3.util.equals(Withdraw, a, b);
  }
}

/**
 * @generated from message lendingpool.ReserveDataUpdated
 */
export class ReserveDataUpdated extends Message<ReserveDataUpdated> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes reserve = 2;
   */
  reserve = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes liquidityRate = 3;
   */
  liquidityRate = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes stableBorrowRate = 4;
   */
  stableBorrowRate = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes variableBorrowRate = 5;
   */
  variableBorrowRate = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes liquidityIndex = 6;
   */
  liquidityIndex = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes variableBorrowIndex = 7;
   */
  variableBorrowIndex = new Uint8Array(0);

  /**
   * @generated from field: uint64 blockNumber = 8;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 9;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 10;
   */
  txHash = "";

  constructor(data?: PartialMessage<ReserveDataUpdated>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.ReserveDataUpdated";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "reserve", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "liquidityRate", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "stableBorrowRate", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "variableBorrowRate", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "liquidityIndex", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 7, name: "variableBorrowIndex", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 8, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 9, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 10, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReserveDataUpdated {
    return new ReserveDataUpdated().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReserveDataUpdated {
    return new ReserveDataUpdated().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReserveDataUpdated {
    return new ReserveDataUpdated().fromJsonString(jsonString, options);
  }

  static equals(a: ReserveDataUpdated | PlainMessage<ReserveDataUpdated> | undefined, b: ReserveDataUpdated | PlainMessage<ReserveDataUpdated> | undefined): boolean {
    return proto3.util.equals(ReserveDataUpdated, a, b);
  }
}

/**
 * @generated from message lendingpool.Swap
 */
export class Swap extends Message<Swap> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes reserve = 2;
   */
  reserve = new Uint8Array(0);

  /**
   * @generated from field: bytes user = 3;
   */
  user = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes rateMode = 4;
   */
  rateMode = new Uint8Array(0);

  /**
   * @generated from field: uint64 blockNumber = 5;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 6;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 7;
   */
  txHash = "";

  constructor(data?: PartialMessage<Swap>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.Swap";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "reserve", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "user", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "rateMode", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 6, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 7, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Swap {
    return new Swap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Swap {
    return new Swap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Swap {
    return new Swap().fromJsonString(jsonString, options);
  }

  static equals(a: Swap | PlainMessage<Swap> | undefined, b: Swap | PlainMessage<Swap> | undefined): boolean {
    return proto3.util.equals(Swap, a, b);
  }
}

/**
 * @generated from message lendingpool.Unpaused
 */
export class Unpaused extends Message<Unpaused> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: uint64 blockNumber = 2;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 3;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 4;
   */
  txHash = "";

  constructor(data?: PartialMessage<Unpaused>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.Unpaused";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Unpaused {
    return new Unpaused().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Unpaused {
    return new Unpaused().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Unpaused {
    return new Unpaused().fromJsonString(jsonString, options);
  }

  static equals(a: Unpaused | PlainMessage<Unpaused> | undefined, b: Unpaused | PlainMessage<Unpaused> | undefined): boolean {
    return proto3.util.equals(Unpaused, a, b);
  }
}

/**
 * @generated from message lendingpool.LiquidationCall
 */
export class LiquidationCall extends Message<LiquidationCall> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes collateralAsset = 2;
   */
  collateralAsset = new Uint8Array(0);

  /**
   * @generated from field: bytes debtAsset = 3;
   */
  debtAsset = new Uint8Array(0);

  /**
   * @generated from field: bytes user = 4;
   */
  user = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes debtToCover = 5;
   */
  debtToCover = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes liquidatedCollateralAmount = 6;
   */
  liquidatedCollateralAmount = new Uint8Array(0);

  /**
   * @generated from field: bytes liquidator = 7;
   */
  liquidator = new Uint8Array(0);

  /**
   * @generated from field: bool receiveAToken = 8;
   */
  receiveAToken = false;

  /**
   * @generated from field: uint64 blockNumber = 9;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 10;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 11;
   */
  txHash = "";

  constructor(data?: PartialMessage<LiquidationCall>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.LiquidationCall";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "collateralAsset", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "debtAsset", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "user", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "debtToCover", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "liquidatedCollateralAmount", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 7, name: "liquidator", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 8, name: "receiveAToken", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 9, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 10, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 11, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LiquidationCall {
    return new LiquidationCall().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LiquidationCall {
    return new LiquidationCall().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LiquidationCall {
    return new LiquidationCall().fromJsonString(jsonString, options);
  }

  static equals(a: LiquidationCall | PlainMessage<LiquidationCall> | undefined, b: LiquidationCall | PlainMessage<LiquidationCall> | undefined): boolean {
    return proto3.util.equals(LiquidationCall, a, b);
  }
}

/**
 * @generated from message lendingpool.Repay
 */
export class Repay extends Message<Repay> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes reserve = 2;
   */
  reserve = new Uint8Array(0);

  /**
   * @generated from field: bytes user = 3;
   */
  user = new Uint8Array(0);

  /**
   * @generated from field: bytes repayer = 4;
   */
  repayer = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes amount = 5;
   */
  amount = new Uint8Array(0);

  /**
   * @generated from field: uint64 blockNumber = 6;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 7;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 8;
   */
  txHash = "";

  constructor(data?: PartialMessage<Repay>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.Repay";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "reserve", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "user", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "repayer", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "amount", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 7, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 8, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Repay {
    return new Repay().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Repay {
    return new Repay().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Repay {
    return new Repay().fromJsonString(jsonString, options);
  }

  static equals(a: Repay | PlainMessage<Repay> | undefined, b: Repay | PlainMessage<Repay> | undefined): boolean {
    return proto3.util.equals(Repay, a, b);
  }
}

/**
 * @generated from message lendingpool.FlashLoan
 */
export class FlashLoan extends Message<FlashLoan> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: bytes target = 2;
   */
  target = new Uint8Array(0);

  /**
   * @generated from field: bytes initiator = 3;
   */
  initiator = new Uint8Array(0);

  /**
   * @generated from field: bytes asset = 4;
   */
  asset = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes amount = 5;
   */
  amount = new Uint8Array(0);

  /**
   * uint256
   *
   * @generated from field: bytes premium = 6;
   */
  premium = new Uint8Array(0);

  /**
   * @generated from field: uint32 referralCode = 7;
   */
  referralCode = 0;

  /**
   * @generated from field: uint64 blockNumber = 8;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 9;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 10;
   */
  txHash = "";

  constructor(data?: PartialMessage<FlashLoan>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.FlashLoan";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "target", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "initiator", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "asset", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "amount", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "premium", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 7, name: "referralCode", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 8, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 9, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 10, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FlashLoan {
    return new FlashLoan().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FlashLoan {
    return new FlashLoan().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FlashLoan {
    return new FlashLoan().fromJsonString(jsonString, options);
  }

  static equals(a: FlashLoan | PlainMessage<FlashLoan> | undefined, b: FlashLoan | PlainMessage<FlashLoan> | undefined): boolean {
    return proto3.util.equals(FlashLoan, a, b);
  }
}

/**
 * @generated from message lendingpool.Paused
 */
export class Paused extends Message<Paused> {
  /**
   * @generated from field: google.protobuf.Timestamp ts = 1;
   */
  ts?: Timestamp;

  /**
   * @generated from field: uint64 blockNumber = 2;
   */
  blockNumber = protoInt64.zero;

  /**
   * @generated from field: uint64 logIndex = 3;
   */
  logIndex = protoInt64.zero;

  /**
   * @generated from field: string txHash = 4;
   */
  txHash = "";

  constructor(data?: PartialMessage<Paused>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "lendingpool.Paused";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ts", kind: "message", T: Timestamp },
    { no: 2, name: "blockNumber", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "logIndex", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "txHash", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Paused {
    return new Paused().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Paused {
    return new Paused().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Paused {
    return new Paused().fromJsonString(jsonString, options);
  }

  static equals(a: Paused | PlainMessage<Paused> | undefined, b: Paused | PlainMessage<Paused> | undefined): boolean {
    return proto3.util.equals(Paused, a, b);
  }
}

