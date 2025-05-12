import EventCard from '@/components/EventCard';
import { CollegeEvent } from '@/types';
import { Button } from '@/components/ui/button'; // For potential future admin use
import NextLink from 'next/link';

// Mock data - in a real app, this would come from a database
const mockEvents: CollegeEvent[] = [
  {
    id: '1',
    title: 'Annual Alumni Gala Dinner',
    date: new Date(new Date().getFullYear(), 10, 15).toISOString(), // Example: Nov 15
    description: 'Join us for an evening of celebration, networking, and reminiscing. Keynote by a distinguished alumnus.',
    location: 'Grand Ballroom, City Convention Center',
    imageUrl: 'https://picsum.photos/seed/gala/400/250',
    organizer: 'Alumni Association',
  },
  {
    id: '2',
    title: 'Homecoming Weekend 2024',
    date: new Date(new Date().getFullYear(), 9, 20).toISOString(), // Example: Oct 20
    description: 'Cheer on the home team, reconnect with classmates, and enjoy a weekend full of activities.',
    location: 'College Campus',
    imageUrl: 'https://picsum.photos/seed/homecoming/400/250',
    organizer: 'College Athletics & Alumni Office',
  },
  {
    id: '3',
    title: 'Tech Innovators Summit',
    date: new Date(new Date().getFullYear() + 1, 2, 5).toISOString(), // Example: Mar 5 next year
    description: 'A convergence of alumni in the tech industry for talks, workshops, and networking.',
    location: 'Virtual Event & Science Hall Auditorium',
    imageUrl: 'https://picsum.photos/seed/techsummit/400/250',
    organizer: 'Computer Science Department',
  },
  {
    id: '4',
    title: 'Career Mentorship Workshop',
    date: new Date(new Date().getFullYear(), 8, 10).toISOString(), // Example: Sep 10
    description: 'Alumni share career insights and provide mentorship to current students and recent graduates.',
    location: 'Online via Zoom',
    organizer: 'Career Services & Alumni Volunteers',
  },
];

export default function EventsPage() {
  const upcomingEvents = mockEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = mockEvents
    .filter(event => new Date(event.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0,3); // Show a few recent past events

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">College Events & Announcements</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Stay updated with the latest happenings, news, and opportunities for alumni engagement.
        </p>
        {/* Placeholder for Admin: Create Event Button 
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <NextLink href="/admin/create-event">Create New Event (Admin)</NextLink>
        </Button>
        */}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No upcoming events scheduled at this time. Please check back soon!</p>
        )}
      </section>
      
      {pastEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Recent Past Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} isPast />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
