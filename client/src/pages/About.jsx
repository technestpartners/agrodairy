import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, ChevronRight, ShieldCheck, Users, Award, 
  MapPin, CheckCircle2, ArrowRight, Ship, Globe2, 
  FileText, Anchor, Layers, Scale, Truck, Phone, Mail,
  ExternalLink, Search, Sparkles, Check, MessageCircle, Clock,
  BadgeCheck, Compass, Warehouse, FlaskConical, Download,
  CheckCircle, ArrowUpRight, ShieldAlert, Cpu, Share2, Leaf
} from 'lucide-react';
import { companyService } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import { 
  AboutHeroDecorations, 
  AboutStoryDecorations, 
  AboutTeamDecorations, 
  AboutExpertiseDecorations, 
  AboutReachDecorations,
  RealProductSectionFlanks
} from '../components/ProductBackgroundDecorations';

// Verified Executive Leadership
const VERIFIED_TEAM = [
  {
    id: 5,
    name: 'J.P. Vora',
    position: 'Managing Partner & Director of Global Trade',
    bio: 'Oversees global export trade desks, buyer contract negotiations across GCC, EU, and Southeast Asia, farmer mandi procurement networks in Saurashtra, and multimodal export execution.',
    initials: 'JV',
    email: 'agrodairyexportllp@gmail.com',
    phone: '+91 90233 63680',
    roleCategory: 'Global Trade & Desk',
    experience: '18+ Years Experience',
    specialty: 'International Trade Contracts & Maritime Incoterms'
  },
  {
    id: 1,
    name: 'Dharmesh Patel',
    position: 'Co-Founder & Managing Director',
    bio: 'Directs strategic agricultural expansion, commodity procurement alliances with Gujarat APMC mandis, and enterprise export financing.',
    initials: 'DP',
    email: 'dharmesh@agrodairy.com',
    roleCategory: 'Strategy & Origination',
    experience: '25+ Years Experience',
    specialty: 'Mandi Procurement & Farmer Cooperatives'
  },
  {
    id: 2,
    name: 'Bhavesh Thummar',
    position: 'Director — Supply Chain & Processing Operations',
    bio: 'Manages advanced optical Sortex grading facilities in Gondal, contract farming programs, precision packing lines, and port staging logistics.',
    initials: 'BT',
    email: 'bhavesh@agrodairy.com',
    roleCategory: 'Processing & Sortex Plant',
    experience: '20+ Years Experience',
    specialty: 'Buhler Sortex Calibration & Container Loading'
  },
  {
    id: 3,
    name: 'Rajesh Patel',
    position: 'Head of International Trade & RFQ Relations',
    bio: 'Specializes in ocean freight container booking, buyer specification audits, phytosanitary fumigation tracking, and proforma documentation.',
    initials: 'RP',
    email: 'sales@agrodairy.com',
    roleCategory: 'Commercial & Freight',
    experience: '14+ Years Experience',
    specialty: 'Ocean Freight & Tamper-Evident Stenciling'
  },
  {
    id: 4,
    name: 'Dr. Hiren Mehta',
    position: 'Chief Quality Officer & Food Technologist',
    bio: 'Ph.D. in Food Safety. Directs accredited HPLC chromatography testing, EU aflatoxin compliance (<4 ppb), pesticide residue screens, and ISO 22000 protocols.',
    initials: 'HM',
    email: 'quality@agrodairy.com',
    roleCategory: 'Quality & Lab Compliance',
    experience: '19+ Years Experience',
    specialty: 'Aflatoxin Analysis & Pre-Shipment COA'
  }
];

// Gujarat Agricultural Production Belts
const SOURCING_BELTS = [
  {
    region: 'Saurashtra Groundnut Corridor',
    hubs: 'Gondal, Rajkot, Junagadh, Jamnagar',
    crops: 'Bold Peanuts (38/42–70/80), Java, In-Shell, Blanched Peanuts',
    purity: '99.0%–99.5% Sortex Clean',
    aflatoxin: '<4 ppb EU Certified',
    description: 'Renowned as India’s highest yielding peanut basin. Calibrated counts with uniform reddish-brown kernel pigmentation and low moisture (7–8%).'
  },
  {
    region: 'Unjha Spice & Seed Belt',
    hubs: 'Unjha, Mehsana, Banaskantha, Patan',
    crops: 'Natural White Sesame, Hulled Sesame (99.95%), Cumin (Jeera), Fennel (Variyali)',
    purity: '99.5%–99.95% Purity',
    aflatoxin: 'Pesticide Tested',
    description: 'The global trading epicenter for high-essential-oil cumin seeds and snow-white mechanically hulled sesame seeds ready for bakery and tahini applications.'
  },
  {
    region: 'Bhal & Central Gujarat Agro Basin',
    hubs: 'Anand, Kheda, Ahmedabad, Vadodara',
    crops: 'Pure Cow & Buffalo Ghee, Green Moong Beans, Desi Chickpeas, Kabuli Chickpeas',
    purity: '99.8% Milk Fat / 99% Sortex',
    aflatoxin: 'Zero Microbial Contamination',
    description: 'Fertile alluvial soil corridor delivering high-protein whole legumes and traditional bilona-grade aromatic granular dairy ghee.'
  }
];

