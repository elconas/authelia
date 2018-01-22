
export interface UrlComponents {
  scheme: string;
  domain: string;
  port: number;
  path: string;
  params: string;
}

export class UrlExtractor {
  static fromUrl(url: string): UrlComponents {
    if (!url) return undefined;

    const matches =
  url.match(/(http|https):\/\/([a-z0-9._-]+)(:[0-9]+)?([^?]*)(\?.*)?/);

    return {
      scheme: matches[1],
      domain: matches[2],
      port: (matches[3]) ? parseInt(matches[3].slice(1)) : 80,
      path: matches[4],
      params: (matches[5]) ? matches[5].slice(1) : ""
    };
  }
}