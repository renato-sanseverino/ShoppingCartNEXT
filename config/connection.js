import { PrismaClient } from '@prisma/client';


// dados da conexão com BD serverless
const host     = 'us-east.connect.psdb.cloud'
const port     = 3306
const username = Buffer.from('OHMzdHlqNXk2dzA2bDQyY202cDM=', 'base64').toString('ascii')
const password = Buffer.from('cHNjYWxlX3B3X1B6cVpoUzk5NGxJcmFaeGdyQzdwSmVrS1VuT3RocGNFZzFJV1lZblpDRTQ=', 'base64').toString('ascii')
const database = 'commercedb'
const ssl      = true
const setSSL   = 'sslaccept=strict&sslmode=require'
const setUTF8  = 'useUnicode=true&characterEncoding=utf8&useSSL=false'


// DATABASE_URL="mysql://root:p@ssw0rd@localhost/commercedb"
let url = `mysql://${username}:${password}@${host}/${database}`;
if (ssl) {
    url = url + `?${setSSL}`;
}

const prisma = new PrismaClient({datasources: { db: { url: url } } })

export { prisma }
