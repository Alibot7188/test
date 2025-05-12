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
import type { Alumni } from "@/types"; // Use type import

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  graduationYear: z.coerce.number().min(1900, "Invalid year.").max(new Date().getFullYear() + 10, "Invalid year."), // Allow a bit more into future for planning
  major: z.string().min(2, "Major is required."),
  currentCompany: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  interests: z.string().optional().describe("Comma-separated interests"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(),
  imageUrl: z.preprocess(
    (val) => (val === "" ? undefined : val), // Treat empty string as undefined
    z.string().url("Invalid URL for profile picture. Please enter a valid web address (e.g., https://example.com/image.png) or leave blank.").optional()
  ),
  linkedinUrl: z.preprocess(
    (val) => (val === "" ? undefined : val), // Treat empty string as undefined
    z.string().url("Invalid LinkedIn URL. Please enter a valid web address (e.g., https://linkedin.com/in/yourprofile) or leave blank.").optional()
  ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can be fetched from a database in a real application
// For now, ensure optional fields are truly undefined or empty strings if that's how the form initializes them.
const defaultValues: ProfileFormValues = {
  name: "",
  email: "",
  graduationYear: new Date().getFullYear(),
  major: "",
  currentCompany: "",
  jobTitle: "",
  industry: "",
  interests: "",
  bio: "",
  imageUrl: undefined, // Explicitly undefined for optional URL
  linkedinUrl: undefined, // Explicitly undefined for optional URL
};

export default function ProfileForm() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange", // Validate on change to give immediate feedback
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, you would send this data to your backend
    console.log("Form data submitted:", data);
    
    // Process data before "saving"
    const alumniData: Alumni = {
        id: `alumni_${Date.now()}`, // Example: generate a unique ID, or get from auth/DB
        ...data,
        // Ensure optional fields that should be undefined if empty are handled
        imageUrl: data.imageUrl || undefined,
        linkedinUrl: data.linkedinUrl || undefined,
        currentCompany: data.currentCompany || undefined,
        jobTitle: data.jobTitle || undefined,
        industry: data.industry || undefined,
        bio: data.bio || undefined,
        interests: data.interests?.split(',').map(interest => interest.trim()).filter(interest => interest !== '') || undefined,
    };
    console.log("Processed alumni data for saving:", alumniData);

    toast({
      title: "Profile Updated",
      description: "Your alumni profile has been successfully updated.",
      variant: "default", // Explicitly set variant if needed, default is usually fine
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
                  <Input type="number" placeholder={`e.g., ${new Date().getFullYear()}`} {...field} />
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
                <FormLabel>Current Company <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Tech Solutions Inc." {...field} value={field.value ?? ""} />
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
                <FormLabel>Job Title <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Software Engineer" {...field} value={field.value ?? ""} />
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
              <FormLabel>Industry <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
              <FormControl>
                <Input placeholder="e.g., Technology, Healthcare, Finance" {...field} value={field.value ?? ""} />
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
              <FormLabel>Interests <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI, Hiking, Photography (comma-separated)" {...field} value={field.value ?? ""} />
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
              <FormLabel>Short Bio <span className="text-muted-foreground text-xs">(Optional, max 500 characters)</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself and your achievements."
                  className="resize-y min-h-[100px]"
                  {...field}
                  value={field.value ?? ""}
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
              <FormLabel>Profile Picture URL <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/your-image.jpg" {...field} value={field.value ?? ""} />
              </FormControl>
               <FormDescription>
                A direct link to your profile picture (e.g., from LinkedIn or a cloud storage).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile URL <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://linkedin.com/in/yourprofile" {...field} value={field.value ?? ""} />
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
