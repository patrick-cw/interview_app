import { genkitNext } from '@genkit-ai/next';
import { ai } from '@/ai/genkit';

// Import all flows to register them
import '@/ai/flows/generate-iq-test';
import '@/ai/flows/generate-psycho-test';
import '@/ai/flows/receive-targeted-feedback';
import '@/ai/flows/simulate-interview';

export const { GET, POST } = genkitNext(ai);

