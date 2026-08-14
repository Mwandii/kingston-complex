/**
 * Smooth-scrolls to an in-page section by its href (e.g. "#accommodation").
 * Accepts the triggering event so callers can prevent default anchor jump
 * behaviour in one place instead of repeating it at every call site.
 *
 * @param {React.MouseEvent} event
 * @param {string} href - target section id, including the leading "#"
 */
export function scrollToSection(event, href) {
  event.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}