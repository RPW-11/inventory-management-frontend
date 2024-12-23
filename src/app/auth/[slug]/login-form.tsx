"use client"
import { LOGIN_FORM_SCHEMA as loginFormSchema } from "@/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFetchApi } from "@/hooks/useFetch";
import { SignupResponse } from "@/types";
import { useAuthStore } from "@/contexts/useStore";

const LoginForm = () => {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
        email: "",
        password: ""
    }
  })
  const router = useRouter()
  const { setAccessToken } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchApi = useFetchApi()
  
  const onSubmitLogin = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true)

    const res = await fetchApi({
      path: "/login",
      method: "POST",
      body: JSON.stringify(values)
    })

    const { accessToken, message }: SignupResponse = await res.json()
    if (!res.ok) {
      setError(message)
      setIsLoading(false)
      return
    }

    localStorage.setItem("jwt_access_token", accessToken)
    setAccessToken(accessToken)
    setError(null)
    setIsLoading(false)

    router.push("/main")
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-4">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="akuganteng@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Input your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password"/>
              </FormControl>
              <FormDescription>
                Input your password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">Login</Button>
        <p className="text-xs font-medium text-red-500 text-center">{ error }</p>
      </form>
    </Form>
  )
}

export default LoginForm