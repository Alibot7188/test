
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

const ALL_INDUSTRIES_VALUE = "__ALL_INDUSTRIES__";
const ALL_MAJORS_VALUE = "__ALL_MAJORS__";

export default function AlumniSearch({ allAlumni }: AlumniSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState(ALL_INDUSTRIES_VALUE);
  const [majorFilter, setMajorFilter] = useState(ALL_MAJORS_VALUE);
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>(allAlumni);

  const industries = useMemo(() => {
    const uniqueIndustries = new Set(allAlumni.map(a => a.industry).filter(Boolean));
    return Array.from(uniqueIndustries).sort() as string[];
  }, [allAlumni]);

  const majors = useMemo(() => {
    const uniqueMajors = new Set(allAlumni.map(a => a.major).filter(Boolean));
    return Array.from(uniqueMajors).sort() as string[];
  }, [allAlumni]);

  useEffect(() => {
    let result = allAlumni;

    if (searchTerm) {
      result = result.filter(alumni =>
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alumni.major && alumni.major.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (alumni.bio && alumni.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (industryFilter !== ALL_INDUSTRIES_VALUE) {
      result = result.filter(alumni => alumni.industry === industryFilter);
    }

    if (majorFilter !== ALL_MAJORS_VALUE) {
      result = result.filter(alumni => alumni.major === majorFilter);
    }
    
    if (jobTitleFilter) {
       result = result.filter(alumni => 
        alumni.jobTitle && alumni.jobTitle.toLowerCase().includes(jobTitleFilter.toLowerCase())
      );
    }

    setFilteredAlumni(result);
  }, [searchTerm, industryFilter, majorFilter, jobTitleFilter, allAlumni]);

  const resetFilters = () => {
    setSearchTerm('');
    setIndustryFilter(ALL_INDUSTRIES_VALUE);
    setMajorFilter(ALL_MAJORS_VALUE);
    setJobTitleFilter('');
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="search-term" className="block text-sm font-medium text-muted-foreground mb-1">
              Search Name, Major, Bio
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search-term"
                type="text"
                placeholder="e.g., John Doe, Engineering..."
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
                <SelectItem value={ALL_INDUSTRIES_VALUE}>All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry || 'unknown-industry'}> {/* Ensure value is not empty */}
                    {industry || "N/A"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="major-filter" className="block text-sm font-medium text-muted-foreground mb-1">
              Filter by Major/Branch
            </label>
            <Select value={majorFilter} onValueChange={setMajorFilter}>
              <SelectTrigger id="major-filter">
                <SelectValue placeholder="All Majors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_MAJORS_VALUE}>All Majors</SelectItem>
                {majors.map(major => (
                  <SelectItem key={major} value={major || 'unknown-major'}> {/* Ensure value is not empty */}
                    {major || "N/A"}
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

