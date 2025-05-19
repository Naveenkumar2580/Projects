import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { convertUSDtoINR, formatCurrency } from '@/lib/currency';
import { useModal } from '@/context/ModalContext';

interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
  priceUSD: number;
  label?: 'premium' | 'best-sell' | null;
}

export default function PortfolioCard({ 
  title, 
  description, 
  image, 
  priceUSD,
  label
}: PortfolioCardProps) {
  const [showUSD, setShowUSD] = useState(true);
  const { openModal, setSelectedItem } = useModal();
  const priceINR = convertUSDtoINR(priceUSD);

  const handleCurrencyToggle = () => {
    setShowUSD(!showUSD);
  };

  const handleOrderClick = () => {
    setSelectedItem({
      title,
      price: priceUSD,
      currency: showUSD ? 'USD' : 'INR',
      formattedPrice: showUSD 
        ? formatCurrency(priceUSD, 'USD') 
        : formatCurrency(priceINR, 'INR')
    });
    openModal('order');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg relative">
        {label && (
          <div className={`absolute top-0 right-0 z-10 px-3 py-1 text-xs font-bold text-white uppercase rounded-bl-lg
            ${label === 'premium' ? 'bg-amber-500' : 'bg-green-500'}`}>
            {label === 'premium' ? 'Premium' : 'Best Sell'}
          </div>
        )}
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 h-12 overflow-hidden">{description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="block font-bold text-lg">
                {showUSD 
                  ? formatCurrency(priceUSD, 'USD')
                  : formatCurrency(priceINR, 'INR')
                }
              </span>
            </div>
            <Button 
              variant="link" 
              onClick={handleCurrencyToggle}
              className="text-primary p-0 h-auto font-normal"
            >
              {showUSD ? 'Convert to INR' : 'Convert to USD'}
            </Button>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleOrderClick}
          >
            Order Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
