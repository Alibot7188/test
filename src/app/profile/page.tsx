import ProfileForm from '@/components/ProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center sm:text-left">
          <CardTitle className="text-3xl text-primary">Alumni Profile</CardTitle>
          <CardDescription className="text-lg">
            Keep your information up-to-date to stay connected with the alumni network and discover new opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
