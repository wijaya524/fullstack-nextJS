"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import ImageUploads from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banner } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface BannerFormProps {
  initialData: Banner | null;
}

const formSchema = z.object({
  label: z.string().min(1, { message: "Name is required" }),
  imageUrl: z.string().min(1),
});

type BannerFormValue = z.infer<typeof formSchema>;

export const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit" : "Create";
  const description = initialData ? "Edit Banner Toko" : "Create ";
  const toastMessage = initialData
    ? "Banner updated successfully"
    : "Banner created successfully";
  const action = initialData ? "Save banner" : "Create";

  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<BannerFormValue>({
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: BannerFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
      await axios.patch(`/api/${params.storeId}/banners/${params.bannerId}`, data);
    } else {
      await axios.post(`/api/${params.storeId}/banners`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/banners`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong while updating your store settings");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/banners/${params.bannerId}`);
      router.refresh();
      router.push(`/${params.storeId}/banners`);
      toast.success("Banner has deleted");
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
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="  flex items-center justify-around">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8 items-center">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Label Banner"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUploads
                      disabled={loading}
                      onChange={(url) => {
                        field.onChange(url);
                      }}
                      onRemove={() => {
                        field.onChange("");
                      }}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
