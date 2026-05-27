import { readdir, readFile } from "node:fs/promises";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { getIndex } from "./vector-store";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CORPUS_DIR = join(__dirname, "..", "..", "data", "corpus");

async function main() {
  const index = getIndex({
    UPSTASH_VECTOR_REST_URL: process.env.UPSTASH_VECTOR_REST_URL!,
    UPSTASH_VECTOR_REST_TOKEN: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  console.log("Resetting index...");
  await index.reset();

  const entries = await readdir(CORPUS_DIR);
  const files = entries.filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} files to embed, corpus file ${CORPUS_DIR}.`);

  let ok = 0;
  let failed = 0;

  for (const file of files) {
    try {
      
    } catch (error) {
      failed++;
    }
  }
}