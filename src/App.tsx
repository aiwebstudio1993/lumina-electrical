import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Lightbulb, 
  Zap, 
  Clock, 
  Activity, 
  Sliders, 
  PhoneCall, 
  CheckCircle, 
  Award, 
  HelpCircle, 
  Star, 
  MapPin, 
  User, 
  Mail, 
  MessageSquare,
  ArrowRight,
  Sparkles,
  Phone,
  ThumbsUp,
  Flame,
  CalendarCheck2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom component imports
import { HeroScene } from './components/HeroScene';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { EstimateCalculator } from './components/EstimateCalculator';
import { InteractiveCalendar } from './components/InteractiveCalendar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Types
import { Service, PortfolioItem, Testimonial, FAQ, Booking } from './types';


// Static Data definitions
const SERVICES_DATA: Service[] = [
  {
    id: 'rewire',
    title: 'Full Home Rewires',
    description: 'Complete replacement of historical, aged, or degraded electrical circuits to modern BS 7671 safety standards.',
    category: 'residential',
    details: [
      'Stripping and recycling of stale rubber cords',
      'Installation of double insulated PVC-sheathed cables',
      'Integration of fire-rated LED spotlight ports',
      'Full NICEIC compliance certificate and sign-off'
    ],
    baseCost: 1200,
    icon: 'Zap'
  },
  {
    id: 'consumer-unit',
    title: 'Dual RCD Fuseboards',
    description: 'Upgrading weak, unsafe traditional wire fuses to premium metal distribution boards with dual RCD protection.',
    category: 'residential',
    details: [
      'High-grade fire-safe dual metal enclosure unit',
      'Individual circuit RCBO safety breakers',
      'Integrated Type 2 surge protection device (SPD)',
      '6-Year Workmanship Warranty'
    ],
    baseCost: 550,
    icon: 'Shield'
  },
  {
    id: 'ev-charger',
    title: 'Smart EV Charging',
    description: 'Wall-mounted rapid electric vehicle chargers with smart load balancing and mobile app connectivity.',
    category: 'ev-charger',
    details: [
      'Type 1 or Type 2 generic EV sockets (7.2kW / 22kW)',
      'Built-in PEN fault protective grounding systems',
      'Integrated solar-panel routing compatibility',
      'OZEV grant-compliant accredited installation'
    ],
    baseCost: 750,
    icon: 'Activity'
  },
  {
    id: 'commercial',
    title: 'Commercial Distribution',
    description: 'Multi-phase industrial refits, trunking, dynamic cable tray trays, and high-density electrical grid matrices.',
    category: 'commercial',
    details: [
      '3-Phase distribution board installation',
      'Steel wire armored (SWA) heavy line cabling',
      'Emergency light escape path design & certification',
      'Comprehensive EICR safety testing and reporting'
    ],
    baseCost: 1800,
    icon: 'Lightbulb'
  },
  {
    id: 'smart-home',
    title: 'Loxone Smart Automation',
    description: 'Centralized microchip-programmed home control for intelligent dimming, thermal zoning, and automated shades.',
    category: 'smart-home',
    details: [
      'Integrated motion-sensor path guidance',
      'Multi-room audio matrices & digital dimmers',
      'Centralized equipment server rack architecture',
      'iPad or wall-mounted touch panel consoles'
    ],
    baseCost: 1500,
    icon: 'Sliders'
  },
  {
    id: 'emergency',
    title: '24/7 Emergency Response',
    description: 'Rapid diagnostic dispatch to find, isolate, and neutralize power blackouts, circuit failures, and sparks.',
    category: 'emergency',
    details: [
      'Assured 60-Minute emergency response target',
      'Advanced thermal camera diagnostic scanning',
      'Immediate temporary power bypass rigs',
      'Safety certification and permanent fix estimates'
    ],
    baseCost: 120,
    icon: 'PhoneCall'
  }
];

