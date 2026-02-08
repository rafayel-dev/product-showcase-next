import React from "react";
import PrivacyPolicyClient from "./PrivacyPolicyClient";
import { getSettings } from "@/lib/settings/settingsApi";


export default async function PrivacyPolicyPage() {
    const data = await getSettings("privacy_policy");
    const content = (data as { value: string } | null)?.value || "";

    return <PrivacyPolicyClient privacyContent={content} />;
}
