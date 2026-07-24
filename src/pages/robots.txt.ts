import { siteConfig } from "../data/site";

export const prerender = true;

export function GET({ site }: { site?: URL }) {
  const baseUrl = (site?.toString() ?? siteConfig.siteUrl).replace(/\/$/, "");

  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${baseUrl}/sitemap-index.xml`,
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
