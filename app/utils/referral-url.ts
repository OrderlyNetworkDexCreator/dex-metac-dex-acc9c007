const DEFAULT_REFERRAL_LINK_URL = "https://dex.orderly.network/demo";

interface ResolveReferralLinkUrlOptions {
  siteUrl?: string;
  origin?: string;
  baseUrl?: string;
}

function parseHttpUrl(value?: string): URL | undefined {
  if (!value?.trim()) return undefined;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }
    return url;
  } catch {
    return undefined;
  }
}

function getFallbackUrl(origin?: string, baseUrl = "/"): URL {
  const originUrl = parseHttpUrl(origin);
  if (!originUrl) {
    return new URL(DEFAULT_REFERRAL_LINK_URL);
  }

  try {
    // BASE_URL may be a pathname or a full URL. Keep only its pathname so a
    // custom domain always uses the domain from the current browser location.
    const basePath = new URL(baseUrl || "/", originUrl).pathname;
    return new URL(basePath, originUrl.origin);
  } catch {
    return new URL(originUrl.origin);
  }
}

/**
 * Resolves the base URL passed to Orderly's ReferralProvider.
 * The affiliate package appends `?ref=<code>` to this value.
 */
export function resolveReferralLinkUrl({
  siteUrl,
  origin,
  baseUrl = "/",
}: ResolveReferralLinkUrlOptions): string {
  const url = parseHttpUrl(siteUrl) ?? getFallbackUrl(origin, baseUrl);

  url.search = "";
  url.hash = "";
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";

  return url.toString().replace(/\/$/, "");
}
