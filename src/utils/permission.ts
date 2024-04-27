import { env } from '@/lib/env';

export const isAdmin = (discordId: string) => {
  return env.ADMINS.includes(discordId);
};
