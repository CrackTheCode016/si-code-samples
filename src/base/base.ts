import { Observable } from "rxjs";
import {
  Account,
  RepositoryFactoryHttp,
  SignedTransaction,
  Transaction,
  TransactionAnnounceResponse,
} from "symbol-sdk";

export abstract class ExampleBase {
  constructor(
    readonly account: Account,
    readonly genHash: string = "",
    readonly ip: string = "http://localhost:3000",
    readonly epoch: number = 0
  ) {}

  abstract create(epoch: number): Transaction;

  sign(): SignedTransaction {
    return this.account.sign(this.create(this.epoch), this.genHash);
  }

  display(): void {
    console.log(this.create(this.epoch).toJSON());
  }

  announce(): Observable<TransactionAnnounceResponse> {
    const repositoryFactory = new RepositoryFactoryHttp(this.ip);
    return repositoryFactory
      .createTransactionRepository()
      .announce(this.sign());
  }
}