// Strategic Maritime Ports & Ocean Transit Matrix
const PORT_ROUTES = [
  {
    port: 'Jebel Ali / Dubai, UAE',
    region: 'Middle East / GCC',
    transit: '3 – 5 Days',
    frequency: '3 Sailings / Week',
    vesselLine: 'Maersk, MSC, CMA CGM',
    status: 'High Volume Corridor'
  },
  {
    port: 'Rotterdam / Hamburg, Europe',
    region: 'Western Europe',
    transit: '22 – 26 Days',
    frequency: '2 Sailings / Week',
    vesselLine: 'Hapag-Lloyd, MSC, ONE',
    status: 'Strict EU Aflatoxin COA'
  },
  {
    port: 'Mersin / Istanbul, Turkey',
    region: 'Eastern Mediterranean',
    transit: '14 – 17 Days',
    frequency: 'Weekly Direct',
    vesselLine: 'MSC, COSCO, Arkas',
    status: 'Direct Feeder & Mother Vessel'
  },
  {
    port: 'Haiphong / Ho Chi Minh, Vietnam',
    region: 'Southeast Asia',
    transit: '10 – 14 Days',
    frequency: '3 Sailings / Week',
    vesselLine: 'Evergreen, ONE, Wan Hai',
    status: 'Major Peanut & Sesame Flow'
  },
  {
    port: 'Chittagong, Bangladesh',
    region: 'South Asia',
    transit: '6 – 8 Days',
    frequency: 'Bi-Weekly Express',
    vesselLine: 'Feeder Express, BTL',
    status: 'Express Coastal Feeder'
  },
  {
    port: 'Mombasa / Dar es Salaam, Africa',
    region: 'East Africa',
    transit: '12 – 15 Days',
    frequency: 'Weekly Regular',
    vesselLine: 'PIL, CMA CGM, MSC',
    status: 'Agricultural Grains & Pulses'
  }
];

// 4-Stage Export Execution Pipeline
const EXPORT_PIPELINE = [
  {
    step: '01',
    phase: 'Origination & Mandi Selection',
    timeline: 'Days 1 – 3',
    icon: Search,
    headline: 'Farmgate APMC Mandi Sourcing',
    points: [
      'Pre-purchase core moisture and count calibration at APMC auction yards.',
      'Batch traceability registration mapping farmer cluster to final container ID.',
      'Rejection of lots exceeding 8% moisture or showing fungal presence.'
    ],
    tag: 'APEDA Origin Traceable'
  },
  {
    step: '02',
    phase: 'Sortex Optical Grading & QC',
    timeline: 'Days 4 – 6',
    icon: FlaskConical,
    headline: 'Precision Buhler Sorting & Lab COA',
    points: [
      'Multi-pass optical color sorting and high-speed gravity separation.',
      'Independent accredited HPLC lab analysis for EU aflatoxin limits (<4 ppb).',
      'Microbiological screening, purity certification, and grading stamp.'
    ],
    tag: '99.9% Sortex Purity'
  },
  {
    step: '03',
    phase: 'Packaging & Fumigation',
    timeline: 'Days 7 – 8',
    icon: Warehouse,
    headline: 'Tamper-Evident Multiwall Packing',
    points: [
      'Food-grade 25 kg/50 kg PP bags, Jute bags, or 25 kg vacuum preservation.',
      'Custom buyer mark stenciling, batch codes, barcodes, and manufacture dates.',
      'Government authorized Methyl Bromide fumigation under trained supervision.'
    ],
    tag: 'Custom Buyer Stenciling'
  },
  {
    step: '04',
    phase: 'Port Transit & Vessel Staging',
    timeline: 'Days 9 – 11',
    icon: Ship,
    headline: 'Mundra & Hazira Customs Gate-In',
    points: [
      'Direct highway corridor transit to Mundra, Kandla, or Hazira port terminals.',
      'Customs inspection, container bolt sealing, and clean on-board Bill of Lading.',
      'Complete digitized export documentation dispatch via courier and EDI portal.'
    ],
    tag: 'Port Customs Bolt-Sealed'
  }
];

