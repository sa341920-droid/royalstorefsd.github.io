/**
 * Royal Mobile & Printing Store - Cloudflare Worker API starter
 * Configure D1 binding as DB and secrets for providers before production use.
 * Never put API keys in public files or commit them to GitHub.
 */
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization"
};
const json = (data, status=200) => new Response(JSON.stringify(data), {
  status, headers: {...cors, "Content-Type":"application/json"}
});
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null,{headers:cors});
    const url = new URL(request.url);
    if (url.pathname === "/api/health") return json({ok:true,app:"Royal Mobile & Printing Store API"});
    if (url.pathname === "/api/ai" && request.method === "POST") {
      const body = await request.json().catch(()=>({}));
      const provider = String(body.provider || "workers-ai").toLowerCase();
      const message = String(body.message || "").slice(0,12000);
      if (!message) return json({error:"Message required"},400);
      try {
        if (provider === "workers-ai") {
          if (!env.AI) return json({error:"Bind Workers AI as AI in Worker settings."},503);
          const model = body.model || "@cf/meta/llama-3.1-8b-instruct";
          const result = await env.AI.run(model,{messages:[
            {role:"system",content:"You are Farhan AI Agent for Royal Mobile & Printing Store. Help with ecommerce, POS, inventory, printing production, accounts and customer service. Be honest about data access."},
            {role:"user",content:message}
          ]});
          return json({ok:true,provider,model,response:result.response || result});
        }
        const configs = {
          openai:{secret:"OPENAI_API_KEY",base:"https://api.openai.com/v1/chat/completions",model:body.model||"gpt-4o-mini"},
          gemini:{secret:"GEMINI_API_KEY",base:"https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",model:body.model||"gemini-2.0-flash"},
          deepseek:{secret:"DEEPSEEK_API_KEY",base:"https://api.deepseek.com/chat/completions",model:body.model||"deepseek-chat"},
          groq:{secret:"GROQ_API_KEY",base:"https://api.groq.com/openai/v1/chat/completions",model:body.model||"llama-3.3-70b-versatile"},
          openrouter:{secret:"OPENROUTER_API_KEY",base:"https://openrouter.ai/api/v1/chat/completions",model:body.model||"openai/gpt-4o-mini"}
        };
        const cfg=configs[provider];
        if (!cfg) return json({error:"Provider not configured in this starter. Add its secure server-side adapter."},400);
        const key=env[cfg.secret];
        if (!key) return json({error:`Add ${cfg.secret} as a Worker secret.`},503);
        const upstream=await fetch(cfg.base,{method:"POST",headers:{
          "Authorization":`Bearer ${key}`,"Content-Type":"application/json"
        },body:JSON.stringify({model:cfg.model,messages:[
          {role:"system",content:"You are Farhan AI Agent for Royal Mobile & Printing Store. Assist with ecommerce, POS, inventory, printing jobs, accounts and customer service. Never claim access to live store data unless it is provided."},
          {role:"user",content:message}
        ]})});
        const data=await upstream.json();
        if(!upstream.ok) return json({error:data.error?.message||"AI provider request failed"},upstream.status);
        return json({ok:true,provider,model:cfg.model,response:data.choices?.[0]?.message?.content||data});
      } catch(e) { return json({error:"AI request failed",detail:String(e.message||e)},500); }
    }
    return json({error:"Not found"},404);
  }
};