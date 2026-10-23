"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const navigationItems = [
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Chancellor", href: "/about/chancelor" },
      {
        label: "Vice Chancellor and Principal",
        href: "/about/vice-chancellor",
      },
      { label: "Executive Management", href: "/about/management" },
    ],
  },
  {
    title: "Admission",
    links: [
      { label: "Admission", href: "/admission" },
      {
        label: "Admission Requirements",
        href: "/admission/admission-requirment",
      },
      { label: "Payment Details", href: "/admission/payment-and-bank-details" },
    ],
  },
  {
    title: "Faculties",
    links: [
      { label: "Faculties", href: "/faculties" },
      { label: "Basic Science", href: "/faculties/basic-science" },
      { label: "Education", href: "/faculties/education" },
    ],
  },
  {
    title: "News and Events",
    links: [
      { label: "News and Events", href: "/news&Event" },
      { label: "News", href: "/news" },
      { label: "Calendar of Events", href: "/events" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "Admission Advert", href: "/resources/admission-advert" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Contact Form", href: "/contact/contactform" },
    ],
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();
  return (
    <nav className=" relative  z-50 w-full bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mx-auto flex min-h-12 w-full items-center justify-center px-4">
        <div className="hidden w-full justify-center md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-wrap items-center justify-center gap-1">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white">
                    {item.title}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <span className="grid w-65 gap-1 bg-white p-2 text-gray-900">
                      {item.links.map((link) => (
                        <span key={link.label}>
                          <NavigationMenuLink
                            href={link.href}
                            className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100 hover:text-[#2e026d]"
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </span>
                      ))}
                    </span>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile menu button */}
        <div className="flex w-full items-center justify-between md:hidden">
          <span className="text-sm font-semibold tracking-wide">
            Navigation
          </span>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            className="inline-flex size-10 items-center justify-center rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-white/15 px-4 pb-4 md:hidden">
          <div className="mx-auto w-full max-w-3xl">
            {navigationItems.map((item) => {
              const isExpanded = expandedItem === item.title;

              return (
                <div
                  key={item.title}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedItem(isExpanded ? null : item.title)
                    }
                    aria-expanded={isExpanded}
                    className="flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left text-sm font-medium hover:text-purple-200"
                  >
                    {item.title}
                    <ChevronDown
                      className={`size-4 shrink-0 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="space-y-1 pb-3 pl-3">
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setExpandedItem(null);
                          }}
                          className="block rounded-md px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
