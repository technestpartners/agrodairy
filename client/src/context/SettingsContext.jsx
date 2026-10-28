import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { companyService, productsService } from '../services/api';

export const DEFAULT_SETTINGS = {
  // Header
  header_ticker: 'Mundra, Kandla & Hazira Seaport Direct Dispatches',
  header_credentials_badge: 'APEDA • FSSAI • DGFT IEC: 0817029381',
  header_hotline_phone: '+91 90233 63680',
  header_contact_person: 'J.P. Vora',
  header_primary_email: 'agrodairyexportllp@gmail.com',
  header_whatsapp: '+919023363680',
  header_linkedin: 'https://www.linkedin.com/company/agrodairyexport',
  header_instagram: 'https://www.instagram.com/agrodairyexport',
  header_show_social: '1',
  header_show_ticker: '1',
  header_show_cta: '1',
  header_cta_text: 'Get a Quote',
  header_cta_link: '/rfq',

  // Navbar Menu Options Toggles & Custom Labels
  nav_show_home: '1',
  nav_show_about: '1',
  nav_show_products: '1',
  nav_show_gallery: '1',
  nav_show_certifications: '1',
  nav_show_contact: '1',
  nav_show_quote_btn: '1',
  nav_show_whatsapp_btn: '1',
  nav_label_home: 'Home',
  nav_label_about: 'About',
  nav_label_products: 'Products',
  nav_label_gallery: 'Gallery',
  nav_label_certifications: 'Certificates',
  nav_label_contact: 'Contact Us',

  // Hero
  hero_badge: 'DIRECT AGRO & DAIRY EXPORTER FROM GUJARAT, INDIA',
  hero_show_badge: '1',
  hero_title_line1: "Exporting India's Finest",
  hero_title_highlight: 'Bold Peanuts, Grains & Pure Dairy Ghee',
  hero_description: 'Agro Dairy Export LLP is an Indian agricultural and dairy export house based in Surat, Gujarat. Operating directly from Mundra and Hazira seaports, we supply Sortex-cleaned bold peanuts, grains, pulses, and pure Indian cow & buffalo ghee to commercial buyers worldwide.',
  hero_show_primary_btn: '1',
  hero_cta_primary_text: 'Request Proforma Quote',
  hero_cta_primary_link: '/rfq',
  hero_show_secondary_btn: '1',
  hero_cta_secondary_text: 'Explore Export Catalog',
  hero_cta_secondary_link: '/products',
  hero_show_trust_bar: '1',
  hero_show_stats: '1',
  hero_stat1_value: '45+',
  hero_stat1_label: 'Destination Countries',
  hero_stat2_value: '99.5%+',
  hero_stat2_label: 'Buhler Sortex Purity',
  hero_stat3_value: '24/7',
  hero_stat3_label: 'Direct Port Clearance',
  hero_stat4_value: 'FSSAI & APEDA',
  hero_stat4_label: 'Govt Registered Exporter',

  // Company Profile & Legal Credentials
  company_name: 'Agro Dairy Export LLP',
  tagline: 'Premier Exporter of Pure Dairy Ghee & Agricultural Commodities from Gujarat to Global Markets',
  iec_code: '0817029381',
  gstin: '24AAHFA3928L1Z9',
  fssai_licence: '10722026000148',
  apeda_rcmc: 'APEDA/RCMC/2026/0892',
  head_office_address: 'Office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India',
  loading_ports: 'Mundra Port (INMUN), Kandla Port (INIXY), Hazira Port (INHAZ), Pipavav Port, Gujarat, India',

  // About Section
  about_badge: 'INDIAN AGRO & DAIRY TRADING HOUSE',
  about_headline: 'Reliable Portside Aggregation, Modern Optical Cleaning & Certified Container Stuffing',
  about_paragraph1: 'Established in Gujarat, Agro Dairy Export LLP bridges fertile farm belts across Saurashtra with commercial food importers in the Gulf, Africa, Europe, and Southeast Asia.',
  about_paragraph2: 'We maintain rigorous quality governance through Buhler optical color sorters, independent SGS/Geo-Chem Certificate of Analysis (COA), and dedicated container stuffing at Mundra and Hazira ports.',

  // Footer
  footer_about: 'Agro Dairy Export LLP is an Indian agricultural and dairy export company operating from Surat and Rajkot, Gujarat. Direct bulk supplier to commercial buyers across GCC, Southeast Asia, Europe, and Africa.',
  footer_hours: 'Mon - Sat: 9:00 AM - 7:00 PM IST | Port Operations: 24/7 Continuous',
  footer_disclaimer: 'All agricultural commodities and pure dairy ghee shipments are exported under phytosanitary inspection, independent laboratory Certificate of Analysis (COA), and methyl bromide fumigation standards.',

  // Brand Logos & Favicon Icons
  site_logo: '/images/logo.png',
  site_logo_dark: '/images/logo.png',
  site_logo_footer: '/images/logo.png',
  site_favicon: '/favicon.png',
  site_og_image: '/images/hero-commodities.jpg',

  // Banners & Background Images
  hero_image: '/images/hero-commodities.jpg',
  hero_chip_1_image: '/images/bg/real-ghee.jpg',
  hero_chip_2_image: '/images/products/bold-peanuts.jpg',
  about_banner_image: '/images/warehouse-pallets.jpg',
  banner_products: '/images/hero-commodities.jpg',
  banner_about: '/images/infrastructure.jpg',
  banner_gallery: '/images/port-aerial.jpg',
  banner_certifications: '/images/quality-lab.jpg',
  banner_contact: '/images/cargo-ship.jpg',
};

