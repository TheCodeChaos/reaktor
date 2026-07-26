import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { authors } from "./data/site";

const authorIds = Object.keys(authors);

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    authors: z
      .array(z.string())
      .min(1)
      .refine((ids) => ids.every((id) => authorIds.includes(id)), {
        message: `Unknown author, expected one of: ${authorIds.join(", ")}`,
      }),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
