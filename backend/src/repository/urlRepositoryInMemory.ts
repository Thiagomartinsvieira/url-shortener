import { randomUUID } from "node:crypto";
import { IUrl } from "../domain/Url";
import { IUrlRepository } from "./urlRepository";

export class InMemoryUrlRepository implements IUrlRepository {
    urls: IUrl[] = [];

    updateUrlBySlug(slug: string): Promise<IUrl> {
        const index = this.urls.findIndex((url) => url.slug === slug)

        if (index === -1) throw new Error("URL not found")

        this.urls[index].clicks += 1

        return Promise.resolve(this.urls[index])
    }

    createUrl = async (longUrl: string, slug: string): Promise<IUrl> => {
        const newUrl: IUrl = { slug, longUrl, clicks: 0, createdAt: new Date(), id: randomUUID() };

        this.urls.push(newUrl);

        return Promise.resolve(newUrl);
    }

    isUniqueSlug = async (slug: string): Promise<IUrl | null> => {
        return Promise.resolve(this.urls.find((url) => url.slug === slug) || null)
    }

    getAllLinks = async (): Promise<IUrl[]> => {
        return Promise.resolve(this.urls)
    }

}