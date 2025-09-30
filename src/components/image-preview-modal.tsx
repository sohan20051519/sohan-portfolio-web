import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImagePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  title?: string
}

export const ImagePreviewModal = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  imageAlt, 
  title 
}: ImagePreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute -top-12 right-0 z-50 text-white hover:text-white/80 glass"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="glass rounded-lg overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            {title && (
              <div className="p-4 border-t border-border-elevated">
                <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}