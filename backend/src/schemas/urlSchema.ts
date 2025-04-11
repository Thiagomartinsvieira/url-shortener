import { z } from "zod";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Invalid slug format',
});

export const shortenUrlBodySchema = z.object({
    longUrl: z.string().url()
})

export const redirectUrlBodySchema = z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Invalid slug format',
    })
})
