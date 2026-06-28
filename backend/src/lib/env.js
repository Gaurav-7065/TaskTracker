import dotenv from 'dotenv'

dotenv.config();
export const ENV={
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    FRONTEND_URL:process.env.FRONTEND_URL
}