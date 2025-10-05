import Layout from "../components/Layout";
import React from "react";

export default function PostsLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <Layout title="Posts">
      {children}
    </Layout>
  )
}
