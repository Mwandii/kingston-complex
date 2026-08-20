import { Link } from "react-router-dom";
import { restaurant } from "../../data/siteData";
import FadeIn from "../ui/FadeIn";
import Badge from "../ui/Badge";
import MenuRow from "../ui/MenuRow";

/**
 * Restaurant teaser. Photo on the left, copy on the right — mirrors
 * About's layout (opposite of Conference before it), keeping the
 * alternating rhythm as the page scrolls.
 */
export default function Restaurant() {
  return (
    <section id="restaurant" className="bg-[color:var(--color-neutral-50)] py-24">
      <div className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Photo column */}
        <FadeIn direction="right" className="order-2 lg:order-1">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src={restaurant.image.url}
              alt={restaurant.image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>
        </FadeIn>

        {/* Copy column */}
        <div className="order-1 lg:order-2">
          <FadeIn direction="up">
            <Badge tone="dark">{restaurant.badge}</Badge>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <h2 className="section-heading mt-6">{restaurant.heading}</h2>
          </FadeIn>

          <FadeIn direction="up" delay={150}>
            <p className="text-[color:var(--color-neutral-600)] mb-8">{restaurant.subheading}</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {restaurant.menuPreview.map((item, index) => (
              <FadeIn direction="up" delay={200 + index * 60} key={item.name}>
                <MenuRow name={item.name} price={item.price} />
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={450}>
            <Link to={restaurant.ctaHref} className="btn-secondary inline-flex">
              {restaurant.ctaLabel}
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}