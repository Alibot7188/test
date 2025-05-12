"use client";

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import AlumniCard from '@/components/AlumniCard';
import { Alumni } from '@/types';
import { Search, X } from 'lucide-react';

interface AlumniSearchProps {
  allAlumni: Alumni[];
}

export default function AlumniSearch({ allAlumni }: AlumniSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>(allAlumni);

  const industries = useMemo(() => {
    const uniqueIndustries = new Set(allAlumni.map(a => a.industry).filter(Boolean));
    return Array.from(uniqueIndustries) as string[];
  }, [allAlumni]);

  useEffect(() => {
    let result = allAlumni;

    if (searchTerm) {
      result = result.filter(alumni =>
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alumni.bio && alumni.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (industryFilter) {
      result = result.filter(alumni => alumni.industry === industryFilter);
    }
    
    if (jobTitleFilter) {
       result = result.filter(alumni => 
        alumni.jobTitle && alumni.jobTitle.toLowerCase().includes(jobTitleFilter.toLowerCase())
      );
    }

    setFilteredAlumni(result);
  }, [searchTerm, industryFilter, jobTitleFilter, allAlumni]);

  const resetFilters = () => {
    setSearchTerm('');
    setIndustryFilter('');
    setJobTitleFilter('');
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg shadow space-y-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="search-term" className="block text-sm font-medium text-muted-foreground mb-1">
              Search by Name, Major, or Bio
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search-term"
                type="text"
                placeholder="e.g., John Doe, Engineering, AI expert..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label htmlFor="industry-filter" className="block text-sm font-medium text-muted-foreground mb-1">
              Filter by Industry
            </label>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger id="industry-filter">
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div>
            <label htmlFor="jobtitle-filter" className="block text-sm font-medium text-muted-foreground mb-1">
              Filter by Job Title
            </label>
             <Input
                id="jobtitle-filter"
                type="text"
                placeholder="e.g., Manager, Engineer..."
                value={jobTitleFilter}
                onChange={(e) => setJobTitleFilter(e.target.value)}
              />
          </div>
        </div>
        <Button onClick={resetFilters} variant="outline" className="mt-4">
          <X className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </div>

      {filteredAlumni.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumni) => (
            <AlumniCard key={alumni.id} alumni={alumni} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">
          No alumni match your current search criteria. Try adjusting your filters.
        </p>
      )}
    </div>
  );
}
