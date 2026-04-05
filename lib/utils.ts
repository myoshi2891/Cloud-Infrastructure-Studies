import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose multiple Tailwind/class values into a single merged class string.
 *
 * @param inputs - One or more class values (strings, arrays, objects, or other `clsx`-compatible values) to compose
 * @returns The composed class name string with Tailwind utility conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
