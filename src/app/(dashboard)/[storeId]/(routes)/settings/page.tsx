import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SettingsForm } from "./components/settings-form"

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const settingsPage: React.FC<SettingsPageProps> = async ({params}) => {

    const {userId} = auth()

    if(!userId) {
        redirect("/sign-in")
    }

    const store =  await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if(!store) {
        redirect("/")
    }
    
    return (
    <div>
       <div>
          <SettingsForm initialData={store}/>
       </div>
    </div>
  )
}

export default settingsPage