export const STATIC_PRODUCTS = [
  { id: 'peanuts', name: 'Bold Peanut Kernels', category_name: 'Peanuts', category_slug: 'peanuts', slug: 'bold-peanuts', short_description: 'Sortex-clean Bold Peanuts, counts 38/42 to 70/80. Purity 99%+, moisture 7–8%. Available in 25 kg PP/Jute/Vacuum bags.', origin: 'Saurashtra, Gujarat', moq: 19, moq_unit: 'MT', grade_variety: 'Sortex 99%', is_featured: 1, main_image: '/images/products/bold-peanuts.jpg' },
  { id: 'moong', name: 'Green Moong Beans', category_name: 'Pulses', category_slug: 'pulses', slug: 'green-moong', short_description: 'Premium Green Moong Beans, 180–270 count range. 98–99.9% purity, 12% moisture max. Ideal for retail and food processing.', origin: 'Rajkot, Gujarat', moq: 25, moq_unit: 'MT', grade_variety: 'Export Grade', is_featured: 0, main_image: '/images/products/green-moong-beans.jpg' },
  { id: 'ghee', name: 'Pure Dairy Ghee', category_name: 'Dairy Ghee', category_slug: 'dairy-ghee', slug: 'pure-dairy-ghee', short_description: 'Pure Cow & Buffalo Granular Ghee. 99.7–99.8% milk fat, zero starch. 15 kg food-grade tins, jars or drums.', origin: 'Anand, Gujarat', moq: 1, moq_unit: 'MT', grade_variety: 'FSSAI Certified', is_featured: 1, main_image: '/images/bg/real-ghee.jpg' },
  { id: 'chickpeas', name: 'Desi Chickpeas', category_name: 'Pulses', category_slug: 'pulses', slug: 'desi-chickpeas', short_description: 'Brown Desi Chickpeas, 5–7 mm / 6–8 mm. Purity 98–99%, moisture 12% max. 25 kg/50 kg PP or Jute bags.', origin: 'Gujarat, India', moq: 25, moq_unit: 'MT', grade_variety: 'Sortex Clean', is_featured: 0, main_image: '/images/products/desi-chickpeas.jpg' },
  { id: 'millet', name: 'Green Pearl Millet', category_name: 'Grains', category_slug: 'grains', slug: 'pearl-millet', short_description: 'Pearl Millet (Bajra) / Foxtail Millet. Machine & Sortex 99% purity, 11% moisture max. 24–25 MT in 20ft FCL.', origin: 'Saurashtra, Gujarat', moq: 24, moq_unit: 'MT', grade_variety: '99% Sortex', is_featured: 0, main_image: '/images/bg/pearl-millet.jpg' },
  { id: 'kabuli', name: 'Kabuli Chickpeas', category_name: 'Pulses', category_slug: 'pulses', slug: 'kabuli-chickpeas', short_description: 'Cream Kabuli Chickpeas, count 38/40 to 75/80. 99% Sortex clean, moisture 12% max. Premium export grade.', origin: 'Rajasthan / MP', moq: 25, moq_unit: 'MT', grade_variety: '99% Sortex', is_featured: 0, main_image: '/images/products/kabuli-chickpeas.jpg' },
  { id: 'sorghum', name: 'Sorghum (White Jowar)', category_name: 'Grains', category_slug: 'grains', slug: 'sorghum-jowar', short_description: 'White Sorghum. Machine 98–99%, Sortex 99% purity. Moisture 11% max. 25 kg/50 kg PP or Jute bags.', origin: 'Saurashtra, Gujarat', moq: 24, moq_unit: 'MT', grade_variety: '99% Sortex', is_featured: 0, main_image: '/images/products/sorghum-jowar.jpg' },
  { id: 'maize', name: 'Yellow Maize (Corn)', category_name: 'Grains', category_slug: 'grains', slug: 'yellow-maize', short_description: 'Yellow & White Maize. Machine 98–99%, Sortex 99% purity. Moisture 11% max. 24 MT in 20ft FCL.', origin: 'Gujarat, India', moq: 24, moq_unit: 'MT', grade_variety: 'Export Grade', is_featured: 0, main_image: '/images/bg/yellow-corn.jpg' },
];

