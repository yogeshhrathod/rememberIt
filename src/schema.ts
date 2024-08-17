import { z } from 'zod';

// Define a Zod schema for files
export const File = z.object({
  file_id: z.number().optional(), // Optional since it's auto-incrementing in the database
  file_name: z.string().trim().min(1),
  file_path: z.string().trim().url(), // Validate file path as a URL format
  created: z
    .string()
    .trim()
    .refine((value) => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value), {
      message: 'Invalid date format. Expected format: YYYY-MM-DD HH:mm:ss',
    })
    .optional(),
  last_accessed: z
    .string()
    .trim()
    .refine((value) => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value), {
      message: 'Invalid date format. Expected format: YYYY-MM-DD HH:mm:ss',
    })
    .optional(),
  size: z.number().int().positive(),
  format: z.string().trim().min(1),
  description: z.string().optional(),
  extras: z.string().optional(),
  notes: z.string().optional(),
});

// Define a Zod schema for linking files and tags (optional weight)
export const FileTag = z.object({
  name: z.string().trim().min(1),
  tag_id: z.number().optional(), // Optional since it's auto-incrementing in the database
  weight: z.number().int().nonnegative().optional().default(1), // Optional weight with default 1 and non-negative
  icon: z.string().trim().min(1),
});

export type IFile = z.infer<typeof File>;
export type IFileTag = z.infer<typeof FileTag>;
export type ISearchParams = {
  tag?: number;
  search?: string;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
  limit?: number;
};
