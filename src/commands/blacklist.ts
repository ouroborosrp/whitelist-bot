import { db, schema } from '@/db';
import type { Command } from '@/lib/command';
import { env } from '@/lib/env';
import { isAdmin } from '@/utils/permission';
import { z } from 'zod';

const whitelist: Command = {
  name: 'blacklist',
  description: 'blacklist (admin only)',
  options: [
    {
      name: 'ip',
      description: 'IP address (v4)',
      required: true,
      type: 'string',
    },
    {
      name: 'user',
      description: 'User to blacklist',
      required: true,
      type: 'user',
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

      const discordId = options.find((o) => o.name === 'user')?.user?.id;
      const discordName = options.find((o) => o.name === 'user')?.user?.username;

      // Check if the user is an admin
      if (!isAdmin(interaction.user.id)) {
        await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
      }

      if (!discordId || !discordName) {
        await interaction.reply({ content: 'Invalid user', ephemeral: true });
        return;
      }

      if (env.ADMINS.includes(discordId)) {
        await interaction.reply({ content: 'You cannot blacklist an admin', ephemeral: true });
        return;
      }

      // Save the IP address to the database
      await db.insert(schema.ips).values({ ip, discordId, discordName, status: 'blacklisted' });

      await interaction.reply({ content: `Blacklisted <@${discordId}> (IP: ${ip})`, ephemeral: true });
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
