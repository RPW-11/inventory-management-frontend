import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PUBLIC_API as publicAPI } from "@/constants"
import { redirect } from "next/navigation"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchApi(content:{
  method: string|"GET", 
  accessToken?: string | null,
  path: string, 
  body?: BodyInit}): Promise<Response> {
  const { accessToken, path, method, body } = content

  if (!accessToken) {
    // public routes
    const res = await fetch(publicAPI + path, {
      method,
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    return res
  }

  // private routes
  const res = await fetch(publicAPI + path, {
    method,
    body,
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })

  if (res.status === 401) {
    redirect("/auth/sign-in")
  }

  return res
}
