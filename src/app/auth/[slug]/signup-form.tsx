"use client"

import { LOGIN_FORM_SCHEMA as loginFormSchema, SIGNUP_FORM_SCHEMA as signupFormSchema } from "@/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
        fullName: "",
        email: "",
        password: ""
    }
  })
  const router = useRouter()

  const onSubmitSignup = (values: z.infer<typeof signupFormSchema>) => {
    // console.log(values);
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
        <Button type="submit">Signup</Button>
      </form>
    </Form>
  )
}

export default SignupForm