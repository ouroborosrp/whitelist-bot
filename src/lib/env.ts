import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
  BOT_TOKEN: str(),
  APPLICATION_ID: str(),
  DB_NAME: str({
    default: 'db.sqlite',
  }),
  ADMINS: str(),
  WHITELISTED_ROLE_ID: str(),
});
