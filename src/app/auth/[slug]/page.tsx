import { notFound } from "next/navigation"
import LoginForm from "./login-form"
import SignupForm from "./signup-form"
import Link from "next/link"

const AuthPage = ({ params }: { params: { slug: string } }) => {
  const pageType = params.slug
  const title = pageType === "sign-in" ? "Login to continue." : "Signup to continue."
  const footer = pageType === "sign-in" ? "Don't have an account?" : "Already have an account?"
  const otherPath = pageType === "sign-in" ? "/auth/sign-up" : "/auth/sign-in"
  const linkText = pageType === "sign-in" ? "Signup" : "Login"

  if (pageType !== "sign-up" && pageType !== "sign-in" ) {
    return notFound()
  }


  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 rounded-xl bg-white px-10 py-6 w-96 border h-fit shadow-lg">
          <h2 className="text-lg font-bold">{ title }</h2>
          { pageType === "sign-in" ? <LoginForm/> : <SignupForm/>}
          <div className="text-sm m-auto">
            { footer } <span className="font-semibold hover:underline"><Link href={otherPath}>{ linkText }</Link></span>
            </div>
      </div>
    </div>
  )
}

export default AuthPage