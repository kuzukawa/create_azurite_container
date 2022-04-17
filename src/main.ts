import dotenv from 'dotenv';
import { Guid } from 'js-guid';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

dotenv.config();

// set up blob base uri
const blobHost:string = process.env.AZURE_STORAGE_BLOB_HOST || '';
const account:string = process.env.AZURE_STORAGE_ACCOUNT || '';
const accountKey:string = process.env.AZURE_STORAGE_ACCOUNT_KEY || '';
const emulator:boolean = account == "devstoreaccount1";
const blobBaseUri = 'http://' + (emulator ? `${blobHost}/${account}` : `${account}.${blobHost}`) + '/';

// set up blob container url
/* don't use below. using guid.
const container:string = process.env.AZURE_STORAGE_CONTAINER || '';
const blobContainerUri = `${blobBaseUri}${container}`;
*/

// Generate random string for blob content and file name
/* don't use below. creating only container.
const content = Guid.newGuid().toString().substring(0, 8);
const file = `${content}.txt`;
*/

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient =  new BlobServiceClient(
    blobBaseUri,
    sharedKeyCredential
);

async function main() {
    // Create a container
    const containerName = `newcontainer${new Date().getTime()}`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
}
  
main();
