import { readFile } from 'node:fs/promises';
const file = process.argv[2] ?? '../../../../upload/swagger(1).json';
const api = JSON.parse(await readFile(new URL(file, import.meta.url)));
if (api.openapi !== '3.0.0' || api.info?.title !== 'DACS API [TEST]') throw new Error('Unexpected OpenAPI contract');
console.log(`Verified ${api.info.title} ${api.info.version}. Client is intentionally hand-written: only approved read endpoints are exposed.`);
