import React, { useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ItemCard from '@/components/ItemCard';
import { toast } from '@/hooks/use-toast';

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const items: Item[] = [
  {
    id: 1,
    name: "Big Mac",
    price: 5,
    image: "🍔",
    description: "McDonald's classic burger"
  },
  {
    id: 2,
    name: "Coffee",
    price: 4,
    image: "☕",
    description: "Premium coffee cup"
  },
  {
    id: 3,
    name: "iPhone 15 Pro",
    price: 1199,
    image: "📱",
    description: "Latest Apple smartphone"
  },
  {
    id: 4,
    name: "AirPods Pro",
    price: 249,
    image: "🎧",
    description: "Wireless noise-cancelling earbuds"
  },
  {
    id: 5,
    name: "Tesla Model S",
    price: 89990,
    image: "🚗",
    description: "Luxury electric vehicle"
  },
  {
    id: 6,
    name: "Rolex Watch",
    price: 15000,
    image: "⌚",
    description: "Swiss luxury timepiece"
  },
  {
    id: 7,
    name: "Gaming PC",
    price: 3500,
    image: "🖥️",
    description: "High-end gaming computer"
  },
  {
    id: 8,
    name: "Designer Handbag",
    price: 2500,
    image: "👜",
    description: "Luxury fashion accessory"
  },
  {
    id: 9,
    name: "Vacation Package",
    price: 8000,
    image: "🏖️",
    description: "Luxury resort getaway"
  },
  {
    id: 10,
    name: "Motorcycle",
    price: 25000,
    image: "🏍️",
    description: "High-performance motorcycle"
  },
  {
    id: 11,
    name: "Luxury House",
    price: 2500000,
    image: "🏠",
    description: "Beautiful mansion"
  },
  {
    id: 12,
    name: "Yacht",
    price: 15000000,
    image: "🛥️",
    description: "Luxury sailing vessel"
  },
  {
    id: 13,
    name: "Private Jet",
    price: 60000000,
    image: "✈️",
    description: "Personal aircraft"
  },
  {
    id: 14,
    name: "Sports Team",
    price: 1500000000,
    image: "⚽",
    description: "Professional sports franchise"
  },
  {
    id: 15,
    name: "Space Mission",
    price: 2000000000,
    image: "🚀",
    description: "Private space exploration"
  }
];

const Index = () => {
  const initialMoney = 100000000000; // $100 billion
  const [money, setMoney] = useState(initialMoney);
  const [purchases, setPurchases] = useState<{ [key: number]: number }>({});

  const formatMoney = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatFullMoney = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const totalSpent = initialMoney - money;

  const buyItem = (item: Item) => {
    if (money >= item.price) {
      setMoney(prev => prev - item.price);
      setPurchases(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1
      }));
    } else {
      toast({
        title: "Insufficient funds!",
        description: "You don't have enough money for this item.",
        variant: "destructive"
      });
    }
  };

  const sellItem = (item: Item) => {
    if (purchases[item.id] && purchases[item.id] > 0) {
      setMoney(prev => prev + item.price);
      setPurchases(prev => ({
        ...prev,
        [item.id]: prev[item.id] - 1
      }));
    }
  };

  const handleQuantityChange = (item: Item, newQuantity: number) => {
    const currentQuantity = purchases[item.id] || 0;
    const difference = newQuantity - currentQuantity;
    const cost = difference * item.price;

    if (difference > 0 && money < cost) {
      toast({
        title: "Insufficient funds!",
        description: "You don't have enough money for this quantity.",
        variant: "destructive"
      });
      return;
    }

    setMoney(prev => prev - cost);
    setPurchases(prev => ({
      ...prev,
      [item.id]: newQuantity
    }));
  };

  const resetGame = () => {
    setMoney(initialMoney);
    setPurchases({});
    toast({
      title: "Game Reset!",
      description: "Your spending spree starts fresh.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            Spend Bill Gates' Money
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            You have $100 billion to spend. What will you buy?
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-sm font-medium mb-2">Money Left</h3>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {formatMoney(money)}
              </p>
              <p className="text-green-200 text-xs mt-1">
                {formatFullMoney(money)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-sm font-medium mb-2">Total Spent</h3>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {formatMoney(totalSpent)}
              </p>
              <p className="text-red-200 text-xs mt-1">
                {formatFullMoney(totalSpent)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
            <CardContent className="p-6 text-center">
              <Button 
                onClick={resetGame}
                className="w-full bg-white text-blue-700 hover:bg-gray-100 transition-colors font-semibold"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Reset Game
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              quantity={purchases[item.id] || 0}
              onBuy={() => buyItem(item)}
              onSell={() => sellItem(item)}
              onQuantityChange={(newQuantity) => handleQuantityChange(item, newQuantity)}
              canAfford={money >= item.price}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p>Inspired by Neal.fun's "Spend Bill Gates' Money"</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
