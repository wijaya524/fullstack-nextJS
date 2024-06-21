"use strict"


import { useStoreModal } from "@/hooks/use-store-modal"
import * as z from "zod"
import { Modal } from "../ui/modal"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" })
})


export const StoreModal = () => {  
  const [loading, setIsLoading] = useState(false)

   const storeModal = useStoreModal()

   const form =  useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const  response = await axios.post("/api/stores", value)
      console.log(response.data)
      toast.success("Store created")
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
     
  return (
    <Modal title="Store" description="Modal description" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
      <div>
        <div>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                             <FormLabel>Name</FormLabel>
                             <FormControl>
                              <Input 
                                placeholder="Nama Toko"
                                {...field} disabled={loading}
                              />
                             </FormControl>
                             <FormMessage/>
                      </FormItem>
                    )}
                    />  
                  <div className="pt-4 space-x-2 flex justify-end w-full">
                    <Button variant="outline" disabled={loading} onClick={storeModal.onClose}>Cancel</Button>
                    <Button type="submit" disabled={loading}>Continue</Button>
                  </div>  
               </form>
            </Form>
        </div>
      </div>
    </Modal>
  )
}

