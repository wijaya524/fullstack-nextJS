"use client"


import { useEffect, useState } from "react"
import { Button } from "./button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

interface ImageUploadProps {
    onChange: (value : string) => void
    onRemove: (value : string) => void
    value?: string[] 
    disabled?: boolean
}

const ImageUploads: React.FC<ImageUploadProps> = ({
    onChange,
    onRemove,
    value,
    disabled
}) => {
    const [isMounted , setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if(!isMounted){
        return null
    }

    return (
        <div>
           <div className="flex items-center gap-4 mb-4">
              {(value ?? []).map((url) => {
                return(
                <div key={url} className="relative h-[200px] w-[200px] rounded-md overflow-hidden">
                     <div className="absolute z-10 top-2 right-2">
                      <Button type="button" onClick={() => onRemove(url)} variant="destructive">
                         <Trash/>
                      </Button>
                     </div>
                     <Image
                      fill
                      className="object-cover"
                      alt="image"
                      src={url}
                     />
                </div>
                )
              })}
           </div>
           <CldUploadWidget onSuccess={onUpload} uploadPreset="bdyqwneh">
             {({ open }) => {
                const onClick = () => {
                    open()
                }
                return (
                    <Button disabled={disabled} onClick={onClick} variant="secondary" type="button">
                        <ImagePlus className="h-4 w-4 mr-2"/>
                        <p>Upload Image</p>
                    </Button>
                )
             }}
           </CldUploadWidget>
        </div>
    )
}

export default ImageUploads;