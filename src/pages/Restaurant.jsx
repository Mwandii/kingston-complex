import { restaurantPage, brand } from "../data/siteData";
import { buildWhatsAppLink } from "../utils/whatsapp";
import FadeIn from "../components/ui/FadeIn";
import Badge from "../components/ui/Badge";
import MenuRow from "../components/ui/MenuRow";

const orderMessage = "Hi, I'd like to place an order.";

/**
 * Full restaurant menu, grouped by category. Ordering here is
 * deliberately simple — no cart, no per-item selection — just a call
 * or WhatsApp CTA, matching how the kitchen actually takes orders.
 */
export default function Restaurant() {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container max-w-3xl">
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
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/9] mb-10">
            <img
              src={restaurantPage.bannerImage.url}
              alt={restaurantPage.bannerImage.alt}
              loading="eager"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={200}>
          <div className="flex flex-wrap gap-3 mb-12">
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

        <div className="space-y-10">
          {restaurantPage.menu.map((section, sectionIndex) => (
            <FadeIn direction="up" delay={100 + sectionIndex * 80} key={section.category}>
              <div>
                <h2 className="text-lg font-semibold text-[color:var(--color-neutral-900)] mb-4">
                  {section.category}
                </h2>

                {section.image ? (
                  <div className="grid sm:grid-cols-2 gap-6 items-center">
                    <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] order-2 sm:order-1">
                      <img
                        src={section.image.url}
                        alt={section.image.alt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(event) => (event.currentTarget.style.display = "none")}
                      />
                    </div>
                    <div className="grid gap-3 order-1 sm:order-2">
                      {section.items.map((item) => (
                        <MenuRow key={item.name} name={item.name} price={item.price} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {section.items.map((item) => (
                      <MenuRow key={item.name} name={item.name} price={item.price} />
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={500}>
          <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-[color:var(--color-neutral-200)]">
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