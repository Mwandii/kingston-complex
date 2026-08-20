import { Link } from "react-router-dom";
import { bar } from "../../data/siteData";
import FadeIn from "../ui/FadeIn";
import Badge from "../ui/Badge";
import MenuRow from "../ui/MenuRow";

/**
 * Bar teaser. Dark full-width band, no photo split — deliberately
 * different rhythm from About/Conference/Restaurant so the page doesn't
 * settle into a predictable "photo + text" pattern every single section.
 */
export default function Bar() {
  return (
    <section id="bar" className="bg-[color:var(--color-brand-950)] py-24">
      <div className="section-container max-w-3xl">
        <FadeIn direction="up">
          <Badge tone="light">{bar.badge}</Badge>
        </FadeIn>

        <FadeIn direction="up" delay={100}>
          <h2 className="section-heading-white mt-6">{bar.heading}</h2>
        </FadeIn>

        <FadeIn direction="up" delay={150}>
          <p className="text-white/75 mb-8">{bar.subheading}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {bar.drinksMenu.map((item, index) => (
            <FadeIn direction="up" delay={200 + index * 60} key={item.name}>
              <MenuRow name={item.name} price={item.price} dark />
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={450}>
          <Link to={bar.ctaHref} className="btn-outline-light inline-flex">
            {bar.ctaLabel}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}