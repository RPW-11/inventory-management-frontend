import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchApi(content:{
  method: string|"GET", 
  accessToken?: string,
  endPoint: string, 
  body?: BodyInit}): Promise<Response> {
  const { accessToken, endPoint, method, body } = content

  if (!accessToken) {
    // public routes
    const res = await fetch(endPoint, {
      method,
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    return res
  }
  // private routes
  const res = await fetch(endPoint, {
    method,
    body,
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })

  return res
}
