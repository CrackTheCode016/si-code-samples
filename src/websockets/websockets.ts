import { from, Observable, of } from "rxjs";
import { map, mergeAll, mergeMap } from "rxjs/operators";
import { IListener, NewBlock, RepositoryFactoryHttp } from "symbol-sdk";

export class WebSocketExample {
  private repositoryFactory: RepositoryFactoryHttp;
  private listener: IListener;

  constructor(ip: string = "http://localhost:3000") {
    this.repositoryFactory = new RepositoryFactoryHttp(ip);
    this.listener = this.repositoryFactory.createListener();
  }

  watchBlocks(): Observable<NewBlock> {
    return from(this.listener.open()).pipe(
      map((_) => this.listener.newBlock()),
      mergeAll()
    );
  }

  close(): Observable<void> {
    return of(this.listener.close());
  }
}
