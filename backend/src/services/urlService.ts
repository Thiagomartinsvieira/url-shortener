import { PrismaClient } from '@prisma/client'
import { isValidUrl } from '../utils/validateUrl'
import { randomBytes } from 'crypto'

const prisma = new PrismaClient()

export const createShortUrl = async (longUrl: string) => {
  if (!isValidUrl(longUrl)) {
    throw new Error('Invalid URL')
  }

  const slug = randomBytes(4).toString('hex')

  return await prisma.url.create({
    data: { longUrl, slug }
  })
}

export const getUrlBySlug = async (slug: string) => {
  return await prisma.url.update({
    where: { slug },
    data: { clicks: { increment: 1 } }
  })
}
