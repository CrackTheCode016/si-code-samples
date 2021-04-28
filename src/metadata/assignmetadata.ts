import {
  Account,
  AccountMetadataTransaction,
  AggregateTransaction,
  Deadline,
  KeyGenerator,
  NetworkType,
  UInt64,
} from "symbol-sdk";
import { ExampleBase } from "../base/base";
import { defaultFee, epoch } from "../constants";

export class CreateMetadata extends ExampleBase {
  constructor(
    readonly account: Account,
    readonly genHash: string,
    readonly ip: string,
    readonly epoch: number = 0,
    readonly networkType: NetworkType = NetworkType.TEST_NET
  ) {
    super(
      account,
      genHash,
      ip,
      epoch,
      "Account Metadata Assignment. This transaction assigns metadata with the consent of the other account signing the transaction."
    );
  }

  create(): AggregateTransaction {
    const value = "Hello!";
    const randomHexValue = Math.floor(Math.random() * 99999);
    const key = KeyGenerator.generateUInt64Key(`CERT-${randomHexValue}`);

    console.log(key);
    const accountMetadataTransaction = AccountMetadataTransaction.create(
      Deadline.create(epoch),
      this.account.address,
      key,
      value.length,
      value,
      this.networkType
    );

    return AggregateTransaction.createComplete(
      Deadline.create(epoch),
      [accountMetadataTransaction.toAggregate(this.account.publicAccount)],
      this.networkType,
      [],
      UInt64.fromUint(defaultFee)
    );
  }
}
