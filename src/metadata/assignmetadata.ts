import {
  Account,
  AccountMetadataTransaction,
  AggregateTransaction,
  Deadline,
  KeyGenerator,
  NetworkType,
  UInt64,
} from "symbol-sdk";
import { CreateAccount } from "../account/createaccount";
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
    const value = "123456";
    const key = KeyGenerator.generateUInt64Key("CERT");

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
