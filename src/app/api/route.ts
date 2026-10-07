import { NextRequest } from "next/server";

const PASSWORD = process.env.GROQ_PROXY_PASS || "321";
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const MAX_RETRIES = 3;
const RETRY_DELAYS = [400, 1000, 2000]; // ms

async function queryGroq(prompt: string): Promise<Response> {
  if (!GROQ_API_KEY) {
    return new Response(
      "Server error: GROQ_API_KEY environment variable is not configured in Vercel settings.\n",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  let lastError: string = "Unknown error";
  let lastStatus: number = 500;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const groqResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
              {
                role: "system",
                content:
                  "You are an ultra-fast, concise coding assistant designed for terminal CLI output. Provide direct, clean code and succinct explanations suitable for display in a Linux/Unix terminal.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.5,
          }),
          signal: AbortSignal.timeout(15000),
        }
      );

      if (groqResponse.ok) {
        const data = await groqResponse.json();
        const answer = data.choices?.[0]?.message?.content || "No response received.";

        return new Response(answer + "\n", {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        });
      }

      const errorText = await groqResponse.text();
      lastStatus = groqResponse.status;
      lastError = `Groq API Error (${groqResponse.status}): ${errorText}`;

      // Retry on 429 (Rate Limit) or 503 (Overloaded) with exponential backoff
      if ((groqResponse.status === 429 || groqResponse.status >= 500) && attempt < MAX_RETRIES) {
        const delay = RETRY_DELAYS[attempt] + Math.floor(Math.random() * 200); // with jitter
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      break;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      lastError = `Server Error: ${message}`;
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS[attempt]));
        continue;
      }
      break;
    }
  }

  return new Response(`${lastError}\n`, {
    status: lastStatus,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const trimmed = rawBody.trim();

  if (!trimmed) {
    return new Response(
      'Usage: curl https://gallilmedia.com/api -d "321: your prompt"\n',
      {
        status: 400,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  }

  // Find the first colon separating password from prompt
  const colonIndex = trimmed.indexOf(":");
  if (colonIndex === -1) {
    return new Response(
      'Format error: Missing colon separator.\nUsage: curl https://gallilmedia.com/api -d "321: your prompt"\n',
      {
        status: 400,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  }

  const pass = trimmed.slice(0, colonIndex).trim();
  const prompt = trimmed.slice(colonIndex + 1).trim();

  if (pass !== PASSWORD) {
    return new Response("Unauthorized: Invalid password.\n", {
      status: 401,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  if (!prompt) {
    return new Response("Prompt cannot be empty.\n", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return queryGroq(prompt);
}

export async function GET(req: NextRequest) {
  // Check if query string is provided: e.g. /api?321:prompt
  const { search } = new URL(req.url);
  const rawQuery = search.startsWith("?") ? decodeURIComponent(search.slice(1)) : "";

  if (rawQuery) {
    const colonIndex = rawQuery.indexOf(":");
    if (colonIndex !== -1) {
      const pass = rawQuery.slice(0, colonIndex).trim();
      const prompt = rawQuery.slice(colonIndex + 1).trim();

      if (pass === PASSWORD && prompt) {
        return queryGroq(prompt);
      }
    }
  }

  return new Response(
    'Gallil Media AI Terminal Proxy\n\n' +
    'Usage:\n' +
    '  curl -sL https://gallilmedia.com/api -d "pass: your prompt"\n' +
    ' hi"\n\n' +
    'One-line alias setup for fresh machines:\n' +
    '  echo \'g() { curl -sL https://gallilmedia.com/api -d "pass: $*"; }\' >> ~/.bashrc && source ~/.bashrc\n\n' +
    'Then simply run:\n' +
    '  g your prompt here\n',
    {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    }
  );
}
