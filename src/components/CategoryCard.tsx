
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  icon: ReactNode;
  title: string;
  count: number;
  onClick?: () => void;
}

const CategoryCard = ({ icon, title, count, onClick }: CategoryCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className="p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg hover:border-hustlr-green cursor-pointer"
    >
      <div className="bg-hustlr-light p-4 rounded-full text-hustlr-green mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{count} tasks</p>
    </Card>
  );
};

export default CategoryCard;
