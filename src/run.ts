import { CreateTransferTransaction } from "./transactions/createtransfertx";
import { CreateNamespace } from "./namespace/createnamespace";
import { CreateMetadata } from "./metadata/assignmetadata";
import { CreateMosaic } from "./mosaic/createmosiac";
import { Account, NetworkType, RepositoryFactoryHttp } from "symbol-sdk";

const ip = "http://api-01.us-west-1.testnet.symboldev.network:3000";
const genHash =
  "45FBCF2F0EA36EFA7923C9BC923D6503169651F7FA4EFC46A8EAF5AE09057EBD";

const primaryAccount = Account.createFromPrivateKey(
  "459B77CE097C2BA085A94D6A90D8660A3766771D8235E9B9E99A4C7856CA73BA",
  NetworkType.TEST_NET
);
const transferTransaction = new CreateTransferTransaction(
  primaryAccount,
  genHash,
  ip
);

const namespace = new CreateNamespace(primaryAccount, genHash, ip);
const metadata = new CreateMetadata(primaryAccount, genHash, ip);
const mosaic = new CreateMosaic(primaryAccount, genHash, ip);

console.log(
  "And now... here we're watching new blocks being added to the Symbol Mainnet! How cool is that?"
);

const repositoryFactory = new RepositoryFactoryHttp(
  "http://ngl-dual-601.symbolblockchain.io:3000/"
);
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