export const STATIC_CATEGORIES = [
  { id: 'peanuts', name: 'Peanuts', slug: 'peanuts' },
  { id: 'grains', name: 'Grains', slug: 'grains' },
  { id: 'pulses', name: 'Pulses', slug: 'pulses' },
  { id: 'dairy-ghee', name: 'Dairy Ghee', slug: 'dairy-ghee' },
];

const SettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  commodities: STATIC_PRODUCTS,
  categories: STATIC_CATEGORIES,
  gallery: [],
  faqs: [],
  loading: false,
  isSyncing: false,
  lastSyncTime: null,
  refreshSettings: () => {},
  refreshCommodities: () => {},
  refreshGallery: () => {},
  refreshFaqs: () => {},
  refreshAll: () => {},
  emitLocalUpdate: () => {},
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [commodities, setCommodities] = useState(STATIC_PRODUCTS);
  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const [gallery, setGallery] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(Date.now());
  const [liveToast, setLiveToast] = useState(null);

  const broadcastChannelRef = useRef(null);

  // 1. Fetch live company settings
  const fetchSettings = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsSyncing(true);
    try {
      const res = await companyService.getSettings();
      if (res.success && res.data) {
        setSettings(prev => ({
          ...prev,
          ...res.data,
        }));
        setLastSyncTime(Date.now());
      }
    } catch (err) {
      console.warn('Could not load live settings, using current state:', err);
    } finally {
      setIsSyncing(false);
      setLoading(false);
    }
  }, []);

  // 2. Fetch live commodities
  const fetchCommodities = useCallback(async () => {
    setIsSyncing(true);
    try {
      const [catRes, prodRes] = await Promise.all([
        productsService.getCategories().catch(() => ({ success: false })),
        productsService.getAll({ limit: 50 }).catch(() => ({ success: false }))
      ]);

      if (catRes.success && catRes.data?.length) {
        setCategories(catRes.data);
      }
      if (prodRes.success && prodRes.data?.length) {
        setCommodities(prodRes.data);
      }
      setLastSyncTime(Date.now());
    } catch (err) {
      console.warn('Could not refresh live commodities:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // 3. Fetch live gallery
  const fetchGallery = useCallback(async () => {
    try {
      const res = await companyService.getGallery();
      if (res.success && res.data && res.data.length > 0) {
        const formatted = res.data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          categorySlug: item.category_slug || item.category?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          image: item.image,
          location: item.location || 'Gujarat, India',
          badge: item.badge || 'Export Grade',
          specs: item.specs || 'Sortex Cleaned • Lab Certified',
          desc: item.description || ''
        }));
        setGallery(formatted);
        setLastSyncTime(Date.now());
      }
    } catch (err) {
      console.warn('Could not refresh live gallery:', err);
    }
  }, []);

  // 4. Fetch live FAQs
  const fetchFaqs = useCallback(async () => {
    try {
      const res = await companyService.getFaqs();
      if (res.success && res.data && res.data.length > 0) {
        setFaqs(res.data.map(f => ({ q: f.question, a: f.answer, category: f.category })));
        setLastSyncTime(Date.now());
      }
    } catch (err) {
      console.warn('Could not refresh live FAQs:', err);
    }
  }, []);

  // 5. Fetch all datasets
  const refreshAll = useCallback(async () => {
    await Promise.all([
      fetchSettings(),
      fetchCommodities(),
      fetchGallery(),
      fetchFaqs()
    ]);
  }, [fetchSettings, fetchCommodities, fetchGallery, fetchFaqs]);

  // 6. Cross-Tab Pulse Dispatcher (BroadcastChannel + LocalStorage fallback)
  const emitLocalUpdate = useCallback((type = 'all') => {
    const payload = { type, timestamp: Date.now() };

    // Post to BroadcastChannel (zero latency cross-tab)
    if (broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current.postMessage(payload);
      } catch (e) {}
    }

    // LocalStorage fallback for older engines/tabs
    try {
      localStorage.setItem('agro_cms_live_pulse', JSON.stringify(payload));
    } catch (e) {}
  }, []);

  // Trigger pulse router
  const handlePulse = useCallback((data) => {
    if (!data || !data.type) return;

    // Show temporary subtle floating badge
    setLiveToast(`Content Updated Live`);
    setTimeout(() => setLiveToast(null), 3000);

    const type = data.type.toUpperCase();
    if (type.includes('SETTING')) {
      fetchSettings(true);
    } else if (type.includes('COMMODIT') || type.includes('PRODUCT')) {
      fetchCommodities();
    } else if (type.includes('GALLERY')) {
      fetchGallery();
    } else if (type.includes('FAQ')) {
      fetchFaqs();
    } else {
      fetchSettings(true);
      fetchCommodities();
      fetchGallery();
      fetchFaqs();
    }
  }, [fetchSettings, fetchCommodities, fetchGallery, fetchFaqs]);

  // Initial load
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Set up listeners: BroadcastChannel, storage events, and Server-Sent Events (SSE)
  useEffect(() => {
    // A. BroadcastChannel
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('agro_dairy_cms_sync');
        bc.onmessage = (event) => {
          handlePulse(event.data);
        };
        broadcastChannelRef.current = bc;
      }
    } catch (err) {
      console.debug('BroadcastChannel error:', err);
    }

    // B. LocalStorage storage event listener
    const onStorage = (e) => {
      if (e.key === 'agro_cms_live_pulse' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          handlePulse(parsed);
        } catch (err) {}
      }
    };
    window.addEventListener('storage', onStorage);

    // C. Server-Sent Events (SSE) connection to backend
    let eventSource = null;
    try {
      eventSource = new EventSource('/api/live-sync');
      
      eventSource.addEventListener('SETTINGS_UPDATED', (e) => {
        handlePulse({ type: 'SETTINGS_UPDATED' });
      });

      eventSource.addEventListener('COMMODITIES_UPDATED', (e) => {
        handlePulse({ type: 'COMMODITIES_UPDATED' });
      });

      eventSource.addEventListener('GALLERY_UPDATED', (e) => {
        handlePulse({ type: 'GALLERY_UPDATED' });
      });

      eventSource.addEventListener('FAQS_UPDATED', (e) => {
        handlePulse({ type: 'FAQS_UPDATED' });
      });

      eventSource.addEventListener('TESTIMONIALS_UPDATED', (e) => {
        handlePulse({ type: 'TESTIMONIALS_UPDATED' });
      });

      eventSource.onerror = () => {
        // EventSource will automatically retry in background
      };
    } catch (err) {
      console.debug('EventSource connection error:', err);
    }

    // D. Window focus / visibility change re-check
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Quick silent check if user returns to tab after a while
        fetchSettings(true);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [handlePulse, fetchSettings]);

  // Dynamically update browser tab favicon if site_favicon setting is present
  useEffect(() => {
    if (settings.site_favicon && typeof document !== 'undefined') {
      try {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = settings.site_favicon;
      } catch (err) {
        console.debug('Favicon update error:', err);
      }
    }
  }, [settings.site_favicon]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        commodities,
        categories,
        gallery,
        faqs,
        loading,
        isSyncing,
        lastSyncTime,
        refreshSettings: fetchSettings,
        refreshCommodities: fetchCommodities,
        refreshGallery: fetchGallery,
        refreshFaqs: fetchFaqs,
        refreshAll,
        emitLocalUpdate,
      }}
    >
      {children}

      {/* Subtle, ultra-smooth live update confirmation badge (only when live updates trigger) */}
      {liveToast && (
        <div className="fixed bottom-6 left-6 z-[9999] pointer-events-none animate-slide-up">
          <div className="bg-[#002824]/95 backdrop-blur-md text-emerald-300 border border-emerald-400/30 px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs font-mono font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>⚡ {liveToast}</span>
          </div>
        </div>
      )}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

// Convenient alias for components wanting generic live sync
export const useLiveSync = useSettings;
