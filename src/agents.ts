import { AIChatAgent } from "@cloudflare/ai-chat";
import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { createOpenAI } from '@ai-sdk/openai';
import { tools } from "./tools";

interface ENV {
    OPENAI_API_KEY: string;
}

const SYSTEM_PROMPT = 'You are a diagram design assistant. You help users create and modify diagrams on an Excalidraw canvas. When the user asks you to create a diagram, use the generateDiagram tool to produce Excalidraw elements.'
