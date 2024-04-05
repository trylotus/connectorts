import { parse } from 'ts-command-line-args';

import { Ethereum } from '../../ethereum'
import { CLIConfig } from '../../../../packages/chain/ethereum/src/types';

const conf = parse<CLIConfig>(
    {
        connectorName: { type: String, alias: 'n', optional: true, description: 'name of connector (optional)' },
        blockchainName: { type: String, alias: 'c', optional: true, description: 'name of the blockchain connector runs on (optional)' },
        fromBlock: { type: Number, alias: 'f', optional: true, description: 'block number to start backfill from (optional)' },
        numBlocks: { type: Number, alias: 'b', optional: true, description: 'number of blocks to backfill (optional)' },
        help: { type: Boolean, optional: true, alias: 'h', description: 'Prints this usage guide' },
    },
    {
        helpArg: 'help',
        headerContentSections: [{ header: 'Etehereum connector', content: 'Aave connector indexes on-chain event logs from Aave protocol.' }],
        footerContentSections: [{ content: `powered by Lotus Network` }],
    },
);

conf.blockchainName = "ethereum"

var conn = new Ethereum(conf)
conn.start()
