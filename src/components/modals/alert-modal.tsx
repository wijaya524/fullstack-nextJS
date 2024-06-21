"use client"

import { useEffect, useState } from "react"
import { Modal } from "../ui/modal"
import { Button } from "../ui/button"

interface alertModalProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    loading: boolean
}

export const AlertModal : React.FC<alertModalProps> = (
    {isOpen, onClose, onConfirm, loading}
) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }

    return (
        <Modal
        title="Are u sure?"
        description="This action cannot be undone"
        isOpen={isOpen}
        onClose={onClose}
        >
          <div className=" w-full flex justify-end gap-3">
          <Button disabled={loading} variant={"outline"} onClick={onClose}>
                Cancel
             </Button>
             <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
                Continue
             </Button>
          </div>
        </Modal>
    )
}