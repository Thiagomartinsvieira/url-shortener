// controller/urlController 

import { Request, Response } from 'express'
import * as urlService from '../services/urlServiceImpl'
import { IUrlService } from '../services/urlService'
import { isEmpty } from 'radash'


export class UrlController {
    constructor(private readonly urlService: IUrlService) { }

    async shortenUrl(req: Request, res: Response) {
        try {
            const { longUrl } = req.body
            const result = await this.urlService.createShortUrl(longUrl)
            const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3333}`
            res.status(201).json({ slug: result.slug, shortUrl: `${baseUrl}/${result.slug}` })
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    }

    async redirectUrl(req: Request, res: Response) {
        try {
            const { slug } = req.params
            const url = await this.urlService.getUrlBySlug(slug)
            if (!url) return res.status(404).json({ error: 'Not found' })

            res.redirect(url.longUrl)
        } catch {
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getAllLinks(req: Request, res: Response) {
        try {
            const links = this.urlService.getAllLinks();

            if (isEmpty(links)) return res.status(400).send({ error: "No links found"})

            return res.status(200).send(links);
        } catch (error) {
            res.status(400).send({ error: 'Error while getting all links' })
        }
    }
}