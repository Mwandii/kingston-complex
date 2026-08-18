export const brand = {
  name: "Kingston Complex",
  tagline: "Rooms, conference hall, restaurant and bar in Makindu.",
  phone: "0700 000 000",
  whatsappNumber: "254700000000", // international format, no leading +
  address: "A109 Highway, Makindu, Makueni County",
};

export const navLinks = [
  { label: "About", href: "#about", type: "hash" },
  { label: "Accommodation", href: "/rooms", type: "route" },
  { label: "Conference hall", href: "/conference", type: "route" },
  { label: "Restaurant", href: "/restaurant", type: "route" },
  { label: "Bar", href: "/bar", type: "route" },
  { label: "Reviews", href: "#reviews", type: "hash" },
  { label: "Contact", href: "#contact", type: "hash" },
];

export const hero = {
  eyebrow: "Makindu, on the Nairobi–Mombasa highway",
  headingPrefix: "Your stop between",
  headingAccent: "two cities",
  subheading:
    "Rooms, a conference hall, a restaurant and a bar — all under one roof, open every day of the week.",
  stats: [
    { value: "3", label: "Room tiers" },
    { value: "120", label: "Hall capacity" },
    { value: "Daily", label: "Open every day" },
  ],
  // Unsplash — free for commercial use, no attribution required.
  singleImage: {
    url: "https://images.unsplash.com/photo-1551016043-06ec2173531b?auto=format&fit=crop&w=1920&q=80",
    alt: "Kingston Complex — hotel, bar, accommodation and conference hall in Makindu",
  },
  collageImages: [
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      alt: "A guest room at Kingston Complex",
    },
    {
      url: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80",
      alt: "The conference hall at Kingston Complex",
    },
    {
      url: "https://images.unsplash.com/photo-1551016043-06ec2173531b?auto=format&fit=crop&w=1000&q=80",
      alt: "Kingston Complex exterior",
    },
  ],
  primaryCta: { label: "Book a room", href: "#accommodation" },
  secondaryCta: { label: "Reserve conference hall", href: "#conference" },
};