// repository/urlRepositoryImpl.ts

import { PrismaClient } from "@prisma/client"
import { IUrlRepository } from "./urlRepository"
import { IUrl } from "../domain/Url"

export class UrlRepositoryImpl implements IUrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async updateUrlBySlug(slug: string) {
    return await this.prisma.url.update({
      where: { slug },
      data: { clicks: { increment: 1 } },
    })
  }

  async createUrl(longUrl: string, slug: string) {
    return await this.prisma.url.create({
      data: { longUrl, slug },
    })
  }

  async isUniqueSlug(slug: string) {
      return await this.prisma.url.findUnique({ where: { slug }})
  }

  async getAllLinks() {
    return await this.prisma.url.findMany()
  }
}
