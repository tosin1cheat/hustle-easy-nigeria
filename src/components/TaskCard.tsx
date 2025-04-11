
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { MapPin, Calendar, DollarSign, Star } from 'lucide-react';

interface TaskCardProps {
  title: string;
  price: number;
  location: string;
  date: string;
  category: string;
  authorName: string;
  authorImage: string;
  authorRating: number;
  urgent?: boolean;
  onClick?: () => void;
}

const TaskCard = ({
  title,
  price,
  location,
  date,
  category,
  authorName,
  authorImage,
  authorRating,
  urgent = false,
  onClick
}: TaskCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-hustlr-green cursor-pointer"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <Badge 
              className="bg-hustlr-light text-hustlr-green hover:bg-hustlr-light mb-2"
            >
              {category}
            </Badge>
            {urgent && (
              <Badge 
                className="bg-red-100 text-red-600 hover:bg-red-100 ml-2 mb-2"
              >
                Urgent
              </Badge>
            )}
            <h3 className="font-semibold text-lg line-clamp-2 mb-1">{title}</h3>
          </div>
          <div className="flex items-center bg-hustlr-green text-white py-1 px-3 rounded-full">
            <DollarSign size={14} className="mr-1" />
            <span className="font-semibold">₦{price.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin size={14} className="mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-2" />
            <span>{date}</span>
          </div>
        </div>

        <div className="flex items-center pt-4 border-t">
          <Avatar className="h-8 w-8 mr-2">
            <img src={authorImage} alt={authorName} />
          </Avatar>
          <div>
            <p className="text-sm font-medium">{authorName}</p>
            <div className="flex items-center">
              <Star size={12} className="text-hustlr-yellow fill-hustlr-yellow mr-1" />
              <span className="text-xs">{authorRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
