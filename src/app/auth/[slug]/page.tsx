import { notFound } from "next/navigation"
import LoginForm from "./login-form"
import SignupForm from "./signup-form"

const AuthPage = ({ params }: { params: { slug: string } }) => {
  const pageType = params.slug

  if (pageType !== "sign-up" && pageType !== "sign-in" ) {
    return notFound()
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="rounded-xl bg-white p-10 w-96 border h-fit shadow-lg">
          { pageType === "sign-in" ? <LoginForm/> : <SignupForm/>}
      </div>
    </div>
  )
}

export default AuthPage