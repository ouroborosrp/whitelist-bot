import Logger from '@/lib/logger';

const logger = new Logger({ name: 'IPTables' });
export class IPTables {
  public static whitelist(ip: string): void {
    logger.info(`Whitelisting IP: ${ip}`);
  }

  public static blacklist(ip: string): void {
    logger.info(`Blacklisting IP: ${ip}`);
  }
}
