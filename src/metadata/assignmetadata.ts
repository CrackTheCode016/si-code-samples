import { Account, AccountMetadataTransaction, AggregateTransaction, Deadline, KeyGenerator, NetworkType, UInt64 } from "symbol-sdk";
import { CreateAccount } from "../account/createaccount";
import { ExampleBase } from "../base/base";

export class CreateMetadata extends ExampleBase {
  constructor(
    readonly account: Account,
    readonly genHash: string,
    readonly ip: string,
    readonly networkType: NetworkType = NetworkType.TEST_NET
  ) {
    super(account, genHash, ip);
  }

  create(epoch: number = 0): AggregateTransaction {
    const aliceAccount = CreateAccount.create();
    const value = "123456";
    const key = KeyGenerator.generateUInt64Key('CERT');


    const accountMetadataTransaction = AccountMetadataTransaction.create(
      Deadline.create(epoch),
      aliceAccount.address,
      key,
      value.length,
      value,
      this.networkType
    );

    return AggregateTransaction.createComplete(
      Deadline.create(epoch),
      [accountMetadataTransaction.toAggregate(aliceAccount.publicAccount)],
      this.networkType,
      [],
      UInt64.fromUint(2000000)
    );
  }
}
