import { 
  createContext, 
  useContext, 
  useState, 
  ReactNode 
} from 'react';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal';
import OrderModal from '@/components/modals/OrderModal';
import PaymentModal from '@/components/modals/PaymentModal';
import SuccessModal from '@/components/modals/SuccessModal';

type ModalType = 'login' | 'register' | 'forgotPassword' | 'order' | 'payment' | 'success';

interface SelectedItem {
  title?: string;
  price?: number;
  currency?: 'USD' | 'INR';
  formattedPrice?: string;
}

interface SuccessOptions {
  title?: string;
  message?: string;
}

interface ModalContextType {
  openModal: (modal: ModalType, successOptions?: SuccessOptions) => void;
  closeModal: (modal: ModalType) => void;
  closeAllModals: () => void;
  selectedItem: SelectedItem | null;
  setSelectedItem: (item: SelectedItem | null) => void;
  successOptions: SuccessOptions | null;
  activeModal: ModalType | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [successOptions, setSuccessOptions] = useState<SuccessOptions | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const openModal = (modal: ModalType, options?: SuccessOptions) => {
    closeAllModals();
    setActiveModal(modal);
    
    switch (modal) {
      case 'login':
        setLoginModalOpen(true);
        break;
      case 'register':
        setRegisterModalOpen(true);
        break;
      case 'forgotPassword':
        setForgotPasswordModalOpen(true);
        break;
      case 'order':
        setOrderModalOpen(true);
        break;
      case 'payment':
        setPaymentModalOpen(true);
        break;
      case 'success':
        if (options) {
          setSuccessOptions(options);
        }
        setSuccessModalOpen(true);
        break;
    }
  };

  const closeModal = (modal: ModalType) => {
    switch (modal) {
      case 'login':
        setLoginModalOpen(false);
        break;
      case 'register':
        setRegisterModalOpen(false);
        break;
      case 'forgotPassword':
        setForgotPasswordModalOpen(false);
        break;
      case 'order':
        setOrderModalOpen(false);
        break;
      case 'payment':
        setPaymentModalOpen(false);
        break;
      case 'success':
        setSuccessModalOpen(false);
        break;
    }
    setActiveModal(null);
  };

  const closeAllModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    setForgotPasswordModalOpen(false);
    setOrderModalOpen(false);
    setPaymentModalOpen(false);
    setSuccessModalOpen(false);
    setActiveModal(null);
  };

  return (
    <ModalContext.Provider value={{ 
      openModal, 
      closeModal, 
      closeAllModals,
      selectedItem,
      setSelectedItem,
      successOptions,
      activeModal
    }}>
      {children}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => closeModal('login')} 
      />
      <RegisterModal 
        isOpen={registerModalOpen} 
        onClose={() => closeModal('register')} 
      />
      <ForgotPasswordModal 
        isOpen={forgotPasswordModalOpen} 
        onClose={() => closeModal('forgotPassword')} 
      />
      <OrderModal 
        isOpen={orderModalOpen} 
        onClose={() => closeModal('order')} 
      />
      <PaymentModal 
        isOpen={paymentModalOpen} 
        onClose={() => closeModal('payment')} 
      />
      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => closeModal('success')} 
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
