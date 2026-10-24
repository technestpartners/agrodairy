import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, ArrowRight, CheckCircle2, Globe2, Anchor, Layers,
  Calculator, Search, Award, Clock, FileCheck2,
  ChevronRight, ChevronLeft, Building2, Truck, Package, Phone, Mail, MapPin, Check,
  Star, Leaf, Scale, ChevronDown, ChevronUp, TrendingUp, Users, HeartHandshake,
  Ship, Factory, Wheat, Droplets, FlaskConical, BadgeCheck, MessageCircle
} from 'lucide-react';
import { productsService, inquiriesService, companyService } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import CommodityCard from '../components/CommodityCard';
import { 
  HeroBgDecorations,
  AboutBgDecorations,
  CatalogBgDecorations,
  WhyUsBgDecorations,
  RfqBgDecorations,
  CertificationsBgDecorations,
  FaqBgDecorations,
  HeroProductDecorations, 
  SectionProductWatermark,
  RealProductSectionFlanks
} from '../components/ProductBackgroundDecorations';

/* ===========================
   STATIC DATA
   =========================== */
const FAQS = [
  {
    q: "Where is Agro Dairy Export LLP located?",
    a: "Agro Dairy Export LLP is headquartered at Office no. -701, THE FUTURE CORNER, Sarthana, Surat-395013, Gujarat, India. Our procurement and processing centers are in the Saurashtra and Gujarat farming belts, with direct export loading through Mundra, Kandla (Deendayal), Pipavav, and Hazira ports."
  },
  {
    q: "What agricultural and dairy products does Agro Dairy export?",
    a: "We export pure Indian Cow Ghee and Buffalo Ghee, Bold Peanut Kernels (38/42 to 70/80 counts), Grains & Millets (Green Pearl/Foxtail Millet, Sorghum/Jowar, Yellow & White Maize), and Pulses (Green Moong Beans, Moong Mogar split mung, Desi Chickpeas, Kabuli Chickpeas)."
  },
  {
    q: "Can one supplier ship grains, pulses, peanuts, and dairy ghee in a single container?",
    a: "Yes. Agro Dairy Export LLP specializes in loading mixed containers. You can combine peanuts, green millet, chickpeas, pulses, and ghee within a single 20 ft or 40 ft HC container. Each product is packed separately, labeled with your buyer marks, and covered under standard comprehensive export documentation."
  },
  {
    q: "What is the minimum order quantity (MOQ) for export?",
    a: "For full container loads (FCL), typical MOQs are 19 MT for Bold Peanuts, 24–25 MT for Green Millet, Sorghum, and Pulses (20ft FCL), and 1–5 MT for Dairy Ghee. For first-time trial orders or mixed container consolidations, contact our Managing Partner J.P. Vora (+91 90233 63680) to formulate the most practical load."
  },
  {
    q: "Which Incoterms, ports, and payment terms do you work on?",
    a: "We work on FOB (Mundra, Kandla, Hazira), CIF (Cost, Insurance & Freight), and CFR terms to all major global discharge ports (Jebel Ali, Rotterdam, Haiphong, Mersin, Chittagong, etc.). Payment terms typically include Letter of Credit (L/C at sight) and Advance T/T with balance against B/L copy."
  },
  {
    q: "Which certifications and registrations does Agro Dairy hold?",
    a: "Agro Dairy Export LLP holds IEC 0817029381, GSTIN 24AAHFA3928L1Z9, APEDA RCMC No. APEDA/RCMC/2026/0892, and FSSAI Central License 10722026000148. Every export shipment includes phytosanitary, fumigation, and independent laboratory Certificate of Analysis (COA)."
  },
  {
    q: "Which documents accompany every export shipment?",
    a: "Every shipment includes a Commercial Invoice, Packing List, Clean On-Board Bill of Lading (B/L), Certificate of Origin (COO), Phytosanitary Certificate, Certified Methyl Bromide Fumigation Certificate, and Independent Laboratory Certificate of Analysis (COA)."
  },
  {
    q: "Do you offer private labeling and custom packaging?",
    a: "Yes. We offer 25 kg and 50 kg PP bags, Jute bags, 25 kg vacuum bags for peanuts and pulses, and consumer tins/jars for Cow & Buffalo Ghee, all printed with your brand logo, barcode, nutrition facts, and shipping marks on request."
  }
];

const PRODUCTS_STATIC = [
  { id: 'peanuts', name: 'Bold Peanut Kernels', category_name: 'Peanuts', slug: 'bold-peanuts', short_description: 'Sortex-clean Bold Peanuts, counts 38/42 to 70/80. Purity 99%+, moisture 7–8%. Available in 25 kg PP/Jute/Vacuum bags.', origin: 'Saurashtra, Gujarat', moq: 19, moq_unit: 'MT', grade_variety: 'Sortex 99%', is_featured: 1, main_image: '/images/products/bold-peanuts.jpg' },
  { id: 'moong', name: 'Green Moong Beans', category_name: 'Pulses', slug: 'green-moong', short_description: 'Premium Green Moong Beans, 180–270 count range. 98–99.9% purity, 12% moisture max. Ideal for retail and food processing.', origin: 'Rajkot, Gujarat', moq: 25, moq_unit: 'MT', grade_variety: 'Export Grade', is_featured: 0, main_image: '/images/products/green-moong-beans.jpg' },
  { id: 'ghee', name: 'Pure Dairy Ghee', category_name: 'Dairy Ghee', slug: 'pure-dairy-ghee', short_description: 'Pure Cow & Buffalo Granular Ghee. 99.7–99.8% milk fat, zero starch. 15 kg food-grade tins, jars or drums.', origin: 'Anand, Gujarat', moq: 1, moq_unit: 'MT', grade_variety: 'FSSAI Certified', is_featured: 1, main_image: '/images/bg/real-ghee.jpg' },
  { id: 'chickpeas', name: 'Desi Chickpeas', category_name: 'Pulses', slug: 'desi-chickpeas', short_description: 'Brown Desi Chickpeas, 5–7 mm / 6–8 mm. Purity 98–99%, moisture 12% max. 25 kg/50 kg PP or Jute bags.', origin: 'Gujarat, India', moq: 25, moq_unit: 'MT', grade_variety: 'Sortex Clean', is_featured: 0, main_image: '/images/products/desi-chickpeas.jpg' },
  { id: 'millet', name: 'Green Pearl Millet', category_name: 'Grains', slug: 'pearl-millet', short_description: 'Pearl Millet (Bajra) / Foxtail Millet. Machine & Sortex 99% purity, 11% moisture max. 24–25 MT in 20ft FCL.', origin: 'Saurashtra, Gujarat', moq: 24, moq_unit: 'MT', grade_variety: '99% Sortex', is_featured: 0, main_image: '/images/bg/pearl-millet.jpg' },
  { id: 'kabuli', name: 'Kabuli Chickpeas', category_name: 'Pulses', slug: 'kabuli-chickpeas', short_description: 'Cream Kabuli Chickpeas, count 38/40 to 75/80. 99% Sortex clean, moisture 12% max. Premium export grade.', origin: 'Rajasthan / MP', moq: 25, moq_unit: 'MT', grade_variety: '99% Sortex', is_featured: 0, main_image: '/images/products/kabuli-chickpeas.jpg' },
  { id: 'sorghum', name: 'Sorghum (White Jowar)', category_name: 'Grains', slug: 'sorghum-jowar', short_description: 'White Sorghum. Machine 98–99%, Sortex 99% purity. Moisture 11% max. 25 kg/50 kg PP or Jute bags.', origin: 'Saurashtra, Gujarat', moq: 24, moq_unit: 'MT', grade_variety: '99% Sortex', is_featured: 0, main_image: '/images/bg/real-grains.jpg' },
  { id: 'maize', name: 'Yellow Maize (Corn)', category_name: 'Grains', slug: 'yellow-maize', short_description: 'Yellow & White Maize. Machine 98–99%, Sortex 99% purity. Moisture 11% max. 24 MT in 20ft FCL.', origin: 'Gujarat, India', moq: 24, moq_unit: 'MT', grade_variety: 'Export Grade', is_featured: 0, main_image: '/images/bg/yellow-corn.jpg' },
];

