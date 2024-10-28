import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { PUBLIC_API as publicAPI } from "@/constants";
import { useAuthStore } from "@/contexts/useStore";

export function useFetchApi() {
  const router = useRouter();
  const { setAccessToken } = useAuthStore()

  const fetchApi = useCallback(async (content: {
    method: "POST" | "GET" | "PATCH" | "PUT" | "DELETE",
    accessToken?: string | null,
    path: string,
    body?: BodyInit
  }): Promise<Response> => {
    const { accessToken, path, method, body } = content;

    if (!accessToken) {
      // Public routes
      const res = await fetch(publicAPI + path, {
        method,
        body,
        headers: {
          "Content-Type": "application/json"
        }
      });
      return res;
    }

    // Private routes
    let res = await fetch(publicAPI + path, {
      method,
      body,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });


    if (res.status !== 401) {
        return res
    }

    // refresh the access token
    res = await fetch(publicAPI + "/refresh", { method: "POST" })
    if (res.status === 401) {
      localStorage.removeItem("jwt_access_token")
      router.push("/auth/sign-in")
      return res
    }

    // update the access token
    const payload = await res.json()
    localStorage.setItem("jwt_access_token", payload.accessToken)
    setAccessToken(payload.accessToken)

    // recall the fetch
    res = await fetch(publicAPI + path, {
      method,
      body,
      headers: {
        "Authorization": `Bearer ${payload.accessToken}`,
        "Content-Type": "application/json"
      }
    });

    return res;
  }, [router]);

  return fetchApi;
}
