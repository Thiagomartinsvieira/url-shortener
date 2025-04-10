import { Request, Response } from 'express'
import * as urlService from '../services/urlService'

export const shortenUrl = async (req: Request, res: Response) => {
  try {
    const { longUrl } = req.body
    const result = await urlService.createShortUrl(longUrl)
    res.status(201).json({ slug: result.slug, shortUrl: `${process.env.BASE_URL}/${result.slug}` })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const redirectUrl = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const url = await urlService.getUrlBySlug(slug)
    if (!url) return res.status(404).json({ error: 'Not found' })
    res.redirect(url.longUrl)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}
