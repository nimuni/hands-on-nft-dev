import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, MORALIS_APP_ID, MORALIS_SERVER_URL, MORALIS_MASTER_KEY, MORALIS_WEB3_API_KEY } = process.env;
