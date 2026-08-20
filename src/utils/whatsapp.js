/**
 * Builds a wa.me deep link with a prefilled message.
 * @param {string} number - international format, no leading "+"
 * @param {string} message - plain text, gets URL-encoded
 */
export function buildWhatsAppLink(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}