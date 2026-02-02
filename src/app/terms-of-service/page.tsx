import React from "react";
import TermsOfServiceClient from "./TermsOfServiceClient";
import { getSettings } from "@/lib/settings/settingsApi";


export default async function TermsOfServicePage() {
    const data = await getSettings("terms_of_service");
    const content = (data as { value: string } | null)?.value || "";

    return <TermsOfServiceClient termsContent={content} />;
}