// Official Credentials & Compliance
const VERIFIED_CREDENTIALS = [
  {
    badge: 'APEDA Registered',
    code: 'RCMC/AGRO/2026/0892',
    name: 'Agricultural & Processed Food Products Export Development Authority',
    authority: 'Ministry of Commerce & Industry, Govt. of India',
    scope: 'Certified Merchant Exporter for Scheduled Agricultural Commodities',
    validity: 'Active & Verified',
    icon: ShieldCheck
  },
  {
    badge: 'FSSAI Central Licence',
    code: '10722026000148',
    name: 'Food Safety and Standards Authority of India',
    authority: 'Ministry of Health and Family Welfare, Govt. of India',
    scope: 'Central Export Food Manufacturing, Storage & Trade License',
    validity: 'Active & Verified',
    icon: Award
  },
  {
    badge: 'DGFT Importer-Exporter Code',
    code: '0817029381',
    name: 'Directorate General of Foreign Trade (DGFT)',
    authority: 'Ministry of Commerce, Govt. of India',
    scope: 'Authorized International Export & Commercial Trade Entity',
    validity: 'Lifetime Commercial License',
    icon: FileText
  },
  {
    badge: 'GSTIN Commercial Status',
    code: '24AAHFA3928L1Z9',
    name: 'Goods and Services Tax Network',
    authority: 'Government of Gujarat & CBIC India',
    scope: 'Registered Indian Limited Liability Partnership (LLP)',
    validity: 'Active Commercial Entity',
    icon: CheckCircle2
  },
  {
    badge: 'ISO 22000:2018 FSMS',
    code: 'FSMS-IN-2024-9182',
    name: 'Food Safety Management Systems Standard',
    authority: 'TUV SUD International Certification Body',
    scope: 'International Hazard Prevention Across Storage & Dispatch',
    validity: 'Audited & Compliant',
    icon: BadgeCheck
  },
  {
    badge: 'HACCP Certified Protocol',
    code: 'HACCP-AG-88210',
    name: 'Hazard Analysis & Critical Control Points',
    authority: 'Codex Alimentarius Global Standards',
    scope: 'Systemic Prevention of Chemical, Biological & Physical Contaminants',
    validity: 'Standard Export Protocol',
    icon: Scale
  },
  {
    badge: 'Spices Board of India',
    code: 'SPICES/EX/2026/0412',
    name: 'Spices Board of India (CRES Authorization)',
    authority: 'Ministry of Commerce & Industry, Govt. of India',
    scope: 'Export Registration for Cumin, Coriander, Fennel & Turmeric',
    validity: 'Active Registration',
    icon: Sparkles
  },
  {
    badge: 'US FDA Facility Registered',
    code: 'FEI 1982736410',
    name: 'U.S. Food & Drug Administration',
    authority: 'United States Department of Health and Human Services',
    scope: 'Foreign Food Facility Registration under FSMA Food Safety Act',
    validity: 'Active Facility Filing',
    icon: Globe2
  }
];

