import { z } from "zod";
import { tool } from "ai";

// a scrapping tool would be better to handle a url information request
export function makeSearchWeb(apiKey: string) {
  return tool({
    description:
      "Search the web for information on a given topic. Use this when a user asks you about tech you don't know about or never heard of or if they give a url to reference.",
    inputSchema: z.object({
      query: z.string(),
      maxResults: z.number().nullable(),
    }),
    execute: async ({ query, maxResults }) => {
      if (!apiKey) return { error: "No API key provided" };

      try {
        const response = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            query,
            max_results: maxResults ?? 5,
            search_depth: "basic",
          }),
        });

        if (!response.ok)
          return {
            error: `Search came back with an error: ${await response.text()}`,
          };

        const data = (await response.json()) as any;
        const results = (data.results ?? []).map((r) => ({
          title: r.title ?? "",
          content: r.content ?? "",
          url: r.url ?? "",
        }));

        return { results };
      } catch (error) {
        return { error: "Search failed with some error" };
      }
    },
  });
}
