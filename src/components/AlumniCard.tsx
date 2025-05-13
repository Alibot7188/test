import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Alumni } from '@/types'; // Use type import
import { Briefcase, GraduationCap, Star, Link } from 'lucide-react';

interface AlumniCardProps {
  alumni: Alumni;
}

export default function AlumniCard({ alumni }: AlumniCardProps) {
  const placeholderImage = `https://picsum.photos/seed/${alumni.id}/300/200`;
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={alumni.imageUrl || placeholderImage}
          alt={alumni.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint="professional portrait"
        />
        {alumni.isNotable && (
          <Badge variant="destructive" className="absolute top-2 right-2 flex items-center gap-1">
            <Star className="w-3 h-3" /> Notable
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-primary">{alumni.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <GraduationCap className="w-4 h-4 text-muted-foreground" /> Class of {alumni.graduationYear} - {alumni.major}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        {alumni.jobTitle && alumni.currentCompany && (
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span>{alumni.jobTitle} at {alumni.currentCompany}</span>
          </div>
        )}
        {alumni.industry && (
          <Badge variant="secondary">{alumni.industry}</Badge>
        )}
        {alumni.bio && <p className="text-sm text-muted-foreground line-clamp-3">{alumni.bio}</p>}
        {alumni.isNotable && alumni.achievements && alumni.achievements.length > 0 && (
           <div>
             <h4 className="text-xs font-semibold mt-2 mb-1">Key Achievements:</h4>
             <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
               {alumni.achievements.slice(0, 2).map((ach, idx) => <li key={idx}>{ach}</li>)}
             </ul>
           </div>
        )}
      </CardContent>
      <CardFooter>
        {alumni.linkedinUrl && (
          <a
            href={alumni.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 flex items-center gap-1 text-sm"
          >
            <Link className="w-4 h-4" /> LinkedIn Profile
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
