import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ModalProps {
  children: React.ReactNode
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
}

export function Modal({ children, title, description, isOpen, onClose }: ModalProps) {
    const onChange = (open : boolean) => {
        if(!open) {
            onClose()
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
       </DialogContent>
    </Dialog>
  )
}
