import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
  BOT_TOKEN: str(),
  APPLICATION_ID: str({
    default: '1211793089321242684',
  }),
  DB_NAME: str({
    default: 'db.sqlite',
  }),
  ADMINS: str({
    default: '447912513653309442',
  }),
  WHITELISTED_ROLE_ID: str({
    default: '1184529777563017469',
  }),
});
