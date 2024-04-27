import { loadModulesInDirectory } from '@/utils/loaders';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Option {
  name: string;
  description: string;
  required: boolean;
  type: 'channel' | 'user' | 'string';
}

export interface Command {
  name: string;
  description: string;
  options: Option[];
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export const buildCommands = async () => {
  const commands = await loadModulesInDirectory<Command>('commands');
  return commands.map((command) => {
    const builder = new SlashCommandBuilder().setName(command.name).setDescription(command.description);

    command.options
      .filter((option) => option.type === 'string')
      .forEach((option) => {
        builder.addStringOption((o) =>
          o.setName(option.name).setDescription(option.description).setRequired(option.required),
        );
      });

    command.options
      .filter((option) => option.type === 'channel')
      .forEach((option) => {
        builder.addChannelOption((o) =>
          o.setName(option.name).setDescription(option.description).setRequired(option.required),
        );
      });

    command.options
      .filter((option) => option.type === 'user')
      .forEach((option) => {
        builder.addUserOption((o) =>
          o.setName(option.name).setDescription(option.description).setRequired(option.required),
        );
      });

    return {
      command,
      builder,
    };
  });
};
