
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';
import { ArrowLeft, Tag, Library, Briefcase, Users } from 'lucide-react';

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  detailsLink?: string;
}

function BenefitItem({ icon, title, description, detailsLink }: BenefitItemProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        {icon}
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {detailsLink && (
          <Button variant="link" asChild className="p-0 h-auto mt-2 text-accent">
            <NextLink href={detailsLink}>Learn More</NextLink>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function AlumniBenefitsPage() {
  return (
    <div className="space-y-8">
      <Button variant="outline" asChild className="mb-6">
        <NextLink href="/alumni-dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </NextLink>
      </Button>

      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Alumni Benefits</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          As a valued member of our alumni community, you have access to a range of exclusive benefits and resources.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BenefitItem
          icon={<Tag className="w-8 h-8 text-accent" />}
          title="Career Services"
          description="Access to career counseling, resume workshops, and job boards tailored for alumni."
        />
        <BenefitItem
          icon={<Library className="w-8 h-8 text-accent" />}
          title="Library Access"
          description="Continued access to university library resources, both online and in-person (subject to policy)."
        />
        <BenefitItem
          icon={<Briefcase className="w-8 h-8 text-accent" />}
          title="Networking Events"
          description="Exclusive invitations to alumni networking events, industry meetups, and professional development seminars."
        />
        <BenefitItem
          icon={<Users className="w-8 h-8 text-accent" />}
          title="Alumni Directory"
          description="Full access to the alumni directory to connect with peers across industries and regions."
        />
        <BenefitItem
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>}
          title="Campus Facility Discounts"
          description="Discounts on campus facilities such as gym memberships, event space rentals, and bookstore purchases."
        />
         <BenefitItem
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="m12 14 4-4"/><path d="M16 10h-4v4"/><path d="M14.29.71a2.41 2.41 0 0 0-1.02.68l-11 11a2.41 2.41 0 0 0 0 3.41l2.59 2.59a2.41 2.41 0 0 0 3.41 0l11-11a2.41 2.41 0 0 0 .68-1.02V3A2.33 2.33 0 0 0 17.67.71Z"/></svg>}
          title="Continuing Education Discounts"
          description="Reduced tuition fees for select continuing education courses and certificate programs."
        />
      </section>

      <Card className="mt-10 bg-secondary">
        <CardHeader>
          <CardTitle className="text-xl">More Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is a placeholder page for alumni benefits. In a real application, this section would detail specific discounts, services, and opportunities available to registered alumni.
            Contact the Alumni Office for the most up-to-date information on available benefits.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
