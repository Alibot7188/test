export interface Alumni {
  id: string;
  name: string;
  imageUrl?: string;
  graduationYear: number;
  major: string;
  currentCompany?: string;
  jobTitle?: string;
  industry?: string;
  interests?: string[];
  bio?: string;
  isNotable?: boolean;
  achievements?: string[];
  email?: string; // Added for profile form
  linkedinUrl?: string; // Added for profile form
}

export interface CollegeEvent {
  id: string;
  title: string;
  date: string; 
  description: string;
  location?: string;
  imageUrl?: string;
  organizer?: string;
}
