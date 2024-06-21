import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

export default async function Navbar() {
  const {userId} = auth()

  if(!userId) {
    redirect("/sign-in")
  }
  
  const store = await db.store.findMany({
    where: {
      userId
    }
  })

  return (
    <nav className="flex p-5 gap-3 border h-16 w-full ">
      <div className="flex items-center gap-5 justify-between w-full ">
        <div className="flex items-center gap-5">
          <StoreSwitcher items={store} />
          <MainNav/>
        </div>
        <div >
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
