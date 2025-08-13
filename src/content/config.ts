import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    emoji: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string(),
    technologies: z.array(z.string()).optional(),
    github: z.string().optional(),
    live: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = {
  projects: projectsCollection,
};
