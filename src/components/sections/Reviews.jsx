import { reviewsSection } from "../../data/siteData";
import { useReviews } from "../../hooks/useReviews";
import FadeIn from "../ui/FadeIn";
import Badge from "../ui/Badge";
import ReviewCard from "../ui/ReviewCard";
import ReviewForm from "../ui/ReviewForm";

/**
 * Reviews section. Existing reviews render in a grid on the left/top,
 * the submission form sits alongside — submitting appends instantly to
 * the list via useReviews (Phase 1: in-memory; Phase 2: swap the hook's
 * internals for Supabase, this component doesn't change).
 */
export default function Reviews() {
  const { reviews, addReview, isLoading, isSubmitting, error } = useReviews();

  return (
    <section id="reviews" className="bg-white py-24">
      <div className="section-container">
        <FadeIn direction="up">
          <Badge tone="dark">{reviewsSection.badge}</Badge>
        </FadeIn>

        <FadeIn direction="up" delay={100}>
          <h2 className="section-heading mt-6">{reviewsSection.heading}</h2>
        </FadeIn>

        <FadeIn direction="up" delay={150}>
          <p className="text-[color:var(--color-neutral-600)] max-w-2xl mb-10">{reviewsSection.subheading}</p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5 content-start">
            {isLoading && (
              <p className="text-sm text-[color:var(--color-neutral-500)] sm:col-span-2">Loading reviews...</p>
            )}

            {!isLoading && reviews.length === 0 && (
              <p className="text-sm text-[color:var(--color-neutral-500)] sm:col-span-2">
                No reviews yet — be the first to leave one.
              </p>
            )}

            {reviews.map((review, index) => (
              <FadeIn direction="up" delay={200 + index * 80} key={review.id}>
                <ReviewCard review={review} />
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={250}>
            <ReviewForm onSubmit={addReview} isSubmitting={isSubmitting} error={error} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}