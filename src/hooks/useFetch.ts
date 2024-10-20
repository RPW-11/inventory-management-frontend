import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { PUBLIC_API as publicAPI } from "@/constants";

export function useFetchApi() {
  const router = useRouter();

  const fetchApi = useCallback(async (content: {
    method: string | "GET",
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
    const res = await fetch(publicAPI + path, {
      method,
      body,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (res.status === 401) {
        // remove the token because it's invalid
        localStorage.removeItem("jwt_access_token")
        router.push("/auth/sign-in");
    }

    return res;
  }, [router]);

  return fetchApi;
}
