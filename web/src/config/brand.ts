export type NavigationItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type BrandConfig = {
  brandName: string;
  tagline: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  email: string;
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
  /**
   * Tailwind utility classes for accent styling.
   * Example: "bg-indigo-500 hover:bg-indigo-400".
   */
  accentBgClass: string;
  /**
   * Tailwind utility classes for accent text styling.
   * Example: "text-indigo-400".
   */
  accentTextClass: string;
};

export const brandConfig: BrandConfig = {
  brandName: "BrandName",
  tagline: "A minimal launchpad for modern brands.",
  description:
    "A premium, flexible brand template for founders, creators, and studios who want a focused, high-end presence without the bloat.",
  primaryCtaLabel: "Work with us",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "View story",
  secondaryCtaHref: "/about",
  email: "hello@brandname.studio",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  socialLinks: [
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  accentBgClass:
    "bg-white text-black hover:bg-neutral-200 hover:text-black focus-visible:outline-white",
  accentTextClass: "text-neutral-200",
};

