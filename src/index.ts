#! /usr/bin/env bun

import startBot from '@/bot';
import { printHeader } from '@/utils/header';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

printHeader();
yargs(hideBin(process.argv))
  .scriptName('whitelist-bot')
  .usage('$0 <cmd> [args]')
  .demandCommand(1, 'You need at least one command before moving on')
  // Commands
  .command('run', 'start the bot', startBot)
  .command('blacklist', 'blacklist an IP address', () => {
    // TODO: Implement blacklist command
  })
  .command('whitelist', 'whitelist an IP address', () => {
    // TODO;
  })
  .command('list', 'list all IP addresses', () => {
    // TODO
  })
  // Version
  .alias('v', 'version')
  .version()
  .describe('v', 'show version information')
  // Help
  .alias('h', 'help')
  .help('help')
  .showHelpOnFail(false, 'Specify --help for available options')
  .strict()
  .parse();
