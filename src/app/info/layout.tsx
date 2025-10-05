"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Layout from "../components/Layout";
import React, { useMemo } from "react";

export default function InfoLayout({ children }: { readonly children: React.ReactNode }) {
  const activeChild = useSelectedLayoutSegment();

  const title = useMemo(() => {
    return activeChild ? activeChild.charAt(0).toUpperCase() + activeChild.slice(1) : "Info";
  }, [activeChild]);

  return (
    <Layout title={title}>
      {children}
    </Layout>
  )
}
