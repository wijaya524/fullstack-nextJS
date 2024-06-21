"use client"

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface apiAlertProps {
   title: string;
   description: string;
   variant: "public" | "admin"
}

const textMap: Record<apiAlertProps["variant"], string> = {
   public: "Public",
   admin: "Admin"
}

const variantMap: Record<apiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
 }

 export const ApiAlert: React.FC<apiAlertProps> = ({ 
    title, 
    description, 
    variant = "public"
 }) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success("API Copied to clipboard")
    }



    return(
        <Alert className="flex flex-col ">
            <Server className="h-6 w-6"/>
            <AlertTitle className="flex gap-5 items-center">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="flex justify-between items-center ">
                <code>
                    {description}
                </code>
                <Button variant="outline" size="sm" onClick={onCopy}>
                   <Copy/> 
                </Button>
            </AlertDescription>
        </Alert>
    )
 }
