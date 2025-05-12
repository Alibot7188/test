"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alumni } from "@/types"; // Assuming Alumni type is defined

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  graduationYear: z.coerce.number().min(1900, "Invalid year.").max(new Date().getFullYear() + 5, "Invalid year."),
  major: z.string().min(2, "Major is required."),
  currentCompany: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  interests: z.string().optional().describe("Comma-separated interests"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(),
  imageUrl: z.string().url("Invalid URL for profile picture.").optional(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL.").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can be fetched from a database in a real application
const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  email: "",
  graduationYear: new Date().getFullYear(),
  major: "",
  currentCompany: "",
  jobTitle: "",
  industry: "",
  interests: "",
  bio: "",
  imageUrl: "",
  linkedinUrl: "",
};

export default function ProfileForm() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, you would send this data to your backend
    console.log(data);
    const alumniData: Alumni = {
        id: 'temp-id', // generate or fetch actual ID
        ...data,
        interests: data.interests?.split(',').map(interest => interest.trim()).filter(interest => interest !== ''),
    };
    console.log("Processed alumni data:", alumniData);

    toast({
      title: "Profile Updated",
      description: "Your alumni profile has been successfully updated.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="e.g., jane.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="graduationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Graduation Year</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2015" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <FormField
            control={form.control}
            name="currentCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Company (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Tech Solutions Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
       
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Technology, Healthcare, Finance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI, Hiking, Photography (comma-separated)" {...field} />
              </FormControl>
              <FormDescription>
                Share some of your professional or personal interests.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself and your achievements."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture URL (Optional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/your-image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile URL (Optional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://linkedin.com/in/yourprofile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">Update Profile</Button>
      </form>
    </Form>
  );
}
