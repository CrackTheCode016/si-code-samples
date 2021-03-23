import {
  Account,
  Deadline,
  NetworkType,
  PlainMessage,
  Transaction,
  TransferTransaction,
} from "symbol-sdk";
import { CreateAccount } from "../account/createaccount";
import { ExampleBase } from "../base/base";

export class CreateTransferTransaction extends ExampleBase {
  constructor(
    readonly account: Account,
    readonly genHash: string,
    readonly ip: string,
    readonly epoch: number = 0,
    readonly networkType: NetworkType = NetworkType.TEST_NET
  ) {
    super(account, genHash, ip, epoch, "");
  }

  create(epoch: number = 0): TransferTransaction {
    const randomRecipient = CreateAccount.create();
    return TransferTransaction.create(
      Deadline.create(epoch),
      randomRecipient.address,
      [],
      PlainMessage.create("Heyyy"),
      this.networkType
    );
  }
}
