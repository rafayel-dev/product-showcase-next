"use client";

import { Typography, Divider } from "antd";

const { Title, Paragraph, Text } = Typography;

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-nunito">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                <Title level={1} className="text-violet-600! mb-2">
                    🔒 Privacy Policy
                </Title>
                <Text type="secondary" className="block mb-8">
                    Last Updated: January 2025
                </Text>

                <Divider />

                <section className="mb-8">
                    <Title level={3}>1. Information We Collect</Title>
                    <Paragraph className="text-gray-700 leading-relaxed">
                        We collect information you provide directly, including your name, email,
                        phone number, and shipping address when you place an order. We also collect
                        payment information through our secure payment processors.
                    </Paragraph>
                </section>

                <section className="mb-8">
                    <Title level={3}>2. How We Use Your Information</Title>
                    <Paragraph className="text-gray-700 leading-relaxed">
                        Your information helps us process orders, provide customer support, send
                        order updates, and improve our services. We may also send promotional
                        communications if you opt in.
                    </Paragraph>
                </section>

                <section className="mb-8">
                    <Title level={3}>3. Data Security</Title>
                    <Paragraph className="text-gray-700 leading-relaxed">
                        We implement industry-standard security measures to protect your data.
                        However, no method of transmission over the Internet is 100% secure.
                    </Paragraph>
                </section>

                <section className="mb-8">
                    <Title level={3}>4. Cookies</Title>
                    <Paragraph className="text-gray-700 leading-relaxed">
                        We use cookies to enhance your browsing experience, remember your preferences,
                        and analyze site traffic. You can disable cookies in your browser settings.
                    </Paragraph>
                </section>

                <section className="mb-8">
                    <Title level={3}>5. Third-Party Services</Title>
                    <Paragraph className="text-gray-700 leading-relaxed">
                        We may share your information with trusted third-party service providers
                        for payment processing, shipping, and analytics. These providers are bound
                        by confidentiality agreements.
                    </Paragraph>
                </section>

                <section className="mb-8">
                    <Title level={3}>6. Your Rights</Title>
                    <Paragraph className="text-gray-700 leading-relaxed">
                        You have the right to access, correct, or delete your personal data.
                        Contact us at support@productshowcase.com for any privacy-related requests.
                    </Paragraph>
                </section>

                <section>
                    <Title level={3}>7. Contact Us</Title>
                    <Paragraph className="text-gray-700 leading-relaxed">
                        If you have questions about this policy, please contact us at
                        support@productshowcase.com or call +880 1751-876070.
                    </Paragraph>
                </section>
            </div>
        </div>
    );
}
