// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Implements the SimulateInterview flow for conducting AI-driven mock interviews with customized questions and feedback.
 *
 * - simulateInterview - An async function that simulates an interview and returns AI feedback.
 * - SimulateInterviewInput - The input type for the simulateInterview function.
 * - SimulateInterviewOutput - The return type for the simulateInterview function, including the AI feedback.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateInterviewInputSchema = z.object({
  role: z.string().describe('The job role for the interview simulation.'),
  userSkills: z.array(z.string()).describe('The skills of the user applying for the job.'),
  additionalInstructions: z.string().optional().describe('Any additional instructions for the AI interview simulation.'),
});
export type SimulateInterviewInput = z.infer<typeof SimulateInterviewInputSchema>;

const SimulateInterviewOutputSchema = z.object({
  interviewTranscript: z.string().describe('A transcript of the interview, including questions and answers.'),
  feedback: z.string().describe('AI-generated feedback on the user performance during the interview.'),
});
export type SimulateInterviewOutput = z.infer<typeof SimulateInterviewOutputSchema>;

export async function simulateInterview(input: SimulateInterviewInput): Promise<SimulateInterviewOutput> {
  return simulateInterviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateInterviewPrompt',
  input: {schema: SimulateInterviewInputSchema},
  output: {schema: SimulateInterviewOutputSchema},
  prompt: `You are an AI interview simulator. Simulate an interview for the role of {{role}}. The user has the following skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}\n{{/each}}{{else}}No skills listed{{/if}}.  Provide targeted advice to the user, make the simulation useful.

{{#if additionalInstructions}}Additional instructions: {{{additionalInstructions}}}.{{/if}}

Conduct the interview, ask relevant questions, and then provide feedback on the user's performance. The interview transcript and feedback should be well formatted and readable.

Output the interviewTranscript and feedback as JSON.
`,
});

const simulateInterviewFlow = ai.defineFlow(
  {
    name: 'simulateInterviewFlow',
    inputSchema: SimulateInterviewInputSchema,
    outputSchema: SimulateInterviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
