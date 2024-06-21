import db from "@/lib/db";
import BannerClient from "./components/client";
import { CategoryColumn } from "./components/columns";
import { format } from 'date-fns'


export default async function CategoriesPage({
  params
}: {
  params: { storeId: string }}) {
  const categories = await db.category.findMany(
    { where: { 
      storeId: params.storeId
     },
     include: {
        banner: true
     },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
      id: item.id,
      name: item.name,
      bannerLabel: item.banner.label,
      createdAt: format(item.createdAt, "MMM do, yyyy")
    }))

  return (
    <div className=" flex-col">
        <div className="flex-1 space-y-6 p-8">
           <BannerClient data={formattedCategories}/>  
        </div>
    </div>
  )
}
