import { config } from "dotenv";

config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`\n✗ ${name} tanımlı değil. .env.local dosyanızı kontrol edin.\n`);
    process.exit(1);
  }
  return value;
}
