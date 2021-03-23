import { Account, NetworkType } from "symbol-sdk";

export class CreateAccount {
  constructor() {}

  public static create(type: NetworkType = NetworkType.TEST_NET): Account {
    return Account.generateNewAccount(type);
  }
}
