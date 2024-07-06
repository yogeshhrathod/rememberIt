import { z } from 'zod';

// Define a Zod schema for tags
export const Tag = z.object({
  tag_id: z.number().optional(), // Optional since it's auto-incrementing in the database
  tag_name: z.string().trim().min(1), // Enforce unique tag names
});

// Define a Zod schema for files
export const File = z.object({
  file_id: z.number().optional(), // Optional since it's auto-incrementing in the database
  file_name: z.string().trim().min(1),
  file_path: z.string().trim().url(), // Validate file path as a URL format
  // Add other relevant file attributes here
});

// Define a Zod schema for linking files and tags (optional weight)
export const FileTag = z.object({
  file_id: z.number(),
  tag_id: z.number(),
  weight: z.number().int().nonnegative().optional().default(1), // Optional weight with default 1 and non-negative
});

export type ITag = z.infer<typeof Tag>;
export type IFile = z.infer<typeof File>;
export type IFileTag = z.infer<typeof FileTag>;