export default function About() {
  const { settings } = useSettings();
  const [team, setTeam] = useState(VERIFIED_TEAM);
  const [activeTab, setActiveTab] = useState('sourcing');
  const [activeTransitPort, setActiveTransitPort] = useState(0);

  useEffect(() => {
    companyService.getTeam()
      .then(res => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const merged = res.data.map((item, idx) => {
            const fallback = VERIFIED_TEAM.find(t => t.id === item.id) || VERIFIED_TEAM[idx] || {};
            return {
              ...item,
              initials: fallback.initials || item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
              roleCategory: fallback.roleCategory || 'Executive Leadership',
              experience: fallback.experience || '15+ Years Industry Experience',
              specialty: fallback.specialty || 'Global Commodity Trade & Procurement',
              phone: fallback.phone || '+91 90233 63680'
            };
          });
          setTeam(merged);
        }
      })
      .catch(e => console.warn('Using verified team fallback:', e));
  }, []);

  return (
    <div className="relative bg-[#FAFCFB] text-[#0C2422] min-h-screen selection:bg-[#00A79D]/15 selection:text-[#0C2422] font-sans">
      {/* Real commodity photographic background flanks */}
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="cumin-seeds" opacity="opacity-20 lg:opacity-25" />

      {/* =========================================================================
          1. ENTERPRISE HERO SECTION: Clean & Minimal Trade Showcase (Home Standard)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-16 border-b border-[#D4ECE9]">
        {/* Rich Background Elements: Trade Grid, Grains Watermark, Peanuts, Compass & Ambient Halos */}
        <AboutHeroDecorations />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E6F7F5]/60 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">About Agro Dairy Export LLP</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Authoritative Corporate Overview */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Institutional Registration Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>Govt. of India Recognized Merchant Exporter</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Connecting India’s Finest Agricultural Commodities to{' '}
                <span className="text-brand-primary">
                  Global Trade Corridors
                </span>
              </h1>

              {/* Mission Narrative */}
              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-normal max-w-2xl font-sans">
                Headquartered in Surat with direct procurement desks across Gujarat and Saurashtra farming belts, 
                <strong className="text-[#0C2422] font-semibold"> {settings?.company_name || 'Agro Dairy Export LLP'}</strong> delivers international commodity buyers calibrated Bold Peanuts, high-purity Sesame Seeds, Whole Spices, Pulses, Grains, and pure Indian Dairy Ghee backed by rigorous optical Sortex grading and accredited laboratory analysis.
              </p>

              {/* Action Buttons & Fast RFQ Desk */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/rfq"
                  className="px-7 py-3.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm shadow-md shadow-brand-primary/25 hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  <span>Request Proforma Quotation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-bold text-sm border-2 border-[#0C2422] transition-all shadow-sm flex items-center gap-2"
                >
                  <span>View Export Commodities</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-primary" />
                </Link>

                <a
                  href={`https://wa.me/${(settings?.contact_whatsapp || '919023363680').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(settings?.company_name || 'Agro Dairy Export LLP')},%20we%20are%20interested%20in%20importing%20agricultural%20commodities.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-ui font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                  <span className="hidden sm:inline">WhatsApp Trade Desk</span>
                </a>
              </div>

              {/* Verified Institutional Strip */}
              <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#D4ECE9] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0 border border-[#BBE5E1]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-ui font-bold text-xs text-[#0C2422] leading-tight">DGFT License</div>
                    <div className="text-[11px] font-mono text-[#4D6765]">IEC: {settings?.company_iec || '0817029381'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0 border border-[#BBE5E1]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-ui font-bold text-xs text-[#0C2422] leading-tight">Food Authority</div>
                    <div className="text-[11px] text-[#4D6765]">FSSAI Central</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0 border border-[#BBE5E1]">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-ui font-bold text-xs text-[#0C2422] leading-tight">Export Authority</div>
                    <div className="text-[11px] text-[#4D6765]">APEDA Registered</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0 border border-[#BBE5E1]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-ui font-bold text-xs text-[#0C2422] leading-tight">Quality Standard</div>
                    <div className="text-[11px] text-[#4D6765]">ISO 22000 &amp; HACCP</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero High-Definition Visual Canvas (Clean & Minimal) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Subtle Ambient Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#00A79D]/15 via-[#F5B800]/10 to-[#E6F7F5] rounded-3xl blur-xl opacity-70 pointer-events-none" />

                {/* Primary Card Frame - Clean Minimal White Container */}
                <div className="relative rounded-3xl overflow-hidden bg-white border border-[#D4ECE9] shadow-lg">
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                    <img
                      src="/images/about-commodities.jpg"
                      alt="Agro Dairy Export Indian Agricultural Commodities"
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/hero-commodities.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#D4ECE9] text-[#0C2422] text-xs font-bold font-mono shadow-xs">
                      <Anchor className="w-3.5 h-3.5 text-brand-primary" />
                      <span>MUNDRA &amp; HAZIRA PORTS</span>
                    </div>
                    <div className="absolute top-4 right-4 inline-flex items-center px-2.5 py-1 rounded-full bg-[#0C2422]/85 backdrop-blur-md text-[#5EEAD4] text-[11px] font-bold font-mono">
                      FOB · CFR · CIF
                    </div>
                  </div>

                  {/* Overlaid Operational Status Bar */}
                  <div className="p-6 bg-white space-y-3">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0C2422] leading-snug font-display">
                      Export Operations Command &amp; Container Logistics Desk
                    </h3>
                    <p className="text-xs text-[#4D6765] leading-relaxed font-sans">
                      Daily direct feeder vessel movements to Jebel Ali (3–5 days) and international mother vessel connectivity to Europe, Southeast Asia, and Africa.
                    </p>

                    <div className="pt-3 border-t border-[#D4ECE9] flex items-center justify-between text-xs text-[#4D6765]">
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle className="w-4 h-4 text-brand-primary" />
                        <span>Pre-Shipment COA Testing</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <CheckCircle className="w-4 h-4 text-amber-600" />
                        <span>Buhler Sortex Clean</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Metric Callout Pill */}
                <div className="absolute -bottom-5 -left-3 sm:-bottom-5 sm:-left-5 bg-white text-[#0C2422] p-3.5 sm:p-4 rounded-2xl shadow-lg border border-[#D4ECE9] flex items-center gap-3.5 z-20">
                  <div className="w-11 h-11 rounded-xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center shrink-0 border border-[#BBE5E1]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#4D6765] uppercase tracking-wider block font-ui">IEC Verified Status</span>
                    <span className="text-sm font-black text-[#0C2422] font-mono tracking-tight">0817029381 (DGFT)</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HERITAGE & GUJARAT SOURCING HUBS (Bento Grid Architecture)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#D4ECE9] relative overflow-hidden">
        <AboutStoryDecorations />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT PRODUCER ORIGINATION</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0C2422] tracking-tight">
              From Gujarat’s Agricultural Core to Global Gateways
            </h2>
            <p className="text-base text-[#4D6765] mt-4 leading-relaxed font-sans">
              Gujarat represents India’s most technologically advanced agricultural corridor. We procure directly from primary farmer collectives and verified APMC mandi centers across Saurashtra and Western India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Farm Sourcing High-Res Photograph & Facts */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#D4ECE9] bg-[#F4F9F8] group">
                <img
                  src="/images/farm-sourcing.jpg"
                  alt="Gujarat Agricultural Harvesting & Procurement"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/infrastructure.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021814]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-mono font-bold text-[#F5B800] uppercase tracking-wider mb-1">
                    APMC Groundnut &amp; Spice Mandis
                  </span>
                  <h4 className="text-lg font-bold font-display">Farmer Alliances in Saurashtra</h4>
                  <p className="text-xs text-white/80 mt-1 font-sans">Direct farmgate sampling ensures high oil content, controlled moisture, and zero aflatoxin contamination.</p>
                </div>
              </div>

              {/* Fast Facts Card */}
              <div className="bg-[#FAFCFB] rounded-3xl p-6 border border-[#D4ECE9] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0C2422] uppercase tracking-wider font-mono">
                  <Building2 className="w-4 h-4 text-brand-primary" />
                  <span>Head Office &amp; Operations Center</span>
                </div>
                <p className="text-sm text-[#4D6765] leading-relaxed font-sans">
                  Office no. -701, THE FUTURE CORNER, Sarthana, Surat-395013, Gujarat, India.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-brand-primary font-semibold border-t border-[#D4ECE9]">
                  <span>Proximity to Hazira Port: 45 Mins</span>
                  <span>Mundra Port: 380 Kms Express</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Regional Belts Showcase */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              {SOURCING_BELTS.map((belt, index) => (
                <div
                  key={index}
                  className="bg-[#FAFCFB] rounded-3xl p-6 border border-[#D4ECE9] hover:border-brand-primary/50 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center font-bold text-xs border border-[#BBE5E1]">
                        0{index + 1}
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#0C2422] group-hover:text-brand-primary transition-colors">
                        {belt.region}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#E6F7F5] text-[#008C84] border border-[#BBE5E1] self-start sm:self-auto">
                      {belt.purity}
                    </span>
                  </div>

                  <p className="text-sm text-[#4D6765] leading-relaxed mb-4 font-sans">
                    {belt.description}
                  </p>

                  <div className="pt-4 border-t border-[#D4ECE9] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#4D6765] block tracking-wider font-mono">Key Mandi Centers</span>
                      <span className="font-semibold text-slate-800">{belt.hubs}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#4D6765] block tracking-wider font-mono">Commodities Procured</span>
                      <span className="font-semibold text-slate-800">{belt.crops}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. OPERATIONAL SCALE & INFRASTRUCTURE (Clean High-Throughput Bento)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F4F9F8] border-b border-[#D4ECE9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
              <Scale className="w-3.5 h-3.5" />
              <span>VERIFIED INFRASTRUCTURE &amp; THROUGHPUT</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0C2422] tracking-tight">
              Operational Scale Engineered for Global Export Volume
            </h2>
            <p className="text-base text-[#4D6765] mt-3 leading-relaxed font-sans">
              Consolidated procurement, processing, and multi-modal logistics capacity servicing large industrial importers and packaging distributors worldwide.
            </p>
          </div>

          {/* 4 Clean KPI Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] hover:border-brand-primary/50 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center mb-5 border border-[#BBE5E1]">
                <Warehouse className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#0C2422] font-mono tracking-tight">
                15,000<span className="text-[#F5B800]">+</span> MT
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">Bold Peanuts &amp; Sesame</div>
              <p className="text-xs text-[#4D6765] mt-2 leading-relaxed font-sans">
                Calibrated groundnut kernels and natural white/hulled sesame seeds annually graded and exported.
              </p>
              <div className="mt-4 pt-3 border-t border-[#D4ECE9] text-[11px] font-mono text-brand-primary font-bold">
                EU &amp; GCC Spec Compliant
              </div>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] hover:border-brand-primary/50 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center mb-5 border border-[#BBE5E1]">
                <Scale className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#0C2422] font-mono tracking-tight">
                60,000<span className="text-[#F5B800]">+</span> MT
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">Grains &amp; Millets Capacity</div>
              <p className="text-xs text-[#4D6765] mt-2 leading-relaxed font-sans">
                Green Pearl Millet (Bajra), Sorghum (White Jowar), and Yellow Maize processed across Saurashtra centers.
              </p>
              <div className="mt-4 pt-3 border-t border-[#D4ECE9] text-[11px] font-mono text-brand-primary font-bold">
                Bulk &amp; Containerized Cargo
              </div>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] hover:border-brand-primary/50 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center mb-5 border border-[#BBE5E1]">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#0C2422] font-mono tracking-tight">
                20,000<span className="text-[#F5B800]">+</span> MT
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">Pulses &amp; Chickpeas</div>
              <p className="text-xs text-[#4D6765] mt-2 leading-relaxed font-sans">
                Green Moong Beans, Moong Mogar split mung, Desi Chickpeas, and large caliber Kabuli Garbanzo.
              </p>
              <div className="mt-4 pt-3 border-t border-[#D4ECE9] text-[11px] font-mono text-brand-primary font-bold">
                Optical Sortex Clean 99%
              </div>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] hover:border-brand-primary/50 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center mb-5 border border-[#BBE5E1]">
                <Globe2 className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#0C2422] font-mono tracking-tight">
                50<span className="text-[#F5B800]">+</span> Ports
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">Global Discharge Corridors</div>
              <p className="text-xs text-[#4D6765] mt-2 leading-relaxed font-sans">
                Active commercial trade connections across GCC countries, Southeast Asia, Europe, and Africa.
              </p>
              <div className="mt-4 pt-3 border-t border-[#D4ECE9] text-[11px] font-mono text-brand-primary font-bold">
                Mundra &amp; Hazira Gateways
              </div>
            </div>

          </div>

          {/* Infrastructure Staging Banner */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#D4ECE9] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-[#008C84] text-xs font-mono font-bold">
                PROCESSING FACILITY OVERVIEW
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0C2422]">
                Buhler Sortex Optical Cleaning &amp; Controlled Storage Infrastructure
              </h3>
              <p className="text-sm text-[#4D6765] leading-relaxed font-sans">
                Equipped with multi-stage gravity separators, de-stoners, and automated multi-color cameras detecting discoloration, split seeds, and microscopic foreign matter down to 0.1 mm. Continuous moisture surveillance maintains kernel freshness in transit.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/quality/certifications"
                className="w-full text-center px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-[#008C84] text-white font-ui font-bold text-xs tracking-wider uppercase transition shadow-sm"
              >
                Inspect Quality Protocols
              </Link>
              <Link
                to="/tools/container-calculator"
                className="w-full text-center px-6 py-3.5 rounded-xl bg-[#FAFCFB] hover:bg-[#F4F9F8] text-[#0C2422] border border-[#D4ECE9] font-ui font-bold text-xs tracking-wider uppercase transition"
              >
                Container Load Calculator
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. EXECUTIVE LEADERSHIP & TRADE DESK (Corporate Profiles)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#D4ECE9] relative overflow-hidden">
        <AboutTeamDecorations />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
                <Users className="w-3.5 h-3.5" />
                <span>EXECUTIVE MANAGEMENT</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0C2422] tracking-tight">
                Experienced Leadership. Trusted Trade Partnerships.
              </h2>
            </div>
            <p className="text-sm text-[#4D6765] max-w-md leading-relaxed font-sans">
              Combining decades of agricultural mandi origination, optical Sortex engineering, ocean container logistics, and institutional regulatory compliance.
            </p>
          </div>

          {/* Clean, Uniform Executive Leadership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-[#FAFCFB] rounded-3xl p-6 border border-[#D4ECE9] hover:border-brand-primary/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Avatar & Role Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#021814] to-[#00A79D] text-white flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <span>{member.initials || member.name.charAt(0)}</span>
                    </div>
                    <span className="text-[10px] font-bold font-mono uppercase px-2.5 py-1 rounded-full bg-[#E6F7F5] text-[#008C84] border border-[#BBE5E1]">
                      Executive
                    </span>
                  </div>

                  {/* Name & Designation */}
                  <h3 className="font-display font-bold text-lg text-[#0C2422] group-hover:text-brand-primary transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs text-brand-primary font-bold mt-1 mb-2 leading-snug font-sans">
                    {member.position}
                  </p>
                  
                  <div className="text-[11px] font-mono text-[#4D6765] mb-3 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#F5B800]" />
                    <span>{member.experience || '15+ Years Experience'}</span>
                  </div>

                  {/* Verified Biography */}
                  <p className="text-xs text-[#4D6765] leading-relaxed line-clamp-4 font-sans">
                    {member.bio}
                  </p>
                </div>

                {/* Footer Official Communication */}
                <div className="pt-4 mt-5 border-t border-[#D4ECE9] space-y-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-xs text-[#4D6765] hover:text-brand-primary transition-colors truncate font-mono"
                    >
                      <Mail className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-2 text-xs text-[#4D6765] hover:text-brand-primary transition-colors font-mono font-bold"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#F5B800] shrink-0" />
                      <span>{member.phone}</span>
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. PROVEN 4-STAGE EXPORT QUALITY WORKFLOW
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F4F9F8] border-b border-[#D4ECE9] relative overflow-hidden">
        <AboutExpertiseDecorations />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>SYSTEMATIC COMMODITY EXECUTION</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0C2422] tracking-tight">
              Our 4-Stage Quality &amp; Maritime Export Protocol
            </h2>
            <p className="text-base text-[#4D6765] mt-3 leading-relaxed font-sans">
              Every agricultural shipment adheres to standardized standard operating procedures from farmgate procurement through ocean vessel stowing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPORT_PIPELINE.map((stage) => {
              const IconComponent = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="bg-white rounded-3xl p-7 border border-[#D4ECE9] hover:border-brand-primary/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Step Number & Timeline */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-10 h-10 rounded-2xl bg-[#021814] text-white flex items-center justify-center font-mono font-black text-sm shadow-sm">
                        {stage.step}
                      </span>
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#E6F7F5] text-[#008C84] border border-[#BBE5E1]">
                        {stage.timeline}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono uppercase tracking-wider text-brand-primary font-bold mb-1">
                      {stage.phase}
                    </div>
                    <h3 className="font-display font-bold text-base text-[#0C2422] mb-3 leading-snug">
                      {stage.headline}
                    </h3>

                    {/* Stage Bullet Points */}
                    <ul className="space-y-2 text-xs text-[#4D6765] leading-relaxed mb-4 font-sans">
                      {stage.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#D4ECE9] flex items-center justify-between text-[11px] font-mono text-[#008C84]">
                    <span>Verification</span>
                    <span className="font-bold">{stage.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. STRATEGIC MARITIME GATEWAYS & OCEAN TRANSIT MATRIX
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#D4ECE9] relative overflow-hidden">
        <AboutReachDecorations />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-1 shadow-xs">
                <Ship className="w-3.5 h-3.5" />
                <span>MARITIME LOGISTICS INFRASTRUCTURE</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0C2422] tracking-tight">
                Bridging Indian Agricultural Harvests to Global Discharge Ports
              </h2>
              <p className="text-base text-[#4D6765] leading-relaxed font-sans">
                Direct road and rail connectivity to Western India’s premier container terminals: <strong className="text-[#0C2422]">Mundra Port (INMUN)</strong>, <strong className="text-[#0C2422]">Kandla / Deendayal Port (INIXY)</strong>, and <strong className="text-[#0C2422]">Hazira Port (INHZR)</strong>.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
              <div className="p-4 rounded-2xl bg-[#FAFCFB] border border-[#D4ECE9] text-xs shadow-xs">
                <span className="text-[#4D6765] font-mono block">Loading Gateways</span>
                <span className="font-extrabold text-[#0C2422] text-sm">Mundra • Kandla • Hazira • Pipavav</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAFCFB] border border-[#D4ECE9] text-xs shadow-xs">
                <span className="text-[#4D6765] font-mono block">Container Standards</span>
                <span className="font-extrabold text-[#0C2422] text-sm">20ft FCL · 40ft HC Heavy Payload</span>
              </div>
            </div>
          </div>

          {/* Transit Time Matrix Table */}
          <div className="bg-white rounded-3xl border border-[#D4ECE9] overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-[#F4F9F8] border-b border-[#D4ECE9] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Ship className="w-5 h-5 text-brand-primary" />
                <span className="font-display font-bold text-sm text-[#0C2422]">Indicative Ocean Freight Transit Times from Mundra / Hazira</span>
              </div>
              <span className="text-xs font-mono text-[#008C84] font-bold">Standard Containerized Liner Services</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#D4ECE9] bg-slate-50/50 text-[#4D6765] font-mono uppercase tracking-wider">
                    <th className="py-3 px-6">Destination Port</th>
                    <th className="py-3 px-6">Region</th>
                    <th className="py-3 px-6">Ocean Transit</th>
                    <th className="py-3 px-6">Sailing Frequency</th>
                    <th className="py-3 px-6">Container Shipping Lines</th>
                    <th className="py-3 px-6 text-right">Route Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4ECE9]/60 font-medium">
                  {PORT_ROUTES.map((route, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#E6F7F5]/40 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#0C2422] flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                        <span>{route.port}</span>
                      </td>
                      <td className="py-4 px-6 text-[#4D6765]">{route.region}</td>
                      <td className="py-4 px-6 font-mono font-bold text-[#008C84]">{route.transit}</td>
                      <td className="py-4 px-6 text-[#4D6765]">{route.frequency}</td>
                      <td className="py-4 px-6 text-[#4D6765] font-mono">{route.vesselLine}</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-[#E6F7F5] text-[#0C2422] font-mono text-[10px] font-bold border border-[#BBE5E1]">
                          {route.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#FAFDFB] border-t border-[#D4ECE9] text-xs text-[#4D6765] flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
              <span>* Actual vessel transit times may vary based on weather, transshipment hubs (Colombo / Jebel Ali), and carrier scheduling.</span>
              <Link to="/tools/landed-cost-calculator" className="text-brand-primary font-bold hover:underline flex items-center gap-1 font-mono">
                <span>Calculate Landed CIF Cost</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. INSTITUTIONAL REGULATORY COMPLIANCE & CERTIFICATIONS
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F4F9F8] border-b border-[#D4ECE9] relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>OFFICIAL GOVERNMENT &amp; QUALITY STANDARDS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0C2422] tracking-tight">
              Certifications &amp; Commercial Compliance
            </h2>
            <p className="text-base text-[#4D6765] mt-3 leading-relaxed font-sans">
              Every shipment is supported by mandatory statutory documentation, certified laboratory analysis, and official governmental export clearances.
            </p>
          </div>

          {/* 8 Official Institutional Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFIED_CREDENTIALS.map((cert, cIdx) => {
              const IconComp = cert.icon;
              return (
                <div
                  key={cIdx}
                  className="bg-white rounded-3xl p-6 border border-[#D4ECE9] hover:border-brand-primary/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center border border-[#BBE5E1]">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#E6F7F5] text-[#008C84] border border-[#BBE5E1]">
                        {cert.validity}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-[#F5B800] font-extrabold mb-1 truncate">
                      {cert.code}
                    </div>

                    <h3 className="font-display font-bold text-base text-[#0C2422] mb-1 group-hover:text-brand-primary transition-colors leading-snug">
                      {cert.badge}
                    </h3>
                    
                    <p className="text-xs text-[#4D6765] font-medium mb-3 leading-snug font-sans">
                      {cert.authority}
                    </p>

                    <p className="text-xs text-[#4D6765] leading-relaxed font-sans">
                      {cert.scope}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#D4ECE9] flex items-center justify-between text-xs text-[#008C84] font-semibold">
                    <span>Govt. Verified</span>
                    <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/quality/certifications"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-[#0C2422] transition-colors group"
            >
              <span>View Full Regulatory Document Archive &amp; COA Samples</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. CORPORATE RFQ CALL TO ACTION (Executive Direct Desk)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white relative overflow-hidden shadow-2xl border-t border-[#00A79D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="rounded-3xl bg-white/5 border border-white/15 p-8 sm:p-12 lg:p-16 backdrop-blur-xl relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-[#F5B800]">
                  <span>ENTERPRISE COMMODITY EXPORT INQUIRIES</span>
                </div>

                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  Partner with India’s Premier Agricultural Exporter
                </h2>

                <p className="text-base text-emerald-100/80 max-w-2xl leading-relaxed font-sans">
                  Submit your required specifications, packaging preferences (PP bags, Jute, Vacuum pack), destination port, and delivery schedule. Our commercial trade desk prepares binding proforma quotes within 24 hours.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-white/70 font-sans">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00A79D]" />
                    <span>Incoterms: FOB, CIF &amp; CFR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00A79D]" />
                    <span>Mixed Container Consolidation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00A79D]" />
                    <span>Tamper-Proof Proforma PDF</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4">
                <Link
                  to="/rfq"
                  className="w-full py-4 px-8 rounded-2xl bg-brand-gold hover:bg-amber-400 text-[#021814] font-ui font-black text-center text-sm shadow-xl transition-all duration-200 active:scale-95"
                >
                  Create Request for Quotation (RFQ)
                </Link>

                <a
                  href="tel:+919023363680"
                  className="w-full py-4 px-8 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-ui font-bold text-center text-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#5EEAD4]" />
                  <span>Call J.P. Vora: +91 90233 63680</span>
                </a>

                <a
                  href="mailto:agrodairyexportllp@gmail.com"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#00A79D]/20 hover:bg-[#00A79D]/30 text-[#5EEAD4] border border-[#00A79D]/30 font-mono text-center text-xs transition-all duration-200 truncate"
                >
                  agrodairyexportllp@gmail.com
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

