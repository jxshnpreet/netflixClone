import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function intTo12BytesHex(int:number) {
  // Convert the integer to a hexadecimal string
  let hexString = int.toString(16);

  // Ensure the hex string is 24 characters long (12 bytes)
  while (hexString.length < 24) {
    hexString = '0' + hexString;
  }

  return hexString;
}
