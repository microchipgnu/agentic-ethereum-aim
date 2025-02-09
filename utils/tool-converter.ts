import { tool } from 'ai';
import { StructuredTool } from 'langchain/tools';
import { z } from 'zod';

/**
 * Converts a LangChain tool to Vercel AI SDK format
 * @param langchainTool The LangChain tool to convert
 * @param parameters Optional Zod schema for parameters
 * @returns Vercel AI SDK compatible tool
 */
export function convertLangChainTool(
  langchainTool: StructuredTool
) {
  // Use the schema from the LangChain tool if available
  const schema = langchainTool.schema;

  return tool({
    description: langchainTool.description,
    parameters: schema || z.object({
      input: z.string().describe(langchainTool.description)
    }),
    execute: async (args) => {
      console.log(langchainTool.name, args);
      // Pass the full args object to match the tool's schema
      const result = await langchainTool.invoke(args);
      console.log(result);
      return { result };
    }
  })
}