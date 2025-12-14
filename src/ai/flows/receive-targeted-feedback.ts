'use server';

/**
 * @fileOverview Provides targeted feedback on a user's interview performance.
 *
 * - receiveTargetedFeedback - A function that processes interview data and returns feedback.
 * - TargetedFeedbackInput - The input type for the receiveTargetedFeedback function.
 * - TargetedFeedbackOutput - The return type for the receiveTargetedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TargetedFeedbackInputSchema = z.object({
  interviewTranscript: z
    .string()
    .describe('The full transcript of the interview, including questions and answers.'),
  userBodyLanguageDescription: z
    .string()
    .describe('A description of the user’s body language during the interview.'),
  overallPerformanceComment: z
    .string()
    .describe('An overall comment on the user’s interview performance.'),
});
export type TargetedFeedbackInput = z.infer<typeof TargetedFeedbackInputSchema>;

const TargetedFeedbackOutputSchema = z.object({
  strengths: z.array(z.string()).describe('Specific strengths demonstrated during the interview.'),
  weaknesses: z.array(z.string()).describe('Specific weaknesses to improve upon.'),
  bodyLanguageFeedback: z.string().describe('Feedback on the user’s body language.'),
  overallFeedback: z.string().describe('Overall feedback and suggestions for improvement.'),
});
export type TargetedFeedbackOutput = z.infer<typeof TargetedFeedbackOutputSchema>;

export async function receiveTargetedFeedback(
  input: TargetedFeedbackInput
): Promise<TargetedFeedbackOutput> {
  return receiveTargetedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'targetedFeedbackPrompt',
  input: {schema: TargetedFeedbackInputSchema},
  output: {schema: TargetedFeedbackOutputSchema},
  prompt: `You are an expert interview coach providing targeted feedback to interview candidates.

  Based on the interview transcript, body language description, and overall performance comment, provide specific and actionable feedback.

  Interview Transcript:
  {{interviewTranscript}}

  Body Language Description:
  {{userBodyLanguageDescription}}

  Overall Performance Comment:
  {{overallPerformanceComment}}

  Provide feedback in the following format:

  Strengths: [list of strengths]
  Weaknesses: [list of weaknesses]
  Body Language Feedback: [feedback on body language]
  Overall Feedback: [overall feedback and suggestions]`,
});

const receiveTargetedFeedbackFlow = ai.defineFlow(
  {
    name: 'receiveTargetedFeedbackFlow',
    inputSchema: TargetedFeedbackInputSchema,
    outputSchema: TargetedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
