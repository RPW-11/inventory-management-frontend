"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuth = () => {
    const router = useRouter();
  
    useEffect(() => {
      const accessToken = localStorage.getItem('jwt_access_token');
      if (!accessToken) {
        router.replace('/auth/sign-in');
      }
    }, []);
  };
  
  export default useAuth;