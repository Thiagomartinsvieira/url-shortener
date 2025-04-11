import { Request, Response } from 'express'
import { IUrlService } from '../services/urlService'
import { isEmpty } from 'radash'
import { redirectUrlBodySchema, shortenUrlBodySchema } from '../schemas/urlSchema'


export class UrlController {
    urlService: IUrlService
    constructor(urlService: IUrlService) {
        this.urlService = urlService
    }

    shortenUrl = async (req: Request, res: Response) => {
        try {
            const { longUrl } = shortenUrlBodySchema.parse(req.body);

            const result = await this.urlService.createShortUrl(longUrl)
            const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3333}`
            res.status(201).send({ slug: result.slug, shortUrl: `${baseUrl}/${result.slug}` })
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    }

    redirectUrl = async (req: Request, res: Response) => {
        try {
            const { slug } = redirectUrlBodySchema.parse(req.params);

            const url = await this.urlService.getUrlBySlug(slug)
            if (!url) res.status(404).send({ error: "Link not found" });

            res.redirect(url.slug)
        } catch (error) {
            res.status(400).send({ error: 'Unexpected error' })

        }
    }

    getAllLinks = async (req: Request, res: Response) => {
        try {
            const links = await this.urlService.getAllLinks();
    
            if (isEmpty(links)) return res.status(404).send({ error: "No links found" });
    
            return res.status(200).send(links);
        } catch (error) {
            console.error("Erro em getAllLinks:", error);
            return res.status(500).send({ error: 'Error while getting all links' });
        }
    }
    
}