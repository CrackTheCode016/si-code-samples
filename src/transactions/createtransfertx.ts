import {
  Account,
  Address,
  Currency,
  Deadline,
  Mosaic,
  NetworkCurrencies,
  NetworkType,
  PlainMessage,
  Transaction,
  TransferTransaction,
  UInt64,
} from "symbol-sdk";
import { CreateAccount } from "../account/createaccount";
import { ExampleBase } from "../base/base";
import { defaultFee, epoch } from "../constants";

export class CreateTransferTransaction extends ExampleBase {
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
      "This creates your most basic Symbol transaction - the TransferTransaction! This is used for transferring assets and messages."
    );
  }

  create(amount?: number, recipent?: Address): TransferTransaction {
    const randomRecipient =
      recipent !== undefined ? recipent : CreateAccount.create().address;
    return TransferTransaction.create(
      Deadline.create(epoch),
      randomRecipient,
      [Currency.PUBLIC.createRelative(10)],
      PlainMessage.create("Heyyy"),
      this.networkType,
      UInt64.fromUint(defaultFee)
    );
  }
}
