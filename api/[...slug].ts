// Catch-all serverless route to forward all /api/* paths to the Express app
// This ensures routes like /api/proposal and /api/generate-pdf are handled by api/index.ts on Vercel.
import handler from './index';
export default handler;
