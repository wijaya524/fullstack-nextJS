import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center  justify-center w-full">
        <SignUp />
    </div>
  )
}