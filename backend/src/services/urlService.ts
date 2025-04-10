// services/urlService.ts

import { IUrl } from "../domain/Url"

export interface IUrlService {
    generateUniqueSlug: () => Promise<string> 
    createShortUrl: (longUrl: string) => Promise<IUrl>
    getUrlBySlug: (slug: string) => Promise<IUrl>
    getAllLinks: () => Promise<IUrl[]>
}