import RecommendationEngine from '@/components/RecommendationEngine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RecommendationsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-primary">Intelligent Connection Recommendations</CardTitle>
          <CardDescription>
            Enter a student&apos;s profile, interests, and career goals to get AI-powered suggestions for relevant alumni to connect with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecommendationEngine />
        </CardContent>
      </Card>
    </div>
  );
}
