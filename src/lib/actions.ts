"use server";

import { getAlumniRecommendations, AlumniRecommendationsInput, AlumniRecommendationsOutput } from "@/ai/flows/alumni-connection-recommendations";

export async function fetchAlumniRecommendations(
  input: AlumniRecommendationsInput
): Promise<AlumniRecommendationsOutput | { error: string }> {
  try {
    // Validate input if necessary (Genkit flow already does this with Zod)
    if (!input.studentProfile || input.studentProfile.trim() === "") {
      return { error: "Student profile cannot be empty." };
    }

    const recommendations = await getAlumniRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error("Error fetching alumni recommendations:", error);
    // It's good practice to not expose raw error messages to the client
    return { error: "Failed to fetch recommendations. Please try again later." };
  }
}
