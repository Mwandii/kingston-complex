export const brand = {
  name: "Kingston Complex Makindu",
  tagline: "Rooms, conference hall, restaurant and bar in Makindu.",
  phone: "0700 000 000",
  whatsappNumber: "254728756376", // international format, no leading +
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
  headingPrefix: "We don't compete",
  headingAccent: "We set standards",
  subheading:
    "Rooms, a conference hall, a restaurant and a bar — all under one roof, open every day of the week.",
  stats: [
    { value: "3", label: "Room tiers" },
    { value: "50", label: "Hall capacity" },
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
    "Kingston Complex sits right on the Nairobi–Mombasa highway directly opposite Makindu Motors — a place to break the journey, rest properly, and get back on the road. But it's just as much a part of daily life here: a spot for a cold drink after work, a family lunch, or a room full of chairs set up for a training session on a Tuesday morning.",
    "Rooms, a restaurant, a bar and a conference hall all sit under one roof, run with the kind of attention that comes from actually knowing the people who walk through the door.",
  ],
  values: [
    {
      icon: "bed",
      title: "One roof, everything you need",
      text: "A room, a meal, a meeting space and a drink — no need to go anywhere else.",
    },
    {
      icon: "heart",
      title: "Warm, personal service",
      text: "Small enough to know your name, ready enough to host your event.",
    },
    {
      icon: "truck",
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
  { icon: "card", label: "M-Pesa & card accepted" },
  { icon: "wifi", label: "Free WiFi throughout" },
  { icon: "clock", label: "24/7 reception" },
  { icon: "parking", label: "Secure on-site parking" },
];

export const restaurant = {
  badge: "Restaurant",
  heading: "Cooked fresh, served daily",
  subheading: "Browse the menu, then call or send a WhatsApp message to place an order.",
  menuPreview: [
    { name: "Ugali & beef stew", price: "KSh 350" },
    { name: "Pilau with kachumbari", price: "KSh 400" },
    { name: "Grilled chicken & chips", price: "KSh 500" },
    { name: "Fish fillet & rice", price: "KSh 450" },
  ],
  ctaLabel: "View full menu",
  ctaHref: "/restaurant",
  // Unsplash — free for commercial use, no attribution required.
  image: {
    url: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?auto=format&fit=crop&w=1000&q=80",
    alt: "A dish served at the Kingston Complex restaurant",
  },
};

export const bar = {
  badge: "Bar",
  heading: "Cold drinks, good company",
  subheading:
    "Full drinks menu below. Hosting a private function? The whole bar is available to reserve.",
  drinksMenu: [
    { name: "Tusker", price: "KSh 250" },
    { name: "White Cap", price: "KSh 250" },
    { name: "Soda (500ml)", price: "KSh 80" },
    { name: "Water (500ml)", price: "KSh 50" },
  ],
  ctaLabel: "Reserve the bar for a private event",
  ctaHref: "/bar",
};

export const reviewsSection = {
  badge: "Reviews",
  heading: "What guests are saying",
  subheading: "Real feedback from people who've stopped, stayed, or hosted an event here.",
};

// Seed data — starting reviews shown before anyone submits a new one.
export const initialReviews = [
  {
    id: "seed-1",
    name: "Peter Kamau",
    rating: 5,
    text: "Booked the conference hall for a training session — spacious, and the projector setup worked without any fuss.",
    date: "2026-06-12",
  },
  {
    id: "seed-2",
    name: "Ann Wanjiru",
    rating: 4,
    text: "Good stop on the way to Mombasa. Room was clean, hot shower worked, and the food came out fast.",
    date: "2026-05-28",
  },
  {
    id: "seed-3",
    name: "James Otieno",
    rating: 5,
    text: "Reserved the bar for a small birthday gathering — staff were accommodating and the place had a great atmosphere.",
    date: "2026-05-10",
  },
];

export const location = {
  badge: "Find us",
  heading: "Right on the highway in Makindu",
  subheading: "Easy to spot, easy to reach — whether you're passing through or planning ahead.",
  mapEmbedUrl: "https://maps.google.com/maps?q=Makindu,+Kenya&z=13&output=embed",
};

export const conferencePage = {
  badge: "Conference hall",
  heading: "Request a quote",
  subheading:
    "Fill in the details below and send it straight to WhatsApp — pricing depends on guest count, time, and add-ons, so you'll get an exact quote back directly.",
  timeSlots: ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–8pm)", "Full day"],
};

export const restaurantPage = {
  badge: "Restaurant",
  heading: "Full menu",
  subheading: "Call or message on WhatsApp to place an order — no need to come in first.",
  // Unsplash — free for commercial use, no attribution required.
  bannerImage: {
    url: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?auto=format&fit=crop&w=1400&q=80",
    alt: "A dish served at the Kingston Complex restaurant",
  },
  menu: [
    {
      category: "Breakfast",
      items: [
        { name: "Tea & mandazi", price: "KSh 100" },
        { name: "Eggs, sausage & toast", price: "KSh 300" },
        { name: "Porridge", price: "KSh 100" },
      ],
    },
    {
      category: "Mains",
      image: {
        url: "https://images.unsplash.com/photo-1634324092526-91f5e878b72f?auto=format&fit=crop&w=900&q=80",
        alt: "Pilau rice with meat and vegetables",
      },
      items: [
        { name: "Ugali & beef stew", price: "KSh 350" },
        { name: "Pilau with kachumbari", price: "KSh 400" },
        { name: "Grilled chicken & chips", price: "KSh 500" },
        { name: "Fish fillet & rice", price: "KSh 450" },
        { name: "Chapati & beans", price: "KSh 250" },
      ],
    },
    {
      category: "Sides",
      items: [
        { name: "Kachumbari", price: "KSh 50" },
        { name: "Sukuma wiki", price: "KSh 80" },
        { name: "Chips", price: "KSh 150" },
      ],
    },
    {
      category: "Drinks (non-alcoholic)",
      items: [
        { name: "Soda", price: "KSh 80" },
        { name: "Fresh juice", price: "KSh 150" },
        { name: "Water (500ml)", price: "KSh 50" },
      ],
    },
  ],
};

export const barPage = {
  badge: "Bar",
  heading: "Drinks menu & private events",
  subheading: "Full menu below. Hosting a private function? Reserve the whole bar for your group.",
  bannerImage: {
    url: "https://images.unsplash.com/photo-1759164707340-cca5eb4a6d42?auto=format&fit=crop&w=1400&q=80",
    alt: "Two glasses of beer on the bar counter at Kingston Complex",
  },
  reserveImage: {
    url: "https://images.unsplash.com/photo-1761936513630-7553a70f292c?auto=format&fit=crop&w=900&q=80",
    alt: "The bar counter at Kingston Complex",
  },
  menu: [
    {
      category: "Beers",
      items: [
        { name: "Tusker", price: "KSh 250" },
        { name: "White Cap", price: "KSh 250" },
        { name: "Guinness", price: "KSh 300" },
        { name: "Tusker Cider", price: "KSh 300" },
      ],
    },
    {
      category: "Spirits & cocktails",
      items: [
        { name: "Whisky (single)", price: "KSh 300" },
        { name: "Vodka (single)", price: "KSh 300" },
        { name: "Gin & tonic", price: "KSh 350" },
        { name: "Cocktail of the day", price: "KSh 400" },
      ],
    },
    {
      category: "Soft drinks & water",
      items: [
        { name: "Soda (500ml)", price: "KSh 80" },
        { name: "Fresh juice", price: "KSh 150" },
        { name: "Water (500ml)", price: "KSh 50" },
      ],
    },
  ],
};

export const conference = {
  badge: "Conference hall",
  heading: "Space to meet, train or celebrate",
  subheading:
    "Seats up to 50 guests, with equipment and catering add-ons available depending on what the event needs.",
  capacity: "50 guests",
  addOns: ["Projector", "PA system", "Water", "Soda", "Full catering"],
  ctaLabel: "Get a quote",
  ctaHref: "/conference",
  // Unsplash — free for commercial use, no attribution required.
  image: {
    url: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80",
    alt: "The conference hall at Kingston Complex",
  },
};

export const roomsPage = {
  badge: "Accommodation",
  heading: "Rooms & rates",
  subheading:
    "Every room comes with a hot shower. Pick the tier that fits the trip, then book on WhatsApp or call directly.",
};

export const accommodation = {
  badge: "Accommodation",
  heading: "A room for every kind of stay",
  subheading:
    "Three tiers, all with hot showers — pick what suits the trip, from a quick overnight stop to a longer stay.",
  viewAllHref: "/rooms",
  rooms: [
    {
      id: "standard",
      name: "Standard",
      price: "KSh 1,000",
      priceUnit: "/ night",
      capacity: "1–2 guests",
      description:
        "A simple, clean room for a quick overnight stop — everything needed for a comfortable rest before getting back on the road.",
      image: {
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        alt: "Standard room at Kingston Complex",
      },
      amenities: ["shower", "water"],
      featured: false,
    },
    {
      id: "deluxe",
      name: "Deluxe",
      price: "KSh 2,000",
      priceUnit: "/ night",
      capacity: "1–2 guests",
      description:
        "The most booked tier — a bit more space, a TV to unwind, and breakfast included in the morning before checkout.",
      image: {
        url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=800&q=80",
        alt: "Deluxe room at Kingston Complex",
      },
      amenities: ["shower", "tv", "coffee"],
      featured: true,
    },
    {
      id: "executive",
      name: "Executive",
      price: "KSh 3,500",
      priceUnit: "/ night",
      capacity: "1–3 guests",
      description:
        "The largest room, with a work desk for anyone stopping through on business — ideal for a longer stay or a working trip.",
      image: {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
        alt: "Executive room at Kingston Complex",
      },
      amenities: ["shower", "tv", "coffee", "desk"],
      featured: false,
    },
  ],
};