import { CreateAccount } from "./account/createaccount";
import { CreateTransferTransaction } from "./transactions/createtransfertx";
import { CreateNamespace } from "./namespace/createnamespace";
import { CreateMetadata } from "./metadata/assignmetadata";
import { CreateMosaic } from "./mosaic/createmosiac";

const ip = "";
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