const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Lichfield Townhouse Smart Refit',
    category: 'smart-home',
    description: 'A comprehensive whole-home automated lighting scheme featuring central server-controlled brass switch plates.',
    imageUrl: 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    title: 'Commercial Distribution Board Refit',
    category: 'commercial',
    description: 'Replacement of dual phase distribution boards in an office complex with armored trunks and active SPD breakers.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3',
    title: 'Home EV Charging Installation',
    category: 'ev',
    description: 'Twin 7.4kW smart chargers installed alongside solar panels for a family home in Burton upon Trent.',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p4',
    title: 'Architectural Vaulted LED Channel',
    category: 'residential',
    description: 'Plaster-in seamless gold micro-LED strips running throughout a timber barn conversion.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
  }
];

const FAQS_DATA: FAQ[] = [
  {
    id: 'f1',
    question: 'Are you NICEIC Approved Contractors or just domestic installers?',
    answer: 'Lumina Electrical is fully registered as an NICEIC Approved Contractor (the gold-standard in the UK). This allows us to self-certify all forms of residential, commercial, industrial, and public sector operations, and file Part P building notifications directly.',
    category: 'compliance'
  },
  {
    id: 'f2',
    question: 'How long does a complete home rewire typically take?',
    answer: 'A standard 3-bedroom residential property generally takes 3 to 5 working days. We utilize dual-team mechanics to complete rewires in occupied homes with minimal disruption, restoring lighting and sockets by 5 PM every evening.',
    category: 'technical'
  },
  {
    id: 'f3',
    question: 'What is an EICR and does my commercial property need one?',
    answer: 'An Electrical Installation Condition Report (EICR) is a formal, periodic safety audit. UK regulations mandate EICRs at least once every 5 years for rental properties and commercial businesses, or immediately upon change of tenancy.',
    category: 'compliance'
  },
  {
    id: 'f4',
    question: 'Can you install fast chargers even if my fuseboard is old?',
    answer: 'We audit your incoming power supply and fuseboard first. If your current system lacks load capacity, we install an active load-balancing switch or upgrade your distribution board. This prevents main fuses from tripping during charging.',
    category: 'pricing'
  }
];

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Sir Charles Sinclair',
    role: 'Townhouse Owner, Lichfield',
    content: 'Lumina Electrical delivered a masterpiece. The bespoke brass sockets, integrated warm LEDs, and absolute cleanliness of the engineering crew was unmatched. A true gold-standard service.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Rebecca Harrington',
    role: 'Operations Director, Nova Retail',
    content: 'A serious distribution board fault shut down our main floor. Our team arrived in 35 minutes, bypassed the core hazard, and had our lighting online in under two hours. Phenomenal speed.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Marcus Vance',
    role: 'Architect, Vance & Partners',
    content: 'As architects, we demand perfection in wiring layouts and concealed fittings. Lumina Electrical is our default contractor. Their commercial conduit layouts are like gallery art.',
    rating: 5
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'work' | 'services' | 'contact' | 'book'>('home');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<'all' | 'residential' | 'commercial' | 'smart-home' | 'ev'>('all');
  const [faqSearch, setFaqSearch] = useState('');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  // Booking Form State
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'b-mock-1',
      date: '2026-07-20',
      timeSlot: '09:00 - 11:00',
      serviceId: 'rewire',
      clientName: 'Jane Smith',
      clientEmail: 'jane@example.com',
      clientPhone: '07700 900077',
      isConfirmed: true
    },
    {
      id: 'b-mock-2',
      date: '2026-07-21',
      timeSlot: '13:00 - 15:00',
      serviceId: 'ev-charger',
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      clientPhone: '07700 900099',
      isConfirmed: true
    }
  ]);

  const [bookingDate, setBookingDate] = useState('2026-07-20');
  const [bookingTime, setBookingTime] = useState('11:00 - 13:00');
  const [bookingService, setBookingService] = useState('rewire');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [bookingSuccessData, setBookingSuccessData] = useState<{ id: string; ref: string } | null>(null);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // 3D Tilt State for Hero Card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside element
    const y = e.clientY - rect.top;  // y position inside element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles based on mouse position relative to center
    // Max tilt is 12 degrees
    const tiltX = ((y - centerY) / centerY) * -12;
    const tiltY = ((x - centerX) / centerX) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const navigateToPage = (page: 'home' | 'work' | 'services' | 'contact' | 'book') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback from EstimateCalculator
  const handleEstimateBooking = (serviceLabel: string, notes: string) => {
    // Map estimator service label to actual service id
    const matchedService = SERVICES_DATA.find(s => s.title.toLowerCase().includes(serviceLabel.toLowerCase())) || SERVICES_DATA[0];
    setBookingService(matchedService.id);
    setClientNotes(notes);
    navigateToPage('book');
  };

  // Handle Form Booking
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert("Please fill in all primary client information fields.");
      return;
    }

    const newRef = `LUM-2026-${Math.floor(Math.random() * 9000 + 1000)}`;
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      date: bookingDate,
      timeSlot: bookingTime,
      serviceId: bookingService,
      clientName,
      clientEmail,
      clientPhone,
      notes: clientNotes,
      isConfirmed: true
    };

    setBookings(prev => [...prev, newBooking]);
    setBookingSuccessData({ id: newBooking.id, ref: newRef });

    // Clear form inputs
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientNotes('');
  };

  // Handle Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  // Filter portfolio items
  const filteredPortfolio = PORTFOLIO_DATA.filter(item => {
    if (selectedServiceFilter === 'all') return true;
    return item.category === selectedServiceFilter;
  });

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 flex flex-col font-sans select-none antialiased selection:bg-amber-500 selection:text-black overflow-x-hidden">
      
      {/* PERSISTENT HEADER NAVIGATION */}
      <Navbar currentPage={currentPage} onNavigate={navigateToPage} />

      {/* VIEWPORT AREA WITH ANIMATIONS */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative w-full"
            >
              {/* HERO LANDING AREA */}
              <section className="relative min-h-[100svh] flex items-end lg:items-center px-6 pb-20 pt-[52svh] lg:py-24 overflow-hidden bg-black">
                <HeroScene />

                <div className="max-w-7xl mx-auto relative z-10 w-full">
                  <div className="max-w-2xl text-left">
                    <h2 className="font-display text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.98] font-medium">
                      Light, wired <br />
                      <em className="text-amber-200 font-normal">beautifully.</em>
                    </h2>

                    <button
                      onClick={() => navigateToPage('book')}
                      className="mt-8 bg-[#f3e6cf] text-black px-6 py-3 rounded-full font-semibold tracking-wide text-sm transition-all hover:bg-white active:scale-95"
                    >
                      Book a Free Survey
                    </button>
                  </div>
                </div>
              </section>

              {/* STATS SECTION */}
              <section className="py-16 bg-[#060606] border-y border-zinc-900 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { val: '15+', label: 'Years Compliance Experience' },
                    { val: '10K+', label: 'Circuits Installed & Certified' },
                    { val: '100%', label: 'Safety Compliance Record' },
                    { val: '24/7', label: 'Urgent Dispatch Response' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center space-y-1">
                      <div className="text-3xl sm:text-4xl font-black font-mono text-amber-500 shadow-sm">{stat.val}</div>
                      <div className="text-xs text-zinc-500 font-mono tracking-wider uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* BENTO WHY CHOOSE US */}
              <section className="py-24 max-w-7xl mx-auto px-6 text-center space-y-16">
                <div className="space-y-4 max-w-2xl mx-auto">
                  <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest block">Accredited Credentials</span>
                  <h3 className="text-3xl font-display text-white font-medium">
                    Why Discerning Clients Choose Lumina Electrical
                  </h3>
                  <p className="text-sm text-zinc-500">
                    We deliver neat, carefully planned wiring and fully certified testing for residential and commercial spaces.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  {/* Card 1 */}
                  <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-display text-white mb-2 font-medium">Uncompromising Safety First</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      Every project is fully certified under BS 7671 Part P standards, City & Guilds certifications, and backed by a 6-year NICEIC Platinum Promise warranty.
                    </p>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-display text-white mb-2 font-medium">Architectural Illumination</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      We specialize in high-end brass finish plates, seamless plaster-in plaster profiles, warm LED mood scenes, and silent centralized smart server cabinet planning.
                    </p>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-display text-white mb-2 font-medium">High Performance Load Limits</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      We plan distribution grids, compute peak wattages, integrate surge systems, and commission 7.2kW and 22kW smart EV vehicle chargers with full solar sync capabilities.
                    </p>
                  </div>
                </div>
              </section>

              {/* FEATURED COMPARISON SLIDER */}
              <section className="py-20 bg-[#070707] border-y border-zinc-900 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-4 space-y-6 text-left">
                    <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest block">Engineering Artistry</span>
                    <h3 className="text-3xl font-display text-white leading-tight font-medium">
                      From Hazard to Beautifully Certified
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                      Legacy unlabelled copper wires, loose contacts, and corroded units are a serious threat. Drag our slider bar to inspect the flawless alignment, dual RCD safety switches, and armored metal conduit enclosures we bring to every property.
                    </p>
                    <button
                      onClick={() => navigateToPage('work')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-white transition-colors"
                    >
                      View Full Work Gallery <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="lg:col-span-8">
                    <BeforeAfterSlider />
                  </div>
                </div>
              </section>

              {/* TESTIMONIALS */}
              <section className="py-24 max-w-7xl mx-auto px-6 text-center space-y-16">
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest block">Client Testimonials</span>
                  <h3 className="text-3xl font-display text-white font-medium">
                    Trusted Across Staffordshire
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  {TESTIMONIALS_DATA.map((t) => (
                    <div key={t.id} className="bg-[#090909] border border-zinc-900 rounded-2xl p-6 space-y-4">
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed italic">
                        "{t.content}"
                      </p>
                      <div className="border-t border-zinc-900 pt-3 flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-white block">{t.name}</span>
                          <span className="text-[10px] text-zinc-500 font-mono block">{t.role}</span>
                        </div>
                        <ThumbsUp className="w-3.5 h-3.5 text-amber-500/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>
          )}

          {/* SERVICES PAGE */}
          {currentPage === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6 max-w-7xl mx-auto space-y-24"
            >
              {/* HEADER */}
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest block">Accredited Capabilities</span>
                <h2 className="text-4xl font-display text-white font-medium">
                  Premium Electrical Engineering Services
                </h2>
                <p className="text-sm text-zinc-500">
                  We operate to BS 7671 standards with active NICEIC Approved Contractor registrations. Select our capabilities below.
                </p>
              </div>

              {/* SERVICES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES_DATA.map((s) => {
                  return (
                    <div 
                      key={s.id} 
                      className="bg-[#090909] border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between group hover:border-amber-500/30 transition-all hover:translate-y-[-2px]"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                            {s.id === 'rewire' && <Zap className="w-5 h-5" />}
                            {s.id === 'consumer-unit' && <Shield className="w-5 h-5" />}
                            {s.id === 'ev-charger' && <Activity className="w-5 h-5" />}
                            {s.id === 'commercial' && <Lightbulb className="w-5 h-5" />}
                            {s.id === 'smart-home' && <Sliders className="w-5 h-5" />}
                            {s.id === 'emergency' && <PhoneCall className="w-5 h-5" />}
                          </div>
                          <span className="text-[10px] font-mono text-zinc-600 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded uppercase">
                            {s.category}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-display text-white mb-2 font-medium">
                            {s.title}
                          </h3>
                          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                            {s.description}
                          </p>
                        </div>

                        <div className="border-t border-zinc-900 pt-4">
                          <span className="text-[9px] font-mono text-zinc-600 block uppercase mb-2">Service Breakdown Includes</span>
                          <ul className="space-y-2">
                            {s.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-500 leading-normal">
                                <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-600 block">BASE CONTRACT PRICE</span>
                          <span className="text-md font-mono font-bold text-amber-500">From £{s.baseCost}</span>
                        </div>
                        <button
                          onClick={() => {
                            setBookingService(s.id);
                            navigateToPage('book');
                          }}
                          className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold uppercase text-white rounded hover:bg-amber-500 hover:text-black hover:border-transparent transition-colors"
                        >
                          Book Slot
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ESTIMATOR SECTION */}
              <div className="pt-12 border-t border-zinc-900">
                <EstimateCalculator onSelectBooking={handleEstimateBooking} />
              </div>

            </motion.div>
          )}

          {/* OUR WORK PAGE */}
          {currentPage === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6 max-w-7xl mx-auto space-y-16"
            >
              {/* HEADER */}
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest block">Completed Installations</span>
                <h2 className="text-4xl font-display text-white font-medium">
                  The Lumina Portfolio
                </h2>
                <p className="text-sm text-zinc-500">
                  Inspect our flawless conduit geometries, custom dimming rack server integration, and commercial board replacements.
                </p>
              </div>

              {/* SLIDER FEATURE */}
              <div className="bg-[#090909] border border-zinc-900 rounded-2xl p-6 lg:p-8 space-y-6">
                <div>
                  <h3 className="text-md font-display text-white mb-1 font-medium">
                    Featured Audit: Consumer Fuse Board Replacement
                  </h3>
                  <p className="text-xs text-zinc-500">
                    See our copper conduit alignment and layout compared directly to the old hazardous standard.
                  </p>
                </div>
                <BeforeAfterSlider />
              </div>

              {/* PORTFOLIO FILTERS */}
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'residential', label: 'Residential Homes' },
                  { id: 'commercial', label: 'Commercial Complex' },
                  { id: 'smart-home', label: 'Loxone Smart Home' },
                  { id: 'ev', label: 'EV Power Docks' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedServiceFilter(f.id as any)}
                    className={`py-2 px-4 rounded-lg font-mono text-xs uppercase tracking-wider border transition-all ${
                      selectedServiceFilter === f.id
                        ? 'bg-amber-500 border-transparent text-black font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* GALLERY GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPortfolio.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-[#090909] border border-zinc-900 rounded-xl overflow-hidden group hover:border-amber-500/20 transition-all"
                  >
                    <div className="relative aspect-video overflow-hidden bg-zinc-950">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-amber-500/20 text-[9px] text-amber-400 font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-sm text-white tracking-wide group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {/* CONTACT & FAQS PAGE */}
          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6 max-w-7xl mx-auto space-y-16"
            >
              {/* HEADER */}
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest block">Communications Terminal</span>
                <h2 className="text-4xl font-display text-white font-medium">
                  Contact & Technical Compliance FAQs
                </h2>
                <p className="text-sm text-zinc-500">
                  Submit service coordination alerts or research safety standards.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* CONTACT FORM (Left Column) */}
                <div className="lg:col-span-6 space-y-8">
                  <div className="bg-[#090909] border border-zinc-900 rounded-2xl p-6 lg:p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                    <div>
                      <h3 className="text-lg font-display text-white mb-1 font-medium">
                        Send Us a Message
                      </h3>
                      <p className="text-xs text-zinc-500">
                        File an engineering query or callout. Responses guaranteed within 2 hours.
                      </p>
                    </div>

                    {contactSuccess ? (
                      <div className="p-6 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-3 text-center">
                        <CheckCircle className="w-10 h-10 text-amber-500 mx-auto animate-bounce" />
                        <h4 className="font-display text-white text-md font-medium">Transmission Successful</h4>
                        <p className="text-xs text-zinc-400 max-w-md mx-auto leading-normal">
                          Your message has been filed securely in our routing server. A City & Guilds engineer will follow up at the email provided.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Client Full Name</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-zinc-600"><User className="w-4 h-4" /></span>
                            <input 
                              type="text" 
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="e.g. Lord Harrington"
                              className="w-full bg-[#030303] border border-zinc-900 focus:border-amber-500/50 rounded-xl p-3 pl-10 text-xs text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Email Address</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-zinc-600"><Mail className="w-4 h-4" /></span>
                            <input 
                              type="email" 
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="e.g. hq@vance-architects.co.uk"
                              className="w-full bg-[#030303] border border-zinc-900 focus:border-amber-500/50 rounded-xl p-3 pl-10 text-xs text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Service Message Requirements</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-zinc-600"><MessageSquare className="w-4 h-4" /></span>
                            <textarea 
                              required
                              rows={4}
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                              placeholder="Describe your architectural design needs, circuit breakdowns or EV specifications..."
                              className="w-full bg-[#030303] border border-zinc-900 focus:border-amber-500/50 rounded-xl p-3 pl-10 text-xs text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors resize-none"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-amber-500 text-black py-3.5 px-6 rounded-xl font-bold tracking-wider uppercase text-xs hover:bg-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all"
                        >
                          Send Message to Engineer HQ
                        </button>
                      </form>
                    )}
                  </div>

                  {/* ACTIVE GEOGRAPHIC NODE MAP (Visual Representation) */}
                  <div className="bg-[#090909] border border-zinc-900 rounded-2xl p-6 space-y-4">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> Areas We Cover
                    </h4>
                    
                    {/* Simulated vector map box */}
                    <div className="relative h-44 bg-[#030303] border border-zinc-950 rounded-xl overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                      
                      {/* Coverage circle */}
                      <div className="absolute w-32 h-32 rounded-full border border-amber-500/10 bg-amber-500/2 animate-pulse flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border border-amber-500/20 bg-amber-500/5 flex items-center justify-center">
                          <span className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b] animate-ping" />
                        </div>
                      </div>

                      {/* Map Labels */}
                      <div className="absolute top-4 left-4 text-[9px] font-mono text-zinc-600">
                        STAFFORDSHIRE & WEST MIDLANDS
                      </div>

                      <div className="absolute bottom-4 right-4 text-right text-[10px] font-mono text-zinc-400 space-y-0.5 bg-black/60 p-2 rounded border border-zinc-900">
                        <span className="text-white font-bold block uppercase">Tamworth base</span>
                        <span className="text-emerald-500">Covering 25 miles</span>
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-zinc-500 leading-normal">
                      Fully equipped vans covering Lichfield, Tamworth, Burton upon Trent, Stafford, Cannock and Sutton Coldfield, with emergency call-outs across Staffordshire and the West Midlands.
                    </p>
                  </div>
                </div>

                {/* FAQ ACCORDION (Right Column) */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-display text-white flex items-center gap-2 font-medium">
                      <HelpCircle className="w-5 h-5 text-amber-500" /> Compliance & Technical FAQS
                    </h3>
                    <input 
                      type="text" 
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                      placeholder="Search FAQs (e.g. rewire, certification, NICEIC)..."
                      className="w-full bg-[#090909] border border-zinc-900 focus:border-amber-500/50 rounded-xl p-3 text-xs text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-3.5">
                    {FAQS_DATA.filter(faq => {
                      if (!faqSearch) return true;
                      return faq.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
                             faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
                    }).map((faq) => {
                      const isOpen = activeFaq === faq.id;
                      return (
                        <div 
                          key={faq.id} 
                          className="bg-[#090909] border border-zinc-900 rounded-xl overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                            className="w-full p-4 text-left flex justify-between items-center hover:bg-zinc-950 transition-colors cursor-pointer"
                          >
                            <span className="text-xs font-bold text-white uppercase tracking-wide">
                              {faq.question}
                            </span>
                            <span className="text-amber-500 font-mono font-bold ml-4">
                              {isOpen ? '[-]' : '[+]'}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="p-4 bg-[#030303] border-t border-zinc-950 text-xs text-zinc-400 leading-relaxed font-sans space-y-2">
                              <p>{faq.answer}</p>
                              <div className="flex gap-2 justify-end pt-2">
                                <span className="text-[9px] font-mono text-zinc-600 border border-zinc-900 px-1.5 py-0.5 rounded uppercase">
                                  CATEGORY: {faq.category}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* BOOK NOW PAGE */}
          {currentPage === 'book' && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6 max-w-7xl mx-auto space-y-12"
            >
              {/* HEADER */}
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest block">Priority Appointment Terminal</span>
                <h2 className="text-4xl font-display text-white font-medium">
                  Schedule Your Compliance Survey
                </h2>
                <p className="text-sm text-zinc-500">
                  Select your slot inside our live-updating Google Calendar coordinator framework below.
                </p>
              </div>

              {/* BOOKING CONTENT GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* STEP-BY-STEP FORM (Left Side) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-[#090909] border border-zinc-900 rounded-2xl p-6 lg:p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                    <div>
                      <h3 className="text-lg font-display text-white mb-1 font-medium">
                        Priority Booking Ticket
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Locks down appointments instantly. Secured via encrypted sync protocol.
                      </p>
                    </div>

                    {bookingSuccessData ? (
                      <div className="p-6 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-4 text-center">
                        <CheckCircle className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
                        <div>
                          <h4 className="font-display text-white text-md font-medium">Booking Slot Locked</h4>
                          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                            GOOGLE CALENDAR REF: {bookingSuccessData.ref}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 max-w-md mx-auto leading-normal">
                          Success! Your survey time is locked. We have dynamically synchronized this appointment to the Google Calendar widget (visible in the adjacent grid).
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => setBookingSuccessData(null)}
                            className="text-xs font-mono text-amber-500 underline hover:text-white"
                          >
                            Book Another Ticket
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleCreateBooking} className="space-y-4">
                        
                        {/* SELECT SERVICE TYPE */}
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Service Required</label>
                          <select
                            value={bookingService}
                            onChange={(e) => setBookingService(e.target.value)}
                            className="w-full bg-[#030303] border border-zinc-900 text-xs text-zinc-200 rounded-xl p-3 outline-none focus:border-amber-500/50 cursor-pointer"
                          >
                            {SERVICES_DATA.map(s => (
                              <option key={s.id} value={s.id} className="bg-zinc-950">{s.title}</option>
                            ))}
                          </select>
                        </div>

                        {/* PRE-CHOSEN DATE & TIME (linked from Calendar) */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Target Date</label>
                            <input
                              type="text"
                              disabled
                              value={bookingDate}
                              className="w-full bg-[#030303]/50 border border-zinc-900/60 text-xs text-zinc-500 rounded-xl p-3 cursor-not-allowed font-mono"
                            />
                            <span className="text-[9px] text-zinc-600 block mt-1">Select date on calendar ▶</span>
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Selected Time Slot</label>
                            <input
                              type="text"
                              disabled
                              value={bookingTime}
                              className="w-full bg-[#030303]/50 border border-zinc-900/60 text-xs text-zinc-500 rounded-xl p-3 cursor-not-allowed font-mono"
                            />
                            <span className="text-[9px] text-zinc-600 block mt-1">Select slot on calendar ▶</span>
                          </div>
                        </div>

                        {/* CLIENT CONTACTS */}
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Your Full Name</label>
                          <input
                            type="text"
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="e.g. Marcus Vance"
                            className="w-full bg-[#030303] border border-zinc-900 focus:border-amber-500/50 rounded-xl p-3 text-xs text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Email Address</label>
                          <input
                            type="email"
                            required
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="e.g. marcus@vance.co.uk"
                            className="w-full bg-[#030303] border border-zinc-900 focus:border-amber-500/50 rounded-xl p-3 text-xs text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="e.g. 07700 900077"
                            className="w-full bg-[#030303] border border-zinc-900 focus:border-amber-500/50 rounded-xl p-3 text-xs text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Project Details</label>
                          <textarea
                            rows={3}
                            value={clientNotes}
                            onChange={(e) => setClientNotes(e.target.value)}
                            placeholder="Sockets count, incoming phase notes, preferred fuse location, estimate references..."
                            className="w-full bg-[#030303] border border-zinc-900 focus:border-amber-500/50 rounded-xl p-3 text-xs text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black py-4 px-6 rounded-xl font-bold tracking-wider uppercase text-xs hover:brightness-110 shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all"
                        >
                          Lock Appointment In Google Cal
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* SIMULATED GOOGLE CALENDAR (Right Side - satisfies "there should be room for google calender section") */}
                <div className="lg:col-span-7">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <div>
                        <h3 className="text-md font-display text-white font-medium">
                          Choose a Survey Slot
                        </h3>
                        <p className="text-xs text-zinc-500">
                          Pick a day and time that suits you for a free home survey.
                        </p>
                      </div>
                    </div>
                    
                    <InteractiveCalendar 
                      bookings={bookings}
                      selectedDate={bookingDate}
                      onSelectDate={setBookingDate}
                      selectedTime={bookingTime}
                      onSelectTime={setBookingTime}
                    />
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <Footer onNavigate={navigateToPage} />
    </div>
  );
}
