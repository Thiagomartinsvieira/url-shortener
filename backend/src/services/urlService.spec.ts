import { beforeEach, describe, expect, it } from "vitest";
import { IUrlService } from "./urlService";
import { IUrlRepository } from "../repository/urlRepository";
import { UrlServiceImpl } from "./urlServiceImpl";
import { InMemoryUrlRepository } from "../repository/urlRepositoryInMemory";

describe("Url Service", () => {
    let urlService: IUrlService;
    let urlRepository: IUrlRepository;

    beforeEach(() => {
        urlRepository = new InMemoryUrlRepository();
        urlService = new UrlServiceImpl(urlRepository);
    })

    describe("create method", () => {
        it("should be able to create a shortened url", async () => {
            const url = "https://google.com";

            const created = await urlService.createShortUrl(url);

            expect(created).toHaveProperty("id")
            expect(created).toHaveProperty("slug")
            expect(created.longUrl).toBe(url)
            expect(created.clicks).toBe(0)
        });

        it("should NOT be able to create a shortened url with a invalid url", async () => {
            const url = "1034fkasjdflkjadsklfjalj";

            expect(urlService.createShortUrl(url)).rejects.throws(Error);
        });
    })

    describe("getUrlBySlug method", () => {
        it("should be able to list a link", async () => {
            const url = "https://google.com";

            const created = await urlService.createShortUrl(url);

            const link = await urlService.getUrlBySlug(created.slug);

            expect(created.id).toBe(link.id);
            expect(created.slug).toBe(link.slug);
            expect(created.clicks).toBe(link.clicks);
            expect(created.longUrl).toBe(link.longUrl);
        })

        it("should NOT be able to list a link", async () => {
            const url = "https://google.com";

            expect(urlService.getUrlBySlug(url)).rejects.throws(Error);

        })
    });
})