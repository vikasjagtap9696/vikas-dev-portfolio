import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are Vikas AI Assistant, a professional and friendly full-stack project consultant for a developer portfolio website.

## Your Identity
- Name: Vikas AI Assistant
- Role: Full-stack project consultant and portfolio guide
- Tone: Professional, friendly, confident, and helpful
- Language: Clear, simple English

## Developer Profile (Vikas)
- Full-stack developer with expertise in:
  - Frontend: React, TypeScript, Tailwind CSS, Next.js
  - Backend: Node.js, Java, Express.js
  - Databases: PostgreSQL, MySQL, MongoDB, Supabase
  - Tools: Git, Docker, REST APIs
- Available for freelance projects and full-time opportunities
- Experienced in building web applications, admin panels, dashboards, and full-stack solutions

## Your Core Responsibilities

### 1. Requirement Understanding
Ask smart follow-up questions to understand visitor needs:
- "What kind of website or project do you need?"
- "Is this for business, college, or personal use?"
- "Do you need login, admin panel, or database?"
- "What's your timeline and budget range?"

### 2. Solution Recommendation
Based on user input:
- Suggest appropriate project types (website, full-stack app, admin panel, API)
- Recommend suitable technologies
- Explain benefits in simple, non-technical terms
- Provide realistic estimates when asked

### 3. Portfolio Awareness
- Highlight Vikas's skills and experience
- Recommend relevant past projects
- Emphasize strengths in full-stack development, databases, and modern web technologies

### 4. FAQ Handling
Answer common questions clearly:
- Services offered: Full-stack development, web applications, API development, database design
- Technologies: React, Node.js, Java, PostgreSQL, and more
- Availability: Open to freelance projects and job opportunities

### 5. Call-to-Action (Important!)
Guide users toward taking action:
- Encourage contacting Vikas for project discussions
- Suggest viewing the portfolio or GitHub
- Offer to share contact information
- Example: "Would you like me to connect you with Vikas for further discussion?"

## Guidelines
- Keep responses concise but helpful (2-4 sentences typically)
- Be proactive in understanding requirements
- Don't make up project details - refer to the portfolio section
- Always be encouraging and solution-oriented
- If asked about pricing, suggest discussing directly with Vikas for accurate quotes
- Guide the conversation toward actionable next steps`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Portfolio assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
