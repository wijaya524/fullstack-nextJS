"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ProductColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ProductClientProps {
   data: ProductColumn[]
}


export const ProductClient: React.FC<ProductClientProps> = ({
   data
}) => {
    const router = useRouter()
    const params = useParams()

    return (
     <>
        <div className="flex items-center justify-between">
            <Heading
             title={`Product (${data.length})`}
             description="Manage your products here"
             />
             <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                <Plus/>
                Add New
             </Button>
        </div>
        <Separator/>
        <DataTable data={data} columns={columns} searchKey="name" />
        <Heading title="API" description="List of API for Product"/>
        <Separator/>
        <ApiList namaIndikator="products" idIndikator="productId"/>
     </>
    )
}

export default ProductClient