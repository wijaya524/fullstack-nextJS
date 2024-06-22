import db from "@/lib/db";
import  { ProductClient } from "./components/client";
import {  ProductColumn } from "./components/columns";
import { format } from 'date-fns'
import { formatter } from "@/lib/utils";


export default async function ProductPage({
  params
}: {
  params: { storeId: string }}) {
  const products = await db.product.findMany(
    { where: { 
      storeId: params.storeId
     },
     include:{
      category: true
     },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedProducts: ProductColumn[] = products.map((item) => ({
      id: item.id,
      name: item.name,
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      price: formatter.format(item.price.toNumber()),
      category: item.category.name,
      createdAt: format(item.createdAt, "MMM do, yyyy")
    }))

  return (
    <div className=" flex-col">
        <div className="flex-1 space-y-6 p-8">
           <ProductClient data={formattedProducts}/>  
        </div>
    </div>
  )
}
