"use client"
import { SIGNUP_FORM_SCHEMA as signupFormSchema } from "@/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupResponse } from "@/types";
import { useAuthStore } from "@/contexts/useStore";
import { useFetchApi } from "@/hooks/useFetch";

const SignupForm = () => {
  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
        fullName: "",
        email: "",
        password: "",
        phoneNumber: ""
    }
  })
  const router = useRouter()
  const { setAccessToken } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchApi = useFetchApi()

  const onSubmitSignup = async (values: z.infer<typeof signupFormSchema>) => {
    setIsLoading(true)

    const res = await fetchApi({
      path: "/signup",
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
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSubmitSignup)} className="space-y-4">
        <FormField
          control={signupForm.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Wayne Punf" {...field} />
              </FormControl>
              <FormDescription>
                Input your full name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="082235067876" {...field} />
              </FormControl>
              <FormDescription>
                Input your phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
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
          control={signupForm.control}
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
        <Button disabled={isLoading} type="submit">Signup</Button>
        <p className="text-xs font-medium text-red-500 text-center">{ error }</p>
      </form>
    </Form>
  )
}

export default SignupForm