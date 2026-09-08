import { restaurantPage, brand } from "../data/siteData";
import { buildWhatsAppLink } from "../utils/whatsapp";
import FadeIn from "../components/ui/FadeIn";
import Badge from "../components/ui/Badge";
import MenuPriceRow from "../components/ui/MenuPriceRow";

const orderMessage = "Hi, I'd like to place an order.";

/**
 * Category heading styled like the reference menus — bold text with an
 * accent-coloured underline — instead of a plain section-heading.
 */
function CategoryHeading({ children }) {
  return (
    <h2 className="inline-block text-lg font-semibold text-[color:var(--color-neutral-900)] border-b-2 border-[color:var(--color-accent-500)] pb-1 mb-5">
      {children}
    </h2>
  );
}

function CategoryList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <MenuPriceRow key={item.name} name={item.name} price={item.price} />
      ))}
    </div>
  );
}

/**
 * Full restaurant menu. Layout pattern: intro banner, then each
 * category alternates a paired photo (left/right) with a plain list —
 * mirroring the reference menus' mix of photo+list and list-only
 * sections, reskinned in our warm palette instead of their dark theme.
 */
export default function Restaurant() {
  const [beverages, food, softDrinks] = restaurantPage.categories;

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container max-w-5xl">
        <FadeIn direction="up">
          <Badge tone="dark">{restaurantPage.badge}</Badge>
        </FadeIn>
        <FadeIn direction="up" delay={100}>
          <h1 className="section-heading mt-6">{restaurantPage.heading}</h1>
        </FadeIn>
        <FadeIn direction="up" delay={150}>
          <p className="text-[color:var(--color-neutral-600)] mb-8">{restaurantPage.subheading}</p>
        </FadeIn>

        <FadeIn direction="up" delay={175}>
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/9] mb-14">
            <img
              src={restaurantPage.bannerImage.url}
              alt={restaurantPage.bannerImage.alt}
              loading="eager"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>
        </FadeIn>

        <div className="flex flex-wrap gap-3 mb-16">
          <a
            href={buildWhatsAppLink(brand.whatsappNumber, orderMessage)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Order on WhatsApp
          </a>
          <a href={`tel:${brand.phone.replace(/\s+/g, "")}`} className="btn-outline-dark">
            Call to order
          </a>
        </div>

        {/* Hot Beverages & Snacks — photo left, list right */}
        <FadeIn direction="up">
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] order-2 lg:order-1">
              <img
                src={restaurantPage.teaImage.url}
                alt={restaurantPage.teaImage.alt}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(event) => (event.currentTarget.style.display = "none")}
              />
            </div>
            <div className="order-1 lg:order-2">
              <CategoryHeading>{beverages.name}</CategoryHeading>
              <CategoryList items={beverages.items} />
            </div>
          </div>
        </FadeIn>

        {/* Food — list left, photo right */}
        <FadeIn direction="up">
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
            <div>
              <CategoryHeading>{food.name}</CategoryHeading>
              <CategoryList items={food.items} />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
              <img
                src={restaurantPage.mainsImage.url}
                alt={restaurantPage.mainsImage.alt}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(event) => (event.currentTarget.style.display = "none")}
              />
            </div>
          </div>
        </FadeIn>

        {/* Soft Drinks — list only, two columns */}
        <FadeIn direction="up">
          <div className="mb-8">
            <CategoryHeading>{softDrinks.name}</CategoryHeading>
            <div className="grid sm:grid-cols-2 gap-x-10">
              <CategoryList items={softDrinks.items.slice(0, Math.ceil(softDrinks.items.length / 2))} />
              <CategoryList items={softDrinks.items.slice(Math.ceil(softDrinks.items.length / 2))} />
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={100}>
          <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-[color:var(--color-neutral-200)]">
            <a
              href={buildWhatsAppLink(brand.whatsappNumber, orderMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Order on WhatsApp
            </a>
            <a href={`tel:${brand.phone.replace(/\s+/g, "")}`} className="btn-outline-dark">
              Call to order
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}