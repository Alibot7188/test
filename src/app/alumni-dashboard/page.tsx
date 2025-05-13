
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, CalendarDays, Edit3, Gift, Link, LucideIcon, Search, Users, BarChart3, Network } from "lucide-react";
import NextLink from "next/link";
import Image from "next/image";

interface DashboardFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  imageSrc?: string;
  imageAlt?: string;
  dataAiHint?: string;
}

function DashboardFeatureCard({ icon, title, description, link, linkText, imageSrc, imageAlt, dataAiHint }: DashboardFeatureCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-xl transition-shadow duration-300">
      {imageSrc && (
        <div className="relative h-48 w-full">
          <Image 
            src={imageSrc} 
            alt={imageAlt || title} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-t-lg"
            data-ai-hint={dataAiHint || "related image"}
             />
        </div>
      )}
      <CardHeader className="items-center text-center">
        {icon}
        <CardTitle className="mt-2 text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center flex-grow">
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline" asChild>
          <NextLink href={link}>{linkText}</NextLink>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function AlumniDashboardPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-10 bg-card shadow-lg rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Alumni Dashboard
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Welcome back! Manage your profile, connect with peers, and explore opportunities.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-10">Your Alumni Hub</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardFeatureCard
            icon={<Edit3 className="w-10 h-10 text-accent" />}
            title="Manage Your Profile"
            description="Keep your information up-to-date to make the most of the alumni network."
            link="/profile"
            linkText="View/Edit Profile"
            imageSrc="https://picsum.photos/seed/profiledash/400/200"
            dataAiHint="desk setup"
          />
          <DashboardFeatureCard
            icon={<Search className="w-10 h-10 text-accent" />}
            title="Find Alumni"
            description="Search the alumni directory to connect with former classmates and professionals in your field."
            link="/alumni#search"
            linkText="Search Directory"
            imageSrc="https://picsum.photos/seed/searchdash/400/200"
            dataAiHint="magnifying glass"
          />
          <DashboardFeatureCard
            icon={<Users className="w-10 h-10 text-accent" />}
            title="Notable Alumni"
            description="Get inspired by the stories and achievements of distinguished alumni."
            link="/alumni"
            linkText="Discover Leaders"
            imageSrc="https://picsum.photos/seed/notabledash/400/200"
            dataAiHint="award ceremony"
          />
          <DashboardFeatureCard
            icon={<CalendarDays className="w-10 h-10 text-accent" />}
            title="Events & Announcements"
            description="Stay informed about upcoming reunions, workshops, and other college events."
            link="/events"
            linkText="View All Events"
            imageSrc="https://picsum.photos/seed/eventsdash/400/200"
            dataAiHint="conference audience"
          />
           <DashboardFeatureCard
            icon={<Network className="w-10 h-10 text-accent" />}
            title="AI Recommendations"
            description="Get personalized recommendations for alumni connections based on your profile."
            link="/recommendations"
            linkText="Get Connections"
            imageSrc="https://picsum.photos/seed/airecdash/400/200"
            dataAiHint="network nodes"
          />
          <DashboardFeatureCard
            icon={<Gift className="w-10 h-10 text-accent" />}
            title="Exclusive Benefits"
            description="Explore special offers and resources available only to alumni members."
            link="/alumni-dashboard/benefits" // Placeholder link for a future benefits page
            linkText="View Benefits"
            imageSrc="https://picsum.photos/seed/benefitsdash/400/200"
            dataAiHint="gift box"
          />
        </div>
      </section>

      <section className="py-10 bg-secondary rounded-xl mt-12">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Stay Engaged</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Your connection with the alma mater continues here. Participate, network, and grow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <NextLink href="/events">Upcoming Events</NextLink>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <NextLink href="/alumni">Alumni Directory</NextLink>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}

