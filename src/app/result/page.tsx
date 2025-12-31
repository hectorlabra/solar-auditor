"use client";

import { useEffect } from "react";
import { useAuditStore } from "@/store/audit-store";
import { ResultsDashboard } from "@/components/results/ResultsDashboard";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const { result } = useAuditStore();
  const router = useRouter();

  // Redirect to home if no result (direct access)
  useEffect(() => {
    if (!result) {
      router.push("/");
    }
  }, [result, router]);

  if (!result) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <ResultsDashboard />
    </main>
  );
}
