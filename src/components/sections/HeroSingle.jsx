import { hero } from "../../data/siteData";
import { scrollToSection } from "../../utils/scrollToSection";
import FadeIn from "../ui/FadeIn";
import Badge from "../ui/Badge";
import HeroStats from "../ui/HeroStats";

/**
 * OPTION A — full-bleed photo. Same layout as before, but upgraded with
 * patterns borrowed from the reference designs: a pill-shaped eyebrow
 * badge, an accent-coloured phrase in the heading, and a stat strip
 * directly under the copy instead of buried further down the page.
 */
export default function HeroSingle() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[color:var(--color-brand-950)]">
      <img
        src={hero.singleImage.url}
        alt={hero.singleImage.alt}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      {/* Warm-tinted scrim (brand teal, not flat black) for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-brand-950)]/90 via-[color:var(--color-brand-950)]/45 to-[color:var(--color-brand-950)]/20" />

      <div className="relative h-full section-container flex flex-col justify-center items-start max-w-3xl">
        <FadeIn direction="up">
          <Badge tone="light">📍 {hero.eyebrow}</Badge>
        </FadeIn>

        <FadeIn direction="up" delay={100}>
          <h1 className="text-5xl md:text-7xl font-semibold text-white leading-[1.05] mt-6 mb-5">
            {hero.headingPrefix}{" "}
            <span className="text-[color:var(--color-accent-400)]">{hero.headingAccent}</span>
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={200}>
          <p className="text-lg text-white/85 mb-8 max-w-xl">{hero.subheading}</p>
        </FadeIn>

        <FadeIn direction="up" delay={300}>
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href={hero.primaryCta.href}
              onClick={(event) => scrollToSection(event, hero.primaryCta.href)}
              className="btn-primary"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              onClick={(event) => scrollToSection(event, hero.secondaryCta.href)}
              className="btn-outline-light"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={400}>
          <HeroStats stats={hero.stats} tone="light" />
        </FadeIn>
      </div>
    </section>
  );
}