import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, ArrowRight, CheckCircle2, Globe2, Anchor, Layers,
  Calculator, Search, Award, Clock, FileCheck2,
  ChevronRight, ChevronLeft, Building2, Truck, Package, Phone, Mail, MapPin, Check,
  Star, Leaf, Scale, ChevronDown, ChevronUp, TrendingUp, Users, HeartHandshake,
  Ship, Factory, Wheat, Droplets, FlaskConical, BadgeCheck
} from 'lucide-react';
import { productsService, inquiriesService } from '../services/api';
import CommodityCard from '../components/CommodityCard';
import { 
  HeroProductDecorations, 
  SectionProductWatermark,
  WheatStalkSvg,
  PeanutPodSvg,
  DairyGheeDropletSvg,
  PulseChickpeaPodSvg
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
    a: "We export pure Indian Cow Ghee and Buffalo Ghee, Bold Peanut Kernels (38/42 to 70/80 counts), Grains & Millets (Green Pearl/Foxtail Millet, Sorghum/Jowar, Yellow & White Maize), Pulses (Green Moong Beans, Moong Mogar split mung, Desi Chickpeas, Kabuli Chickpeas), and Sesame Seeds."
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
  { id: 'peanuts', name: 'Bold Peanut Kernels', category_name: 'Peanuts', slug: 'bold-peanuts', short_description: 'Sortex-clean Bold Peanuts, counts 38/42 to 70/80. Purity 99%+, moisture 7–8%. Available in 25 kg PP/Jute/Vacuum bags.', origin: 'Saurashtra, Gujarat', moq: 19, moq_unit: 'MT', grade_variety: 'Sortex 99%', is_featured: 1, main_image: 'products/bold-peanuts.jpg' },
  { id: 'moong', name: 'Green Moong Beans', category_name: 'Pulses', slug: 'green-moong', short_description: 'Premium Green Moong Beans, 180–270 count range. 98–99.9% purity, 12% moisture max. Ideal for retail and food processing.', origin: 'Rajkot, Gujarat', moq: 25, moq_unit: 'MT', grade_variety: 'Export Grade', is_featured: 0, main_image: null },
  { id: 'ghee', name: 'Pure Dairy Ghee', category_name: 'Dairy Ghee', slug: 'pure-dairy-ghee', short_description: 'Pure Cow & Buffalo Granular Ghee. 99.7–99.8% milk fat, zero starch. 15 kg food-grade tins, jars or drums.', origin: 'Anand, Gujarat', moq: 1, moq_unit: 'MT', grade_variety: 'FSSAI Certified', is_featured: 1, main_image: null },
  { id: 'chickpeas', name: 'Desi Chickpeas', category_name: 'Pulses', slug: 'desi-chickpeas', short_description: 'Brown Desi Chickpeas, 5–7 mm / 6–8 mm. Purity 98–99%, moisture 12% max. 25 kg/50 kg PP or Jute bags.', origin: 'Gujarat, India', moq: 25, moq_unit: 'MT', grade_variety: 'Sortex Clean', is_featured: 0, main_image: null },
  { id: 'millet', name: 'Green Pearl Millet', category_name: 'Grains', slug: 'pearl-millet', short_description: 'Pearl Millet (Bajra) / Foxtail Millet. Machine & Sortex 99% purity, 11% moisture max. 24–25 MT in 20ft FCL.', origin: 'Saurashtra, Gujarat', moq: 24, moq_unit: 'MT', grade_variety: '99% Sortex', is_featured: 0, main_image: null },
  { id: 'kabuli', name: 'Kabuli Chickpeas', category_name: 'Pulses', slug: 'kabuli-chickpeas', short_description: 'Cream Kabuli Chickpeas, count 38/40 to 75/80. 99% Sortex clean, moisture 12% max. Premium export grade.', origin: 'Rajasthan / MP', moq: 25, moq_unit: 'MT', grade_variety: '99% Sortex', is_featured: 0, main_image: null },
  { id: 'sorghum', name: 'Sorghum (White Jowar)', category_name: 'Grains', slug: 'sorghum-jowar', short_description: 'White Sorghum. Machine 98–99%, Sortex 99% purity. Moisture 11% max. 25 kg/50 kg PP or Jute bags.', origin: 'Saurashtra, Gujarat', moq: 24, moq_unit: 'MT', grade_variety: '99% Sortex', is_featured: 0, main_image: null },
  { id: 'maize', name: 'Yellow Maize (Corn)', category_name: 'Grains', slug: 'yellow-maize', short_description: 'Yellow & White Maize. Machine 98–99%, Sortex 99% purity. Moisture 11% max. 24 MT in 20ft FCL.', origin: 'Gujarat, India', moq: 24, moq_unit: 'MT', grade_variety: 'Export Grade', is_featured: 0, main_image: null },
];

