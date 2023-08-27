import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dotproduct(vec1: number[], vec2: number[]){
  let result = 0

  for (let index = 0; index < vec1.length; index++) {
    result += vec1[index] * vec2[index]
    
  }

  return result
}