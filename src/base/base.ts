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
    readonly epoch: number = 0,
    readonly message: string
  ) {}

  abstract create(epoch: number): Transaction;

  sign(): SignedTransaction {
    const signedTransaction = this.account.sign(
      this.create(this.epoch),
      this.genHash
    );
    console.log("Signed transaction with hash: ", signedTransaction.hash);
    return signedTransaction;
  }

  announce(): Observable<TransactionAnnounceResponse> {
    const repositoryFactory = new RepositoryFactoryHttp(this.ip);
    return repositoryFactory
      .createTransactionRepository()
      .announce(this.sign());
  }

  run(): Observable<TransactionAnnounceResponse> {
    console.log(this.message);
    console.log(this.create(this.epoch).toJSON());
    console.log("And now, to run send it off to a Symbol node:");
    return this.announce();
  }
}
