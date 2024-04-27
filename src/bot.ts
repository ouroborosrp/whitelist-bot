import { buildCommands, type Command } from '@/lib/command';
import { env } from '@/lib/env';
import Logger from '@/lib/logger';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { updateIPtables } from './jobs';

const startService = async () => {
  const logger = new Logger({ name: 'Service' });
  try {
    updateIPtables.trigger();
    updateIPtables.resume();
  } catch (error) {
    logger.error('Failed to start service:', error);
  }
};

const startBot = async () => {
  const logger = new Logger({ name: 'Bot' });
  try {
    const commands = new Collection<string, Command>();
    const client = new Client({
      intents: [GatewayIntentBits.Guilds],
    });
    const builtinCommands = await buildCommands();

    builtinCommands.forEach((c) => {
      commands.set(c.builder.name, c.command);
    });

    client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
      }
    });

    client.on(Events.ClientReady, (c) => {
      logger.info(`Connected as ${c.user?.tag}`);
      startService();
    });

    client.login(env.BOT_TOKEN);
  } catch (error) {
    logger.error('Failed to run bot:', error);
  }
};

export default startBot;
