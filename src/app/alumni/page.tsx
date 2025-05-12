import AlumniCard from '@/components/AlumniCard';
import AlumniSearch from '@/components/AlumniSearch';
import { Alumni } from '@/types';
import { Separator } from '@/components/ui/separator';

// Mock data - in a real app, this would come from a database
const mockAlumni: Alumni[] = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    imageUrl: 'https://picsum.photos/seed/evelyn/300/200',
    graduationYear: 1995,
    major: 'Astrophysics',
    currentCompany: 'NASA',
    jobTitle: 'Lead Scientist',
    industry: 'Aerospace',
    bio: 'Pioneering research in dark matter and intergalactic travel. Awarded the Presidential Medal of Science.',
    isNotable: true,
    achievements: ['Discovered new exoplanet', 'Published groundbreaking paper on galaxy formation', 'Lead successful Mars rover mission'],
    linkedinUrl: 'https://linkedin.com/in/evelynreed'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    imageUrl: 'https://picsum.photos/seed/marcus/300/200',
    graduationYear: 2010,
    major: 'Computer Science',
    currentCompany: 'Innovatech Solutions',
    jobTitle: 'CEO & Founder',
    industry: 'Technology',
    bio: 'Founder of a unicorn startup revolutionizing AI in healthcare. Forbes 30 Under 30.',
    isNotable: true,
    achievements: ['Secured $100M Series C funding', 'Developed patented AI diagnostic tool', 'Named "Innovator of the Year"'],
    linkedinUrl: 'https://linkedin.com/in/marcuschen'
  },
  {
    id: '3',
    name: 'Aisha Khan',
    graduationYear: 2005,
    major: 'International Relations',
    currentCompany: 'United Nations',
    jobTitle: 'Diplomat',
    industry: 'Government',
    bio: 'Dedicated to promoting global peace and human rights. Instrumental in several international treaties.',
    isNotable: true,
    achievements: ['Negotiated key peace accord', 'Championed global education initiatives'],
    linkedinUrl: 'https://linkedin.com/in/aishakhan'
  },
  {
    id: '4',
    name: 'John B. Goodenough',
    graduationYear: 1952,
    major: 'Physics',
    jobTitle: 'Professor',
    currentCompany: 'University of Texas at Austin',
    industry: 'Academia',
    isNotable: true,
    achievements: ['Nobel Prize in Chemistry 2019 for lithium-ion batteries'],
    bio: 'An American materials scientist, a solid-state physicist, and a Nobel laureate in chemistry.',
    imageUrl: 'https://picsum.photos/seed/goodenough/300/200',
  },
  {
    id: '5',
    name: 'Sarah Miller',
    graduationYear: 2018,
    major: 'Marketing',
    currentCompany: 'Creative Co.',
    jobTitle: 'Marketing Manager',
    industry: 'Advertising',
    bio: 'Passionate about digital storytelling and brand strategy. Always looking for new challenges.',
    linkedinUrl: 'https://linkedin.com/in/sarahmiller'
  },
  {
    id: '6',
    name: 'David Lee',
    graduationYear: 2012,
    major: 'Finance',
    currentCompany: 'Global Bank',
    jobTitle: 'Investment Analyst',
    industry: 'Finance',
    bio: 'Expert in financial modeling and market analysis. Enjoys mentoring young professionals.',
    linkedinUrl: 'https://linkedin.com/in/davidlee'
  }
];

export default function AlumniPage() {
  const notableAlumni = mockAlumni.filter(alumni => alumni.isNotable);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Notable Alumni</h1>
        <p className="text-muted-foreground mb-8">
          Discover the inspiring stories and achievements of our distinguished alumni.
        </p>
        {notableAlumni.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notableAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
        ) : (
          <p>No notable alumni to display at this time.</p>
        )}
      </section>

      <Separator />

      <section id="search">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Find Alumni</h2>
        <p className="text-muted-foreground mb-8">
          Connect with alumni based on their industry, expertise, or current role.
        </p>
        <AlumniSearch allAlumni={mockAlumni} />
      </section>
    </div>
  );
}
