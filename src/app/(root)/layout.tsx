import Navbar from "@/components/core/navbar/page"
import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function setUpLayout({
    children
} : {
    children: React.ReactNode
}) {
    const { userId } = auth()
    if(!userId) {
        redirect("/sign-in")
    }
    const store = await db.store.findFirst({
        where: {
            userId,
        }
    })

    if(store) {
        redirect(`/${store.id}`)
    }
  
    return (
        <div>
            {children}
        </div>
    )   
}