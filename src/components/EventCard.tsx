import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CollegeEvent } from '@/types';
import { CalendarDays, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: CollegeEvent;
  isPast?: boolean;
}

export default function EventCard({ event, isPast = false }: EventCardProps) {
  const placeholderImage = `https://picsum.photos/seed/${event.id}/400/200`;
  
  return (
    <Card className={`flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${isPast ? 'opacity-70' : ''}`}>
      <div className="relative w-full h-48">
        <Image
          src={event.imageUrl || placeholderImage}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint="event gathering"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-primary">{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          {format(new Date(event.date), 'MMMM d, yyyy, p')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        {event.location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
        )}
        {event.organizer && (
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>Organized by: {event.organizer}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground line-clamp-4">{event.description}</p>
      </CardContent>
      <CardFooter>
        {/* Placeholder for actions like RSVP or Learn More */}
        {/* <Button variant="outline" size="sm" disabled={isPast}>Learn More</Button> */}
      </CardFooter>
    </Card>
  );
}
