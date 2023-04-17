import z from 'zod';

export const idInput = z.object({
  params: z.object({
    id: z.preprocess((val) => Number(val), z.number())
  })
});

export const serverInput = z.object({
  query: z
    .object({
      server: z.string().optional()
    })
    .strict()
});

export const createModuleInput = z.object({
  body: z
    .object({
      Name: z.string(),
      PathDEV: z.string(),
      PathQA: z.string(),
      PathPRD: z.string(),
      PathSWP: z.string(),
      Route: z.string(),
      Local: z.string(),
      Order: z.number(),
      Type: z.string()
    })
    .strict()
});

export const updateModuleInput = createModuleInput
  .deepPartial()
  .strict()
  .merge(idInput);

export type CreateModuleInputType = z.infer<typeof createModuleInput>;

export type UpdateModuleInputType = z.infer<typeof updateModuleInput>;
