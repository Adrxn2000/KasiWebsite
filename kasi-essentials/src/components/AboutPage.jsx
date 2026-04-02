import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package, Users, Star, Zap } from 'lucide-react';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function AboutPage() {
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView(0.1);
  const [missionRef, missionInView] = useInView(0.1);
  const [valuesRef, valuesInView] = useInView(0.1);
  const [teamRef, teamInView] = useInView(0.1);

  const values = [
    {
      icon: Package,
      title: 'Quality First',
      desc: 'Every item on our platform is hand-picked and verified. We only carry brands that meet our standard for craftsmanship and authenticity.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      desc: 'We exist to uplift Kasi designers and give them a platform to reach customers they could never reach on their own.',
    },
    {
      icon: Star,
      title: 'Customer First',
      desc: 'From browsing to delivery, your experience matters. We\'re building something our community is proud to use.',
    },
    {
      icon: Zap,
      title: 'Always Fresh',
      desc: 'New drops weekly. We stay connected to the streets so you never miss what\'s next in Kasi fashion.',
    },
  ];

  const brands = [
    { name: 'Balaclava', desc: 'Bold graphics, street-ready cuts.' },
    { name: 'Damnationdesign', desc: 'Dark aesthetics, heavy culture.' },
    { name: 'Galbakaline', desc: 'Township-born, world-ready.' },
    { name: 'Umelu', desc: 'Accessories with identity.' },
  ];

  return (
    <div className="bg-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative py-24 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,165,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        <div ref={heroRef} className="container mx-auto px-4 relative z-10">
          <div
            style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}
          >
            <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-4">Our Story</p>
          </div>
          <h1
            className="text-white font-black leading-none mb-6"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontFamily: "'Impact', sans-serif",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            BORN IN THE<br />
            <span className="text-orange-500">KASI.</span>
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl leading-relaxed"
            style={{ opacity: heroInView ? 1 : 0, transition: 'all 0.6s ease 0.4s' }}
          >
            Kasi Essentials started with a simple belief — that the most authentic fashion 
            in South Africa comes from the township. Not the mall. Not overseas. 
            From the streets where culture is made every day.
          </p>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-12 mt-12 pt-8 border-t border-gray-800"
            style={{ opacity: heroInView ? 1 : 0, transition: 'all 0.6s ease 0.6s' }}
          >
            {[
              { value: '2025', label: 'Founded' },
              { value: '5+', label: 'Local Brands' },
              { value: 'JHB', label: 'Home Base' },
              { value: '100%', label: 'Kasi Made' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-orange-400 font-black text-4xl" style={{ fontFamily: "'Impact', sans-serif" }}>
                  {stat.value}
                </p>
                <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section ref={missionRef} className="py-20 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              style={{ opacity: missionInView ? 1 : 0, transform: missionInView ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.7s ease' }}
            >
              <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-4">Our Mission</p>
              <h2
                className="text-white font-black leading-none mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Impact', sans-serif" }}
              >
                BRIDGE BETWEEN<br />DESIGNER AND DRIP
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  We built Kasi Essentials to solve a real problem — talented local designers 
                  with no platform to reach their people. At the same time, fashion lovers 
                  with no easy way to find authentic Kasi brands.
                </p>
                <p>
                  We're the bridge. A marketplace built for the culture, by the culture.
                  Every purchase directly supports a South African designer building something real.
                </p>
                <p>
                  Founded in Johannesburg in 2025, we're just getting started.
                </p>
              </div>
              <button
                onClick={() => navigate('/shop')}
                className="mt-8 group flex items-center gap-3 bg-orange-500 text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-orange-400 transition-colors"
              >
                Shop The Collection
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Visual panel */}
            <div
              className="relative"
              style={{ opacity: missionInView ? 1 : 0, transform: missionInView ? 'translateX(0)' : 'translateX(30px)', transition: 'all 0.7s ease 0.2s' }}
            >
              <div className="bg-gray-950 border border-gray-800 p-8 relative">
                <div className="absolute top-0 left-0 w-16 h-1 bg-orange-500" />
                <blockquote className="text-white font-black text-2xl leading-tight mb-6"
                  style={{ fontFamily: "'Impact', sans-serif" }}>
                  "THE MOST AUTHENTIC FASHION IN SA COMES FROM THE STREETS."
                </blockquote>
                <div className="flex items-center gap-3 pt-6 border-t border-gray-800">
                  <div className="w-10 h-10 bg-orange-500 flex items-center justify-center">
                    <span className="text-black font-black text-sm">KE</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Kasi Essentials</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">Johannesburg, 2025</p>
                  </div>
                </div>
              </div>
              {/* Decorative block */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500/10 border border-orange-500/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} className="py-20 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div
            className="mb-12"
            style={{ opacity: valuesInView ? 1 : 0, transform: valuesInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-3">What We Stand For</p>
            <h2 className="text-white font-black text-4xl md:text-5xl leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
              OUR VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-black p-8 hover:bg-gray-950 transition-colors group"
                style={{
                  opacity: valuesInView ? 1 : 0,
                  transform: valuesInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${i * 0.1}s`,
                }}
              >
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <Icon size={22} className="text-orange-400" />
                </div>
                <h3 className="text-white font-black text-xl uppercase tracking-wide mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section ref={teamRef} className="py-20 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div
            className="mb-12"
            style={{ opacity: teamInView ? 1 : 0, transition: 'all 0.6s ease' }}
          >
            <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-3">The Brands</p>
            <h2 className="text-white font-black text-4xl md:text-5xl leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
              WHO WE CARRY
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800">
            {brands.map((brand, i) => (
              <div
                key={i}
                className="bg-black p-8 hover:bg-gray-950 transition-colors cursor-pointer group"
                style={{
                  opacity: teamInView ? 1 : 0,
                  transition: `all 0.5s ease ${i * 0.1}s`,
                }}
                onClick={() => navigate('/shop')}
              >
                <div className="w-8 h-1 bg-orange-500 mb-6 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-white font-black text-xl uppercase tracking-wide mb-2">{brand.name}</h3>
                <p className="text-gray-500 text-sm">{brand.desc}</p>
                <p className="text-orange-400 text-xs font-black uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Brand →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-500" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2
            className="text-black font-black leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontFamily: "'Impact', sans-serif" }}
          >
            JOIN THE MOVEMENT
          </h2>
          <p className="text-black/70 text-lg mb-8 max-w-xl mx-auto">
            Support local. Wear authentic. Represent your roots.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/shop')}
              className="bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-gray-900 transition-colors"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-black text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-black/10 transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;