import { Helmet } from "react-helmet-async";
import { Dashboard, ReferralProvider } from "@orderly.network/affiliate";
import { resolveReferralLinkUrl } from "@/utils/referral-url";
import { getRuntimeConfig } from "@/utils/runtime-config";
import { generatePageTitle } from "@/utils/utils";

export default function RewardsAffiliate() {
  const brokerName = getRuntimeConfig("VITE_ORDERLY_BROKER_NAME");
  const referralLinkUrl = resolveReferralLinkUrl({
    siteUrl: getRuntimeConfig("VITE_SEO_SITE_URL"),
    origin: typeof window !== "undefined" ? window.location.origin : undefined,
    baseUrl: import.meta.env.BASE_URL,
  });

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Affiliate")}</title>
      </Helmet>
      <ReferralProvider
        becomeAnAffiliateUrl="https://orderly.network"
        learnAffiliateUrl="https://orderly.network"
        referralLinkUrl={referralLinkUrl}
        overwrite={{
          shortBrokerName: brokerName,
          brokerName: brokerName,
        }}
      >
        <Dashboard.DashboardPage
          classNames={{
            root: "oui-flex oui-justify-center",
            home: "oui-py-6 oui-px-4 lg:oui-px-6 lg:oui-py-12 xl:oui-pl-4 xl:oui-pr-6 oui-w-full",
            dashboard: "oui-py-6 oui-px-4 lg:oui-px-6 xl:oui-pl-3 xl:oui-pr-6",
          }}
        />
      </ReferralProvider>
    </>
  );
}
