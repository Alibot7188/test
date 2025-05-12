// 'use server';

/**
 * @fileOverview Provides intelligent alumni connection recommendations based on student profiles.
 *
 * - getAlumniRecommendations - A function that returns alumni connection recommendations for a student.
 * - AlumniRecommendationsInput - The input type for the getAlumniRecommendations function.
 * - AlumniRecommendationsOutput - The return type for the getAlumniRecommendations function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlumniRecommendationsInputSchema = z.object({
  studentProfile: z
    .string()
    .describe('The profile of the student, including interests and career goals.'),
});
export type AlumniRecommendationsInput = z.infer<typeof AlumniRecommendationsInputSchema>;

const AlumniRecommendationsOutputSchema = z.object({
  alumniRecommendations: z
    .array(z.string())
    .describe('A list of recommended alumni to connect with.'),
});
export type AlumniRecommendationsOutput = z.infer<typeof AlumniRecommendationsOutputSchema>;

export async function getAlumniRecommendations(
  input: AlumniRecommendationsInput
): Promise<AlumniRecommendationsOutput> {
  return alumniConnectionRecommendationsFlow(input);
}

const alumniRecommendationPrompt = ai.definePrompt({
  name: 'alumniRecommendationPrompt',
  input: {schema: AlumniRecommendationsInputSchema},
  output: {schema: AlumniRecommendationsOutputSchema},
  prompt: `Based on the following student profile, recommend a list of alumni to connect with:

Student Profile: {{{studentProfile}}}

Return a list of alumni who would be good connections for the student, considering their interests and career goals.`,
});

const alumniConnectionRecommendationsFlow = ai.defineFlow(
  {
    name: 'alumniConnectionRecommendationsFlow',
    inputSchema: AlumniRecommendationsInputSchema,
    outputSchema: AlumniRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await alumniRecommendationPrompt(input);
    return output!;
  }
);
