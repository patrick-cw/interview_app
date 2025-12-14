'use server';
/**
 * @fileOverview Flow to generate a psycho-test tailored to assess specific personality traits or skills.
 *
 * - generatePsychoTest - A function that generates a psycho-test.
 * - GeneratePsychoTestInput - The input type for the generatePsychoTest function.
 * - GeneratePsychoTestOutput - The return type for the generatePsychoTest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePsychoTestInputSchema = z.object({
  trait: z.string().describe('The personality trait or skill to assess.'),
  numQuestions: z.number().describe('The number of questions to generate.'),
});
export type GeneratePsychoTestInput = z.infer<typeof GeneratePsychoTestInputSchema>;

const GeneratePsychoTestOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of questions for the psycho-test.'),
});
export type GeneratePsychoTestOutput = z.infer<typeof GeneratePsychoTestOutputSchema>;

export async function generatePsychoTest(input: GeneratePsychoTestInput): Promise<GeneratePsychoTestOutput> {
  return generatePsychoTestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePsychoTestPrompt',
  input: {schema: GeneratePsychoTestInputSchema},
  output: {schema: GeneratePsychoTestOutputSchema},
  prompt: `You are an expert in creating psycho-tests to assess personality traits and skills.

  Generate {{numQuestions}} questions tailored to assess the following trait or skill: {{trait}}.
  The questions should be clear, concise, and easy to understand.
  Format the questions as a numbered list.

  Example:
  1. Question 1
  2. Question 2
  ...

  Output only the numbered list of questions.`,
});

const generatePsychoTestFlow = ai.defineFlow(
  {
    name: 'generatePsychoTestFlow',
    inputSchema: GeneratePsychoTestInputSchema,
    outputSchema: GeneratePsychoTestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Extract questions from the output
    const questions = output?.questions || [];
    return {questions: questions};
  }
);
