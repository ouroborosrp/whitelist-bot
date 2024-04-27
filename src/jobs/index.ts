import { db, schema } from '@/db';
import Logger from '@/lib/logger';
import { IPTables } from '@/utils/iptables';
import { Cron } from 'croner';
import { formatDistance } from 'date-fns';
import { and, eq, inArray, isNull } from 'drizzle-orm';

export const updateIPtables = Cron('0 */5 * * * *', { paused: true }, async () => {
  const logger = new Logger({
    name: 'Job:UpdateIPtables',
  });
  const nextRun = formatDistance(updateIPtables.nextRun()!, new Date(), { includeSeconds: true });

  try {
    // Fetch all non deployed ip addresses
    const ips = await db
      .select()
      .from(schema.ips)
      .where(and(eq(schema.ips.deployed, 0), isNull(schema.ips.deletedAt)));

    if (ips.length === 0) {
      logger.info('No IP addresses to update');
      logger.info('Next cron job in', nextRun);
      return;
    }

    const whitelisted = ips.filter((ip) => ip.status === 'whitelisted');
    const blacklisted = ips.filter((ip) => ip.status === 'blacklisted');

    // TODO: whitelist ips
    for (const ip of whitelisted) {
      IPTables.whitelist(ip.ip);
    }

    // TODO: blacklist ips
    for (const ip of blacklisted) {
      IPTables.blacklist(ip.ip);
    }

    // Update deployed ips
    await db
      .update(schema.ips)
      .set({ deployed: 1 })
      .where(
        inArray(
          schema.ips.id,
          ips.map((ip) => ip.id),
        ),
      );
  } catch (error) {
    logger.error('Failed to update iptables:', error);
  }
});
