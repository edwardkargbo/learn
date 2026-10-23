"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  PhoneCall,
  ChevronDown,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const universitySystems = [
  {
    label: "UMS",
    href: "https://ums.ebkustsl.edu.sl/",
  },
  {
    label: "Student Portal",
    href: "https://portal.ebkustsl.edu.sl/",
  },
  {
    label: "MAT",
    href: "https://mat.ebkustsl.edu.sl/",
  },
  {
    label: "ITVET",
    href: "https://ebkustsl.edu.sl/itvet",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: Search,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: Search,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: Search,
  },
];

export function MasterNav() {
  const [searchQuery, setSearchQuery] = useState("");
  const [systemsOpen, setSystemsOpen] = useState(false);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  return (
    <header className="w-full bg-background text-foreground relative z-50">
      {/* Top utility bar */}
      <div className="w-full bg-violet-500 text-white">
        <div className="mx-auto flex w-full items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-10">
          {/* University systems: desktop */}
          <div className="hidden flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:flex sm:text-sm">
            <span className="font-semibold text-white-200">
              University Systems
            </span>

            {universitySystems.map((system) => (
              <a
                key={system.label}
                href={system.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-300"
              >
                {system.label}
              </a>
            ))}
          </div>

          <span className="text-xs font-medium text-gray-600 sm:hidden">
            University Official Website
          </span>

          {/* Social media */}
          <div className="ml-auto flex shrink-0 items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-sm transition-colors hover:text-black-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="w-full border-b border-border">
        <div className="mx-auto grid w-full grid-cols-1 items-center gap-5 px-4 py-5 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(240px,1fr)_minmax(190px,0.8fr)] lg:gap-8 lg:px-10 bg-white">
          {/* University logo and name */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 sm:gap-4"
            aria-label="University Name"
          >
            <div className="min-w-0">
              <h1 className="text-lg font-extrabold leading-tight tracking-tight text-gray-600 sm:text-xl lg:text-2xl">
                University name
              </h1>

              <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground sm:text-sm">
                University Slug
              </p>
            </div>
          </Link>

          {/* Search form */}
          <form
            role="search"
            onSubmit={handleSearch}
            className="flex w-full items-center gap-2 text-black"
          >
            <label htmlFor="university-search" className="sr-only">
              Search
            </label>

            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="university-search"
                type="search"
                placeholder="Search the website..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-11 rounded-full border-border bg-muted/30 pl-10 pr-4 focus-visible:ring-[#fcfcfc]"
              />
            </div>

            <Button
              type="submit"
              size="icon"
              aria-label="Search"
              className="size-11 shrink-0 rounded-full bg-none text-white "
            >
              <Search className="size-4" />
            </Button>
          </form>

          {/* Support contact: desktop */}
          <div className="hidden items-center gap-3 lg:flex lg:justify-end">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-purple-50 text-[#2e026d]">
              <PhoneCall className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Call for Support</p>

              <a
                href="tel:+23275011606"
                className="mt-1 block whitespace-nowrap text-sm font-bold text-[#2e026d] hover:underline"
              >
                +232 75 011606
              </a>

              <a
                href="tel:+232796677406"
                className="block whitespace-nowrap text-sm text-muted-foreground hover:text-[#2e026d]"
              >
                +232 79 6677406
              </a>
            </div>
          </div>

          {/* Support contact: tablet and mobile */}
          <div className="flex items-center justify-between gap-3 border-t border-border pt-4 lg:hidden">
            <div className="flex items-center gap-2">
              <PhoneCall className="size-4 shrink-0 text-[#2e026d]" />
              <span className="text-sm text-muted-foreground">
                Call for Support
              </span>
            </div>

            <div className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-sm font-semibold">
              <a href="tel:+23275011606" className="text-[#2e026d]">
                +232 75 011606
              </a>

              <a href="tel:+232796677406" className="text-[#2e026d]">
                +232 79 6677406
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible university systems: mobile */}
      <div className="border-b border-border px-4 sm:hidden">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setSystemsOpen((open) => !open)}
          aria-expanded={systemsOpen}
          className="flex h-11 w-full justify-between rounded-none px-0 text-sm font-medium text-[#2e026d] hover:bg-transparent hover:text-[#4310a0]"
        >
          Other University Systems
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${
              systemsOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {systemsOpen && (
          <div className="grid grid-cols-2 gap-2 pb-3">
            {universitySystems.map((system) => (
              <a
                key={system.label}
                href={system.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-10 items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm transition-colors hover:bg-purple-50 hover:text-[#2e026d]"
              >
                <span>{system.label}</span>
                <ExternalLink className="size-3 shrink-0" />
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default MasterNav;
