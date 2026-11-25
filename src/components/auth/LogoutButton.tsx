"use client";

import { useRouter } from "@/i18n/navigation";

export default function LogoutButton({ label }: { label: string }) {
  const router = useRouter();
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }
  return <button type="button" onClick={logout} className="text-xs cursor-pointer text-white text-white/75 transition hover:text-white">{label}</button>;
}
