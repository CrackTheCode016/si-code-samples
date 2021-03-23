import {
  Account,
  Deadline,
  NamespaceRegistrationTransaction,
  NetworkType,
  UInt64,
} from "symbol-sdk";
import { ExampleBase } from "../base/base";

export class CreateNamespace extends ExampleBase {
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
      "This creates a namespace on chain with the id `foo`"
    );
  }

  create(epoch: number = 0): NamespaceRegistrationTransaction {
    const namespaceName = "foo";
    const duration = UInt64.fromUint(172800);
    return NamespaceRegistrationTransaction.createRootNamespace(
      Deadline.create(epoch),
      namespaceName,
      duration,
      this.networkType,
      UInt64.fromUint(2000000)
    );
  }
}
