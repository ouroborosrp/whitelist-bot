import { db, schema } from '@/db';
import type { Command } from '@/lib/command';
import { env } from '@/lib/env';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const checkIfIpWhitelisted = async (ip: string) => {
  // We intentionally don't filter by status here, as long as the IP is in the database, it's considered processed
  const result = await db.select().from(schema.ips).where(eq(schema.ips.ip, ip)).get();
  return !!result;
};

const checkIfDiscordIdWhitelisted = async (discordId: string) => {
  const result = await db.select().from(schema.ips).where(eq(schema.ips.discordId, discordId)).get();
  return !!result;
};

const whitelist: Command = {
  name: 'whitelist',
  description: 'Whitelist your home IP address (whitelisted only)',
  options: [
    {
      name: 'ip',
      description: 'Your home IP address (v4)',
      required: true,
      type: 'string',
    },
  ],
  execute: async (interaction) => {
    try {
      const options = interaction.options.data;
      const ip = z
        .string()
        .ip({
          version: 'v4',
        })
        .parse(options.find((o) => o.name === 'ip')?.value);

      const discordId = interaction.user.id;
      const discordName = interaction.user.username;

      // Check if the user has the right role or is an admin
      const member = await interaction.guild?.members.fetch(discordId);
      const isWhitelistedRole = member?.roles.cache.some((role) => role.id === env.WHITELISTED_ROLE_ID);

      if (!isWhitelistedRole && !env.ADMINS.includes(discordId)) {
        await interaction.reply({
          content: 'You do not have permission to use this command. You are not whitelisted.',
          ephemeral: true,
        });
        return;
      }

      // Check if the IP address is already whitelisted
      const isWhitelisted = await checkIfIpWhitelisted(ip);
      if (isWhitelisted) {
        await interaction.reply({ content: `IP address ${ip} is already whitelisted.`, ephemeral: true });
        return;
      }

      // Check if the Discord ID is already whitelisted
      const isDiscordIdWhitelisted = await checkIfDiscordIdWhitelisted(discordId);
      if (isDiscordIdWhitelisted) {
        await interaction.reply({
          content: `You already have an IP address whitelisted. We only allow one IP per discord user. Contact admins to change it.`,
          ephemeral: true,
        });
        return;
      }

      // Save the IP address to the database
      await db.insert(schema.ips).values({
        ip,
        discordId,
        discordName,
        status: 'whitelisted',
      });

      await interaction.reply({ content: `Whitelisted IP address ${ip}. Have fun!`, ephemeral: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        await interaction.reply('Invalid IP address');
        return;
      }
      throw error;
    }
  },
};

export default whitelist;
