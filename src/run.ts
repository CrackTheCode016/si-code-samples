import { CreateTransferTransaction } from "./transactions/createtransfertx";
import { CreateNamespace } from "./namespace/createnamespace";
import { CreateMetadata } from "./metadata/assignmetadata";
import { CreateMosaic } from "./mosaic/createmosiac";
import { Account, NetworkType, RepositoryFactoryHttp } from "symbol-sdk";
import { testNetNodeUrl } from "./constants";

const genHash =
  "3B5E1FA6445653C971A50687E75E6D09FB30481055E3990C84B25E9222DC1155";

const primaryAccount = Account.createFromPrivateKey(
  "459B77CE097C2BA085A94D6A90D8660A3766771D8235E9B9E99A4C7856CA73BA",
  NetworkType.TEST_NET
);
const transferTransaction = new CreateTransferTransaction(
  primaryAccount,
  genHash,
  testNetNodeUrl
);

const namespace = new CreateNamespace(primaryAccount, genHash, testNetNodeUrl);
const metadata = new CreateMetadata(primaryAccount, genHash, testNetNodeUrl);
const mosaic = new CreateMosaic(primaryAccount, genHash, testNetNodeUrl);

// transferTransaction.run().subscribe((r) => console.log(r));
// metadata.run().subscribe((r) => console.log(r));
// mosaic.run().subscribe((r) => console.log(r));
// namespace.run().subscribe((r) => console.log(r));

metadata.create();

console.log(
  "And now... here we're watching new blocks being added to the Symbol Testnet! How cool is that?"
);

const repositoryFactory = new RepositoryFactoryHttp(testNetNodeUrl);
const listener = repositoryFactory.createListener();

listener
  .open()
  .then(() => {
    listener.newBlock().subscribe(
      (block) => {
        console.log(block);
        listener.close();
      },
      (err) => console.error(err)
    );
  })
  .catch((e) => console.log(e));
