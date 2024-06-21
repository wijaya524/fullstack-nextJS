"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams ,  useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

type SettingsFormValue = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams()
  const router = useRouter()
  const origin = useOrigin();

  const form = useForm<SettingsFormValue>({
    defaultValues: initialData,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: SettingsFormValue) => {
     try {
        setLoading(true);
        await axios.patch(`/api/stores/${params.storeId}`, data);
        router.refresh();
        toast.success("Store settings updated successfully");
     } catch (error) {
        toast.error("Something went wrong while updating your store settings");
     } finally {
        setLoading(false);
     }
  };

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push("/")
      toast.success("Store has deleted")
    } catch (error) {
      toast.error("check your data and connection")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
     <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
      <div className="  flex items-center justify-around">
        <Heading title="Settings" description="Update your store settings" />
        <Button variant="destructive" disabled={loading} onClick={() => setOpen(true)}>
          <Trash />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
           <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
               <div className="grid grid-cols-3 gap-8">
                  <FormField 
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                  <Input placeholder="Name Store" disabled={loading} {...field}/>
                              </FormControl>
                              <FormMessage  />
                          </FormItem>
                      )}
                  />
               </div>
               <Button type="submit" disabled={loading}>Save</Button>
           </form>
      </Form>
      <Separator />
      <ApiAlert title="PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
    </>
  );
};
