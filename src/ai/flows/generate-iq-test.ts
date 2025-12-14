'use server';

/**
 * @fileOverview Flow to generate an IQ test with a specified difficulty level.
 *
 * - generateIQTest - A function that generates an IQ test.
 * - GenerateIQTestInput - The input type for the generateIQTest function.
 * - GenerateIQTestOutput - The return type for the generateIQTest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIQTestInputSchema = z.object({
  difficultyLevel: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty level of the IQ test.'),
  numberOfQuestions: z.number().describe('The number of questions in the IQ test.'),
});
export type GenerateIQTestInput = z.infer<typeof GenerateIQTestInputSchema>;

const GenerateIQTestOutputSchema = z.object({
  test: z.string().describe('The generated IQ test.'),
});
export type GenerateIQTestOutput = z.infer<typeof GenerateIQTestOutputSchema>;

export async function generateIQTest(input: GenerateIQTestInput): Promise<GenerateIQTestOutput> {
  return generateIQTestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIQTestPrompt',
  input: {schema: GenerateIQTestInputSchema},
  output: {schema: GenerateIQTestOutputSchema},
  prompt: `You are an expert in creating IQ tests. Generate an IQ test with the following specifications:

Difficulty Level: {{{difficultyLevel}}}
Number of Questions: {{{numberOfQuestions}}}

The test should consist of questions that assess logical reasoning, spatial reasoning, mathematical abilities, and verbal comprehension.
Format the output as a string.
`,
});

const generateIQTestFlow = ai.defineFlow(
  {
    name: 'generateIQTestFlow',
    inputSchema: GenerateIQTestInputSchema,
    outputSchema: GenerateIQTestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
