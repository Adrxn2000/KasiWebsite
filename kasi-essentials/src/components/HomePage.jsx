import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App.jsx';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';

// Simple intersection observer hook for scroll animations
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

const brands = [
  { name: 'Balaclava', color: '#ff4500' },
  { name: 'Damnationdesign', color: '#ffffff' },
  { name: 'Galbakaline', color: '#ff6b00' },
  { name: 'Umelu', color: '#ffffff' },
  { name: 'Kasi Original', color: '#ff4500' },
];

function AnimatedProductCard({ product, index }) {
  const [ref, inView] = useInView(0.1);
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden bg-gray-900 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-end ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="p-4 w-full">
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="w-full bg-orange-500 text-black py-3 font-black uppercase tracking-widest text-sm hover:bg-orange-400 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-black text-orange-400 text-xs font-black uppercase tracking-widest px-2 py-1">
          {product.category}
        </div>
      </div>
      <div className="pt-3">
        <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">{product.brand}</p>
        <h3 className="text-white font-black text-lg leading-tight">{product.name}</h3>
        <p className="text-orange-500 font-black text-xl mt-1">R{product.price}</p>
      </div>
    </div>
  );
}

function HomePage() {
  const { products, addToCart } = useContext(AppContext);
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 4);
  const [heroRef, heroInView] = useInView(0.1);
  const [brandsRef, brandsInView] = useInView(0.1);
  const [featuredRef, featuredInView] = useInView(0.1);

  return (
    <div className="bg-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,165,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
          {/* Orange glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div ref={heroRef} className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Tag line */}
            <div
              className="inline-flex items-center gap-2 border border-orange-500/50 px-3 py-1.5 mb-8"
              style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}
            >
              <Zap size={12} className="text-orange-400" fill="currentColor" />
              <span className="text-orange-400 text-xs font-bold uppercase tracking-[0.3em]">New Season · 2025</span>
            </div>

            {/* Main headline */}
            <h1
              className="font-black leading-none mb-6"
              style={{
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                fontFamily: "'Impact', 'Arial Black', sans-serif",
              }}
            >
              <span className="text-white">WEAR THE</span>
              <br />
              <span className="text-orange-500">KASI</span>
              <span className="text-white"> SPIRIT</span>
            </h1>

            <p
              className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed"
              style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.4s' }}
            >
              Authentic streetwear from the township to the world. 
              Curated local brands, delivered to your door.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.5s' }}
            >
              <button
                onClick={() => navigate('/shop')}
                className="group flex items-center gap-3 bg-orange-500 text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-orange-400 transition-colors"
              >
                Shop Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/about')}
                className="flex items-center gap-3 border border-white/30 text-white px-8 py-4 font-black uppercase tracking-widest hover:border-orange-500 hover:text-orange-400 transition-colors"
              >
                Our Story
              </button>
            </div>

            {/* Stats */}
            <div
              className="flex gap-12 mt-16 pt-8 border-t border-gray-800"
              style={{ opacity: heroInView ? 1 : 0, transition: 'all 0.6s ease 0.7s' }}
            >
              {[
                { value: '5+', label: 'Local Brands' },
                { value: '100%', label: 'Kasi Made' },
                { value: 'JHB', label: 'Based' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-orange-400 font-black text-3xl">{stat.value}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling text marquee */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-orange-500/20 py-3 bg-black/50">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array(3).fill(['KASI ESSENTIALS', 'STREETWEAR', 'LOCAL IS LEKKER', 'NEW DROPS', 'AUTHENTIC BRANDS']).flat().map((text, i) => (
              <span key={i} className="text-orange-500/40 text-xs font-black uppercase tracking-[0.3em] mx-8">
                {text} ·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BRANDS ── */}
      <section ref={brandsRef} className="py-20 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12"
            style={{ opacity: brandsInView ? 1 : 0, transform: brandsInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-3">Featured Brands</p>
            <h2 className="text-white font-black text-4xl" style={{ fontFamily: "'Impact', sans-serif" }}>
              THE NAMES YOU KNOW
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gray-800">
            {brands.map((brand, i) => (
              <div
                key={i}
                className="bg-black py-8 px-4 flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors group"
                style={{
                  opacity: brandsInView ? 1 : 0,
                  transition: `all 0.5s ease ${i * 0.08}s`,
                }}
                onClick={() => navigate('/shop')}
              >
                <span
                  className="font-black uppercase text-center text-sm tracking-widest group-hover:text-orange-400 transition-colors"
                  style={{ color: brand.color === '#ffffff' ? '#6b7280' : brand.color }}
                >
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section ref={featuredRef} className="py-20">
        <div className="container mx-auto px-4">
          <div
            className="flex items-end justify-between mb-12"
            style={{ opacity: featuredInView ? 1 : 0, transform: featuredInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            <div>
              <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-2">Fresh Drops</p>
              <h2 className="text-white font-black text-4xl md:text-5xl leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                NEW ARRIVALS
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="hidden md:flex items-center gap-2 text-orange-400 font-black uppercase text-sm tracking-widest hover:text-orange-300 transition-colors group"
            >
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <AnimatedProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <button
              onClick={() => navigate('/shop')}
              className="bg-orange-500 text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-orange-400 transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-gray-950 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-px bg-gray-800">
            {[
              { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide shipping. Get your drip delivered fast.' },
              { icon: Shield, title: '100% Authentic', desc: 'Every piece sourced directly from verified local brands.' },
              { icon: Zap, title: 'New Drops Weekly', desc: 'Fresh streetwear added every week. Stay ahead.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-gray-950 p-10 group hover:bg-black transition-colors">
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <Icon size={24} className="text-orange-400" />
                </div>
                <h3 className="text-white font-black text-xl uppercase tracking-wide mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-500" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-black font-black leading-none mb-6" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontFamily: "'Impact', sans-serif" }}>
            REPRESENT YOUR ROOTS
          </h2>
          <p className="text-black/70 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of Kasi fashion lovers. New styles drop every week.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-gray-900 transition-colors"
          >
            Shop The Collection
          </button>
        </div>
      </section>

      {/* Marquee CSS */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default HomePage;