import { getCollection } from "astro:content";
import { siteConfig } from "../../data/site";
import { renderOgImage } from "../../utils/og-image";

export const prerender = true;

interface OgPageProps {
  title: string;
  description: string;
  label: string;
  path: string;
}

const staticPages = [
  {
    slug: "index",
    title: siteConfig.name,
    description: siteConfig.description,
    label: "Home",
    path: "/",
  },
  {
    slug: "about",
    title: "About",
    description: "The story and product direction behind Reaktor.",
    label: "Page",
    path: "/about",
  },
  {
    slug: "blog",
    title: "Blog",
    description:
      "Strategy notes, release thoughts, and setup guides for Reaktor.",
    label: "Page",
    path: "/blog",
  },
  {
    slug: "credits",
    title: "Credits",
    description: "Libraries and tools behind Reaktor and its website.",
    label: "Page",
    path: "/credits",
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "Privacy policy for the Reaktor app and website.",
    label: "Page",
    path: "/privacy",
  },
  {
    slug: "support",
    title: "Support",
    description: "Answers, bug reports, and feedback for Reaktor.",
    label: "Page",
    path: "/support",
  },
] as const;

export async function getStaticPaths() {
  const blogPosts = await getCollection("blog");

  const pagePaths = staticPages.map((page) => ({
    params: { slug: page.slug },
    props: {
      title: page.title,
      description: page.description,
      label: page.label,
      path: page.path,
    } satisfies OgPageProps,
  }));

  const blogPaths = blogPosts.map((post) => ({
    params: { slug: `blog/${post.id}` },
    props: {
      title: post.data.title,
      description: post.data.description,
      label: "Blog Post",
      path: `/blog/${post.id}`,
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
