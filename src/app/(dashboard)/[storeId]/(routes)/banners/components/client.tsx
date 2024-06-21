"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Banner } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BannerColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface BannerClientProps {
   data: BannerColumn[]
}


export const BannerClient: React.FC<BannerClientProps> = ({
   data
}) => {
    const router = useRouter()
    const params = useParams()

    return (
     <>
        <div className="flex items-center justify-between">
            <Heading
             title={`Banners (${data.length})`}
             description="Manage your banners here"
             />
             <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                <Plus/>
                Add New
             </Button>
        </div>
        <Separator/>
        <DataTable data={data} columns={columns} searchKey="label" />
        <Heading title="API" description="List of API for Banner"/>
        <Separator/>
        <ApiList namaIndikator="banners" idIndikator="bannerId"/>
     </>
    )
}

export default BannerClient