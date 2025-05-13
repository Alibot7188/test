
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Zap, Search, Link, Handshake, Building, Briefcase } from "lucide-react";
import NextLink from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-r from-primary/10 via-card to-accent/10 shadow-xl rounded-xl">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
          NexusConnect
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          The bridge for Alumni and students to reconnect, engage, and grow with their
          alma mater and fellow community members.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow transform hover:scale-105">
            <NextLink href="/alumni">Explore Alumni Network</NextLink>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-md hover:shadow-lg transition-shadow transform hover:scale-105 border-accent text-accent hover:bg-accent/10">
            <NextLink href="/events">Upcoming Events</NextLink>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-semibold text-center mb-12 text-primary">
          Discover What NexusConnect Offers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="w-12 h-12 text-accent" />}
            title="Alumni Profiles"
            description="Register, update your profile, and share your journey. Stay connected with ease."
            link="/profile"
            linkText="Manage Your Profile"
            imageSrc="https://picsum.photos/seed/profiles/400/250"
            dataAiHint="professional networking"
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-accent" />}
            title="Notable Alumni"
            description="Get inspired by the achievements of distinguished alumni from our community."
            link="/alumni"
            linkText="See Notable Alumni"
            imageSrc="https://picsum.photos/seed/notable/400/250"
            dataAiHint="awards podium"
          />
          <FeatureCard
            icon={<Calendar className="w-12 h-12 text-accent" />}
            title="Event Announcements"
            description="Stay informed about upcoming college events, reunions, and networking opportunities."
            link="/events"
            linkText="Browse Events"
            imageSrc="https://picsum.photos/seed/events/400/250"
            dataAiHint="event calendar"
          />
          <FeatureCard
            icon={<Search className="w-12 h-12 text-accent" />}
            title="Alumni Search"
            description="Find and connect with alumni in specific industries or roles for mentorship and collaboration."
            link="/alumni#search"
            linkText="Search Alumni"
            imageSrc="https://picsum.photos/seed/search/400/250"
            dataAiHint="data analysis"
          />
          <FeatureCard
            icon={<Handshake className="w-12 h-12 text-accent" />}
            title="Intelligent Recommendations"
            description="Discover relevant alumni connections tailored to your interests and career goals, powered by AI."
            link="/recommendations"
            linkText="Get Recommendations"
            imageSrc="https://picsum.photos/seed/recommend/400/250"
            dataAiHint="ai connections"
          />
          <FeatureCard
            icon={<Building className="w-12 h-12 text-accent" />}
            title="Campus Resources"
            description="Access exclusive alumni benefits, career services, and lifelong learning opportunities."
            link="/alumni-dashboard/benefits"
            linkText="Explore Benefits"
            imageSrc="https://picsum.photos/seed/resources/400/250"
            dataAiHint="university campus"
          />
        </div>
      </section>
      
      <section className="py-16 bg-secondary rounded-xl shadow-inner">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-semibold mb-6 text-primary">Join Our Thriving Community</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                NexusConnect is more than a platform; it's a bridge to opportunities, mentorship, and lifelong friendships. Rekindle connections and build new ones.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-shadow transform hover:scale-105">
                <NextLink href="/profile">Register or Update Profile</NextLink>
            </Button>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-4xl font-semibold text-center mb-12 text-primary">Featured Success Story</h2>
        <Card className="md:flex items-center bg-card shadow-xl rounded-xl overflow-hidden">
          <div className="md:w-1/3">
            <Image 
              src="https://picsum.photos/seed/success/600/400" 
              alt="Featured Alumnus" 
              width={600} 
              height={400} 
              className="object-cover h-full w-full"
              data-ai-hint="successful person"
            />
          </div>
          <div className="md:w-2/3 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-accent mb-3">Dr. Eleanor Vance - Innovator in Biotech</h3>
            <p className="text-muted-foreground mb-4">Class of '05, PhD in Molecular Biology</p>
            <p className="text-lg leading-relaxed mb-6">
              "NexusConnect was instrumental in helping me find my co-founder for 'BioFuture Labs'. The connections I made through the platform provided invaluable mentorship and early-stage support. It's a testament to the power of our alumni network."
            </p>
            <Button variant="link" asChild className="text-primary hover:text-primary/80 p-0">
              <NextLink href="/alumni/notable/dr-eleanor-vance">Read More About Dr. Vance</NextLink>
            </Button>
          </div>
        </Card>
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
  imageSrc?: string;
  dataAiHint?: string;
}

function FeatureCard({ icon, title, description, link, linkText, imageSrc, dataAiHint }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-xl overflow-hidden flex flex-col">
      {imageSrc && (
        <div className="relative h-56 w-full">
          <Image 
            src={imageSrc} 
            alt={title} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={dataAiHint || "feature image"}
          />
        </div>
      )}
      <CardHeader className="items-center pt-6">
        {icon}
        <CardTitle className="mt-4 text-2xl font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center flex-grow px-6 pb-6">
        <CardDescription className="text-base text-muted-foreground mb-4 leading-relaxed">{description}</CardDescription>
        <Button variant="outline" asChild className="text-accent border-accent hover:bg-accent/10 hover:text-accent mt-auto">
          <NextLink href={link}>{linkText}</NextLink>
        </Button>
      </CardContent>
    </Card>
  );
}
