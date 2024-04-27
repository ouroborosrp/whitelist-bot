import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

export const ips = sqliteTable(
  'ips',
  {
    id: integer('id').primaryKey(),
    ip: text('ip').notNull(),
    discordId: text('discord_id').notNull(),
    discordName: text('discord_name').notNull(),
    status: text('status', { enum: ['whitelisted', 'blacklisted'] }),
    createdAt: integer('created_at').default(Date.now()),
    updatedAt: integer('created_at'),
    deletedAt: integer('deleted_at'),
    deployed: integer('deployed').default(0),
  },
  (table) => ({
    ung: unique().on(table.ip, table.discordId),
  }),
);