const CATEGORIES_STATIC = [
  { id: 'peanuts', name: 'Peanuts', slug: 'peanuts' },
  { id: 'grains', name: 'Grains', slug: 'grains' },
  { id: 'pulses', name: 'Pulses', slug: 'pulses' },
  { id: 'dairy-ghee', name: 'Dairy Ghee', slug: 'dairy-ghee' },
];

const PROCESS_STEPS = [
  { num: '01', icon: Leaf, label: 'Sourcing', desc: 'We source matching lots from trusted farmer networks and mandis across Gujarat & Saurashtra to your exact grade, count and quantity.', image: '/images/bg/pearl-millet.jpg', tag: 'Green Pearl Millet' },
  { num: '02', icon: Factory, label: 'Processing', desc: 'Lots are de-stoned, cleaned, Sortex sorted, and lab-tested for moisture, aflatoxin, and foreign matter to your market requirements.', image: '/images/bg/real-ghee.jpg', tag: 'Pure Cow Ghee' },
  { num: '03', icon: Package, label: 'Packaging', desc: 'Packed in 25 kg/50 kg PP or Jute bags, vacuum packs, or food-grade tins, then containerized and professionally fumigated.', image: '/images/bg/shelled-peanuts.jpg', tag: 'Shelled Bold Peanuts' },
  { num: '04', icon: Ship, label: 'Shipping', desc: 'We book the container vessel, issue original B/L and export documents, and share live maritime tracking until your destination port.', image: '/images/bg/chickpeas.jpg', tag: 'Desi & Kabuli Chickpeas' },
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
  { value: 10, suffix: '+', label: 'Years Experience', icon: Clock },
  { value: 40, suffix: '+', label: 'Countries Served', icon: Globe2 },
  { value: 150, suffix: '+', label: 'Institutional Buyers', icon: Users },
  { value: 1800, suffix: '+', label: 'FCL Dispatches', icon: Truck },
  { value: 50000, suffix: '+', label: 'Metric Tonnes Shipped', icon: Scale },
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
function StatCard({ stat, running }) {
  const n = useCountUp(stat.value, 1800, running);
  const Icon = stat.icon;
  return (
    <div className="text-center p-6 rounded-2xl bg-white/8 border border-white/10 backdrop-blur-sm">
      <Icon className="w-6 h-6 text-brand-gold/80 mx-auto mb-2" />
      <span className="block text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight stat-number">
        {n.toLocaleString()}{stat.suffix}
      </span>
      <span className="block text-xs text-white/60 mt-1.5 font-ui font-medium">{stat.label}</span>
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
        className="w-full bg-brand-gold hover:bg-yellow-500 disabled:opacity-60 text-brand-deep font-display font-bold text-sm py-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <span className="w-4 h-4 border-2 border-brand-deep/30 border-t-brand-deep rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>Submit Export Inquiry <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

/* ===========================
   MAIN HOME COMPONENT
   =========================== */
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);
  const [loading, setLoading] = useState(true);

  // Intersection refs
  const [statsRef, statsVisible] = useIntersection(0.2);
  const [aboutRef, aboutVisible] = useIntersection(0.1);
  const [whyRef, whyVisible] = useIntersection(0.1);
  const [processRef, processVisible] = useIntersection(0.1);
  const [certsRef, certsVisible] = useIntersection(0.1);

  useEffect(() => {
    Promise.all([
      productsService.getCategories(),
      productsService.getAll({ limit: 50 })
    ]).then(([catRes, prodRes]) => {
      if (catRes.success && catRes.data?.length) setCategories(catRes.data);
      else setCategories(CATEGORIES_STATIC);
      if (prodRes.success && prodRes.data?.length) setProducts(prodRes.data);
      else setProducts(PRODUCTS_STATIC);
    }).catch(() => {
      setCategories(CATEGORIES_STATIC);
      setProducts(PRODUCTS_STATIC);
    }).finally(() => setLoading(false));
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products.slice(0, 8)
    : products.filter(p => p.category_slug === activeCategory || p.category_name?.toLowerCase() === activeCategory);

  return (
    <div>
      {/* ═══════════════════════════════════════
          HERO SECTION — Logo Palette (Teal & Deep Pine)
          ═══════════════════════════════════════ */}
      <section className="relative bg-[#F4F9F8] text-brand-text pt-8 pb-10 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-12 overflow-hidden border-b border-[#D4ECE9]">
        {/* Custom Agricultural & Dairy Product Motifs in Background (Peanuts, Grains, Pulses, Dairy Ghee) */}
        <HeroProductDecorations />

        {/* Subtle decorative botanical blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/40 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="section-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Heading, Subtext, CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="animate-fade-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-semibold shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>Trusted Agro &amp; Dairy Export Partner from India</span>
              </div>

              {/* Main Headline */}
              <h1 className="animate-fade-in-up font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.14] tracking-tight text-[#0C2422]">
                Origin-Direct Peanuts,<br />
                Grains, Pulses &amp; Pure<br />
                <span className="text-brand-primary">Dairy Ghee</span>
              </h1>

              {/* Subtitle */}
              <p className="animate-fade-in-up delay-100 text-base sm:text-lg text-[#4D6765] leading-relaxed max-w-xl font-sans">
                We source, process and export premium quality agricultural commodities from India to global markets with consistent quality, competitive pricing and reliable supply.
              </p>

              {/* CTAs */}
              <div className="animate-fade-in-up delay-200 flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  id="hero-view-products-btn"
                  className="px-7 py-3.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm shadow-md shadow-brand-primary/25 hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  <span>View Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#rfq-section"
                  id="hero-get-quote-btn"
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-brand-accent text-brand-deep font-ui font-bold text-sm border-2 border-brand-deep transition-all shadow-sm"
                >
                  Get a Quote
                </a>
              </div>

              {/* Horizontal Trust Bar below CTAs */}
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
            </div>

            {/* Right Column: Hero Visual with Pure India script & floating badges (5 cols) */}
            <div className="lg:col-span-5 relative">
              {/* Handwritten script note: "Pure India to the World" with curved arrow */}
              <div className="absolute -top-6 left-6 z-20 flex flex-col items-center select-none pointer-events-none">
                <span className="font-serif italic font-bold text-brand-deep text-lg md:text-xl drop-shadow-sm rotate-[-4deg]">
                  Pure India to the World
                </span>
                <svg className="w-14 h-8 text-brand-primary/80 -mt-1 ml-6" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M 10 5 Q 35 25 50 15" />
                  <path d="M 45 10 L 52 16 L 45 22" />
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
                  src="/images/hero-commodities.jpg"
                  alt="Export quality peanuts, pulses, grains, and golden pure dairy ghee"
                  className="w-full h-[380px] sm:h-[420px] object-cover"
                />

                {/* Floating Real Product Card: Pure Cow Ghee */}
                <div className="hidden sm:flex absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-[#D4ECE9] items-center gap-2.5 animate-bounce-gentle">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-amber-50 shrink-0 border border-amber-200">
                    <img 
                      src="/images/bg/real-ghee.jpg" 
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
                      src="/images/products/bold-peanuts.jpg" 
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
          SECTION 2: ABOUT AGRO EXPORT
          ═══════════════════════════════════════ */}
      <section id="about" className="relative pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-20 bg-[#F4F9F8] overflow-hidden" ref={aboutRef}>
        {/* Real photographic background watermarks (Whole Peanuts & Pearl Millet) */}
        <SectionProductWatermark type="peanuts" position="right" />
        <SectionProductWatermark type="pearl-millet" position="left" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image with 50,000+ MT Floating Badge (5 cols) */}
            <div className={`lg:col-span-5 relative transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-brand-border bg-white">
                <img
                  src="/images/cargo-ship.jpg"
                  alt="Container cargo vessel exporting commodities globally"
                  className="w-full h-[400px] lg:h-[460px] object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/port-aerial.jpg';
                  }}
                />
              </div>

              {/* Floating green badge in corner */}
              <div className="absolute bottom-6 left-6 bg-brand-deep text-white rounded-2xl px-5 py-3.5 shadow-xl border border-white/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <div className="font-display font-black text-2xl leading-none text-white">50,000+</div>
                  <div className="text-[11px] font-ui text-white/80 mt-0.5">MT Exported Annually</div>
                </div>
              </div>
            </div>

            {/* Right Content (7 cols) */}
            <div className={`lg:col-span-7 space-y-6 transition-all duration-700 delay-100 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div>
                <span className="text-xs font-ui font-bold uppercase tracking-wider text-brand-primary block mb-2">
                  — ABOUT AGRO EXPORT
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0C2422] leading-tight">
                  Your Trusted Partner for Agricultural &amp; Dairy Exports
                </h2>
              </div>

              <p className="text-[#4D6765] text-sm sm:text-base leading-relaxed">
                We are a leading exporter of Peanuts, Grains, Pulses and Dairy Ghee from India, supplying high-quality agricultural products to international markets. With a strong supply chain, strict quality control and customer-centric approach, we ensure consistency, reliability and long-term partnerships.
              </p>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { Icon: BadgeCheck, title: 'Quality Assurance' },
                  { Icon: Globe2, title: 'Global Reach' },
                  { Icon: TrendingUp, title: 'Competitive Pricing' },
                  { Icon: HeartHandshake, title: 'Long-Term Partnerships' },
                ].map(({ Icon, title }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-ui font-bold text-sm text-[#0C2422]">{title}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/company/about"
                  id="about-know-more-btn"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm shadow-md shadow-brand-primary/20 transition-all group"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3: EXPORT COMMODITIES CATALOG
          ═══════════════════════════════════════ */}
      <section id="products" className="relative py-20 bg-white overflow-hidden">
        {/* Real photographic yellow corn & chickpeas background watermarks */}
        <SectionProductWatermark type="yellow-corn" position="left" />
        <SectionProductWatermark type="chickpeas" position="right" />
        <div className="section-container relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-ui font-bold uppercase tracking-wider text-brand-primary block mb-1">
                — OUR PRODUCTS
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0C2422]">Export Commodities Catalog</h2>
              <p className="text-sm text-[#4D6765] mt-2 max-w-xl">
                High-quality Indian agricultural products, sourced directly from farms and processed for global markets.
              </p>
            </div>
            <Link to="/products" id="catalog-view-all-btn" className="text-brand-primary hover:text-brand-deep font-display font-bold text-sm flex items-center gap-1 shrink-0">
              View All Products <ChevronRight className="w-4 h-4" />
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
          SECTION 4: OUR EXPORT RECORD IN NUMBERS (Logo Deep Pine)
          ═══════════════════════════════════════ */}
      <section ref={statsRef} className="bg-brand-deep py-16 text-white relative overflow-hidden border-y border-brand-primary/20 bg-agro-decor-deep">
        {/* Ambient grain and peanut background silhouettes */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 transform -rotate-12 pointer-events-none">
          <WheatStalkSvg className="w-48 h-48 text-brand-primary" opacity="0.08" />
        </div>
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 transform rotate-12 pointer-events-none">
          <PeanutPodSvg className="w-44 h-44 text-brand-gold" opacity="0.10" />
        </div>
        <div className="section-container relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Our Export Record in Numbers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} running={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5: GLOBAL QUALITY. INDIAN ROOTS. (WHY CHOOSE US)
          ═══════════════════════════════════════ */}
      <section id="why-us" ref={whyRef} className="relative py-20 bg-[#F4F9F8] border-y border-brand-border overflow-hidden">
        {/* Real background green moong & dairy ghee watermarks */}
        <SectionProductWatermark type="green-moong" position="left" />
        <SectionProductWatermark type="ghee" position="right" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 4 Cards (7 cols) */}
            <div className={`lg:col-span-7 space-y-6 transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div>
                <span className="text-xs font-ui font-bold uppercase tracking-wider text-brand-primary block mb-2">
                  — WHY CHOOSE US
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0C2422] leading-tight">
                  Global Quality. Indian Roots.
                </h2>
                <p className="text-sm text-[#4D6765] mt-2 max-w-lg">
                  We combine deep industry expertise with a strong supply chain to deliver the best agricultural products to your market.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Leaf,
                    title: 'Direct Farm Sourcing',
                    desc: 'Fresh & pure agro products directly from Indian farms.',
                  },
                  {
                    icon: FlaskConical,
                    title: 'Strict Quality Control',
                    desc: 'Multiple quality checks before dispatch.',
                  },
                  {
                    icon: Ship,
                    title: 'Global Shipping',
                    desc: 'Reliable & on-time delivery worldwide.',
                  },
                  {
                    icon: HeartHandshake,
                    title: 'Customer Support',
                    desc: 'Dedicated export support team for smooth transactions.',
                  },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border border-brand-border shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-[#0C2422] mb-1">{title}</h3>
                    <p className="text-xs text-[#4D6765] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image with Hands & Grains (5 cols) */}
            <div className={`lg:col-span-5 relative transition-all duration-700 delay-150 ${whyVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-brand-border bg-white">
                <img
                  src="/images/farm-sourcing.jpg"
                  alt="Indian farmer holding pure harvest grains"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-brand-border flex items-center gap-2 text-xs font-ui font-bold text-brand-primary">
                <Leaf className="w-4 h-4 text-brand-primary" />
                <span>From Indian farms to global markets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6: FROM FARM TO YOUR PORT IN FOUR STEPS
          ═══════════════════════════════════════ */}
      <section id="process" ref={processRef} className="relative py-20 bg-white overflow-hidden">
        {/* Real background wheat ears & yellow corn watermarks */}
        <SectionProductWatermark type="wheat" position="right" />
        <SectionProductWatermark type="yellow-corn" position="left" />
        <div className="section-container relative z-10">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-ui font-bold uppercase tracking-wider text-brand-primary block mb-2">
              — OUR EXPORT PROCESS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0C2422]">
              From Farm to Your Port in Four Steps
            </h2>
            <p className="text-sm text-[#4D6765] mt-2">
              A simple and transparent process to ensure the best quality and timely delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {PROCESS_STEPS.map(({ num, label, desc, image, tag }, i) => (
              <div
                key={i}
                className={`group relative bg-[#F4F9F8] hover:bg-white rounded-3xl p-6 border border-[#D4ECE9] hover:border-brand-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center ${processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Real photographic commodity preview thumbnail */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md mb-3.5 group-hover:scale-105 transition-transform duration-300 bg-white">
                  <img src={image} alt={tag} className="w-full h-full object-cover filter contrast-105" />
                  <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-brand-primary text-white text-[11px] font-bold flex items-center justify-center shadow">
                    {num}
                  </div>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#E6F7F5] text-brand-primary text-[10px] font-ui font-bold uppercase tracking-wider mb-1">
                  {tag}
                </div>
                <h3 className="font-display font-bold text-lg text-[#0C2422]">{label}</h3>
                <p className="text-xs text-[#4D6765] leading-relaxed max-w-[220px] mx-auto mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7: SHIPPING & REQUEST A QUOTE (Side-by-side)
          ═══════════════════════════════════════ */}
      <section id="rfq-section" className="relative py-20 bg-[#F4F9F8] overflow-hidden">
        {/* Real background chickpeas watermark behind RFQ section */}
        <SectionProductWatermark type="chickpeas" position="right" />
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Shipping from Gujarat Ports (5 cols) */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl min-h-[460px] flex flex-col justify-end p-8 text-white">
              <img
                src="/images/port-aerial.jpg"
                alt="Gujarat port container terminal at sunset"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/50 to-transparent" />

              <div className="relative z-10 bg-brand-deep/95 backdrop-blur-md rounded-2xl p-6 border border-brand-primary/30 space-y-3">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
                  Shipping From Gujarat's Ports to Yours
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  We export from major ports including Mundra, Kandla and Hazira.
                </p>
                <Link
                  to="/logistics"
                  className="inline-flex items-center gap-2 text-xs font-ui font-bold text-brand-primary hover:text-white transition-colors pt-1"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Request a Quote / Export Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-brand-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-ui font-bold uppercase tracking-wider text-brand-primary block mb-1">
                  — GET A QUOTE
                </span>
                <h3 className="font-display font-bold text-2xl text-[#0C2422] mb-4">
                  Talk to Our Export Desk Before You Order
                </h3>

                {/* 4 Checkmark Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-[#4D6765]">
                  {[
                    'Latest pricing and product availability',
                    'Customized packaging options',
                    'Export documentation support',
                    'Reliable shipping and logistics',
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
          SECTION 8: VERIFY AGRO EXPORT LLP
          ═══════════════════════════════════════ */}
      <section ref={certsRef} className="py-14 bg-[#E8F6F4] border-y border-[#CCEBE7]">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0C2422]">Verify Agro Export LLP</h2>
              <p className="text-xs text-[#4D6765] mt-1">Check our certification, export license and compliance documents.</p>
            </div>
            <Link
              to="/certifications"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-deep hover:bg-brand-primary text-white font-ui font-bold text-xs shadow-md transition-all shrink-0"
            >
              <span>View All Certificates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'IEC Certificate', sub: 'Verified 0817029381' },
              { label: 'APEDA Registered', sub: 'Verified Exporter' },
              { label: 'GST Compliant', sub: 'Verified 24AAHFA3928L1Z9' },
              { label: 'Export Documentation', sub: 'Verified & Certified' },
            ].map(({ label, sub }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#CCEBE7] shadow-sm flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-brand-primary stroke-[3]" />
                </div>
                <div>
                  <div className="font-ui font-bold text-xs sm:text-sm text-[#0C2422]">{label}</div>
                  <div className="text-[11px] text-[#4D6765] mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 9: FREQUENTLY ASKED QUESTIONS (FAQ)
          ═══════════════════════════════════════ */}
      <section id="faq" className="py-20 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Decorative Image (4 cols) */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 rounded-3xl overflow-hidden shadow-lg border border-brand-border">
                <img
                  src="/images/hero-commodities.jpg"
                  alt="Pure Indian export commodities"
                  className="w-full h-[480px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right FAQ Accordion (8 cols) */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0C2422]">Frequently Asked Questions (FAQ)</h2>
                <p className="text-sm text-[#4D6765] mt-2">Quick answers to common questions about our export process, products and services.</p>
              </div>

              <div className="space-y-3" role="list">
                {FAQS.map((faq, i) => (
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
          SECTION 10: PRE-FOOTER CTA BANNER
          ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#F4F9F8] relative overflow-hidden border-t border-[#D4ECE9]">
        {/* Real photographic background watermarks */}
        <SectionProductWatermark type="wheat" position="right" />
        <SectionProductWatermark type="peanuts" position="left" />

        <div className="section-container relative z-10">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#07211E] via-[#0C2E2A] to-[#0A2421] p-8 sm:p-12 lg:p-14 text-white shadow-2xl border border-white/10">
            {/* Ambient decorative blurs inside card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#009688]/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#5EEAD4] text-xs font-ui font-semibold shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-[#5EEAD4] shrink-0" />
                <span>Direct Gujarat Sourcing • Worldwide Port Shipments</span>
              </div>

              {/* Headline */}
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.18]">
                Ready to Source Premium Indian Agricultural &amp; Dairy Commodities?
              </h2>

              {/* Subtitle */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
                Partner with Agro Dairy Export LLP for farm-fresh peanuts, precision-sorted grains, pulses, and pure dairy ghee. Get verified export specs, customized packaging, and competitive container FOB/CIF quotes.
              </p>

              {/* Feature Highlights Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {[
                  { text: '50,000+ MT Export Capacity' },
                  { text: 'APEDA & FSSAI Certified' },
                  { text: 'Mundra & Hazira Direct Loading' },
                  { text: 'Mixed Containers Supported' },
                ].map(({ text }, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-ui font-medium border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5EEAD4]" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href="#rfq-section"
                  id="cta-get-quote-btn"
                  className="px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm shadow-lg shadow-brand-primary/30 transition-all flex items-center gap-2 group"
                >
                  <span>Request Container Quote (RFQ)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/919023363680?text=Hello%20Agro%20Dairy%20Export%20LLP,%20I%20am%20interested%20in%20importing%20agricultural%20commodities."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-whatsapp-btn"
                  className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-ui font-bold text-sm border border-white/25 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#5EEAD4]" />
                  <span>Chat on WhatsApp (+91 90233 63680)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

