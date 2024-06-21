"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { CommandEmpty } from "cmdk"

type PopOverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopOverTriggerProps {
  items: Store[],
}

const StoreSwitcher = ({
  className,
  items = []
} : StoreSwitcherProps) => {

  const storeModal = useStoreModal()
  const params = useParams()
  const router = useRouter()

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }))

  const currentStore = formattedItems.find((item) => item.value === params.storeId)

  const [open, setOpen] = useState(false)

  const onStoreSelect = (store: {value: string, label: string}) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return(
    <Popover open={open} onOpenChange={setOpen}>
       <PopoverTrigger asChild>
         <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select store"
          className={cn("w-[200px] justify-between", className)}
         >
           <StoreIcon/>
           {currentStore?.label}
           <ChevronsUpDown/>
         </Button>
       </PopoverTrigger>
       <PopoverContent className="w-[200px] p-0">
         <Command>
           <CommandList>
             <CommandInput placeholder="Search store..." />
             <CommandEmpty>
               No store found
             </CommandEmpty>
             <CommandGroup>
               {formattedItems.map((store) => (
                 <CommandItem
                   key={store.value}
                   onSelect={() => onStoreSelect(store)}
                 >
                  <StoreIcon/>
                   {store.label}
                   <Check
                   className={cn("ml-auto", currentStore?.value === store.value ? "opacity-100" : "opacity-0")}
                   />
                 </CommandItem>
               ))}
             </CommandGroup>
           </CommandList>
           <CommandSeparator/>
           <CommandList>
             <CommandGroup>
               <CommandItem
                 onSelect={() => storeModal.onOpen()}
               >
                <PlusCircle/>
                 Add new store
               </CommandItem>
             </CommandGroup>
           </CommandList>
         </Command>
       </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher