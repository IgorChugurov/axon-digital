"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { localeHref, type Locale } from "@/i18n/config";
import { chromeCopy, navItems, site } from "@/content/site";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { buttonClassName } from "@/components/ui/Button";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Header({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useContactModal();
  const copy = chromeCopy[locale];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 h-20 bg-background">
      <div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between px-8">
        <Link
          href={localeHref(locale, "/")}
          className="relative z-10 flex items-center gap-2">
          <Image src="/brand/mark.svg" alt="" width={32} height={32} />
          <span className="whitespace-nowrap text-2xl leading-none tracking-[-0.96px] text-ink">
            {site.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-8 min-[1280px]:flex min-[1440px]:absolute min-[1440px]:left-1/2 min-[1440px]:-translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localeHref(locale, item.href)}
              className="text-base leading-none tracking-[-0.32px] text-ink hover:text-green"
            >
              {item.label[locale]}
            </Link>
          ))}
        </nav>
        <div className="relative z-10 flex items-center gap-6">
          <div className="hidden items-center gap-6 sm:flex">
            <LanguageSwitcher current={locale} />
            <button
              type="button"
              onClick={open}
              className="inline-flex h-12 min-w-[152px] items-center justify-center gap-2 bg-green px-6 text-base tracking-[-0.32px] text-background hover:bg-[#2d5228]"
            >
              {copy.letsTalk}
              <ArrowUpRight className="size-6" aria-hidden />
            </button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-ink min-[1280px]:hidden"
            aria-label={copy.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-7" aria-hidden />
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="fixed inset-0 z-[60] min-[1280px]:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label={copy.closeMenu}
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 flex w-[min(100%,360px)] flex-col bg-background px-8 py-8 shadow-xl">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-lg font-bold">{site.name}</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={copy.closeMenu}
                className="size-10 text-ink"
              >
                <X className="size-8" aria-hidden />
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={localeHref(locale, item.href)}
                  className="text-2xl font-medium text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label[locale]}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <LanguageSwitcher current={locale} />
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  open();
                }}
                className={buttonClassName("green")}
              >
                {copy.letsTalk}
                <ArrowUpRight className="size-6" aria-hidden />
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
