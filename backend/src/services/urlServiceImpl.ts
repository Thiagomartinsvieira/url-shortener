// services/urlServiceImpl.ts

import { randomBytes } from 'crypto'
import { isValidUrl } from '../utils/validateUrl'
import { IUrlRepository } from '../repository/urlRepository'
import { IUrlService } from './urlService'
import { IUrl } from '../domain/Url'


export class UrlServiceImpl implements IUrlService {
  urlRepository: IUrlRepository;

  constructor(urlRepository: IUrlRepository) {
    this.urlRepository = urlRepository;
  }

  getUrlBySlug = async (slug: string) => {
    return await this.urlRepository.updateUrlBySlug(slug)
  }

  generateUniqueSlug = async (): Promise<string> => {
    let slug
    let exists = true
    do {
      slug = randomBytes(4).toString('hex')
      const existing = await this.urlRepository.isUniqueSlug(slug)
      if (!existing) exists = false
    } while (exists)
    return slug
  }

  createShortUrl = async (longUrl: string) => {
    if (!isValidUrl(longUrl)) {
      throw new Error('Invalid URL')
    }

    const slug = await this.generateUniqueSlug()
    return await this.urlRepository.createUrl(longUrl, slug)
  }

  getAllLinks = async () => {
    return await this.urlRepository.getAllLinks();
  }
}