const CATEGORIES_STATIC = [
  { id: 'peanuts', name: 'Peanuts', slug: 'peanuts' },
  { id: 'grains', name: 'Grains', slug: 'grains' },
  { id: 'pulses', name: 'Pulses', slug: 'pulses' },
  { id: 'dairy-ghee', name: 'Dairy Ghee', slug: 'dairy-ghee' },
];

const PROCESS_STEPS = [
  {
    num: '01',
    stage: 'Origination',
    title: 'Farmgate Sourcing',
    location: 'Saurashtra & Gujarat Mandis',
    desc: 'Direct primary procurement from vetted farmer collectives and APMC mandis. Moisture, foreign matter, and seed counts are pre-sampled before purchase.',
    timeline: 'Day 1–3',
    icon: Leaf,
    tag: 'APEDA Origin Direct',
  },
  {
    num: '02',
    stage: 'Refinement',
    title: 'Sortex Optical QC',
    location: 'Purity 98%–99.9% Clean',
    desc: 'Buhler optical color sorting, de-stoning, and gravity grading. Independent laboratory testing validates aflatoxin levels, moisture, and purity specs.',
    timeline: 'Day 4–6',
    icon: FlaskConical,
    tag: 'Buhler Sortex Clean',
  },
  {
    num: '03',
    stage: 'Preservation',
    title: 'Export Packaging',
    location: 'Custom Buyer Stenciling',
    desc: 'Sealed in 25/50kg multi-wall PP, Jute bags, or food-grade tins. Professional phytosanitary fumigation protects cargo against moisture and pest ingress.',
    timeline: 'Day 7–8',
    icon: Package,
    tag: 'Phytosanitary Sealed',
  },
  {
    num: '04',
    stage: 'Fulfillment',
    title: 'Ocean Freight',
    location: 'Mundra, Kandla & Hazira',
    desc: 'Supervised stuffing into 20ft & 40ft HC containers at Gujarat sea ports. Rapid export customs clearance, B/L issuance, and live satellite vessel tracking.',
    timeline: 'Day 9+ Sailing',
    icon: Ship,
    tag: 'FCL & Mixed Loads',
  },
];

const WHY_CARDS = [
  {
    icon: ShieldCheck,
    color: 'text-brand-primary bg-brand-accent',
    title: 'Direct Farm Sourcing',
    desc: 'Primary procurement from farmer networks and agricultural mandis across Gujarat & Saurashtra, ensuring farm-fresh quality at competitive prices.',
    point: 'Gujarat & Saurashtra Mandi Networks',
  },
  {
    icon: FlaskConical,
    color: 'text-amber-700 bg-amber-50',
    title: 'Strict Quality Control',
    desc: 'Every lot is Buhler Optical Sortex graded, moisture-tested, and third-party lab certified (SGS / Geo-Chem on request). Purity 98–99.9%.',
    point: 'Purity 98–99.9% Sortex Clean',
  },
  {
    icon: Globe2,
    color: 'text-brand-primary bg-brand-accent',
    title: 'Global Shipping',
    desc: 'FOB, CIF & CFR shipments from Hazira, Mundra and Kandla ports to Jebel Ali, Rotterdam, Haiphong, Mersin, Chittagong and beyond.',
    point: 'FCL Dispatch: 20ft & 40ft HC',
  },
  {
    icon: HeartHandshake,
    color: 'text-emerald-700 bg-emerald-50',
    title: 'Full Documentation',
    desc: "B/L, Commercial Invoice, Packing List, COO, Phytosanitary, Fumigation, and COA prepared to your destination port's customs requirements.",
    point: 'Complete Export Documentation',
  },
];

const STATS = [
  {
    value: 10,
    suffix: '+',
    label: 'Years of Excellence',
    sub: 'Export Operations Since 2014',
    tag: 'Est. 2014',
    highlight: 'Global Trust',
    icon: Clock,
    glow: 'from-amber-400/20 via-amber-400/5 to-transparent',
    accentText: 'text-amber-300',
    borderHover: 'hover:border-amber-400/40',
  },
  {
    value: 40,
    suffix: '+',
    label: 'Countries Served',
    sub: 'GCC, SEA, Europe & Africa',
    tag: '5 Continents',
    highlight: 'Worldwide Reach',
    icon: Globe2,
    glow: 'from-teal-400/20 via-teal-400/5 to-transparent',
    accentText: 'text-teal-300',
    borderHover: 'hover:border-teal-400/40',
  },
  {
    value: 150,
    suffix: '+',
    label: 'Institutional Buyers',
    sub: 'Millers, Packers & Importers',
    tag: '94% Repeat Orders',
    highlight: 'Direct Clients',
    icon: Users,
    glow: 'from-emerald-400/20 via-emerald-400/5 to-transparent',
    accentText: 'text-emerald-300',
    borderHover: 'hover:border-emerald-400/40',
  },
  {
    value: 1800,
    suffix: '+',
    label: 'FCL Dispatches',
    sub: 'Full 20ft & 40ft Food-Grade HC',
    tag: 'Direct Port Loadings',
    highlight: 'Zero Disputes',
    icon: Truck,
    glow: 'from-cyan-400/20 via-cyan-400/5 to-transparent',
    accentText: 'text-cyan-300',
    borderHover: 'hover:border-cyan-400/40',
  },
  {
    value: 50000,
    suffix: '+',
    label: 'Metric Tonnes Shipped',
    sub: 'Peanuts, Grains, Pulses & Ghee',
    tag: 'SGS/Intertek Verified',
    highlight: 'Bulk & Bagged',
    icon: Scale,
    glow: 'from-emerald-300/20 via-emerald-300/5 to-transparent',
    accentText: 'text-emerald-200',
    borderHover: 'hover:border-emerald-300/40',
  },
];

const CERTS = [
  { label: 'IEC Registration', value: '0817029381', authority: 'DGFT, Govt. of India' },
  { label: 'GSTIN Number', value: '24AAHFA3928L1Z9', authority: 'State of Gujarat' },
  { label: 'APEDA RCMC', value: 'APEDA/RCMC/2026/0892', authority: 'Ministry of Commerce' },
  { label: 'FSSAI Central License', value: '10722026000148', authority: 'Food Safety Authority' },
];

/* ===========================
   HOOKS
   =========================== */
function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(target, duration, running) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!running) return;
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [running, target, duration]);
  return val;
}

