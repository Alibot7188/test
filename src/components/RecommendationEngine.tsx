"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchAlumniRecommendations } from "@/lib/actions";
import { Loader2, Sparkles, UserCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function RecommendationEngine() {
  const [studentProfile, setStudentProfile] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    const result = await fetchAlumniRecommendations({ studentProfile });

    if ("error" in result) {
      setError(result.error);
    } else if (result.alumniRecommendations) {
      setRecommendations(result.alumniRecommendations);
    } else {
      setError("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="studentProfile" className="block text-sm font-medium text-foreground mb-1">
            Student Profile
          </label>
          <Textarea
            id="studentProfile"
            value={studentProfile}
            onChange={(e) => setStudentProfile(e.target.value)}
            placeholder="Describe the student's interests, academic background, skills, and career aspirations..."
            className="min-h-[150px] resize-y"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            The more detailed the profile, the better the recommendations.
          </p>
        </div>
        <Button type="submit" disabled={isLoading || !studentProfile.trim()} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Get Recommendations
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <UserCheck className="h-6 w-6" /> Recommended Alumni Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 list-disc pl-5 text-foreground">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-base">
                  {rec}
                  {index < recommendations.length -1 && <Separator className="my-2"/>}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              These are AI-generated suggestions. We recommend further research before reaching out.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
