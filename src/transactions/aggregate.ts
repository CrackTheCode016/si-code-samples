import {
  Account,
  AggregateTransaction,
  Deadline,
  NetworkType,
  UInt64,
} from "symbol-sdk";
import { CreateAccount } from "../account/createaccount";
import { ExampleBase } from "../base/base";
import { defaultFee, epoch } from "../constants";
import { CreateTransferTransaction } from "./createtransfertx";

export class CreateAggregateTransaction extends ExampleBase {
  constructor(
    readonly account: Account,
    readonly genHash: string,
    readonly ip: string,
    readonly epoch: number = 0,
    readonly networkType: NetworkType = NetworkType.TEST_NET
  ) {
    super(account, genHash, ip, epoch, "");
  }

  create(): AggregateTransaction {
    const payoutAccountOne = CreateAccount.create();
    const payoutAccountTwo = CreateAccount.create();
    const payoutAccountThree = CreateAccount.create();

    const transfer = new CreateTransferTransaction(
      this.account,
      this.genHash,
      this.ip
    );
    const payoutOne = transfer.create(20, payoutAccountOne.address);
    const payoutTwo = transfer.create(10, payoutAccountTwo.address);
    const payoutThree = transfer.create(15, payoutAccountThree.address);

    return AggregateTransaction.createComplete(
      Deadline.create(epoch),
      [payoutOne, payoutTwo, payoutThree],
      this.networkType,
      [],
      UInt64.fromUint(defaultFee)
    );
  }
}
