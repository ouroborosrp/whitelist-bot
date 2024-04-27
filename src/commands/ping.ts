import type { Command } from '@/lib/command';

const ping: Command = {
  name: 'ping',
  description: 'pong ?',
  options: [],
  execute: async (interaction) => {
    await interaction.reply('pong !');
  },
};

export default ping;
