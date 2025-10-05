import Layout from "../components/Layout";
import React from "react";

export default function SubscribeLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <Layout title="Subscribe">
      {children}
    </Layout>
  )
}
