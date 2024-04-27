import { buildCommands } from '@/lib/command';
import { env } from '@/lib/env';
import Logger from '@/lib/logger';
import { REST, Routes } from 'discord.js';

const logger = new Logger({ name: 'Deploy Commands' });

const registerCommands = async () => {
  const commands = await buildCommands();
  logger.debug(`Registering ${commands.length} commands.`);
  return commands.map((command) => command.builder.toJSON());
};

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(env.BOT_TOKEN);

try {
  const commands = await registerCommands();
  logger.info(`Started refreshing ${commands.length} application (/) commands.`);

  // The put method is used to fully refresh all commands in the guild with the current set
  const data = (await rest.put(Routes.applicationCommands(env.APPLICATION_ID), { body: commands })) as unknown[];

  logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
  // And of course, make sure you catch and log any errors!
  logger.error('Failed to run migrations:', error);
}
