// HomePage.jsx
// Static visual mockup only — no state, no logic, no real data/images.
// Built to be pasted into a Vite + React + Tailwind v4 project and reskinned.
// Add these two lines inside <head> in index.html for the fonts used below:
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">

export default function App() {
  return (
    <div className="bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ================= NAVBAR ================= */}
      <header className="bg-teal-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <p
            className="text-xl tracking-wide font-semibold"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            KINGSTON COMPLEX
          </p>
          <nav className="hidden md:flex items-center gap-8 text-sm text-teal-100">
            <a href="#" className="hover:text-white">Home</a>
            <a href="#" className="hover:text-white">Accommodation</a>
            <a href="#" className="hover:text-white">Conference hall</a>
            <a href="#" className="hover:text-white">Restaurant &amp; bar</a>
            <a href="#" className="hover:text-white">Contact</a>
          </nav>
          <button className="bg-amber-500 hover:bg-amber-400 text-teal-950 text-sm font-semibold px-4 py-2 rounded-md">
            Book now
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative bg-stone-800 text-white">
        <div className="h-[520px] flex items-center justify-center text-stone-500 text-sm border-b border-stone-700">
          hero photo — complex exterior / rooms at dusk
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-20 max-w-3xl">
          <p className="text-amber-400 text-sm font-medium tracking-widest mb-3">MAKINDU, ON THE NAIROBI–MOMBASA HIGHWAY</p>
          <h1
            className="text-5xl md:text-6xl font-semibold leading-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Your stop between two cities
          </h1>
          <p className="text-stone-200 text-lg mb-8 max-w-xl">
            Rooms, a conference hall, a restaurant and a bar — all under one roof, open every day of the week.
          </p>
          <div className="flex gap-4">
            <button className="bg-amber-500 hover:bg-amber-400 text-teal-950 font-semibold px-6 py-3 rounded-md">
              Book a room
            </button>
            <button className="border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-md">
              Reserve conference hall
            </button>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS STRIP ================= */}
      <section className="bg-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Highlight label="6 rooms across 3 tiers" />
          <Highlight label="120-seat conference hall" />
          <Highlight label="Open daily, 6am – 11pm" />
          <Highlight label="Secure parking on site" />
        </div>
      </section>

      {/* ================= ACCOMMODATION ================= */}
      <SectionWrap id="accommodation">
        <Overline>Accommodation</Overline>
        <SectionHeading>A room for every stay</SectionHeading>
        <p className="text-stone-500 max-w-2xl mb-10">
          Three tiers, all with hot showers — pick what suits your trip, from a quick overnight stop to a longer stay.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <RoomTeaser name="Standard" price="KSh 1,000 / night" desc="Hot shower, bottled water" />
          <RoomTeaser name="Deluxe" price="KSh 2,000 / night" desc="Hot shower, TV, breakfast included" featured />
          <RoomTeaser name="Executive" price="KSh 3,500 / night" desc="Hot shower, TV, breakfast, work desk" />
        </div>
        <button className="mt-8 text-teal-800 font-semibold text-sm border-b-2 border-amber-500 pb-1">
          View all rooms →
        </button>
      </SectionWrap>

      {/* ================= CONFERENCE HALL ================= */}
      <section className="bg-stone-50">
        <SectionWrap id="conference">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-72 bg-stone-200 rounded-xl flex items-center justify-center text-stone-400 text-sm">
              conference hall photo
            </div>
            <div>
              <Overline>Conference hall</Overline>
              <SectionHeading>Space to meet, seminar or celebrate</SectionHeading>
              <p className="text-stone-500 mb-6">
                Seats up to 120 guests, with equipment and catering add-ons available depending on what your event needs.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Projector", "PA system", "Water", "Soda", "Full catering"].map((tag) => (
                  <span key={tag} className="text-xs bg-white border border-stone-200 text-stone-600 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="bg-teal-800 hover:bg-teal-900 text-white font-semibold px-6 py-3 rounded-md text-sm">
                Get a quote
              </button>
            </div>
          </div>
        </SectionWrap>
      </section>

      {/* ================= RESTAURANT ================= */}
      <SectionWrap id="restaurant">
        <Overline>Restaurant</Overline>
        <SectionHeading>Cooked fresh, served daily</SectionHeading>
        <p className="text-stone-500 max-w-2xl mb-10">Browse the menu, then call or send a WhatsApp message to place your order.</p>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <MenuRow name="Ugali & beef stew" price="KSh 350" />
          <MenuRow name="Pilau with kachumbari" price="KSh 400" />
          <MenuRow name="Grilled chicken & chips" price="KSh 500" />
          <MenuRow name="Fish fillet & rice" price="KSh 450" />
        </div>
        <button className="bg-teal-800 hover:bg-teal-900 text-white font-semibold px-6 py-3 rounded-md text-sm">
          View full menu
        </button>
      </SectionWrap>

      {/* ================= BAR ================= */}
      <section className="bg-stone-800 text-white">
        <SectionWrap id="bar">
          <p className="text-amber-400 text-sm font-medium tracking-widest mb-3">BAR</p>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Cold drinks, good company
          </h2>
          <p className="text-stone-300 max-w-2xl mb-10">
            Full drinks menu below. Hosting a private function? The whole bar is available to reserve.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <MenuRow dark name="Tusker" price="KSh 250" />
            <MenuRow dark name="White Cap" price="KSh 250" />
            <MenuRow dark name="Soda (500ml)" price="KSh 80" />
            <MenuRow dark name="Water (500ml)" price="KSh 50" />
          </div>
          <button className="border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-md text-sm">
            Reserve the bar for a private event
          </button>
        </SectionWrap>
      </section>

      {/* ================= WHY US ================= */}
      <SectionWrap>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <WhyItem label="M-Pesa & Pochi accepted" />
          <WhyItem label="24/7 reception" />
          <WhyItem label="Free WiFi throughout" />
          <WhyItem label="Easy highway access" />
        </div>
      </SectionWrap>

      {/* ================= LOCATION / CONTACT ================= */}
      <section className="bg-stone-50">
        <SectionWrap>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Overline>Find us</Overline>
              <SectionHeading>Right on the highway in Makindu</SectionHeading>
              <p className="text-stone-500 mb-6">
                Easy to spot, easy to reach — whether you're passing through or planning ahead.
              </p>
              <div className="space-y-2 text-sm text-stone-600">
                <p>📍 A109 Highway, Makindu, Makueni County</p>
                <p>📞 0700 000 000</p>
                <p>💬 WhatsApp: 0700 000 000</p>
              </div>
              <button className="mt-6 bg-amber-500 hover:bg-amber-400 text-teal-950 font-semibold px-6 py-3 rounded-md text-sm">
                Chat on WhatsApp
              </button>
            </div>
            <div className="h-64 bg-stone-200 rounded-xl flex items-center justify-center text-stone-400 text-sm">
              map placeholder
            </div>
          </div>
        </SectionWrap>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-teal-950 text-teal-200">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-white font-semibold text-lg mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              KINGSTON COMPLEX
            </p>
            <p className="text-teal-400">Rooms, conference hall, restaurant and bar in Makindu.</p>
          </div>
          <div>
            <p className="text-white font-medium mb-2">Quick links</p>
            <div className="space-y-1 text-teal-400">
              <p>Accommodation</p>
              <p>Conference hall</p>
              <p>Restaurant &amp; bar</p>
            </div>
          </div>
          <div>
            <p className="text-white font-medium mb-2">Contact</p>
            <div className="space-y-1 text-teal-400">
              <p>A109 Highway, Makindu</p>
              <p>0700 000 000</p>
            </div>
          </div>
        </div>
        <div className="border-t border-teal-900 text-center text-xs text-teal-500 py-4">
          © 2026 Kingston Complex. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* ---------------- helper components ---------------- */

function SectionWrap({ children, id }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-6 py-20">
      {children}
    </section>
  );
}

