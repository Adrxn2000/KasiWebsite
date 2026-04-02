import React, { useState, useRef, useEffect } from 'react';
import { Mail, MessageSquare, MapPin, Instagram, ArrowRight, Check } from 'lucide-react';

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

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [heroRef, heroInView] = useInView(0.1);
  const [formRef, formInView] = useInView(0.1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contacts = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'hello@kasiessentials.co.za',
      sub: 'We reply within 24 hours',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@kasiessentials',
      sub: 'DMs open for collabs',
    },
    {
      icon: MapPin,
      label: 'Based In',
      value: 'Johannesburg, SA',
      sub: 'Gauteng represent',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      value: '+27 000 000 000',
      sub: 'Mon–Fri, 9am–5pm',
    },
  ];

  const subjects = ['General Enquiry', 'Order Issue', 'Brand Partnership', 'Media & Press', 'Other'];

  return (
    <div className="bg-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative py-20 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,165,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />

        <div ref={heroRef} className="container mx-auto px-4 relative z-10">
          <div style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
            <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-4">Get In Touch</p>
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
            LET'S<br />
            <span className="text-orange-500">TALK.</span>
          </h1>
          <p
            className="text-gray-400 text-lg max-w-xl leading-relaxed"
            style={{ opacity: heroInView ? 1 : 0, transition: 'all 0.6s ease 0.4s' }}
          >
            Got questions about an order? Want to collab? Representing a brand that belongs on our platform?
            Hit us up — we read every message.
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="py-12 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800">
            {contacts.map(({ icon: Icon, label, value, sub }, i) => (
              <div key={i} className="bg-black p-6 hover:bg-gray-950 transition-colors group">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Icon size={18} className="text-orange-400" />
                </div>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white font-bold text-sm mb-1">{value}</p>
                <p className="text-gray-600 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section ref={formRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Form */}
            <div
              style={{ opacity: formInView ? 1 : 0, transform: formInView ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.7s ease' }}
            >
              <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-3">Send A Message</p>
              <h2 className="text-white font-black text-3xl mb-8" style={{ fontFamily: "'Impact', sans-serif" }}>
                DROP US A LINE
              </h2>

              {submitted ? (
                <div className="border border-green-500/30 bg-green-500/5 p-8 text-center">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-black text-xl uppercase tracking-wide mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm mb-6">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-orange-400 font-black uppercase tracking-widest text-sm hover:text-orange-300 transition-colors"
                  >
                    Send Another →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Full name"
                        className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                        className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 outline-none focus:border-orange-500 transition-colors text-sm"
                    >
                      <option value="" disabled>Select a subject</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      placeholder="What's on your mind..."
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-black py-4 font-black uppercase tracking-widest hover:bg-orange-400 disabled:opacity-50 transition-colors flex items-center justify-center gap-3 group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info Panel */}
            <div
              className="space-y-8"
              style={{ opacity: formInView ? 1 : 0, transform: formInView ? 'translateX(0)' : 'translateX(30px)', transition: 'all 0.7s ease 0.2s' }}
            >
              <div>
                <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-3">Brand Partnerships</p>
                <h2 className="text-white font-black text-3xl mb-4" style={{ fontFamily: "'Impact', sans-serif" }}>
                  GOT A BRAND?
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                  We're always looking for authentic Kasi brands to add to our platform.
                  If you're a designer or label with fire product, reach out.
                  We'll review your brand and get back to you within 3 business days.
                </p>
              </div>

              <div className="border border-gray-800 p-6">
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-4">What We Look For</p>
                <div className="space-y-3">
                  {[
                    'Authentic Kasi or South African brand identity',
                    'Consistent product quality and craftsmanship',
                    'Active social media presence',
                    'Ability to fulfill orders reliably',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-400 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/5 border border-orange-500/20 p-6">
                <p className="text-orange-400 font-black uppercase text-sm tracking-widest mb-2">Response Times</p>
                <div className="space-y-2">
                  {[
                    ['General enquiries', '24 hours'],
                    ['Order issues', '12 hours'],
                    ['Brand partnerships', '3 business days'],
                    ['Media & press', '48 hours'],
                  ].map(([type, time]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs">{type}</span>
                      <span className="text-orange-400 text-xs font-bold">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM BANNER ── */}
      <section className="py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-xs uppercase tracking-[0.4em] mb-3">Kasi Essentials · Johannesburg · 2025</p>
          <p className="text-white font-black text-2xl" style={{ fontFamily: "'Impact', sans-serif" }}>
            KASI MADE. KASI PROUD.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;