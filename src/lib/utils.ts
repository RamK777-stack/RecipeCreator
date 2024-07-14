import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const LIMIT = 5;
const WINDOW = 24 * 60 * 60 * 1000; // 24 hrs in milliseconds

interface IPData {
  count: number;
  resetTime: number;
}

const ipStore: Map<string, IPData> = new Map();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rateLimit(ip: string): boolean {
  const now: number = Date.now();
  const ipData: IPData = ipStore.get(ip) || { count: 0, resetTime: now + WINDOW };

  if (now > ipData.resetTime) {
    ipData.count = 1;
    ipData.resetTime = now + WINDOW;
  } else if (ipData.count < LIMIT) {
    ipData.count++;
  } else {
    return false; // Rate limit exceeded
  }

  ipStore.set(ip, ipData);
  return true; // Request allowed
}

export function getRemainingRequests(ip: string): number {
  const ipData: IPData | undefined = ipStore.get(ip);
  if (!ipData) return LIMIT;
  return Math.max(0, LIMIT - ipData.count);
}

export function getResetTime(ip: string): string | null {
  const ipData: IPData | undefined = ipStore.get(ip);
  if (!ipData) return null;
  return new Date(ipData.resetTime).toISOString();
}



