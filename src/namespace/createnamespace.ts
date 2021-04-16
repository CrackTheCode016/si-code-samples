import {
  Account,
  Deadline,
  NamespaceRegistrationTransaction,
  NetworkType,
  UInt64,
} from "symbol-sdk";
import { ExampleBase } from "../base/base";
import { defaultFee, epoch } from "../constants";

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

  private calculateNamespaceRentalDuration(numberOfDays: number): number {
    // duration ≈ numberOfDays ∗ 86400/blockGenerationTargetTimeInSeconds
    // Both the testnet and mainnet have this target blocktime at 15 seconds
    return numberOfDays * (86400 / 15);
  }

  create(): NamespaceRegistrationTransaction {
    const namespaceName = "foo";
    const duration = UInt64.fromUint(this.calculateNamespaceRentalDuration(30));
    return NamespaceRegistrationTransaction.createRootNamespace(
      Deadline.create(epoch),
      namespaceName,
      duration,
      this.networkType,
      UInt64.fromUint(defaultFee)
    );
  }
}
