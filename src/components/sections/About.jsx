import { about } from "../../data/siteData";
import FadeIn from "../ui/FadeIn";
import Badge from "../ui/Badge";

/**
 * About section. Deliberately simpler than Hero — one framed photo
 * instead of a collage — and mirrored left/right so the page doesn't
 * feel like the same layout repeating as you scroll.
 */
export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Photo column */}
        <FadeIn direction="right" className="order-2 lg:order-1">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/5]">
            <img
              src={about.image.url}
              alt={about.image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>
        </FadeIn>

        {/* Copy column */}
        <div className="order-1 lg:order-2">
          <FadeIn direction="up">
            <Badge tone="dark">{about.badge}</Badge>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <h2 className="section-heading mt-6">{about.heading}</h2>
          </FadeIn>

          <div className="space-y-4 mb-10">
            {about.paragraphs.map((paragraph, index) => (
              <FadeIn direction="up" delay={150 + index * 50} key={paragraph.slice(0, 20)}>
                <p className="text-[color:var(--color-neutral-600)] leading-relaxed">{paragraph}</p>
              </FadeIn>
            ))}
          </div>

          <div className="space-y-5">
            {about.values.map((value, index) => (
              <FadeIn direction="up" delay={300 + index * 80} key={value.title}>
                <div className="flex items-start gap-4">
                  <span
                    className="w-10 h-10 shrink-0 rounded-full bg-[color:var(--color-brand-800)]/5 flex items-center justify-center text-lg"
                    aria-hidden="true"
                  >
                    {value.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-[color:var(--color-neutral-900)]">{value.title}</p>
                    <p className="text-sm text-[color:var(--color-neutral-600)]">{value.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}