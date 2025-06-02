
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ItemCardProps {
  item: Item;
  quantity: number;
  onBuy: () => void;
  onSell: () => void;
  canAfford: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  quantity, 
  onBuy, 
  onSell, 
  canAfford 
}) => {
  const formatPrice = (price: number) => {
    if (price >= 1000000000) {
      return `$${(price / 1000000000).toFixed(1)}B`;
    } else if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <Card className={`
      bg-gradient-to-br from-slate-800 to-slate-900 
      border border-slate-700 
      hover:border-yellow-500/50 
      transition-all duration-300 
      hover:shadow-xl hover:shadow-yellow-500/20
      hover:scale-105
      ${!canAfford ? 'opacity-60' : ''}
    `}>
      <CardHeader className="pb-2">
        <div className="text-center">
          <div className="text-4xl mb-2 animate-pulse">
            {item.image}
          </div>
          <h3 className="text-white font-semibold text-lg">
            {item.name}
          </h3>
          <p className="text-gray-400 text-sm">
            {item.description}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="text-center mb-4">
          <p className="text-yellow-400 font-bold text-xl">
            {formatPrice(item.price)}
          </p>
          <p className="text-gray-500 text-xs">
            ${item.price.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mb-4">
          <Button
            onClick={onSell}
            disabled={quantity === 0}
            size="sm"
            variant="outline"
            className="w-10 h-10 p-0 border-red-500 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-30"
          >
            <Minus className="w-4 h-4" />
          </Button>

          <div className="flex-1 text-center">
            <span className="text-white font-semibold text-lg">
              {quantity}
            </span>
          </div>

          <Button
            onClick={onBuy}
            disabled={!canAfford}
            size="sm"
            variant="outline"
            className="w-10 h-10 p-0 border-green-500 text-green-500 hover:bg-green-500 hover:text-white disabled:opacity-30"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {quantity > 0 && (
          <div className="text-center">
            <p className="text-purple-400 text-sm font-medium animate-fade-in">
              Total: {formatPrice(item.price * quantity)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
