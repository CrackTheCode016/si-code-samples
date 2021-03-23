import {
  Account,
  AggregateTransaction,
  Deadline,
  MosaicDefinitionTransaction,
  MosaicFlags,
  MosaicId,
  MosaicNonce,
  MosaicSupplyChangeAction,
  MosaicSupplyChangeTransaction,
  NetworkType,
  UInt64,
} from "symbol-sdk";
import { ExampleBase } from "../base/base";

export class CreateMosaic extends ExampleBase {
  constructor(
    readonly account: Account,
    readonly genHash: string,
    readonly ip: string,
    readonly networkType: NetworkType = NetworkType.TEST_NET
  ) {
    super(account, genHash, ip);
  }

  create(epoch: number = 0): AggregateTransaction {
    const duration = UInt64.fromUint(0);
    const isSupplyMutable = true;
    const isTransferable = true;
    const isRestrictable = true;
    const divisibility = 0;
    const nonce = MosaicNonce.createRandom();

    const delta = 1000000;

    const mosaicDefinition = MosaicDefinitionTransaction.create(
      Deadline.create(epoch),
      nonce,
      MosaicId.createFromNonce(nonce, this.account.address),
      MosaicFlags.create(isSupplyMutable, isTransferable, isRestrictable),
      divisibility,
      duration,
      this.networkType
    );

    const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
      Deadline.create(epoch),
      mosaicDefinition.mosaicId,
      MosaicSupplyChangeAction.Increase,
      UInt64.fromUint(delta * Math.pow(10, divisibility)),
      this.networkType
    );

    return AggregateTransaction.createComplete(
      Deadline.create(epoch),
      [
        mosaicDefinition.toAggregate(this.account.publicAccount),
        mosaicSupplyChangeTransaction.toAggregate(this.account.publicAccount),
      ],
      this.networkType,
      [],
      UInt64.fromUint(2000000)
    );
  }
}