function Overline({ children }) {
  return <p className="text-amber-600 text-sm font-medium tracking-widest mb-3">{children}</p>;
}

function SectionHeading({ children }) {
  return (
    <h2
      className="text-3xl md:text-4xl font-semibold text-stone-900 mb-4"
      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      {children}
    </h2>
  );
}

function Highlight({ label }) {
  return (
    <div>
      <p className="text-sm text-teal-100">{label}</p>
    </div>
  );
}

function RoomTeaser({ name, price, desc, featured }) {
  return (
    <div
      className={`rounded-xl p-5 border ${
        featured ? "border-amber-400 bg-amber-50" : "border-stone-200 bg-white"
      }`}
    >
      <div className="h-32 bg-stone-200 rounded-lg mb-4 flex items-center justify-center text-stone-400 text-xs">
        room photo
      </div>
      <p className="font-semibold text-stone-900">{name}</p>
      <p className="text-amber-700 text-sm font-medium mb-2">{price}</p>
      <p className="text-stone-500 text-sm">{desc}</p>
    </div>
  );
}

function MenuRow({ name, price, dark }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
        dark ? "border-white/10 bg-white/5" : "border-stone-200 bg-stone-50"
      }`}
    >
      <p className={dark ? "text-stone-100" : "text-stone-700"}>{name}</p>
      <p className={dark ? "text-amber-400 font-medium" : "text-amber-700 font-medium"}>{price}</p>
    </div>
  );
}

function WhyItem({ label }) {
  return (
    <div>
      <div className="w-10 h-10 rounded-full bg-teal-50 mx-auto mb-3" />
      <p className="text-sm text-stone-600">{label}</p>
    </div>
  );
}