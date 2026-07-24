import { getCollection } from "astro:content";
import { siteConfig } from "../../data/site";
import { renderOgImage } from "../../utils/og-image";

export const prerender = true;

interface OgPageProps {
  title: string;
  description: string;
}

const staticPages = [
  {
    slug: "index",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  {
    slug: "about",
    title: "About",
    description: "What Reaktor is and who builds it.",
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Short, practical notes on playing better.",
  },
  {
    slug: "credits",
    title: "Credits",
    description: "The tools behind the game and this site.",
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "Privacy policy for the Reaktor app and website.",
  },
  {
    slug: "support",
    title: "Support",
    description: "Answers, bug reports, and feedback for Reaktor.",
  },
] as const;

export async function getStaticPaths() {
  const blogPosts = await getCollection("blog");

  const pagePaths = staticPages.map((page) => ({
    params: { slug: page.slug },
    props: {
      title: page.title,
      description: page.description,
    } satisfies OgPageProps,
  }));

  const blogPaths = blogPosts.map((post) => ({
    params: { slug: `blog/${post.id}` },
    props: {
      title: post.data.title,
      description: post.data.description,
    } satisfies OgPageProps,
  }));

  return [...pagePaths, ...blogPaths];
}

export async function GET({ props }: { props?: OgPageProps }) {
  if (!props) {
    return new Response("Not found", { status: 404 });
  }

  return renderOgImage(props);
}
