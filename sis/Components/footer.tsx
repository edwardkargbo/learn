import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ChevronRight, Send } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Admission", href: "/Admission/AdmissionRequirements" },
  { label: "Faculties", href: "/faculties" },
  { label: "News and Events", href: "/news" },
  { label: "Resources", href: "/resources" },
  { label: "Contact Us", href: "/contact" },
];

const facultyLinks = [
  { label: "o", href: "/faculties/science" },
  { label: "q", href: "/faculties/engineering" },
  { label: "p", href: "/faculties/education" },
  { label: "c", href: "/faculties/agriculture" },
  {
    label: "s",
    href: "/faculties/arts-social-sciences",
  },
  {
    label: "F",
    href: "/faculties/management-sciences",
  },
  { label: "j", href: "/faculties/health-sciences" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: Mail },
  { label: "Instagram", href: "#", Icon: Mail },
  { label: "YouTube", href: "#", Icon: Mail },
  { label: "LinkedIn", href: "#", Icon: Mail },
];

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-2 py-1.5 text-sm text-white/75 transition-colors hover:text-amber-400"
    >
      <ChevronRight className="mt-0.5 size-4 shrink-0 text-amber-400 transition-transform group-hover:translate-x-1" />
      <span>{children}</span>
    </Link>
  );
}

export default async function Footer() {
  "use cache";
  const t = await new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-[#2e026d] via-[#1c1249] to-[#090b2b] text-white">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-purple-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* University information */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              {/* Replace with your actual university logo */}
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-amber-400/50 bg-white/5 text-amber-400">
                <span className="text-xl font-black">Logo</span>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-wide sm:text-3xl">
                  University slug
                </h2>
                <p className="max-w-64 text-xs font-semibold uppercase leading-5 tracking-wide text-white/80">
                  University full name
                </p>
              </div>
            </Link>
            {/* motto */}
            {/* <p className="mt-5 text-sm font-medium italic text-amber-400">
              Knowledge <span className="px-1 text-white">•</span> Innovation
              <span className="px-1 text-white">•</span> Development
            </p> */}
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
              this is a committed to providing quality education, fostering
              innovation, and contributing to the development of Sierra Leone
              and beyond.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-400 hover:text-[#1c1249]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <div className="mt-3 h-1 w-10 rounded-full bg-amber-400" />

            <ul className="mt-5 space-y-1">
              {quickLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Faculties */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold">Our Faculties</h3>
            <div className="mt-3 h-1 w-10 rounded-full bg-amber-400" />

            <ul className="mt-5 space-y-1">
              {facultyLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Contact information */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <div className="mt-3 h-1 w-10 rounded-full bg-amber-400" />

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-amber-400" />
                <div className="text-sm leading-6 text-white/75">
                  <p className="font-semibold text-white">
                    University Main Campus
                  </p>
                  <p>Sierra Leone</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-amber-400" />
                <div className="space-y-1 text-sm text-white/75">
                  <a
                    href="tel:+23275011606"
                    className="block transition-colors hover:text-amber-400"
                  >
                    +232 xx xxx xxxx
                  </a>
                  <a
                    href="tel:+232796677406"
                    className="block transition-colors hover:text-amber-400"
                  >
                    +232 xx xxx xxx
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-amber-400" />
                <div className="space-y-1 text-sm text-white/75">
                  <a
                    href="mailto:info@university.edu.sl"
                    className="block break-all transition-colors hover:text-amber-400"
                  >
                    info@university.edu.sl
                  </a>
                  <a
                    href="mailto:admissions@university.edu.sl"
                    className="block break-all transition-colors hover:text-amber-400"
                  >
                    admissions@university.edu.sl
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 size-5 shrink-0 text-amber-400" />
                <div className="text-sm leading-6 text-white/75">
                  <p className="font-semibold text-white">Monday – Friday</p>
                  <p>8:00 AM – 4:30 PM</p>
                </div>
              </div>
            </div>

            {/* Newsletter visual */}
            <div className="mt-7 border-t border-white/15 pt-5">
              <h4 className="font-semibold">Stay Connected</h4>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Get the latest university news and updates.
              </p>

              <form
                action="mailto:info@university.edu.sl"
                method="get"
                className="mt-4 flex gap-2"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-[#1c1249] transition-colors hover:bg-amber-300"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="relative border-t border-white/15 bg-black/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-center sm:px-8 md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs leading-6 text-white/60 sm:text-sm">
            © {t} University name. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/65 sm:text-sm">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-amber-400"
            >
              Privacy Policy
            </Link>
            <span className="hidden h-4 w-px bg-amber-400 sm:block" />
            <Link
              href="/terms"
              className="transition-colors hover:text-amber-400"
            >
              Terms of Use
            </Link>
            <span className="hidden h-4 w-px bg-amber-400 sm:block" />
            <Link
              href="/sitemap"
              className="transition-colors hover:text-amber-400"
            >
              Sitemap
            </Link>
          </div>

          <p className="text-xs font-medium italic text-amber-400">
            Building a brighter future.
          </p>
        </div>
      </div>
    </footer>
  );
}
