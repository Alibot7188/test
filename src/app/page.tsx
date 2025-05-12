import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Zap, Search, Link as LinkIcon } from "lucide-react";
import NextLink from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-card shadow-lg rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Welcome to NexusConnect
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your dedicated platform to reconnect, engage, and grow with your
          alma mater and fellow alumni.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <NextLink href="/alumni">Explore Alumni</NextLink>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <NextLink href="/events">View Events</NextLink>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-8">
          Discover What NexusConnect Offers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="w-10 h-10 text-accent" />}
            title="Alumni Profiles"
            description="Register, update your profile, and share your journey. Stay connected with ease."
            link="/profile"
            linkText="Manage Your Profile"
          />
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-accent" />}
            title="Notable Alumni"
            description="Get inspired by the achievements of distinguished alumni from our community."
            link="/alumni"
            linkText="See Notable Alumni"
          />
          <FeatureCard
            icon={<Calendar className="w-10 h-10 text-accent" />}
            title="Event Announcements"
            description="Stay informed about upcoming college events, reunions, and networking opportunities."
            link="/events"
            linkText="Browse Events"
          />
          <FeatureCard
            icon={<Search className="w-10 h-10 text-accent" />}
            title="Alumni Search"
            description="Find and connect with alumni in specific industries or roles for mentorship and collaboration."
            link="/alumni#search"
            linkText="Search Alumni"
          />
          <FeatureCard
            icon={<LinkIcon className="w-10 h-10 text-accent" />}
            title="Intelligent Recommendations"
            description="Discover relevant alumni connections tailored to your interests and career goals."
            link="/recommendations"
            linkText="Get Recommendations"
          />
        </div>
      </section>
      
      <section className="py-10 bg-secondary rounded-xl">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Join Our Thriving Community</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                NexusConnect is more than a platform; it's a bridge to opportunities, mentorship, and lifelong friendships.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <NextLink href="/profile">Register or Update Profile</NextLink>
            </Button>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center">
        {icon}
        <CardTitle className="mt-4 text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-base mb-4">{description}</CardDescription>
        <Button variant="link" asChild className="text-accent">
          <NextLink href={link}>{linkText}</NextLink>
        </Button>
      </CardContent>
    </Card>
  );
}