/* ===========================
   SUB-COMPONENTS
   =========================== */
function StatCard({ stat, running, index }) {
  const n = useCountUp(stat.value, 1800, running);
  const Icon = stat.icon;
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 ${stat.borderHover} p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.28)] flex flex-col justify-between`}
    >
      {/* Top glowing accent gradient line */}
      <div className={`absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent ${stat.accentText} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Subtle radial corner glow */}
      <div className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${stat.glow} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

      {/* Card Header: Icon Emblem + Micro-badge */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-brand-gold group-hover:scale-110 group-hover:bg-brand-primary/25 group-hover:text-emerald-300 transition-all duration-300 shadow-inner">
            <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/75 group-hover:text-white group-hover:border-white/30 transition-colors">
            {stat.highlight}
          </span>
        </div>

        {/* Counter Number */}
        <div className="space-y-1">
          <span className="block text-3xl sm:text-4xl lg:text-[2.65rem] font-display font-black text-white tracking-tight leading-none stat-number drop-shadow-sm">
            {n.toLocaleString()}{stat.suffix}
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white/95 tracking-wide pt-1">
            {stat.label}
          </h3>
          <p className="text-xs text-white/60 leading-relaxed font-sans line-clamp-1">
            {stat.sub}
          </p>
        </div>
      </div>

      {/* Micro-tag footer */}
      <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-emerald-300/85 tracking-wide uppercase">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:animate-ping" />
          {stat.tag}
        </span>
        <span className="text-white/40 text-[10px] font-mono">0{index + 1}</span>
      </div>
    </div>
  );
}

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`faq-item${isOpen ? ' faq-open' : ''}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-display font-semibold text-sm text-brand-text hover:text-brand-primary transition-colors"
      >
        <span>{faq.q}</span>
        <span className="w-7 h-7 rounded-full bg-brand-accent border border-brand-border flex items-center justify-center shrink-0 text-brand-primary">
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
      </button>
      {isOpen && (
        <div
          role="region"
          className="px-6 pb-5 text-sm text-brand-muted leading-relaxed border-t border-brand-border font-sans"
        >
          {faq.a}
        </div>
      )}
    </div>
  );
}

/* ===========================
   QUOTATION FORM
   =========================== */
function QuoteForm({ defaultProduct = '' }) {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    product: defaultProduct || 'Pure Dairy Ghee',
    quantity: '', unit: 'MT', destination: '',
    packaging: '', message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.company.trim()) e.company = 'Company name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.quantity.trim()) e.quantity = 'Quantity is required';
    if (!form.destination.trim()) e.destination = 'Destination port / country required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('submitting');
    try {
      await inquiriesService.submitRfq({
        full_name: form.name,
        company_name: form.company,
        email: form.email,
        phone: form.phone,
        product_interest: form.product,
        quantity: `${form.quantity} ${form.unit}`,
        destination_country: form.destination,
        packaging_requirements: form.packaging,
        additional_requirements: form.message,
        source: 'home_page',
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const Field = ({ id, label, required, error, children }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-brand-text mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
    </div>
  );

  const inputClass = (field) =>
    `w-full bg-brand-cream border ${errors[field] ? 'border-red-400' : 'border-brand-border'} 
     rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-muted/70 
     focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition`;

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-accent border-2 border-brand-secondary flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-brand-primary" />
        </div>
        <h3 className="font-display font-bold text-xl text-brand-text">Inquiry Submitted!</h3>
        <p className="text-sm text-brand-muted max-w-xs">
          Thank you! Our trade desk will respond with a binding container rate within 12 business hours.
        </p>
        <p className="text-xs text-brand-muted">
          For urgent enquiries: <a href="tel:+919023363680" className="text-brand-primary font-bold hover:underline">+91 90233 63680</a> (J.P. Vora)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="rfq-name" label="Full Name" required error={errors.name}>
          <input id="rfq-name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="John Doe" className={inputClass('name')} />
        </Field>
        <Field id="rfq-company" label="Company Name" required error={errors.company}>
          <input id="rfq-company" type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            placeholder="Global Agri Foods Ltd" className={inputClass('company')} />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="rfq-email" label="Business Email" required error={errors.email}>
          <input id="rfq-email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="buyer@company.com" className={inputClass('email')} />
        </Field>
        <Field id="rfq-phone" label="Phone / WhatsApp" required error={errors.phone}>
          <input id="rfq-phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+971 / +44 / +1..." className={inputClass('phone')} />
        </Field>
      </div>
      <Field id="rfq-product" label="Product of Interest" required>
        <select id="rfq-product" value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
          className={inputClass('product')}>
          <option>Pure Cow &amp; Buffalo Ghee</option>
          <option>Bold Peanut Kernels (38/42 to 70/80)</option>
          <option>Green Millet / Bajra</option>
          <option>Sorghum (White/Yellow Jowar)</option>
          <option>Yellow / White Maize</option>
          <option>Green Moong &amp; Moong Mogar</option>
          <option>Desi Chickpeas</option>
          <option>Kabuli Chickpeas</option>
          <option>Mixed Container Consolidation</option>
        </select>
      </Field>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <Field id="rfq-qty" label="Estimated Quantity" required error={errors.quantity}>
            <input id="rfq-qty" type="text" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
              placeholder="e.g. 25" className={inputClass('quantity')} />
          </Field>
        </div>
        <Field id="rfq-unit" label="Unit">
          <select id="rfq-unit" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
            className={inputClass('unit')}>
            <option value="MT">Metric Tonnes (MT)</option>
            <option value="KG">Kilograms (KG)</option>
            <option value="FCL">Full Container (FCL)</option>
          </select>
        </Field>
      </div>
      <Field id="rfq-dest" label="Destination Port / Country" required error={errors.destination}>
        <input id="rfq-dest" type="text" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
          placeholder="e.g. Jebel Ali / Rotterdam / Singapore" className={inputClass('destination')} />
      </Field>
      <Field id="rfq-pack" label="Packaging Requirements">
        <input id="rfq-pack" type="text" value={form.packaging} onChange={e => setForm(f => ({ ...f, packaging: e.target.value }))}
          placeholder="e.g. 25 kg PP bags / 50 kg Jute / Vacuum / Tins" className={inputClass('packaging')} />
      </Field>
      <Field id="rfq-msg" label="Additional Requirements">
        <textarea id="rfq-msg" rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Specify grade, count, packing marks, required certifications or any other details..."
          className={`${inputClass('message')} rounded-xl resize-none`} />
      </Field>

      <p className="text-[11px] text-brand-muted leading-relaxed">
        By submitting this form you consent to Agro Dairy Export LLP using your details to respond to your inquiry. 
        We do not share your information with third parties. See our{' '}
        <Link to="/contact" className="text-brand-primary underline">Privacy Policy</Link>.
      </p>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">
          Submission failed. Please try again or contact us directly at{' '}
          <a href="tel:+919023363680" className="font-bold underline">+91 90233 63680</a>.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        id="submit-rfq-btn"
        className="w-full bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-60 text-white font-ui font-bold text-sm py-4 rounded-xl shadow-md shadow-brand-primary/25 transition-all flex items-center justify-center gap-2 group"
      >
        {status === 'submitting' ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Submitting RFQ...</span>
          </>
        ) : (
          <>
            <span>Submit Quotation Request</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}

/* ===========================
   MAIN HOME COMPONENT
   =========================== */
export default function Home() {
  const { settings, commodities: liveProducts, categories: liveCategories, faqs: liveFaqs, loading } = useSettings();
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  // Live datasets with static fallback guarantees
  const categories = liveCategories?.length ? liveCategories : CATEGORIES_STATIC;
  const products = liveProducts?.length ? liveProducts : PRODUCTS_STATIC;
  const faqs = liveFaqs?.length ? liveFaqs : FAQS;

  // Intersection refs
  const [statsRef, statsVisible] = useIntersection(0.2);
  const [aboutRef, aboutVisible] = useIntersection(0.1);
  const [whyRef, whyVisible] = useIntersection(0.1);
  const [processRef, processVisible] = useIntersection(0.1);
  const [certsRef, certsVisible] = useIntersection(0.1);

  const filteredProducts = activeCategory === 'all'
    ? products.slice(0, 8)
    : products.filter(p => p.category_slug === activeCategory || p.category_name?.toLowerCase() === activeCategory);

  return (
    <div>
      {/* ═══════════════════════════════════════
          HERO SECTION — Logo Palette (Teal & Deep Pine)
          ═══════════════════════════════════════ */}
      <section className="relative bg-[#F4F9F8] text-brand-text pt-8 pb-10 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-12 overflow-hidden border-b border-[#D4ECE9]">
        {/* Unique Hero Background: Golden Wheat, Shelled Peanuts & Moong with trade dot grid */}
        <HeroBgDecorations />

        {/* Subtle decorative botanical blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/40 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="section-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Heading, Subtext, CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              {(settings.hero_show_badge !== '0' && settings.hero_show_badge !== 0 && settings.hero_show_badge !== false) && (
                <div className="animate-fade-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-semibold shadow-sm">
                  <Leaf className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span>{settings.hero_badge || 'Trusted Agro & Dairy Export Partner from India'}</span>
                </div>
              )}

              {/* Main Headline */}
              <h1 className="animate-fade-in-up font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.14] tracking-tight text-[#0C2422]">
                {settings.hero_title ? (
                  <>
                    {settings.hero_title} <span className="text-brand-primary">{settings.hero_highlight || 'Dairy Ghee'}</span>
                  </>
                ) : (
                  <>
                    Origin-Direct Peanuts,<br />
                    Grains, Pulses &amp; Pure<br />
                    <span className="text-brand-primary">Dairy Ghee</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="animate-fade-in-up delay-100 text-base sm:text-lg text-[#4D6765] leading-relaxed max-w-xl font-sans">
                {settings.hero_subtitle || 'We source, process and export premium quality agricultural commodities from India to global markets with consistent quality, competitive pricing and reliable supply.'}
              </p>

              {/* CTAs */}
              {((settings.hero_show_primary_btn !== '0' && settings.hero_show_primary_btn !== 0 && settings.hero_show_primary_btn !== false) ||
                (settings.hero_show_secondary_btn !== '0' && settings.hero_show_secondary_btn !== 0 && settings.hero_show_secondary_btn !== false)) && (
                <div className="animate-fade-in-up delay-200 flex flex-wrap items-center gap-4 pt-2">
                  {(settings.hero_show_primary_btn !== '0' && settings.hero_show_primary_btn !== 0 && settings.hero_show_primary_btn !== false) && (
                    <Link
                      to={settings.hero_cta_primary_link || '/products'}
                      id="hero-view-products-btn"
                      className="px-7 py-3.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm shadow-md shadow-brand-primary/25 hover:shadow-lg transition-all flex items-center gap-2 group"
                    >
                      <span>{settings.hero_cta_primary_text || 'View Products'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  {(settings.hero_show_secondary_btn !== '0' && settings.hero_show_secondary_btn !== 0 && settings.hero_show_secondary_btn !== false) && (
                    <a
                      href={settings.hero_cta_secondary_link || '#rfq-section'}
                      id="hero-get-quote-btn"
                      className="px-7 py-3.5 rounded-full bg-white hover:bg-brand-accent text-brand-deep font-ui font-bold text-sm border-2 border-brand-deep transition-all shadow-sm"
                    >
                      {settings.hero_cta_secondary_text || 'Get a Quote'}
                    </a>
                  )}
                </div>
              )}

              {/* Horizontal Trust Bar below CTAs */}
              {(settings.hero_show_trust_bar !== '0' && settings.hero_show_trust_bar !== 0 && settings.hero_show_trust_bar !== false) && (
              <div className="animate-fade-in-up delay-300 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#D4ECE9]">
                {[
                  { Icon: Building2, title: 'Farm to Global Markets', sub: 'Direct Sourcing' },
                  { Icon: Award, title: 'Premium Quality', sub: 'Certified Products' },
                  { Icon: Truck, title: 'Timely Delivery', sub: 'Worldwide Shipping' },
                  { Icon: HeartHandshake, title: 'Trusted by Importers', sub: 'Long-Term Partnerships' },
                ].map(({ Icon, title, sub }, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-ui font-bold text-xs text-[#0C2422] leading-tight">{title}</div>
                      <div className="text-[11px] text-[#4D6765]">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>

            {/* Right Column: Hero Visual with Pure India script & floating badges (5 cols) */}
            <div className="lg:col-span-5 relative">
              {/* Handwritten script note: "Pure India to the World" with smooth hand-drawn curved arrow */}
              <div className="absolute -top-8 left-6 sm:left-10 z-20 flex flex-col items-center select-none pointer-events-none">
                <span className="font-serif italic font-bold text-[#003732] text-base sm:text-lg tracking-wide drop-shadow-sm rotate-[-3deg] inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800] animate-pulse" />
                  <span>Pure India to the World</span>
                </span>
                <svg 
                  className="w-12 h-8 text-[#00A79D] -mt-0.5 ml-6 drop-shadow-sm" 
                  viewBox="0 0 50 36" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  {/* Smooth curved swoop pointing down-right */}
                  <path d="M 8 4 C 18 10, 28 20, 36 30" />
                  {/* Crisp arrow tip pointing down-right */}
                  <path d="M 27 28 L 36 30 L 34 20" />
                </svg>
              </div>

              {/* Floating Pill Badges on Top Right */}
              <div className="absolute top-2 -right-2 sm:-right-4 z-20 space-y-2 pointer-events-none">
                {[
                  { Icon: Leaf, text: '100% Natural & Pure' },
                  { Icon: Award, text: 'Export Quality Standards' },
                  { Icon: HeartHandshake, text: 'Trusted Global Partner' },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className="bg-white/95 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-lg border border-[#D4ECE9] flex items-center gap-2 text-xs font-ui font-bold text-[#0C2422]">
                    <div className="w-5 h-5 rounded-full bg-brand-accent text-brand-primary flex items-center justify-center">
                      <Icon className="w-3 h-3" />
                    </div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Central Visual Image with Real Product Floating Chips */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src={settings.hero_image || "/images/hero-commodities.jpg"}
                  alt="Export quality peanuts, pulses, grains, and golden pure dairy ghee"
                  className="w-full h-[380px] sm:h-[420px] object-cover"
                />

                {/* Floating Real Product Card: Pure Cow Ghee */}
                <div className="hidden sm:flex absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-[#D4ECE9] items-center gap-2.5 animate-bounce-gentle">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-amber-50 shrink-0 border border-amber-200">
                    <img 
                      src={settings.hero_chip_1_image || "/images/bg/real-ghee.jpg"} 
                      alt="Pure Indian Cow Ghee" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/hero-commodities.jpg';
                      }}
                    />
                  </div>
                  <div className="pr-1">
                    <div className="font-ui font-bold text-xs text-[#0C2422]">Pure Cow Ghee</div>
                    <div className="text-[10px] text-amber-700 font-semibold">99.8% Milk Fat • FSSAI</div>
                  </div>
                </div>

                {/* Floating Real Product Card: Bold Peanuts */}
                <div className="absolute bottom-4 left-4 sm:left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-[#D4ECE9] flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-brand-cream shrink-0 border border-brand-border">
                    <img 
                      src={settings.hero_chip_2_image || "/images/products/bold-peanuts.jpg"} 
                      alt="Sortex Bold Peanuts 38/42" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/bg/shelled-peanuts.jpg';
                      }}
                    />
                  </div>
                  <div className="pr-1">
                    <div className="font-ui font-bold text-xs text-[#0C2422]">Bold Peanuts 38/42</div>
                    <div className="text-[10px] text-brand-primary font-semibold">99% Sortex Clean</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2: ABOUT AGRO EXPORT (Origin-Direct Maritime Trade)
          ═══════════════════════════════════════ */}
      <section id="about" className="relative pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 bg-[#F4F9F8] overflow-hidden border-b border-[#D4ECE9]" ref={aboutRef}>
        {/* Unique About Background: Maritime Navigation Ring + Pearl Millet & Bold Peanuts */}
        <AboutBgDecorations />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image with Maritime Port Badge (5 cols) */}
            <div className={`lg:col-span-5 relative transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-brand-border bg-white group">
                <img
                  src={settings.about_banner_image || "/images/cargo-ship.jpg"}
                  alt="Container cargo vessel exporting commodities globally"
                  className="w-full h-[420px] lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/port-aerial.jpg';
                  }}
                />
              </div>

              {/* Floating Top Port Gateway Tag */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md text-[#0C2422] rounded-full px-4 py-1.5 shadow-md border border-[#D4ECE9] flex items-center gap-2 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>MUNDRA &amp; KANDLA GATEWAY</span>
              </div>

              {/* Floating Annual Volume Badge in Corner */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#0C2422]/95 backdrop-blur-md text-white rounded-2xl px-5 py-4 shadow-2xl border border-white/15 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <div className="font-display font-black text-2xl sm:text-3xl leading-none text-white tracking-tight">50,000+ <span className="text-sm font-ui font-semibold text-brand-gold">MT</span></div>
                  <div className="text-xs font-ui text-emerald-200/90 mt-1">Exported Annually to 40+ Nations</div>
                </div>
              </div>
            </div>

            {/* Right Content (7 cols) */}
            <div className={`lg:col-span-7 space-y-6 transition-all duration-700 delay-100 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#BBE5E1] text-brand-primary text-xs font-mono font-bold shadow-sm mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span>{settings.about_badge || 'ORIGIN EXPORT PARTNER • GUJARAT, INDIA'}</span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#0C2422] leading-tight tracking-tight">
                  {settings.about_headline || 'Your Trusted Partner for Agricultural & Dairy Exports'}
                </h2>
              </div>

              <p className="text-[#4D6765] text-sm sm:text-base leading-relaxed font-sans">
                {settings.about_paragraph1 || 'Agro Dairy Export LLP is an origin-direct exporter of Sortex-cleaned Peanuts, Grains, Pulses, and Pure Dairy Ghee from Gujarat, India. By uniting farmer aggregations across fertile crop belts with direct ocean gateway access at Mundra and Hazira ports, we provide global importers with guaranteed specifications, verified phytosanitary clearance, and uninterrupted supply.'}
              </p>

              {/* 4 Feature Cards Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  { 
                    Icon: BadgeCheck, 
                    title: 'Origin-Direct Procurement', 
                    desc: 'Direct farm gate aggregations across Saurashtra crop belts.' 
                  },
                  { 
                    Icon: FlaskConical, 
                    title: 'Sortex Optical Cleaning', 
                    desc: 'Bichromatic optical sorting with 99.5% minimum purity.' 
                  },
                  { 
                    Icon: Ship, 
                    title: 'Multi-Port Logistics', 
                    desc: 'Dedicated container slots at Mundra, Kandla & Hazira.' 
                  },
                  { 
                    Icon: FileCheck2, 
                    title: 'Institutional Compliance', 
                    desc: 'APEDA, FSSAI & third-party laboratory SGS/COA certificates.' 
                  },
                ].map(({ Icon, title, desc }, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-[#D4ECE9] shadow-sm hover:border-brand-primary/40 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-ui font-bold text-sm text-[#0C2422] leading-snug">{title}</h3>
                    </div>
                    <p className="text-xs text-[#4D6765] leading-relaxed pl-11">{desc}</p>
                  </div>
                ))}
              </div>

              {/* CTAs and Direct Link */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/company/about"
                  id="about-know-more-btn"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm shadow-md shadow-brand-primary/20 transition-all group"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#rfq-section"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-bold text-sm border border-[#D4ECE9] shadow-sm transition-all"
                >
                  <span>Inquire Container Load</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3: EXPORT COMMODITIES CATALOG (Origin-Direct Specifications)
          ═══════════════════════════════════════ */}
      <section id="products" className="relative py-20 lg:py-24 bg-white overflow-hidden">
        {/* Unique Catalog Background: Diagonal Yellow Corn & Kabuli Chickpeas with Quality Tags */}
        <CatalogBgDecorations />

        <div className="section-container relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-mono font-bold shadow-sm mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                <span>EXPORT READY INVENTORY • FCL &amp; CONSOLIDATED SHIPMENTS</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2422] tracking-tight">
                Export Commodities Catalog
              </h2>
              <p className="text-sm text-[#4D6765] mt-2 max-w-xl font-sans">
                Premium Indian agricultural commodities directly aggregated from Gujarat farms, optical Sortex processed, and lab tested for international port dispatch.
              </p>
            </div>
            <Link to="/products" id="catalog-view-all-btn" className="text-brand-primary hover:text-brand-deep font-display font-bold text-sm flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full border border-brand-primary/30 hover:bg-[#E6F7F5] transition-all">
              <span>View All Specifications</span> <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category filter pills */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2" role="tablist" aria-label="Product categories">
              <button
                role="tab"
                id="cat-all"
                aria-selected={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-2.5 rounded-full text-xs font-ui font-bold transition-all duration-200 shrink-0 ${activeCategory === 'all' ? 'bg-brand-primary text-white shadow-md' : 'bg-[#F4F9F8] text-[#4D6765] border border-brand-border hover:bg-brand-accent hover:text-brand-text'}`}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  role="tab"
                  id={`cat-${cat.slug}`}
                  aria-selected={activeCategory === cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-6 py-2.5 rounded-full text-xs font-ui font-bold transition-all duration-200 shrink-0 ${activeCategory === cat.slug ? 'bg-brand-primary text-white shadow-md' : 'bg-[#F4F9F8] text-[#4D6765] border border-brand-border hover:bg-brand-accent hover:text-brand-text'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Carousel navigation arrows */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  const container = document.getElementById('products-grid-container');
                  if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-accent transition"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const container = document.getElementById('products-grid-container');
                  if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition shadow-sm"
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-brand-cream rounded-2xl h-80 animate-pulse border border-brand-border" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-brand-muted">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-ui font-semibold">No products in this category yet.</p>
              <button onClick={() => setActiveCategory('all')} className="mt-3 text-sm text-brand-primary hover:underline">Show all products</button>
            </div>
          ) : (
            <div id="products-grid-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <CommodityCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4: OUR EXPORT RECORD IN NUMBERS (Unique Global Trade Showcase)
          ═══════════════════════════════════════ */}
      {(settings.hero_show_stats !== '0' && settings.hero_show_stats !== 0 && settings.hero_show_stats !== false) && (
      <section 
        ref={statsRef} 
        className="relative py-16 sm:py-20 lg:py-24 text-white overflow-hidden border-y border-[#00A79D]/30 bg-gradient-to-br from-[#021814] via-[#052b23] to-[#011410]"
      >
        {/* Subtle geometric dot grid pattern */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#00A79D_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Ambient atmospheric radial glow orbs */}
        <div 
          className="absolute -top-32 -left-32 w-96 h-96 bg-[#00A79D]/20 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#F5B800]/12 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="section-container relative z-10">
          {/* Section Header: Pill Badge + Gradient Heading + Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-emerald-300 shadow-sm mb-3.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Certified Agro &amp; Dairy Exporter • Verified Performance</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-[#5EEAD4] tracking-tight">
              Our Export Record in Numbers
            </h2>

            <p className="mt-3 text-sm sm:text-base text-emerald-100/75 max-w-2xl mx-auto font-sans leading-relaxed">
              A transparent decade of origin-direct farmgate sourcing, precision sortex processing, and prompt containerized shipping across the globe.
            </p>
          </div>

          {/* 5 Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              {
                ...STATS[0],
                value: settings.hero_stat_1_val ? parseInt(settings.hero_stat_1_val, 10) || STATS[0].value : STATS[0].value,
                label: settings.hero_stat_1_lbl || STATS[0].label,
              },
              {
                ...STATS[1],
                value: settings.hero_stat_2_val ? parseInt(settings.hero_stat_2_val, 10) || STATS[1].value : STATS[1].value,
                label: settings.hero_stat_2_lbl || STATS[1].label,
              },
              {
                ...STATS[2],
                value: 150,
                label: 'Institutional Buyers',
              },
              {
                ...STATS[3],
                value: settings.hero_stat_3_val ? parseInt(settings.hero_stat_3_val, 10) || STATS[3].value : STATS[3].value,
                label: settings.hero_stat_3_lbl || STATS[3].label,
              },
              {
                ...STATS[4],
                value: settings.hero_stat_4_val ? parseInt(settings.hero_stat_4_val, 10) || STATS[4].value : STATS[4].value,
                label: settings.hero_stat_4_lbl || STATS[4].label,
              },
            ].map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} running={statsVisible} />
            ))}
          </div>

          {/* Direct Port Logistics & Pre-Shipment Inspection Strip */}
          <div className="mt-10 pt-7 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
            <div className="flex items-center gap-2.5">
              <Ship className="w-4 h-4 text-brand-gold shrink-0" />
              <span className="font-semibold text-white">Direct Sea Freight Gateways:</span>
              <span className="text-emerald-100/80">Mundra Port (INMUN1) • Kandla Port (INIXY1) • Hazira Port (INHZA1)</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono text-emerald-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Pre-Shipment Inspection
              </span>
              <span className="hidden sm:inline-block text-white/30">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> APEDA &amp; FSSAI Licensed
              </span>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════
          SECTION 5: GLOBAL QUALITY. INDIAN ROOTS. (WHY CHOOSE US)
          ═══════════════════════════════════════ */}
      <section id="why-us" ref={whyRef} className="relative py-20 lg:py-24 bg-[#F4F9F8] border-y border-[#D4ECE9] overflow-hidden">
        {/* Unique Why Choose Us Background: Golden Cow Ghee Aura & Green Moong Cluster */}
        <WhyUsBgDecorations />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left 4 Cards (7 cols) */}
            <div className={`lg:col-span-7 space-y-6 transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#BBE5E1] text-brand-primary text-xs font-mono font-bold shadow-sm mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span>PROVEN EXPORT FOUNDATION • INSTITUTIONAL RELIABILITY</span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#0C2422] leading-tight tracking-tight">
                  Global Quality Standards.<br />
                  Deep Indian Agricultural Roots.
                </h2>
                <p className="text-sm sm:text-base text-[#4D6765] mt-2 max-w-xl font-sans">
                  We unite grassroots farmer aggregations with industrial-grade Sortex optical cleaning, accredited testing, and seamless ocean container dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {[
                  {
                    icon: Leaf,
                    tag: '100% Origin Traceable',
                    title: 'Direct Farm Sourcing',
                    desc: 'Direct harvest procurement across verified Gujarat farm clusters with zero middlemen adulteration.',
                  },
                  {
                    icon: FlaskConical,
                    tag: '< 1% Aflatoxin Strict',
                    title: 'Dual Sortex Cleaning',
                    desc: 'Optical color sorting, double gravity separation, and accredited SGS pre-shipment COA.',
                  },
                  {
                    icon: Ship,
                    tag: '3 Western Gateways',
                    title: 'Ocean Freight Execution',
                    desc: 'Fast containerized dispatch via Mundra, Kandla, and Hazira ports with competitive transit times.',
                  },
                  {
                    icon: HeartHandshake,
                    tag: '< 2h Response SLA',
                    title: 'Dedicated Trade Desk',
                    desc: 'Direct WhatsApp and phone assistance with experienced export officers for transparent cargo milestones.',
                  },
                ].map(({ icon: Icon, tag, title, desc }, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border border-[#D4ECE9] shadow-sm hover:border-brand-primary/40 hover:shadow-md transition-all group">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E6F7F5] text-brand-primary border border-[#BBE5E1]">
                        {tag}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-[#0C2422] mb-1.5">{title}</h3>
                    <p className="text-xs text-[#4D6765] leading-relaxed font-sans">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image with Verified Sourcing Badges (5 cols) */}
            <div className={`lg:col-span-5 relative transition-all duration-700 delay-150 ${whyVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-brand-border bg-white group">
                <img
                  src="/images/farm-sourcing.jpg"
                  alt="Indian farmer holding pure harvest grains"
                  className="w-full h-[420px] lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Floating Top Badge */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md rounded-full px-4 py-1.5 shadow-md border border-[#D4ECE9] flex items-center gap-2 text-xs font-mono font-bold text-[#0C2422]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ORIGIN HARVEST GUARANTEE</span>
              </div>

              {/* Floating Bottom Trust Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0C2422]/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-xl border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-gold flex items-center justify-center shrink-0 border border-brand-primary/30">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">APEDA &amp; FSSAI Licensed Origin Supply</div>
                  <div className="text-[11px] text-white/70 mt-0.5">100% compliant export documentation &amp; phytosanitary release</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6: OUR EXPORT PROCESS (Minimalist Editorial Architecture)
          ═══════════════════════════════════════ */}
      <section id="process" ref={processRef} className="py-20 lg:py-28 bg-white border-y border-brand-border overflow-hidden">
        <div className="section-container">
          {/* Minimalist Editorial Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#D4ECE9]">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary block mb-3">
                — EXPORT METHODOLOGY
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0C2422] tracking-tight leading-[1.12]">
                From Indian Soil to Your Destination Port
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm text-[#4D6765] leading-relaxed font-sans">
                A transparent, four-stage export framework engineered for optical purity, compliant phytosanitary documentation, and reliable ocean transit.
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs font-mono text-brand-primary font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Standardized 9-Day Dispatch Workflow</span>
              </div>
            </div>
          </div>

          {/* 4 Open Architectural Columns (No boxy cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#D4ECE9] border-b border-[#D4ECE9]">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className={`group relative py-10 lg:py-14 ${i === 0 ? 'lg:pl-0 lg:pr-8' : i === 3 ? 'lg:pl-8 lg:pr-0' : 'lg:px-8'} transition-all duration-300 flex flex-col justify-between hover:bg-[#F4F9F8]/40`}
                >
                  <div>
                    {/* Top Header: Ghost Number + Timeline SLA */}
                    <div className="flex items-baseline justify-between mb-6">
                      <span className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-brand-primary/20 group-hover:text-brand-primary transition-colors duration-500 tracking-tighter select-none leading-none">
                        {step.num}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E6F7F5] text-brand-primary font-bold border border-[#BBE5E1]">
                        {step.timeline}
                      </span>
                    </div>

                    {/* Interactive Animated Hover Line */}
                    <div className="w-full h-[2px] bg-slate-100 rounded-full mb-6 overflow-hidden">
                      <div className="w-0 group-hover:w-full h-full bg-brand-primary transition-all duration-500 rounded-full" />
                    </div>

                    {/* Stage Eyebrow & Title */}
                    <span className="text-[11px] font-mono uppercase tracking-widest text-brand-primary/80 font-bold block mb-1.5">
                      Stage {step.num} • {step.stage}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0C2422] group-hover:text-brand-primary transition-colors leading-snug mb-2.5">
                      {step.title}
                    </h3>
                    
                    {/* Location / Hub */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0C2422]/70 mb-3.5">
                      <Icon className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span>{step.location}</span>
                    </div>

                    {/* Clean Narrative */}
                    <p className="text-xs sm:text-sm text-[#4D6765] leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Minimal Tag */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-[#334E4C]">
                    <span className="text-brand-primary font-semibold">{step.tag}</span>
                    <span className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all">→</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimalist Visual Logistics Stream Bar */}
          <div className="mt-12 sm:mt-16">
            <div className="bg-[#F4F9F8] rounded-2xl p-6 sm:p-8 border border-[#D4ECE9] flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#0C2422]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Origin: Gujarat &amp; Saurashtra Mandis
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary" />
                  Processing: Optical Sortex Clean
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Packaging: PP Bags, Jute &amp; Tins
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  Gateways: Mundra, Kandla &amp; Hazira
                </span>
              </div>

              <a
                href="#rfq-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md shadow-brand-primary/20 transition-all shrink-0 group"
              >
                <span>Request Shipment Schedule</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7: SHIPPING & REQUEST A QUOTE (Side-by-side Port & RFQ)
          ═══════════════════════════════════════ */}
      <section id="rfq-section" className="relative py-20 lg:py-24 bg-[#F4F9F8] overflow-hidden border-b border-[#D4ECE9]">
        {/* Unique RFQ & Shipping Background: Ocean Route Trajectory & Kabuli Chickpeas */}
        <RfqBgDecorations />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left: Shipping from Gujarat Ports (5 cols) */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl min-h-[480px] flex flex-col justify-between p-7 sm:p-8 text-white group">
              <img
                src="/images/port-aerial.jpg"
                alt="Gujarat port container terminal at sunset"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C2422]/95 via-[#0C2422]/50 to-transparent" />

              {/* Floating Top Port Badge */}
              <div className="relative z-10 self-start bg-white/95 backdrop-blur-md text-[#0C2422] rounded-full px-4 py-1.5 shadow-md border border-[#D4ECE9] flex items-center gap-2 text-xs font-mono font-bold">
                <Anchor className="w-3.5 h-3.5 text-brand-primary" />
                <span>DIRECT WEST COAST OCEAN GATEWAYS</span>
              </div>

              {/* Bottom Information Card */}
              <div className="relative z-10 bg-[#0C2422]/95 backdrop-blur-md rounded-2xl p-6 border border-brand-primary/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Mundra • Kandla • Hazira</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
                  Shipping From Gujarat's Maritime Ports to Your Destination
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans">
                  Fast containerized loading with weekly direct feeder lines connecting Mundra and Kandla to Jebel Ali, Rotterdam, Mersin, Haiphong, and beyond.
                </p>
                <div className="pt-1">
                  <Link
                    to="/logistics"
                    className="inline-flex items-center gap-2 text-xs font-ui font-bold text-brand-gold hover:text-white transition-colors"
                  >
                    <span>Explore Ocean Logistics Capabilities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Request a Quote / Export Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-[#D4ECE9] shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-mono font-bold shadow-sm mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span>RAPID EXPORT DESK • QUOTES WITHIN 2 HOURS</span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0C2422] tracking-tight mb-2">
                  Talk to Our Export Desk Before You Order
                </h3>
                <p className="text-xs sm:text-sm text-[#4D6765] mb-5 font-sans">
                  Receive origin spot pricing, container load formulation, and current ocean freight estimates.
                </p>

                {/* 4 Checkmark Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-[#4D6765] font-sans">
                  {[
                    'Spot pricing & crop arrival availability',
                    'Customized multi-wall PP/Jute packaging',
                    'Full Phytosanitary & SGS COA support',
                    'FOB & CIF freight rate negotiation',
                  ].map((pt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Form */}
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 8: VERIFY AGRO DAIRY EXPORT LLP (Verified Trust & Compliance Suite)
          ═══════════════════════════════════════ */}
      <section ref={certsRef} className="py-16 sm:py-20 bg-white border-b border-[#D4ECE9] relative overflow-hidden">
        {/* Unique Certifications Background: Government Security Guilloche Seal & Harvest Pulses */}
        <CertificationsBgDecorations />

        <div className="section-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-mono font-bold shadow-sm mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                <span>GOVERNMENT ACCREDITED EXPORTER • ZERO RISK COMPLIANCE</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0C2422] tracking-tight">
                Verify Agro Dairy Export LLP
              </h2>
              <p className="text-xs sm:text-sm text-[#4D6765] mt-2 font-sans max-w-xl">
                Independently verifiable statutory export licenses, registration certificates, and food safety accreditations issued by Government of India authorities.
              </p>
            </div>
            <Link
              to="/certifications"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C2422] hover:bg-brand-primary text-white font-ui font-bold text-xs shadow-md transition-all shrink-0 group"
            >
              <span>View All Inspection Certificates</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'IEC License',
                authority: 'DGFT, Ministry of Commerce',
                code: settings.company_iec || '0817029381',
                badge: 'Verified Exporter',
              },
              {
                title: 'APEDA Registration',
                authority: 'Agri & Processed Food Authority',
                code: settings.company_apeda || 'APEDA/RCMC/2026/0892',
                badge: 'Active RCMC',
              },
              {
                title: 'GSTIN Registered',
                authority: 'CBIC, Govt. of India',
                code: settings.company_gstin || '24AAHFA3928L1Z9',
                badge: 'State Certified',
              },
              {
                title: 'FSSAI Central License',
                authority: 'Food Safety Authority of India',
                code: settings.company_fssai || '10722026000148',
                badge: 'Food Safety Grade',
              },
            ].map((cert, i) => (
              <div
                key={i}
                className="bg-[#F4F9F8] rounded-2xl p-5 border border-[#D4ECE9] shadow-sm hover:border-brand-primary/40 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-brand-primary flex items-center justify-center border border-[#D4ECE9] shadow-xs group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <ShieldCheck className="w-5 h-5 text-brand-primary group-hover:text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {cert.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#0C2422] mb-1">{cert.title}</h3>
                  <p className="text-[11px] text-[#4D6765] font-sans mb-3">{cert.authority}</p>
                </div>

                <div className="pt-2 border-t border-[#D4ECE9]/60">
                  <div className="text-[10px] uppercase font-mono text-[#4D6765] mb-0.5">Registration Code</div>
                  <div className="font-mono font-bold text-xs text-[#0C2422] tracking-wider select-all">{cert.code}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 9: FREQUENTLY ASKED QUESTIONS (FAQ & Trade Advisory Hub)
          ═══════════════════════════════════════ */}
      <section id="faq" className="py-20 lg:py-24 bg-[#F4F9F8] relative overflow-hidden">
        {/* Unique FAQ Background: Amber Ghee & Shelled Peanuts Vignette */}
        <FaqBgDecorations />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Decorative Image & Direct Advisory Hub (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-[#D4ECE9] bg-white group">
                <img
                  src="/images/hero-commodities.jpg"
                  alt="Pure Indian export commodities"
                  className="w-full h-[280px] lg:h-[320px] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/about-commodities.jpg';
                  }}
                />
              </div>

              {/* Direct Partner Advisory Box */}
              <div className="p-6 rounded-3xl bg-[#0C2422] text-white shadow-xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>DIRECT TRADE DESK</span>
                </div>
                <h4 className="font-display font-bold text-lg text-white leading-snug">
                  Have a Custom Commodity Spec or Mixed Container Requirement?
                </h4>
                <p className="text-white/70 text-xs leading-relaxed font-sans">
                  Speak directly with Managing Partner J.P. Vora for customized grain count formulas, FOB port slots, and private labeling.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/919023363680?text=Hello%20Agro%20Dairy%20Export%2C%20I%20have%20an%20export%20commodity%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-ui font-bold text-xs shadow-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Export Partner (+91 90233 63680)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right FAQ Accordion (8 cols) */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#BBE5E1] text-brand-primary text-xs font-mono font-bold shadow-sm mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span>TRANSPARENT EXPORT ANSWERS</span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0C2422] tracking-tight">
                  Frequently Asked Questions (FAQ)
                </h2>
                <p className="text-sm text-[#4D6765] mt-2 font-sans">
                  Clear answers to key questions about our origin aggregation, minimum orders, Incoterms, and dispatch workflows.
                </p>
              </div>

              <div className="space-y-3" role="list">
                {faqs.map((faq, i) => (
                  <FaqItem
                    key={i}
                    faq={faq}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 10: PRE-FOOTER CALL TO ACTION (Split Modern Trade Showcase)
          ═══════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-[#F4F9F8] relative overflow-hidden border-t border-[#D4ECE9]">
        {/* Subtle ambient light blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Assurances, CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>DIRECT GUJARAT ORIGIN • GLOBAL PORT SHIPMENTS</span>
              </div>

              {/* Main Headline */}
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-[#0C2422] tracking-tight leading-[1.15]">
                Ready to Source Premium Indian Agricultural &amp; Dairy Commodities?
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#4D6765] leading-relaxed font-sans max-w-xl">
                Partner with Agro Dairy Export LLP for origin-direct Bold Peanuts, precision-sorted Grains, Pulses, and Pure Dairy Ghee. Get verified export specifications, customized packaging, and competitive container FOB/CIF quotes.
              </p>

              {/* 4 Trade Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { title: '50,000+ MT Export Capacity', desc: 'Annual multi-commodity volume' },
                  { title: 'APEDA & FSSAI Certified', desc: 'Accredited lab quality testing' },
                  { title: 'Mundra & Hazira Direct Loading', desc: 'Fast customs & port dispatch' },
                  { title: 'Mixed Containers Supported', desc: 'Peanuts, ghee & grains in 1 FCL' },
                ].map(({ title, desc }, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-[#D4ECE9] shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0C2422]">{title}</div>
                      <div className="text-[11px] text-[#4D6765]">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#rfq-section"
                  id="cta-get-quote-btn"
                  className="px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm shadow-md shadow-brand-primary/25 hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  <span>Request Container Quote (RFQ)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/919023363680?text=Hello%20Agro%20Dairy%20Export%20LLP,%20I%20am%20interested%20in%20importing%20agricultural%20commodities."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-whatsapp-btn"
                  className="px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#1fb857] text-white font-ui font-bold text-sm shadow-md shadow-[#25D366]/20 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp (+91 90233 63680)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Export Desk Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl overflow-hidden border border-[#D4ECE9] shadow-xl p-2.5">
                {/* Visual Header Image */}
                <div className="relative rounded-2xl overflow-hidden h-48 sm:h-52">
                  <img
                    src="/images/port-aerial.jpg"
                    alt="Gujarat port container terminal at Mundra and Hazira"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/cargo-ship.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C2422]/90 via-[#0C2422]/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                      <Ship className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Direct Sea Gateways</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-primary text-white font-bold">
                      INMUN1 • INIXY1 • INHZA1
                    </span>
                  </div>
                </div>

                {/* Desk Details */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D4ECE9]">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold">
                        Corporate Export Desk
                      </div>
                      <div className="text-base font-display font-bold text-[#0C2422]">
                        J.P. Vora (Managing Partner)
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#E6F7F5] text-brand-primary flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#4D6765]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#0C2422]/70">Average RFQ Response:</span>
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        &lt; 2 Hours
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#0C2422]/70">Direct Telephone:</span>
                      <a href="tel:+919023363680" className="font-mono font-bold text-[#0C2422] hover:text-brand-primary">
                        +91 90233 63680
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#0C2422]/70">Commercial Desk Email:</span>
                      <a href="mailto:agrodairyexportllp@gmail.com" className="font-mono font-semibold text-brand-primary hover:underline">
                        agrodairyexportllp@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#0C2422]/70">Registered Office:</span>
                      <span className="font-semibold text-[#0C2422]">Surat, Gujarat, India</span>
                    </div>
                  </div>

                  {/* 1-Click Fast Inquire Strip */}
                  <div className="pt-3 border-t border-[#D4ECE9]">
                    <a
                      href="#rfq-section"
                      className="w-full py-3 rounded-xl bg-[#F4F9F8] hover:bg-[#E6F7F5] border border-[#D4ECE9] text-brand-primary font-ui font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Inquire About Current Lot Availability</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

