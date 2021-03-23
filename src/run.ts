import { CreateAccount } from "./account/createaccount";
import { CreateTransferTransaction } from "./transactions/createtransfertx";
import { CreateNamespace } from "./namespace/createnamespace";
import { CreateMetadata } from "./metadata/assignmetadata";
import { CreateMosaic } from "./mosaic/createmosiac";
import { RepositoryFactoryHttp } from "symbol-sdk";

const ip = "http://ngl-dual-601.symbolblockchain.io:3000";
const genHash = "";

const primaryAccount = CreateAccount.create();
const transferTransaction = new CreateTransferTransaction(
  primaryAccount,
  genHash,
  ip
);
const namespace = new CreateNamespace(primaryAccount, genHash, ip);
const metadata = new CreateMetadata(primaryAccount, genHash, ip);
const mosaic = new CreateMosaic(primaryAccount, genHash, ip);

transferTransaction.display();
namespace.display();
metadata.display();
mosaic.display();

console.log(
  "And now... here we're watching new blocks being added to the Symbol Mainnet! How cool is that?"
);

const repositoryFactory = new RepositoryFactoryHttp(ip);
const listener = repositoryFactory.createListener();

listener.open().then(() => {
  listener.newBlock().subscribe(
    (block) => {
      console.log(block);
      listener.close();
    },
    (err) => console.error(err)
  );
});
