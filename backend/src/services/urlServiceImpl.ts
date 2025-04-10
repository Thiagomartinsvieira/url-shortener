// services/urlServiceImpl.ts

import { randomBytes } from 'crypto'
import { isValidUrl } from '../utils/validateUrl'
import { IUrlRepository } from '../repository/urlRepository'
import { IUrlService } from './urlService'
import { IUrl } from '../domain/Url'


export class UrlServiceImpl implements IUrlService {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async getUrlBySlug(slug: string) {
    return await this.urlRepository.updateUrlBySlug(slug)
  }

  async generateUniqueSlug(): Promise<string> {
    let slug
    let exists = true
    do {
      slug = randomBytes(4).toString('hex')
      const existing = await this.urlRepository.isUniqueSlug(slug)
      if (!existing) exists = false
    } while (exists)
    return slug
  }

  async createShortUrl(longUrl: string) {
    if (!isValidUrl(longUrl)) {
      throw new Error('Invalid URL')
    }

    const slug = await this.generateUniqueSlug()
    return await this.urlRepository.createUrl(longUrl, slug)
  }

  async getAllLinks() {
    return await this.urlRepository.getAllLinks();
  }
}
