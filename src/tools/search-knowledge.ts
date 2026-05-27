import { tool } from "ai";
import { z } from "zod";
import { getIndex, type VectorEnv } from "../rag/vector-store";

export function makeSearchKnowledge(env: any) {
  return tool({
    schema: z.object({
      description: `Search the private knowledge base for reference material on systems, processes, and topics the user might ask you to draw. Use this BEFORE drawing when the request touches a specific technical system, protocol, organizational structure, or process where precise details matter. The corpus contains short reference docs the model may not have memorized accurately.

      inputSchema: z.object({
        query: z.string().describe("Natural language search query, describing what you need to know"),
      }),
      execute: async ({ query }: { query: string }) => {
        try {
          const index = await getIndex(env);
          const results = await index.query({
            data: query,
            topK: 3,
            includeMetadata: true,
          });

          return {
            results: results.map(r => ({
              source: r.metadata.source ?? r.id,
              content: r.metadata.content ?? "",
            }))
          }
          
        } catch (error) {
          return { error: error instanceof Error ? error.message : String(error) }
        }
      },
    });
}