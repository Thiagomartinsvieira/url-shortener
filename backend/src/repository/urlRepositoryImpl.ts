import { PrismaClient } from "@prisma/client"
import { IUrlRepository } from "./urlRepository"

export class UrlRepositoryImpl implements IUrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  updateUrlBySlug = async (slug: string) => {
    return await this.prisma.url.update({
      where: { slug },
      data: { clicks: { increment: 1 } },
    })
  }

  createUrl = async (longUrl: string, slug: string) => {
    return await this.prisma.url.create({
      data: { longUrl, slug },
    })
  }

  isUniqueSlug = async (slug: string) => {
      return await this.prisma.url.findUnique({ where: { slug }})
  }

  getAllLinks = async () => {
    return await this.prisma.url.findMany()
  }
}
