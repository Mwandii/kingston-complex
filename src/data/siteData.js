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

export const about = {
  badge: "About us",
  heading: "Built for travelers, loved by locals",
  paragraphs: [
    "Kingston Complex sits right on the Nairobi–Mombasa highway in Makindu — a place to break the journey, rest properly, and get back on the road. But it's just as much a part of daily life here: a spot for a cold drink after work, a family lunch, or a room full of chairs set up for a training session on a Tuesday morning.",
    "Rooms, a restaurant, a bar and a conference hall all sit under one roof, run with the kind of attention that comes from actually knowing the people who walk through the door.",
  ],
  values: [
    {
      icon: "🛏️",
      title: "One roof, everything you need",
      text: "A room, a meal, a meeting space and a drink — no need to go anywhere else.",
    },
    {
      icon: "🤝",
      title: "Warm, personal service",
      text: "Small enough to know your name, ready enough to host your event.",
    },
    {
      icon: "🚚",
      title: "Built for the road",
      text: "Secure parking and an easy stop between Nairobi and Mombasa.",
    },
  ],
  // Unsplash — free for commercial use, no attribution required.
  // Photo by Raymond Yeung: https://unsplash.com/photos/Wzo_34cS5bA
  image: {
    url: "https://images.unsplash.com/photo-1744561249162-c597c1670032?auto=format&fit=crop&w=1000&q=80",
    alt: "Warm dining and bar area at Kingston Complex",
  },
};

export const highlights = [
  { icon: "💳", label: "M-Pesa & card accepted" },
  { icon: "📶", label: "Free WiFi throughout" },
  { icon: "🕐", label: "24/7 reception" },
  { icon: "🅿️", label: "Secure on-site parking" },
];