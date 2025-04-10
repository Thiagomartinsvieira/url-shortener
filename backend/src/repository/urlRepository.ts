// repository/ urlRepository.ts

import { IUrl } from "../domain/Url"

export interface IUrlRepository {
  updateUrlBySlug(slug: string): Promise<IUrl>
  createUrl(longUrl: string, slug: string): Promise<IUrl>
  isUniqueSlug(slug: string): Promise<IUrl | null>;
  getAllLinks(): Promise<IUrl[]>
}
