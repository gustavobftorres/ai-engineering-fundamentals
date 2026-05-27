import { Index } from "@upstash/vector";

export interface VectorEnv {
  UPSTASH_VECTOR_REST_URL: string;
  UPSTASH_VECTOR_REST_TOKEN?: string;
}

export const getIndex = (env: VectorEnv) => {
  return new Index({
    url: env.UPSTASH_VECTOR_REST_URL,
    token: env.UPSTASH_VECTOR_REST_TOKEN,
  });
};

