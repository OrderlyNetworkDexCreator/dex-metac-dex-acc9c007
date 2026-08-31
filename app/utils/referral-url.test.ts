import { describe, expect, it } from "vitest";
import { resolveReferralLinkUrl } from "./referral-url";

describe("resolveReferralLinkUrl", () => {
  it("uses the configured site URL and removes URL decorations", () => {
    expect(
      resolveReferralLinkUrl({
        siteUrl:
          "https://dex.orderly.network/deepseek-5209/?source=test#rewards",
        origin: "https://ignored.example.com",
        baseUrl: "/ignored/",
      }),
    ).toBe("https://dex.orderly.network/deepseek-5209");
  });

  it("supports a custom domain configured at its root", () => {
    expect(resolveReferralLinkUrl({ siteUrl: "https://mydex.com/" })).toBe(
      "https://mydex.com",
    );
  });

  it("falls back to the current origin and Vite subpath", () => {
    expect(
      resolveReferralLinkUrl({
        origin: "https://dex.orderly.network",
        baseUrl: "/deepseek-5209/",
      }),
    ).toBe("https://dex.orderly.network/deepseek-5209");
  });

  it("falls back to the current custom-domain root", () => {
    expect(
      resolveReferralLinkUrl({
        origin: "https://mydex.com",
        baseUrl: "/",
      }),
    ).toBe("https://mydex.com");
  });

  it.each(["not-a-url", "ftp://dex.example.com/"])(
    "falls back when the configured site URL is invalid: %s",
    (siteUrl) => {
      expect(
        resolveReferralLinkUrl({
          siteUrl,
          origin: "https://dex.orderly.network",
          baseUrl: "/deepseek-5209/",
        }),
      ).toBe("https://dex.orderly.network/deepseek-5209");
    },
  );

  it("uses the demo DEX fallback outside the browser", () => {
    expect(resolveReferralLinkUrl({})).toBe("https://dex.orderly.network/demo");
  });

  it("produces the expected final URL when the SDK appends the code", () => {
    const referralLinkUrl = resolveReferralLinkUrl({
      siteUrl: "https://dex.orderly.network/deepseek-5209/",
    });

    expect(`${referralLinkUrl}?ref=U7BEF37W`).toBe(
      "https://dex.orderly.network/deepseek-5209?ref=U7BEF37W",
    );
  });
});
