import { z } from 'zod';

const envSchema = z.object({
    VITE_RICK_AND_MORTY_API_URL: z.string().url(),
});

const _env = {
    VITE_RICK_AND_MORTY_API_URL: import.meta.env.VITE_RICK_AND_MORTY_API_URL,
};

const parsedEnv = envSchema.safeParse(_env);

if (!parsedEnv.success) {
    console.error(
        "Invalid environment variables:",
        parsedEnv.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;