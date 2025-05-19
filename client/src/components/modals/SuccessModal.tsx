import { Button } from '@/components/ui/button';
import { useModal } from '@/context/ModalContext';
import ModalWrapper from './ModalWrapper';
import { Check } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const { successOptions } = useModal();
  
  const title = successOptions?.title || 'Payment Successful!';
  const message = successOptions?.message || 
    'Thank you for your order. We\'ll contact you shortly to discuss the next steps.';

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose}
      title={title}
      description={message}
    >
      <div className="text-center py-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-500" />
        </div>
        <Button 
          onClick={onClose} 
          className="mt-4"
          size="lg"
        >
          Close
        </Button>
      </div>
    </ModalWrapper>
  );
}
