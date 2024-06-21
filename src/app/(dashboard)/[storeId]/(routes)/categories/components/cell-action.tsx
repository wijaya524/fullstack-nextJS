"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CategoryColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";


interface CellActionProps {
   data: CategoryColumn,

}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Category ID Copied to clipboard")
    }

    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
          router.refresh();
          router.push(`/${params.storeId}/categories`);
          toast.success("Category has deleted");
        } catch (error) {
          toast.error("check your data and connection");
        } finally {
          setLoading(false);
          setOpen(false);
        }
      };


    return (
        <>
        <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
        />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
             <Button variant={"ghost"}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className=" h-4 w-4"/>
             </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                     <p>Copy Id</p>
                </DropdownMenuItem>
                <DropdownMenuItem  onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)} >
                    <Edit className="mr-2 h-4 w-4" />
                     <p>Update</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)} >
                    <Trash className="mr-2 h-4 w-4" />
                     <p>Delete</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu> 
        </>
       )
}

export default CellAction;