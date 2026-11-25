"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

import { Link, useRouter } from "@/i18n/navigation";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const t = useTranslations(`Auth.${mode}`);
  const router = useRouter();
  const isLogin = mode === "login";
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setError(response.status === 409 ? t("emailExists") : response.status === 401 ? t("invalidCredentials") : t("error"));
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError(t("error"));
    } finally {
      setPending(false);
    }
  }

  const inputClass =
    "mt-2 h-11 w-full rounded-lg border border-primary/15 bg-white px-4 text-sm outline-none transition placeholder:text-text-muted focus:border-primary";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-10 pt-28 sm:px-8">
      <Image
        src="/images/pic-4.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <section className="relative z-10 w-full max-w-md rounded-2xl bg-background/95 p-6 shadow-hero-form backdrop-blur-sm sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary">{t("title")}</h1>
          <p className="mt-2 text-sm text-text-secondary">{t("subtitle")}</p>
        </div>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <label className="block text-sm font-bold text-secondary">
              {t("fullName")}
              <input
                required
                name="fullName"
                autoComplete="name"
                placeholder={t("fullNamePlaceholder")}
                className={inputClass}
              />
            </label>
          )}

          <label className="block text-sm font-bold text-secondary">
            {t("email")}
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              className={inputClass}
            />
          </label>

          {!isLogin && (
            <label className="block text-sm font-bold text-secondary">
              {t("phone")}
              <input
                required
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+966 00 000 0000"
                className={inputClass}
                dir="ltr"
              />
            </label>
          )}

          <label className="block text-sm font-bold text-secondary">
            {t("password")}
            <input
              required
              type="password"
              name="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder={t("passwordPlaceholder")}
              minLength={8}
              className={inputClass}
            />
          </label>

          {isLogin && (
            <Link
              href="/forgot-password"
              className="block text-sm font-semibold text-primary hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          )}

          {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="min-h-11 w-full rounded-lg bg-primary px-6 font-bold text-white transition hover:bg-primary-600"
          >
            {pending ? t("submitting") : t("submit")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          {t("switchText")}{" "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="font-bold text-primary hover:underline"
          >
            {t("switchLink")}
          </Link>
        </p>

        <Link
          href="/"
          className="mt-5 block text-center text-sm font-semibold text-text-secondary hover:text-primary"
        >
          {t("backHome")}
        </Link>
      </section>
    </main>
  );
}
