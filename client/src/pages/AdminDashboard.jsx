import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, ShieldCheck, CheckCircle2, Clock, AlertCircle, 
  Search, Filter, LogOut, ChevronRight, User, Phone, Mail, 
  MapPin, MessageSquare, Send, RefreshCw, Layout, Sliders,
  ShoppingBag, Camera, HelpCircle, Save, Plus, Edit3, Trash2,
  ExternalLink, Eye, Check, X, Globe2, Award, Truck, Scale,
  Layers, ChevronDown, Sparkles, Star, Quote, Building2,
  Menu, Bell, Activity, Hash, ArrowUpRight, CheckCheck,
  Shield, Laptop, Compass, CheckCircle, Anchor, Users, Warehouse,
  Linkedin, Instagram, Command, Zap,
  Home, Package, ArrowRight, MessageCircle
} from 'lucide-react';
import { adminService, inquiriesService } from '../services/api';
import { useSettings } from '../context/SettingsContext';

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  reviewed: 'bg-purple-100 text-purple-800 border-purple-200',
  assigned: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  quotation_prepared: 'bg-amber-100 text-amber-800 border-amber-200',
  quotation_sent: 'bg-orange-100 text-orange-800 border-orange-200',
  negotiation: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  accepted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-800 border-rose-200',
  completed: 'bg-slate-100 text-slate-800 border-slate-200',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { refreshSettings, emitLocalUpdate } = useSettings();

  // Navigation tab
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  // User & Stats
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');

  // Settings State
  const [settingsForm, setSettingsForm] = useState({});

  // Commodities State
  const [commodities, setCommodities] = useState([]);
  const [commoditySearch, setCommoditySearch] = useState('');
  const [editingCommodity, setEditingCommodity] = useState(null);
  const [commodityModalOpen, setCommodityModalOpen] = useState(false);

  // Gallery State
  const [galleryItems, setGalleryItems] = useState([]);
  const [gallerySearch, setGallerySearch] = useState('');
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [viewingGalleryPhoto, setViewingGalleryPhoto] = useState(null);

  // FAQs State
  const [faqsList, setFaqsList] = useState([]);
  const [faqSearch, setFaqSearch] = useState('');
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqModalOpen, setFaqModalOpen] = useState(false);

  // Testimonials State
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);

  // Executive Team State
  const [teamList, setTeamList] = useState([]);
  const [teamSearch, setTeamSearch] = useState('');
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);

  // Certifications State
  const [certificationsList, setCertificationsList] = useState([]);
  const [certSearch, setCertSearch] = useState('');
  const [editingCert, setEditingCert] = useState(null);
  const [certModalOpen, setCertModalOpen] = useState(false);

  // Ports State
  const [portsList, setPortsList] = useState([]);
  const [portSearch, setPortSearch] = useState('');
  const [editingPort, setEditingPort] = useState(null);
  const [portModalOpen, setPortModalOpen] = useState(false);

  // Infrastructure State
  const [infraList, setInfraList] = useState([]);
  const [infraSearch, setInfraSearch] = useState('');
  const [editingInfra, setEditingInfra] = useState(null);
  const [infraModalOpen, setInfraModalOpen] = useState(false);

  // Traceability Batches State
  const [batchesList, setBatchesList] = useState([]);
  const [batchSearch, setBatchSearch] = useState('');
  const [editingBatch, setEditingBatch] = useState(null);
  const [batchModalOpen, setBatchModalOpen] = useState(false);

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([]);

  // Initial Load
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        dashRes, inqRes, setRes, commRes, galRes, faqRes, testRes, auditRes,
        teamRes, certRes, portsRes, infraRes, traceRes
      ] = await Promise.all([
        adminService.getDashboard().catch(() => ({ success: false })),
        inquiriesService.getAll({ 
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: inquirySearch || undefined
        }).catch(() => ({ success: false, data: [] })),
        adminService.getSettings().catch(() => ({ success: false, data: {} })),
        adminService.getCommodities().catch(() => ({ success: false, data: [] })),
        adminService.getGallery().catch(() => ({ success: false, data: [] })),
        adminService.getFaqs().catch(() => ({ success: false, data: [] })),
        adminService.getTestimonials().catch(() => ({ success: false, data: [] })),
        adminService.getAuditLogs().catch(() => ({ success: false, data: [] })),
        adminService.getTeam().catch(() => ({ success: false, data: [] })),
        adminService.getCertifications().catch(() => ({ success: false, data: [] })),
        adminService.getPorts().catch(() => ({ success: false, data: [] })),
        adminService.getInfrastructure().catch(() => ({ success: false, data: [] })),
        adminService.getTraceabilityBatches().catch(() => ({ success: false, data: [] })),
      ]);

      if (dashRes.success) setStats(dashRes.stats);
      if (inqRes.success) setInquiries(inqRes.data || []);
      if (setRes.success && setRes.data) setSettingsForm(setRes.data);
      if (commRes.success && commRes.data) setCommodities(commRes.data);
      if (galRes.success && galRes.data) setGalleryItems(galRes.data);
      if (faqRes.success && faqRes.data) setFaqsList(faqRes.data);
      if (testRes.success && testRes.data) setTestimonialsList(testRes.data);
      if (auditRes.success && auditRes.data) setAuditLogs(auditRes.data);
      if (teamRes.success && teamRes.data) setTeamList(teamRes.data);
      if (certRes.success && certRes.data) setCertificationsList(certRes.data);
      if (portsRes.success && portsRes.data) setPortsList(portsRes.data);
      if (infraRes.success && infraRes.data) setInfraList(infraRes.data);
      if (traceRes.success && traceRes.data) setBatchesList(traceRes.data);
    } catch (err) {
      console.error('Error loading admin dashboard data:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('agro_admin_token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const rawUser = localStorage.getItem('agro_admin_user');
    const token = localStorage.getItem('agro_admin_token');
    if (!rawUser || !token) {
      navigate('/admin/login');
      return;
    }
    setUser(JSON.parse(rawUser));
    loadAllData();
  }, [statusFilter]);

  // Keyboard shortcuts: Ctrl + S to save, Ctrl + K for Command Palette, Esc to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K: Command Palette
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
        return;
      }

      // Escape: Close Command Palette
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }

      // Ctrl/Cmd + S: Save Settings
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        if (['header', 'hero', 'about', 'company', 'footer'].includes(activeTab)) {
          e.preventDefault();
          handleSaveSettings();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, settingsForm]);

  const handleLogout = () => {
    localStorage.removeItem('agro_admin_token');
    localStorage.removeItem('agro_admin_user');
    navigate('/admin/login');
  };

  // Save Settings Handler
  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    setSaveLoading(true);
    setSaveSuccess('');
    try {
      const res = await adminService.updateSettings(settingsForm);
      if (res.success) {
        setSaveSuccess('Website changes published live across the site!');
        if (refreshSettings) await refreshSettings();
        if (emitLocalUpdate) emitLocalUpdate('settings');
        setTimeout(() => setSaveSuccess(''), 4500);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Failed to save settings. Please verify backend connection.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettingsForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // Inquiry Handlers
  const handleStatusChange = async (inquiryId, newStatus) => {
    setActionLoading(true);
    try {
      await inquiriesService.updateStatus(inquiryId, { status: newStatus });
      const inqRes = await inquiriesService.getAll({ 
        status: statusFilter !== 'all' ? statusFilter : undefined 
      });
      if (inqRes.success) setInquiries(inqRes.data);
      if (selectedInquiry && selectedInquiry.id === inquiryId) {
        const detailRes = await inquiriesService.getById(inquiryId);
        if (detailRes.success) setSelectedInquiry(detailRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDetail = async (id) => {
    setActionLoading(true);
    try {
      const res = await inquiriesService.getById(id);
      if (res.success) setSelectedInquiry(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedInquiry) return;
    try {
      await inquiriesService.addNote(selectedInquiry.id, { note: noteText.trim() });
      setNoteText('');
      const detailRes = await inquiriesService.getById(selectedInquiry.id);
      if (detailRes.success) setSelectedInquiry(detailRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Commodity CRUD Handlers
  const handleOpenCommodityModal = (commodity = null) => {
    setEditingCommodity(commodity || {
      name: '',
      slug: '',
      category_name: 'Peanuts',
      short_description: '',
      origin: 'Saurashtra, Gujarat, India',
      moq: 20,
      moq_unit: 'MT',
      grade_variety: 'Sortex 99% Clean',
      main_image: '/images/products/bold-peanuts.jpg',
      is_featured: 1,
      is_active: 1
    });
    setCommodityModalOpen(true);
  };

  const handleSaveCommodity = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      if (editingCommodity.id) {
        await adminService.updateCommodity(editingCommodity.id, editingCommodity);
      } else {
        await adminService.createCommodity(editingCommodity);
      }
      const commRes = await adminService.getCommodities();
      if (commRes.success) setCommodities(commRes.data);
      setCommodityModalOpen(false);
      setEditingCommodity(null);
      if (emitLocalUpdate) emitLocalUpdate('commodities');
      setSaveSuccess('Commodity saved and updated in the public catalog!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error('Error saving commodity:', err);
      alert('Error saving commodity.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteCommodity = async (id) => {
    if (!window.confirm('Are you sure you want to delete this commodity from the catalog?')) return;
    try {
      await adminService.deleteCommodity(id);
      setCommodities((prev) => prev.filter((c) => c.id !== id));
      if (emitLocalUpdate) emitLocalUpdate('commodities');
      setSaveSuccess('Commodity removed from catalog.');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error('Error deleting commodity:', err);
      alert('Could not delete commodity.');
    }
  };

  // Gallery CRUD Handlers
  const handleOpenGalleryModal = (item = null) => {
    setEditingGalleryItem(item || {
      title: '',
      category: 'Processing & Sorting',
      image: '/images/infrastructure.jpg',
      location: 'Saurashtra / Surat, Gujarat',
      badge: 'Export Grade',
      specs: 'Sortex Cleaned • Lab Certified',
      description: '',
      is_active: 1
    });
    setGalleryModalOpen(true);
  };

  const handleSaveGalleryItem = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      if (editingGalleryItem.id) {
        await adminService.updateGalleryItem(editingGalleryItem.id, editingGalleryItem);
      } else {
        await adminService.createGalleryItem(editingGalleryItem);
      }
      const galRes = await adminService.getGallery();
      if (galRes.success) setGalleryItems(galRes.data);
      setGalleryModalOpen(false);
      setEditingGalleryItem(null);
      if (emitLocalUpdate) emitLocalUpdate('gallery');
      setSaveSuccess('Gallery photo updated successfully!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error('Error saving gallery item:', err);
      alert('Error saving gallery item.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery photo?')) return;
    try {
      await adminService.deleteGalleryItem(id);
      setGalleryItems((prev) => prev.filter((g) => g.id !== id));
      if (emitLocalUpdate) emitLocalUpdate('gallery');
      setSaveSuccess('Gallery item deleted.');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      alert('Could not delete gallery item.');
    }
  };

  // FAQ CRUD Handlers
  const handleOpenFaqModal = (faq = null) => {
    setEditingFaq(faq || {
      question: '',
      answer: '',
      category: 'general',
      sort_order: faqsList.length + 1,
      is_active: 1
    });
    setFaqModalOpen(true);
  };

  const handleSaveFaq = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      if (editingFaq.id) {
        await adminService.updateFaq(editingFaq.id, editingFaq);
      } else {
        await adminService.createFaq(editingFaq);
      }
      const faqRes = await adminService.getFaqs();
      if (faqRes.success) setFaqsList(faqRes.data);
      setFaqModalOpen(false);
      setEditingFaq(null);
      if (emitLocalUpdate) emitLocalUpdate('faqs');
      setSaveSuccess('FAQ published and saved successfully!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error('Error saving FAQ:', err);
      alert('Error saving FAQ.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await adminService.deleteFaq(id);
      setFaqsList((prev) => prev.filter((f) => f.id !== id));
      if (emitLocalUpdate) emitLocalUpdate('faqs');
      setSaveSuccess('FAQ removed.');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error('Error deleting FAQ:', err);
      alert('Could not delete FAQ.');
    }
  };

  // Testimonial CRUD Handlers
  const handleOpenTestimonialModal = (test = null) => {
    setEditingTestimonial(test || {
      client_name: '',
      company_name: '',
      country: '',
      rating: 5,
      content: '',
      is_active: 1
    });
    setTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      if (editingTestimonial.id) {
        await adminService.updateTestimonial(editingTestimonial.id, editingTestimonial);
      } else {
        await adminService.createTestimonial(editingTestimonial);
      }
      const testRes = await adminService.getTestimonials();
      if (testRes.success) setTestimonialsList(testRes.data);
      setTestimonialModalOpen(false);
      setEditingTestimonial(null);
      if (emitLocalUpdate) emitLocalUpdate('testimonials');
      setSaveSuccess('Testimonial saved successfully!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error('Error saving testimonial:', err);
      alert('Error saving testimonial.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await adminService.deleteTestimonial(id);
      setTestimonialsList((prev) => prev.filter((t) => t.id !== id));
      setSaveSuccess('Testimonial removed.');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      alert('Could not delete testimonial.');
    }
  };

  // Team Handlers
  const handleOpenTeamModal = (member = null) => {
    setEditingTeamMember(member ? { ...member } : {
      name: '',
      position: '',
      bio: '',
      email: '',
      linkedin: '',
      image: '',
      sort_order: teamList.length,
      is_active: 1
    });
    setTeamModalOpen(true);
  };

  const handleSaveTeamMember = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      if (editingTeamMember.id) {
        await adminService.updateTeamMember(editingTeamMember.id, editingTeamMember);
      } else {
        await adminService.createTeamMember(editingTeamMember);
      }
      const res = await adminService.getTeam();
      if (res.success) setTeamList(res.data);
      setTeamModalOpen(false);
      setEditingTeamMember(null);
      setSaveSuccess('Executive team member saved!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error saving team member.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteTeamMember = async (id) => {
    if (!window.confirm('Delete this executive team member?')) return;
    try {
      await adminService.deleteTeamMember(id);
      setTeamList(prev => prev.filter(t => t.id !== id));
      setSaveSuccess('Team member removed.');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Could not delete team member.');
    }
  };

  // Certification Handlers
  const handleOpenCertModal = (cert = null) => {
    setEditingCert(cert ? { ...cert } : {
      title: '',
      certificate_no: '',
      issuing_body: '',
      issue_date: '',
      expiry_date: '',
      verification_url: '',
      status: 'active',
      description: '',
      sort_order: certificationsList.length,
      is_active: 1
    });
    setCertModalOpen(true);
  };

  const handleSaveCertification = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      if (editingCert.id) {
        await adminService.updateCertification(editingCert.id, editingCert);
      } else {
        await adminService.createCertification(editingCert);
      }
      const res = await adminService.getCertifications();
      if (res.success) setCertificationsList(res.data);
      setCertModalOpen(false);
      setEditingCert(null);
      setSaveSuccess('Certification updated successfully!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error saving certification.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteCertification = async (id) => {
    if (!window.confirm('Delete this certification record?')) return;
    try {
      await adminService.deleteCertification(id);
      setCertificationsList(prev => prev.filter(c => c.id !== id));
      setSaveSuccess('Certification deleted.');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Could not delete certification.');
    }
  };

  // Ports Handlers
  const handleOpenPortModal = (port = null) => {
    setEditingPort(port ? { ...port } : {
      name: '',
      code: '',
      type: 'Sea Port',
      is_major: 1
    });
    setPortModalOpen(true);
  };

  const handleSavePort = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      if (editingPort.id) {
        await adminService.updatePort(editingPort.id, editingPort);
      } else {
        await adminService.createPort(editingPort);
      }
      const res = await adminService.getPorts();
      if (res.success) setPortsList(res.data);
      setPortModalOpen(false);
      setEditingPort(null);
      setSaveSuccess('Port saved successfully!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error saving port.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeletePort = async (id) => {
    if (!window.confirm('Delete this port entry?')) return;
    try {
      await adminService.deletePort(id);
      setPortsList(prev => prev.filter(p => p.id !== id));
      setSaveSuccess('Port removed.');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Could not delete port.');
    }
  };

  // Infrastructure Handlers
  const handleOpenInfraModal = (infra = null) => {
    setEditingInfra(infra ? { ...infra } : {
      title: '',
      category: 'Processing Facility',
      capacity: '',
      location: 'Gujarat, India',
      description: '',
      image: '',
      sort_order: infraList.length,
      is_active: 1
    });
    setInfraModalOpen(true);
  };

  const handleSaveInfrastructure = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      if (editingInfra.id) {
        await adminService.updateInfrastructureItem(editingInfra.id, editingInfra);
      } else {
        await adminService.createInfrastructureItem(editingInfra);
      }
      const res = await adminService.getInfrastructure();
      if (res.success) setInfraList(res.data);
      setInfraModalOpen(false);
      setEditingInfra(null);
      setSaveSuccess('Processing facility saved successfully!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error saving facility item.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteInfrastructure = async (id) => {
    if (!window.confirm('Delete this facility item?')) return;
    try {
      await adminService.deleteInfrastructureItem(id);
      setInfraList(prev => prev.filter(i => i.id !== id));
      setSaveSuccess('Facility removed.');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Could not delete facility.');
    }
  };

  // Traceability Batches Handlers
  const handleOpenBatchModal = (batch = null) => {
    setEditingBatch(batch ? { ...batch } : {
      batch_code: '',
      product_id: commodities[0]?.id || 1,
      origin_region: 'Saurashtra Groundnut Corridor',
      harvest_date: '',
      processing_date: '',
      packing_date: '',
      inspection_status: 'Passed Lab Audit',
      certificate_of_analysis_no: '',
      packing_type: '50 kg Jute Bags',
      purity_percentage: '99.5%',
      moisture_percentage: '7.5%',
      container_number: '',
      port_of_loading: 'Mundra Port',
      shipment_status: 'Customs Bolt-Sealed',
      public_notes: '',
      is_active: 1
    });
    setBatchModalOpen(true);
  };

  const handleSaveBatch = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      if (editingBatch.id) {
        await adminService.updateTraceabilityBatch(editingBatch.id, editingBatch);
      } else {
        await adminService.createTraceabilityBatch(editingBatch);
      }
      const res = await adminService.getTraceabilityBatches();
      if (res.success) setBatchesList(res.data);
      setBatchModalOpen(false);
      setEditingBatch(null);
      setSaveSuccess('Export lot saved successfully!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error saving traceability batch.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteBatch = async (id) => {
    if (!window.confirm('Delete this export lot record?')) return;
    try {
      await adminService.deleteTraceabilityBatch(id);
      setBatchesList(prev => prev.filter(b => b.id !== id));
      setSaveSuccess('Batch deleted.');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Could not delete batch.');
    }
  };

  // Navigation Items Grouping
  const NAV_GROUPS = [
    {
      group: 'MAIN DASHBOARD',
      items: [
        { id: 'overview', label: 'Command Overview', icon: Activity, badge: null },
      ]
    },
    {
      group: 'WEBSITE CMS (LIVE CONTENT)',
      items: [
        { id: 'header', label: 'Header & Top Bar', icon: Layout, badge: null },
        { id: 'hero', label: 'Hero Banner & Stats', icon: Sparkles, badge: null },
        { id: 'about', label: 'About & Story', icon: Building2, badge: null },
        { id: 'company', label: 'Company & Certs', icon: ShieldCheck, badge: null },
        { id: 'footer', label: 'Footer & Legal Terms', icon: Compass, badge: null },
      ]
    },
    {
      group: 'COMMODITIES & TRADE OPERATIONS',
      items: [
        { id: 'commodities', label: 'Commodities Catalog', icon: ShoppingBag, badge: commodities.length },
        { id: 'traceability', label: 'Traceability Lots & Batches', icon: Scale, badge: batchesList.length },
        { id: 'ports', label: 'Gateway Ports & Routes', icon: Anchor, badge: portsList.length },
        { id: 'infrastructure', label: 'Processing & Sortex Plants', icon: Warehouse, badge: infraList.length },
      ]
    },
    {
      group: 'PROOF, MEDIA & ENGAGEMENT',
      items: [
        { id: 'gallery', label: 'Operations Photo Gallery', icon: Camera, badge: galleryItems.length },
        { id: 'faqs', label: 'FAQs Knowledgebase', icon: HelpCircle, badge: faqsList.length },
        { id: 'testimonials', label: 'Buyer Testimonials', icon: Quote, badge: testimonialsList.length },
        { id: 'team', label: 'Executive Leadership', icon: Users, badge: teamList.length },
        { id: 'certifications', label: 'Statutory Accreditations', icon: Award, badge: certificationsList.length },
      ]
    },
    {
      group: 'COMMERCIAL DESK',
      items: [
        { id: 'inquiries', label: 'RFQ Inquiries Pipeline', icon: MessageSquare, badge: stats?.newInquiries || inquiries.length, badgeColor: 'bg-blue-500 text-white' },
        { id: 'audit', label: 'Security & Audit Logs', icon: Shield, badge: auditLogs.length },
      ]
    }
  ];

  // Global Quick Command Palette items
  const COMMAND_ITEMS = [
    { id: 'overview', title: 'Command Overview', category: 'Main Dashboard', icon: Activity, desc: 'Executive dashboard metrics & commercial lead previews', action: () => { setActiveTab('overview'); setCommandPaletteOpen(false); } },
    { id: 'header', title: 'Header & Top Bar', category: 'CMS Content', icon: Layout, desc: 'Hotline, WhatsApp, credentials badge, ticker text', action: () => { setActiveTab('header'); setCommandPaletteOpen(false); } },
    { id: 'hero', title: 'Hero Banner & Stats', category: 'CMS Content', icon: Sparkles, desc: 'Headlines, call to action buttons, 4 counter numbers', action: () => { setActiveTab('hero'); setCommandPaletteOpen(false); } },
    { id: 'about', title: 'About & Story', category: 'CMS Content', icon: Building2, desc: 'Company mission, origin aggregation narrative, sourcing belts', action: () => { setActiveTab('about'); setCommandPaletteOpen(false); } },
    { id: 'company', title: 'Company & Certs', category: 'CMS Content', icon: ShieldCheck, desc: 'APEDA, FSSAI, IEC, ISO registrations & statutory compliance', action: () => { setActiveTab('company'); setCommandPaletteOpen(false); } },
    { id: 'footer', title: 'Footer & Legal Terms', category: 'CMS Content', icon: Compass, desc: 'Footer text, dispatch disclaimers, global export terms', action: () => { setActiveTab('footer'); setCommandPaletteOpen(false); } },
    { id: 'commodities', title: 'Commodities Catalog', category: 'Commodities & Trade', icon: ShoppingBag, desc: 'Manage peanuts, sesame, pulses, grains and pure ghee', action: () => { setActiveTab('commodities'); setCommandPaletteOpen(false); } },
    { id: 'add-commodity', title: 'Add New Commodity', category: 'Quick Action', icon: Plus, desc: 'Create a new agricultural or dairy export listing', action: () => { setActiveTab('commodities'); handleOpenCommodityModal(); setCommandPaletteOpen(false); } },
    { id: 'traceability', title: 'Traceability Lots & Batches', category: 'Commodities & Trade', icon: Scale, desc: 'Inspect lot numbers, container stuffing and COA test reports', action: () => { setActiveTab('traceability'); setCommandPaletteOpen(false); } },
    { id: 'ports', title: 'Gateway Ports & Routes', category: 'Commodities & Trade', icon: Anchor, desc: 'Mundra, Kandla and Hazira seaport berths and liner corridors', action: () => { setActiveTab('ports'); setCommandPaletteOpen(false); } },
    { id: 'infrastructure', title: 'Processing & Sortex Plants', category: 'Commodities & Trade', icon: Warehouse, desc: 'Buhler color sorting facilities and fumigated warehouses', action: () => { setActiveTab('infrastructure'); setCommandPaletteOpen(false); } },
    { id: 'gallery', title: 'Operations Photo Gallery', category: 'Proof & Media', icon: Camera, desc: 'Inspect operations, port stuffing, and lab testing photographs', action: () => { setActiveTab('gallery'); setCommandPaletteOpen(false); } },
    { id: 'add-gallery', title: 'Add Gallery Photo', category: 'Quick Action', icon: Plus, desc: 'Upload or link new facility, warehouse, or shipment photo', action: () => { setActiveTab('gallery'); handleOpenGalleryModal(); setCommandPaletteOpen(false); } },
    { id: 'faqs', title: 'FAQs Knowledgebase', category: 'Proof & Media', icon: HelpCircle, desc: 'Manage buyer questions, LC terms, and export specifications', action: () => { setActiveTab('faqs'); setCommandPaletteOpen(false); } },
    { id: 'add-faq', title: 'Add New FAQ', category: 'Quick Action', icon: Plus, desc: 'Publish a new question and answer to the homepage accordion', action: () => { setActiveTab('faqs'); handleOpenFaqModal(); setCommandPaletteOpen(false); } },
    { id: 'testimonials', title: 'Buyer Testimonials', category: 'Proof & Media', icon: Quote, desc: 'Institutional buyer reviews from GCC, Europe, and Asia', action: () => { setActiveTab('testimonials'); setCommandPaletteOpen(false); } },
    { id: 'team', title: 'Executive Leadership', category: 'Proof & Media', icon: Users, desc: 'Managing Director & commercial trade leadership profiles', action: () => { setActiveTab('team'); setCommandPaletteOpen(false); } },
    { id: 'certifications', title: 'Statutory Accreditations', category: 'Proof & Media', icon: Award, desc: 'Government regulatory bodies and trade memberships', action: () => { setActiveTab('certifications'); setCommandPaletteOpen(false); } },
    { id: 'inquiries', title: 'RFQ Inquiries Pipeline', category: 'Commercial Desk', icon: MessageSquare, desc: 'Real-time commercial buyer leads and proforma quote requests', action: () => { setActiveTab('inquiries'); setCommandPaletteOpen(false); } },
    { id: 'audit', title: 'Security & Audit Logs', category: 'Commercial Desk', icon: Shield, desc: 'Administrator activity timestamps, IP records, and change logs', action: () => { setActiveTab('audit'); setCommandPaletteOpen(false); } },
  ];

  const filteredCommandItems = COMMAND_ITEMS.filter(item =>
    !commandQuery ||
    item.title.toLowerCase().includes(commandQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(commandQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(commandQuery.toLowerCase())
  );

  // Filtered lists
  const filteredCommodities = commodities.filter(c => 
    !commoditySearch || 
    c.name?.toLowerCase().includes(commoditySearch.toLowerCase()) ||
    c.category_name?.toLowerCase().includes(commoditySearch.toLowerCase()) ||
    c.origin?.toLowerCase().includes(commoditySearch.toLowerCase())
  );

  const filteredGallery = galleryItems.filter(g =>
    !gallerySearch ||
    g.title?.toLowerCase().includes(gallerySearch.toLowerCase()) ||
    g.category?.toLowerCase().includes(gallerySearch.toLowerCase()) ||
    g.location?.toLowerCase().includes(gallerySearch.toLowerCase())
  );

  const filteredFaqs = faqsList.filter(f =>
    !faqSearch ||
    f.question?.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.answer?.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.category?.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const filteredTeam = teamList.filter(t =>
    !teamSearch ||
    t.name?.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.position?.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.email?.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const filteredCerts = certificationsList.filter(c =>
    !certSearch ||
    c.title?.toLowerCase().includes(certSearch.toLowerCase()) ||
    c.certificate_no?.toLowerCase().includes(certSearch.toLowerCase()) ||
    c.issuing_body?.toLowerCase().includes(certSearch.toLowerCase())
  );

  const filteredPorts = portsList.filter(p =>
    !portSearch ||
    p.name?.toLowerCase().includes(portSearch.toLowerCase()) ||
    p.code?.toLowerCase().includes(portSearch.toLowerCase()) ||
    p.type?.toLowerCase().includes(portSearch.toLowerCase())
  );

  const filteredInfra = infraList.filter(i =>
    !infraSearch ||
    i.title?.toLowerCase().includes(infraSearch.toLowerCase()) ||
    i.category?.toLowerCase().includes(infraSearch.toLowerCase()) ||
    i.location?.toLowerCase().includes(infraSearch.toLowerCase())
  );

  const filteredBatches = batchesList.filter(b =>
    !batchSearch ||
    b.batch_code?.toLowerCase().includes(batchSearch.toLowerCase()) ||
    b.container_number?.toLowerCase().includes(batchSearch.toLowerCase()) ||
    b.origin_region?.toLowerCase().includes(batchSearch.toLowerCase()) ||
    b.certificate_of_analysis_no?.toLowerCase().includes(batchSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F0F4F3] text-[#0C2422] flex font-sans antialiased selection:bg-[#00A79D]/20 selection:text-[#002824]">
      
      {/* ════════════════════════════════════════════════════════════════════════
          LEFT SIDEBAR (ENTERPRISE SLIM & COLLAPSIBLE)
          ════════════════════════════════════════════════════════════════════════ */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#002824] text-white flex flex-col justify-between border-r border-[#003833] shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Brand Header */}
          <div className="h-18 px-5 flex items-center justify-between border-b border-white/10 bg-[#001F1C]">
            <Link to="/" className="flex items-center gap-3 group min-w-0">
              <div className="w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md ring-2 ring-emerald-400/30 group-hover:scale-105 group-hover:ring-emerald-400 transition-all duration-300 shrink-0 overflow-hidden">
                <img 
                  src="/images/logo.png" 
                  alt="Agro Dairy Export Website Icon" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/logo-light.png';
                  }}
                />
              </div>
              <div className="min-w-0">
                <span className="font-display font-black text-sm tracking-tight text-white block truncate">
                  Agro Dairy Export
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block tracking-wide truncate">
                  ENTERPRISE CMS DESK
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Command Launcher in Sidebar */}
          <div className="px-4 pt-3 pb-1">
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white border border-white/10 hover:border-emerald-400/40 transition-all text-xs font-sans group shadow-xs cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">Quick Jump to Section...</span>
              </span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-emerald-300 border border-white/10">Ctrl+K</kbd>
            </button>
          </div>

          {/* Navigation Links Grouped */}
          <nav className="p-4 space-y-6 overflow-y-auto custom-scrollbar max-h-[calc(100vh-175px)]" role="navigation">
            {NAV_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400/50 block mb-2">
                  {group.group}
                </span>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-600 to-[#00A79D] text-white font-bold shadow-lg shadow-emerald-950/40 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1.5 before:bg-white before:rounded-r-full'
                          : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-emerald-400 group-hover:text-emerald-300'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && item.badge !== undefined && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-white/80')
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Profile & Logout Footer */}
        <div className="p-4 border-t border-white/10 bg-[#001F1C]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white block truncate">{user?.name || 'Managing Director'}</span>
                </div>
                <span className="text-[10px] font-mono uppercase text-emerald-400/80 block">Super Admin • Online</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════════════════════════
          MAIN CONTENT VIEWPORT
          ════════════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#D4ECE9] sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Hierarchy with Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="hidden sm:inline font-mono uppercase tracking-wider text-slate-400 text-[10px]">Portal</span>
              <ChevronRight className="w-3.5 h-3.5 hidden sm:inline text-slate-300" />
              <div className="flex items-center gap-1.5 font-bold text-[#0C2422]">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                <span className="capitalize">{activeTab.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          {/* Center Search / Command Launcher Trigger */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-[#F4F9F8] hover:bg-[#EBF5F3] text-slate-500 hover:text-[#0C2422] border border-[#D4ECE9] hover:border-brand-primary/40 text-xs transition-all shadow-2xs group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-brand-primary group-hover:scale-110 transition-transform" />
                <span>Search pages, tools &amp; actions...</span>
              </span>
              <kbd className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#D4ECE9] text-slate-500 shadow-2xs">Ctrl + K</kbd>
            </button>
          </div>

          {/* Top Actions: Live Status + Live Site Link + Publish Button */}
          <div className="flex items-center gap-3">
            {/* Live SSE Pulse Pill */}
            <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-[11px] font-mono font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Sync Active</span>
            </div>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4F9F8] border border-[#D4ECE9] hover:bg-[#E6F7F5] text-brand-primary text-xs font-semibold transition hover:border-brand-primary/40 shadow-2xs"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview Live Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            {['header', 'hero', 'about', 'company', 'footer'].includes(activeTab) && (
              <button
                type="button"
                onClick={handleSaveSettings}
                disabled={saveLoading}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold shadow-md shadow-brand-primary/25 transition disabled:opacity-60 cursor-pointer"
              >
                {saveLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Publish Changes</span>
                <span className="hidden md:inline text-[10px] font-mono opacity-70 ml-0.5">Ctrl+S</span>
              </button>
            )}
          </div>
        </header>

        {/* Global Save Feedback Toast */}
        {saveSuccess && (
          <div className="fixed top-20 right-6 z-50 bg-[#002824] text-white border border-emerald-400/40 rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-fade-in max-w-md">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 pr-2">
              <div className="font-bold text-xs text-white">Published Successfully</div>
              <div className="text-[11px] text-white/70">{saveSuccess}</div>
            </div>
            <button onClick={() => setSaveSuccess('')} className="text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Canvas */}
        <main className="p-4 sm:p-8 flex-1 space-y-6 max-w-7xl w-full mx-auto">

          {/* ════════════════════════════════════════════════════════════════════
              1. OVERVIEW & ANALYTICS DASHBOARD TAB
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Executive Welcome Banner */}
              <div className="rounded-3xl bg-gradient-to-r from-[#002824] via-[#063831] to-[#001F1C] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-emerald-500/20">
                {/* Subtle Decorative Ambient Glow */}
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#00A79D]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-mono backdrop-blur-xs border border-white/10">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Agro Dairy Export • Executive Control Center</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
                    </div>
                    <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
                      Welcome, {user?.name || 'Administrator'}
                    </h1>
                    <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-sans">
                      Complete editorial and commercial governance over the website, commodity listings, operations photo gallery, and buyer proforma requests.
                    </p>
                  </div>

                  {/* Header Fast Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setCommandPaletteOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition cursor-pointer backdrop-blur-xs shadow-xs"
                    >
                      <Search className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Quick Jump</span>
                      <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-emerald-300 border border-white/10">Ctrl+K</kbd>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveTab('commodities'); handleOpenCommodityModal(); }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold shadow-md shadow-brand-primary/30 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ New Commodity</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Elevated Metric Cards Matrix */}
              {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {/* Card 1: Total Inquiries */}
                  <div 
                    onClick={() => setActiveTab('inquiries')}
                    className="bg-white p-5 rounded-2xl border border-[#D4ECE9] hover:border-blue-400/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-xs font-bold text-[#4D6765] uppercase tracking-wider">Total Inquiries</span>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-[#0C2422] font-mono">{stats.totalInquiries}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-[#4D6765] font-medium">Global Buyer Pipeline</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          ↑ Active Leads
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Pending RFQs */}
                  <div 
                    onClick={() => setActiveTab('inquiries')}
                    className="bg-white p-5 rounded-2xl border border-[#D4ECE9] hover:border-amber-400/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-xs font-bold text-[#4D6765] uppercase tracking-wider">Pending RFQs</span>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Clock className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-amber-700 font-mono">{stats.newInquiries}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-[#4D6765] font-medium">Awaiting Quotations</span>
                        <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          ⚡ Priority Review
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Commodities Listed */}
                  <div 
                    onClick={() => setActiveTab('commodities')}
                    className="bg-white p-5 rounded-2xl border border-[#D4ECE9] hover:border-emerald-400/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-xs font-bold text-[#4D6765] uppercase tracking-wider">Export Catalog</span>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-brand-primary font-mono">{commodities.length || stats.totalProducts}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-[#4D6765] font-medium">Export Ready Lines</span>
                        <span className="text-[10px] font-mono font-bold text-brand-primary bg-[#E6F7F5] px-2 py-0.5 rounded-md border border-[#BBE5E1]">
                          100% Origin
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Operations Photo Gallery */}
                  <div 
                    onClick={() => setActiveTab('gallery')}
                    className="bg-white p-5 rounded-2xl border border-[#D4ECE9] hover:border-teal-400/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-xs font-bold text-[#4D6765] uppercase tracking-wider">Facility Media</span>
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Camera className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-teal-700 font-mono">{galleryItems.length || 9}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-[#4D6765] font-medium">High-Resolution Photos</span>
                        <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          Photos Only
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4 Core Quick Actions Hub */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#0C2422]">
                    Primary CMS &amp; Operations Shortcuts
                  </h3>
                  <span className="text-xs text-[#4D6765]">Click any card to start managing</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Action 1: Header */}
                  <div 
                    onClick={() => setActiveTab('header')}
                    className="bg-white p-5 rounded-2xl border border-[#D4ECE9] shadow-xs hover:border-brand-primary/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition">
                        <Layout className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#0C2422]">Header &amp; Social Links</h4>
                      <p className="text-xs text-[#4D6765] leading-relaxed">
                        Update phone, WhatsApp, Instagram, LinkedIn, and top credentials ticker.
                      </p>
                    </div>
                    <div className="pt-3 flex items-center text-xs font-bold text-brand-primary gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Edit Header</span> <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Action 2: Hero */}
                  <div 
                    onClick={() => setActiveTab('hero')}
                    className="bg-white p-5 rounded-2xl border border-[#D4ECE9] shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#0C2422]">Homepage Hero &amp; Stats</h4>
                      <p className="text-xs text-[#4D6765] leading-relaxed">
                        Modify main banner headline, button CTAs, and 4 statistics counter numbers.
                      </p>
                    </div>
                    <div className="pt-3 flex items-center text-xs font-bold text-amber-700 gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Edit Hero</span> <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Action 3: Commodities */}
                  <div 
                    onClick={() => setActiveTab('commodities')}
                    className="bg-white p-5 rounded-2xl border border-[#D4ECE9] shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#0C2422]">Commodities Catalog</h4>
                      <p className="text-xs text-[#4D6765] leading-relaxed">
                        Add or edit peanuts, pulses, grains, pure ghee, and specifications.
                      </p>
                    </div>
                    <div className="pt-3 flex items-center text-xs font-bold text-brand-primary gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Manage Catalog</span> <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Action 4: Gallery */}
                  <div 
                    onClick={() => setActiveTab('gallery')}
                    className="bg-white p-5 rounded-2xl border border-[#D4ECE9] shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition">
                        <Camera className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#0C2422]">Operations Photo Gallery</h4>
                      <p className="text-xs text-[#4D6765] leading-relaxed">
                        Photo-only gallery showcase for plants, port loading, and warehouse storage.
                      </p>
                    </div>
                    <div className="pt-3 flex items-center text-xs font-bold text-teal-700 gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Manage Gallery</span> <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Status & Real-Time Sync Bar */}
              <div className="rounded-2xl bg-white border border-[#D4ECE9] p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6 flex-wrap text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-[#0C2422]">Live Sync Engine:</span>
                    <span className="text-emerald-700 font-mono font-semibold">Active &amp; Broadcasting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="font-bold text-[#0C2422]">Database:</span>
                    <span className="text-slate-600 font-mono">MySQL AgroDairy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="font-bold text-[#0C2422]">Asset Delivery:</span>
                    <span className="text-slate-600 font-mono">High-Speed CDN</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-bold text-slate-800">Ctrl+K</kbd> to search anytime</span>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#D4ECE9] flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0C2422]">Recent Commercial RFQs</h3>
                    <p className="text-xs text-[#4D6765]">Latest quotation requests submitted through the portal.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Inquiries</span> <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F9F8] text-[#0C2422] uppercase font-bold tracking-wider border-b border-[#D4ECE9]">
                      <tr>
                        <th className="px-5 py-3">Inquiry #</th>
                        <th className="px-5 py-3">Buyer / Company</th>
                        <th className="px-5 py-3">Commodity</th>
                        <th className="px-5 py-3">Destination</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D4ECE9]">
                      {inquiries.slice(0, 5).map((inq) => (
                        <tr key={inq.id} className="hover:bg-[#F4F9F8]/60 transition">
                          <td className="px-5 py-3.5 font-mono font-bold text-brand-primary">{inq.inquiry_number}</td>
                          <td className="px-5 py-3.5">
                            <div className="font-bold text-[#0C2422]">{inq.name}</div>
                            <div className="text-[11px] text-[#4D6765]">{inq.company}</div>
                          </td>
                          <td className="px-5 py-3.5 font-semibold text-slate-800">{inq.product_name || inq.product_variant || 'General'}</td>
                          <td className="px-5 py-3.5 text-[#4D6765]">{inq.country}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${STATUS_COLORS[inq.status] || 'bg-slate-100 text-slate-700'}`}>
                              {inq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              2. HEADER & TOP ANNOUNCEMENT BAR TAB (WITH LIVE PREVIEW)
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'header' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Live Preview Box */}
              <div className="bg-[#002824] rounded-3xl p-5 text-white border border-[#003833] shadow-md space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span className="flex items-center gap-1.5 font-bold uppercase">
                    <Eye className="w-3.5 h-3.5" />
                    Live Website Navbar Header &amp; Menu Preview
                  </span>
                  <span className="text-white/40">Real-time simulation (updates instantly)</span>
                </div>

                {/* 1. Simulated Top Ticker & Hotline Bar */}
                <div className="bg-[#001F1C] px-4 py-2 rounded-xl text-center text-xs font-mono text-emerald-300 border border-white/5 truncate">
                  {settingsForm.header_ticker_text || 'DIRECT APEDA REGISTERED EXPORTER • BULK COMMODITY DISPATCHES • 100% SORTEX QUALITY'}
                </div>

                {/* Simulated Navbar Utility Bar */}
                <div className="bg-white/5 px-4 py-2.5 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 text-white/80">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px]">
                      {settingsForm.header_credentials_badge || 'APEDA RCMC • IEC • FSSAI Central License'}
                    </span>
                    <span className="hidden sm:inline text-white/60">•</span>
                    <span className="hidden sm:inline font-mono">
                      Hotline: {settingsForm.contact_phone || '+91 90233 63680'} ({settingsForm.contact_person || 'J.P. Vora'})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Simulated Social Icons */}
                    {(settingsForm.header_show_social !== '0' && settingsForm.header_show_social !== 0 && settingsForm.header_show_social !== false) && (
                      <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg border border-white/10">
                        {settingsForm.header_linkedin ? (
                          <div title="LinkedIn Configured" className="w-5 h-5 rounded bg-[#0077B5] text-white flex items-center justify-center">
                            <Linkedin className="w-3 h-3" />
                          </div>
                        ) : null}
                        {settingsForm.header_instagram ? (
                          <div title="Instagram Configured" className="w-5 h-5 rounded bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center">
                            <Instagram className="w-3 h-3" />
                          </div>
                        ) : null}
                        {!settingsForm.header_linkedin && !settingsForm.header_instagram && (
                          <span className="text-[10px] text-white/40 font-mono">No social links configured</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Simulated Main Navbar with Live Enable / Disable Links */}
                <div className="bg-white text-[#0C2422] px-4 py-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                  {/* Brand Logo Mini */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#002824] p-1 flex items-center justify-center shrink-0">
                      <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => { e.target.src = '/images/logo-light.jpg'; }} />
                    </div>
                    <span className="font-display font-extrabold text-xs text-[#002824] tracking-tight">Agro Dairy Export</span>
                  </div>

                  {/* Simulated Nav Links with Live Visibility */}
                  <div className="flex items-center gap-1.5 flex-wrap text-xs font-semibold">
                    {(settingsForm.nav_show_home !== '0' && settingsForm.nav_show_home !== 0 && settingsForm.nav_show_home !== false) ? (
                      <span className="px-2.5 py-1 rounded-lg bg-[#E6F7F5] text-brand-primary font-bold border border-brand-primary/20">
                        {settingsForm.nav_label_home || 'Home'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 line-through text-[11px]" title="Disabled / Hidden">
                        {settingsForm.nav_label_home || 'Home'} (Hidden)
                      </span>
                    )}

                    {(settingsForm.nav_show_about !== '0' && settingsForm.nav_show_about !== 0 && settingsForm.nav_show_about !== false) ? (
                      <span className="px-2.5 py-1 rounded-lg text-slate-700 hover:text-brand-primary">
                        {settingsForm.nav_label_about || 'About'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 line-through text-[11px]" title="Disabled / Hidden">
                        {settingsForm.nav_label_about || 'About'} (Hidden)
                      </span>
                    )}

                    {(settingsForm.nav_show_products !== '0' && settingsForm.nav_show_products !== 0 && settingsForm.nav_show_products !== false) ? (
                      <span className="px-2.5 py-1 rounded-lg text-slate-700 hover:text-brand-primary flex items-center gap-1">
                        <span>{settingsForm.nav_label_products || 'Products'}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 line-through text-[11px]" title="Disabled / Hidden">
                        {settingsForm.nav_label_products || 'Products'} (Hidden)
                      </span>
                    )}

                    {(settingsForm.nav_show_gallery !== '0' && settingsForm.nav_show_gallery !== 0 && settingsForm.nav_show_gallery !== false) ? (
                      <span className="px-2.5 py-1 rounded-lg text-slate-700 hover:text-brand-primary">
                        {settingsForm.nav_label_gallery || 'Gallery'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 line-through text-[11px]" title="Disabled / Hidden">
                        {settingsForm.nav_label_gallery || 'Gallery'} (Hidden)
                      </span>
                    )}

                    {(settingsForm.nav_show_certifications !== '0' && settingsForm.nav_show_certifications !== 0 && settingsForm.nav_show_certifications !== false) ? (
                      <span className="px-2.5 py-1 rounded-lg text-slate-700 hover:text-brand-primary">
                        {settingsForm.nav_label_certifications || 'Certificates'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 line-through text-[11px]" title="Disabled / Hidden">
                        {settingsForm.nav_label_certifications || 'Certificates'} (Hidden)
                      </span>
                    )}

                    {(settingsForm.nav_show_contact !== '0' && settingsForm.nav_show_contact !== 0 && settingsForm.nav_show_contact !== false) ? (
                      <span className="px-2.5 py-1 rounded-lg text-slate-700 hover:text-brand-primary">
                        {settingsForm.nav_label_contact || 'Contact Us'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 line-through text-[11px]" title="Disabled / Hidden">
                        {settingsForm.nav_label_contact || 'Contact Us'} (Hidden)
                      </span>
                    )}
                  </div>

                  {/* Simulated Action Buttons */}
                  <div className="flex items-center gap-2">
                    {(settingsForm.nav_show_whatsapp_btn !== '0' && settingsForm.nav_show_whatsapp_btn !== 0 && settingsForm.nav_show_whatsapp_btn !== false) && (
                      <div className="w-7 h-7 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center border border-[#25D366]/30" title="WhatsApp Chat Active">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {(settingsForm.nav_show_quote_btn !== '0' && settingsForm.nav_show_quote_btn !== 0 && settingsForm.nav_show_quote_btn !== false && settingsForm.header_show_cta !== '0' && settingsForm.header_show_cta !== false) ? (
                      <div className="px-3.5 py-1.5 rounded-full bg-brand-primary text-white font-bold text-[11px] shadow-xs">
                        {settingsForm.header_cta_text || 'Request Export Quote'}
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic font-mono">(Quote button disabled)</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Header &amp; Top Announcement Bar Controls</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Configure the top announcement ticker, phone numbers, contact desk, and header CTA button.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                      Top Bar Announcement Ticker Text
                    </label>
                    <input
                      type="text"
                      value={settingsForm.header_ticker_text || ''}
                      onChange={(e) => handleSettingChange('header_ticker_text', e.target.value)}
                      placeholder="e.g. DIRECT APEDA REGISTERED EXPORTER • BULK COMMODITY DISPATCHES..."
                      className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                      Credentials Pill Badge Text
                    </label>
                    <input
                      type="text"
                      value={settingsForm.header_credentials_badge || ''}
                      onChange={(e) => handleSettingChange('header_credentials_badge', e.target.value)}
                      placeholder="APEDA RCMC • IEC • FSSAI Central License"
                      className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                      Support Hotline Phone
                    </label>
                    <input
                      type="text"
                      value={settingsForm.contact_phone || ''}
                      onChange={(e) => handleSettingChange('contact_phone', e.target.value)}
                      placeholder="+91 90233 63680"
                      className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                      Direct Contact Person Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.contact_person || ''}
                      onChange={(e) => handleSettingChange('contact_person', e.target.value)}
                      placeholder="J.P. Vora (Managing Partner)"
                      className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                      Official Export Inquiries Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.contact_email || ''}
                      onChange={(e) => handleSettingChange('contact_email', e.target.value)}
                      placeholder="export@agrodairy.com"
                      className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                      WhatsApp Trade Desk Number
                    </label>
                    <input
                      type="text"
                      value={settingsForm.contact_whatsapp || ''}
                      onChange={(e) => handleSettingChange('contact_whatsapp', e.target.value)}
                      placeholder="919023363680"
                      className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                      Header Button Label
                    </label>
                    <input
                      type="text"
                      value={settingsForm.header_cta_text || ''}
                      onChange={(e) => handleSettingChange('header_cta_text', e.target.value)}
                      placeholder="Request Export Quote"
                      className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                      Header Button Destination Link
                    </label>
                    <input
                      type="text"
                      value={settingsForm.header_cta_link || ''}
                      onChange={(e) => handleSettingChange('header_cta_link', e.target.value)}
                      placeholder="/#rfq-section"
                      className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  {/* Social Media Channels (Header Quick Access) */}
                  <div className="md:col-span-2 pt-5 border-t border-[#D4ECE9] space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-[#0C2422] flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00A79D]" />
                          Social Media Channels (Header &amp; Navigation Quick Access)
                        </h3>
                        <p className="text-[11px] text-[#4D6765]">
                          Link your corporate LinkedIn and Instagram accounts directly in the top utility strip, desktop navigation, and mobile menu.
                        </p>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer bg-[#F4F9F8] border border-[#D4ECE9] px-3.5 py-1.5 rounded-xl hover:bg-[#E6F7F5] transition">
                        <input
                          type="checkbox"
                          checked={settingsForm.header_show_social !== '0' && settingsForm.header_show_social !== 0 && settingsForm.header_show_social !== false}
                          onChange={(e) => handleSettingChange('header_show_social', e.target.checked ? '1' : '0')}
                          className="w-4 h-4 text-brand-primary rounded"
                        />
                        <span className="text-xs font-bold text-[#0C2422]">Show in Header</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422] flex items-center gap-1.5">
                          <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                          <span>LinkedIn Profile / Company Page URL</span>
                        </label>
                        <input
                          type="url"
                          value={settingsForm.header_linkedin || ''}
                          onChange={(e) => handleSettingChange('header_linkedin', e.target.value)}
                          placeholder="https://www.linkedin.com/company/agrodairyexport"
                          className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono"
                        />
                        <span className="text-[10px] text-slate-400 block">
                          Displayed with the official LinkedIn icon in the top header bar and mobile menu.
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422] flex items-center gap-1.5">
                          <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                          <span>Instagram Profile / Business URL</span>
                        </label>
                        <input
                          type="url"
                          value={settingsForm.header_instagram || ''}
                          onChange={(e) => handleSettingChange('header_instagram', e.target.value)}
                          placeholder="https://www.instagram.com/agrodairyexport"
                          className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono"
                        />
                        <span className="text-[10px] text-slate-400 block">
                          Connects foreign buyers with live visual dispatches and warehouse stories.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Main Navbar Menu Options & Visibility Toggles ── */}
                  <div className="pt-8 border-t border-[#D4ECE9] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
                            <Menu className="w-4 h-4" />
                          </div>
                          <h3 className="text-base font-display font-bold text-[#0C2422]">
                            Navbar Navigation Links &amp; Action Buttons (Enable / Disable)
                          </h3>
                        </div>
                        <p className="text-xs text-[#4D6765] mt-1">
                          Control visibility and labels for every link and CTA button in the main navbar and mobile drawer.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#00A79D] bg-[#E6F6F4] px-3 py-1.5 rounded-full self-start">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Instant Live Sync</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* 1. Home Link */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        (settingsForm.nav_show_home !== '0' && settingsForm.nav_show_home !== 0 && settingsForm.nav_show_home !== false)
                          ? 'bg-[#F4F9F8] border-[#D4ECE9]'
                          : 'bg-slate-50/70 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white border border-[#D4ECE9] flex items-center justify-center text-brand-primary shadow-2xs">
                              <Home className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0C2422]">Home Page Link</div>
                              <div className="text-[10px] text-slate-400 font-mono">Route: /</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (settingsForm.nav_show_home !== '0' && settingsForm.nav_show_home !== 0 && settingsForm.nav_show_home !== false)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {(settingsForm.nav_show_home !== '0' && settingsForm.nav_show_home !== 0 && settingsForm.nav_show_home !== false) ? 'Visible' : 'Hidden'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSettingChange('nav_show_home', (settingsForm.nav_show_home === '0' || settingsForm.nav_show_home === 0 || settingsForm.nav_show_home === false) ? '1' : '0')}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                (settingsForm.nav_show_home !== '0' && settingsForm.nav_show_home !== 0 && settingsForm.nav_show_home !== false)
                                  ? 'bg-brand-primary'
                                  : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  (settingsForm.nav_show_home !== '0' && settingsForm.nav_show_home !== 0 && settingsForm.nav_show_home !== false)
                                    ? 'translate-x-5'
                                    : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Navbar Display Label
                          </label>
                          <input
                            type="text"
                            value={settingsForm.nav_label_home || ''}
                            onChange={(e) => handleSettingChange('nav_label_home', e.target.value)}
                            placeholder="Home"
                            className="w-full bg-white border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                      </div>

                      {/* 2. About Link */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        (settingsForm.nav_show_about !== '0' && settingsForm.nav_show_about !== 0 && settingsForm.nav_show_about !== false)
                          ? 'bg-[#F4F9F8] border-[#D4ECE9]'
                          : 'bg-slate-50/70 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white border border-[#D4ECE9] flex items-center justify-center text-brand-primary shadow-2xs">
                              <Building2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0C2422]">Company / About</div>
                              <div className="text-[10px] text-slate-400 font-mono">Route: /company/about</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (settingsForm.nav_show_about !== '0' && settingsForm.nav_show_about !== 0 && settingsForm.nav_show_about !== false)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {(settingsForm.nav_show_about !== '0' && settingsForm.nav_show_about !== 0 && settingsForm.nav_show_about !== false) ? 'Visible' : 'Hidden'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSettingChange('nav_show_about', (settingsForm.nav_show_about === '0' || settingsForm.nav_show_about === 0 || settingsForm.nav_show_about === false) ? '1' : '0')}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                (settingsForm.nav_show_about !== '0' && settingsForm.nav_show_about !== 0 && settingsForm.nav_show_about !== false)
                                  ? 'bg-brand-primary'
                                  : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  (settingsForm.nav_show_about !== '0' && settingsForm.nav_show_about !== 0 && settingsForm.nav_show_about !== false)
                                    ? 'translate-x-5'
                                    : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Navbar Display Label
                          </label>
                          <input
                            type="text"
                            value={settingsForm.nav_label_about || ''}
                            onChange={(e) => handleSettingChange('nav_label_about', e.target.value)}
                            placeholder="About"
                            className="w-full bg-white border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                      </div>

                      {/* 3. Products Link */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        (settingsForm.nav_show_products !== '0' && settingsForm.nav_show_products !== 0 && settingsForm.nav_show_products !== false)
                          ? 'bg-[#F4F9F8] border-[#D4ECE9]'
                          : 'bg-slate-50/70 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white border border-[#D4ECE9] flex items-center justify-center text-brand-primary shadow-2xs">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0C2422]">Commodities / Products</div>
                              <div className="text-[10px] text-slate-400 font-mono">Route: /products</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (settingsForm.nav_show_products !== '0' && settingsForm.nav_show_products !== 0 && settingsForm.nav_show_products !== false)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {(settingsForm.nav_show_products !== '0' && settingsForm.nav_show_products !== 0 && settingsForm.nav_show_products !== false) ? 'Visible' : 'Hidden'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSettingChange('nav_show_products', (settingsForm.nav_show_products === '0' || settingsForm.nav_show_products === 0 || settingsForm.nav_show_products === false) ? '1' : '0')}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                (settingsForm.nav_show_products !== '0' && settingsForm.nav_show_products !== 0 && settingsForm.nav_show_products !== false)
                                  ? 'bg-brand-primary'
                                  : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  (settingsForm.nav_show_products !== '0' && settingsForm.nav_show_products !== 0 && settingsForm.nav_show_products !== false)
                                    ? 'translate-x-5'
                                    : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Navbar Display Label
                          </label>
                          <input
                            type="text"
                            value={settingsForm.nav_label_products || ''}
                            onChange={(e) => handleSettingChange('nav_label_products', e.target.value)}
                            placeholder="Products"
                            className="w-full bg-white border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                      </div>

                      {/* 4. Gallery Link */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        (settingsForm.nav_show_gallery !== '0' && settingsForm.nav_show_gallery !== 0 && settingsForm.nav_show_gallery !== false)
                          ? 'bg-[#F4F9F8] border-[#D4ECE9]'
                          : 'bg-slate-50/70 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white border border-[#D4ECE9] flex items-center justify-center text-brand-primary shadow-2xs">
                              <Camera className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0C2422]">Live Dispatches &amp; Gallery</div>
                              <div className="text-[10px] text-slate-400 font-mono">Route: /gallery</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (settingsForm.nav_show_gallery !== '0' && settingsForm.nav_show_gallery !== 0 && settingsForm.nav_show_gallery !== false)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {(settingsForm.nav_show_gallery !== '0' && settingsForm.nav_show_gallery !== 0 && settingsForm.nav_show_gallery !== false) ? 'Visible' : 'Hidden'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSettingChange('nav_show_gallery', (settingsForm.nav_show_gallery === '0' || settingsForm.nav_show_gallery === 0 || settingsForm.nav_show_gallery === false) ? '1' : '0')}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                (settingsForm.nav_show_gallery !== '0' && settingsForm.nav_show_gallery !== 0 && settingsForm.nav_show_gallery !== false)
                                  ? 'bg-brand-primary'
                                  : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  (settingsForm.nav_show_gallery !== '0' && settingsForm.nav_show_gallery !== 0 && settingsForm.nav_show_gallery !== false)
                                    ? 'translate-x-5'
                                    : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Navbar Display Label
                          </label>
                          <input
                            type="text"
                            value={settingsForm.nav_label_gallery || ''}
                            onChange={(e) => handleSettingChange('nav_label_gallery', e.target.value)}
                            placeholder="Gallery"
                            className="w-full bg-white border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                      </div>

                      {/* 5. Certificates Link */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        (settingsForm.nav_show_certifications !== '0' && settingsForm.nav_show_certifications !== 0 && settingsForm.nav_show_certifications !== false)
                          ? 'bg-[#F4F9F8] border-[#D4ECE9]'
                          : 'bg-slate-50/70 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white border border-[#D4ECE9] flex items-center justify-center text-brand-primary shadow-2xs">
                              <Award className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0C2422]">Quality &amp; Certifications</div>
                              <div className="text-[10px] text-slate-400 font-mono">Route: /quality/certifications</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (settingsForm.nav_show_certifications !== '0' && settingsForm.nav_show_certifications !== 0 && settingsForm.nav_show_certifications !== false)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {(settingsForm.nav_show_certifications !== '0' && settingsForm.nav_show_certifications !== 0 && settingsForm.nav_show_certifications !== false) ? 'Visible' : 'Hidden'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSettingChange('nav_show_certifications', (settingsForm.nav_show_certifications === '0' || settingsForm.nav_show_certifications === 0 || settingsForm.nav_show_certifications === false) ? '1' : '0')}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                (settingsForm.nav_show_certifications !== '0' && settingsForm.nav_show_certifications !== 0 && settingsForm.nav_show_certifications !== false)
                                  ? 'bg-brand-primary'
                                  : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  (settingsForm.nav_show_certifications !== '0' && settingsForm.nav_show_certifications !== 0 && settingsForm.nav_show_certifications !== false)
                                    ? 'translate-x-5'
                                    : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Navbar Display Label
                          </label>
                          <input
                            type="text"
                            value={settingsForm.nav_label_certifications || ''}
                            onChange={(e) => handleSettingChange('nav_label_certifications', e.target.value)}
                            placeholder="Certificates"
                            className="w-full bg-white border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                      </div>

                      {/* 6. Contact Us Link */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        (settingsForm.nav_show_contact !== '0' && settingsForm.nav_show_contact !== 0 && settingsForm.nav_show_contact !== false)
                          ? 'bg-[#F4F9F8] border-[#D4ECE9]'
                          : 'bg-slate-50/70 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white border border-[#D4ECE9] flex items-center justify-center text-brand-primary shadow-2xs">
                              <Phone className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0C2422]">Contact Desk Link</div>
                              <div className="text-[10px] text-slate-400 font-mono">Route: /contact</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (settingsForm.nav_show_contact !== '0' && settingsForm.nav_show_contact !== 0 && settingsForm.nav_show_contact !== false)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {(settingsForm.nav_show_contact !== '0' && settingsForm.nav_show_contact !== 0 && settingsForm.nav_show_contact !== false) ? 'Visible' : 'Hidden'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSettingChange('nav_show_contact', (settingsForm.nav_show_contact === '0' || settingsForm.nav_show_contact === 0 || settingsForm.nav_show_contact === false) ? '1' : '0')}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                (settingsForm.nav_show_contact !== '0' && settingsForm.nav_show_contact !== 0 && settingsForm.nav_show_contact !== false)
                                  ? 'bg-brand-primary'
                                  : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  (settingsForm.nav_show_contact !== '0' && settingsForm.nav_show_contact !== 0 && settingsForm.nav_show_contact !== false)
                                    ? 'translate-x-5'
                                    : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Navbar Display Label
                          </label>
                          <input
                            type="text"
                            value={settingsForm.nav_label_contact || ''}
                            onChange={(e) => handleSettingChange('nav_label_contact', e.target.value)}
                            placeholder="Contact Us"
                            className="w-full bg-white border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                      </div>

                      {/* 7. Request Quote CTA Button */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        (settingsForm.nav_show_quote_btn !== '0' && settingsForm.nav_show_quote_btn !== 0 && settingsForm.nav_show_quote_btn !== false)
                          ? 'bg-[#F4F9F8] border-[#D4ECE9]'
                          : 'bg-slate-50/70 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-xs">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0C2422]">"Request Quote" CTA Button</div>
                              <div className="text-[10px] text-slate-400 font-mono">Route: /rfq (Primary Header Button)</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (settingsForm.nav_show_quote_btn !== '0' && settingsForm.nav_show_quote_btn !== 0 && settingsForm.nav_show_quote_btn !== false)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {(settingsForm.nav_show_quote_btn !== '0' && settingsForm.nav_show_quote_btn !== 0 && settingsForm.nav_show_quote_btn !== false) ? 'Visible' : 'Hidden'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSettingChange('nav_show_quote_btn', (settingsForm.nav_show_quote_btn === '0' || settingsForm.nav_show_quote_btn === 0 || settingsForm.nav_show_quote_btn === false) ? '1' : '0')}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                (settingsForm.nav_show_quote_btn !== '0' && settingsForm.nav_show_quote_btn !== 0 && settingsForm.nav_show_quote_btn !== false)
                                  ? 'bg-brand-primary'
                                  : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  (settingsForm.nav_show_quote_btn !== '0' && settingsForm.nav_show_quote_btn !== 0 && settingsForm.nav_show_quote_btn !== false)
                                    ? 'translate-x-5'
                                    : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            CTA Button Display Text
                          </label>
                          <input
                            type="text"
                            value={settingsForm.header_cta_text || ''}
                            onChange={(e) => handleSettingChange('header_cta_text', e.target.value)}
                            placeholder="Request Export Quote"
                            className="w-full bg-white border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                      </div>

                      {/* 8. WhatsApp Quick Chat Action */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        (settingsForm.nav_show_whatsapp_btn !== '0' && settingsForm.nav_show_whatsapp_btn !== 0 && settingsForm.nav_show_whatsapp_btn !== false)
                          ? 'bg-[#F4F9F8] border-[#D4ECE9]'
                          : 'bg-slate-50/70 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                              <MessageCircle className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0C2422]">WhatsApp Quick Chat Icon</div>
                              <div className="text-[10px] text-slate-400 font-mono">Links to desk WhatsApp number</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (settingsForm.nav_show_whatsapp_btn !== '0' && settingsForm.nav_show_whatsapp_btn !== 0 && settingsForm.nav_show_whatsapp_btn !== false)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {(settingsForm.nav_show_whatsapp_btn !== '0' && settingsForm.nav_show_whatsapp_btn !== 0 && settingsForm.nav_show_whatsapp_btn !== false) ? 'Visible' : 'Hidden'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSettingChange('nav_show_whatsapp_btn', (settingsForm.nav_show_whatsapp_btn === '0' || settingsForm.nav_show_whatsapp_btn === 0 || settingsForm.nav_show_whatsapp_btn === false) ? '1' : '0')}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                (settingsForm.nav_show_whatsapp_btn !== '0' && settingsForm.nav_show_whatsapp_btn !== 0 && settingsForm.nav_show_whatsapp_btn !== false)
                                  ? 'bg-brand-primary'
                                  : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  (settingsForm.nav_show_whatsapp_btn !== '0' && settingsForm.nav_show_whatsapp_btn !== 0 && settingsForm.nav_show_whatsapp_btn !== false)
                                    ? 'translate-x-5'
                                    : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] text-[#4D6765]">
                            When active, an instant WhatsApp dispatch icon is displayed next to the Quote CTA for instant international buyer messaging.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4ECE9] flex justify-end">
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition disabled:opacity-60"
                  >
                    {saveLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Header Settings</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              3. HERO BANNER & 4 KEY STAT COUNTERS CMS (WITH LIVE PREVIEW)
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'hero' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Live Preview Box */}
              <div className="bg-[#F4F9F8] rounded-3xl p-6 border border-[#D4ECE9] shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-primary">
                  <span className="flex items-center gap-1.5 uppercase">
                    <Eye className="w-3.5 h-3.5" />
                    Live Homepage Hero Card Preview
                  </span>
                  <span className="text-[#4D6765]">Updates live as you type</span>
                </div>

                <div className="space-y-3 max-w-2xl bg-white p-6 rounded-2xl border border-[#D4ECE9] shadow-xs">
                  {(settingsForm.hero_show_badge !== '0' && settingsForm.hero_show_badge !== 0 && settingsForm.hero_show_badge !== false) && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#E6F7F5] text-brand-primary text-xs font-semibold">
                      {settingsForm.hero_badge || 'Trusted Agro & Dairy Export Partner from India'}
                    </span>
                  )}
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0C2422] leading-tight">
                    {settingsForm.hero_title || 'Origin-Direct Peanuts, Grains, Pulses & Pure'}{' '}
                    <span className="text-brand-primary">{settingsForm.hero_highlight || 'Dairy Ghee'}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4D6765] leading-relaxed">
                    {settingsForm.hero_subtitle || 'We source, process and export premium quality agricultural commodities from India to global markets with consistent quality, competitive pricing and reliable supply.'}
                  </p>
                  
                  {/* Buttons Preview with live enable/disable reflection */}
                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    {(settingsForm.hero_show_primary_btn !== '0' && settingsForm.hero_show_primary_btn !== 0 && settingsForm.hero_show_primary_btn !== false) && (
                      <span className="px-5 py-2.5 rounded-full bg-brand-primary text-white font-bold text-xs shadow-sm">
                        {settingsForm.hero_cta_primary_text || 'Request Proforma Quote'}
                      </span>
                    )}
                    {(settingsForm.hero_show_secondary_btn !== '0' && settingsForm.hero_show_secondary_btn !== 0 && settingsForm.hero_show_secondary_btn !== false) && (
                      <span className="px-5 py-2.5 rounded-full bg-white border border-[#0C2422] text-[#0C2422] font-bold text-xs shadow-xs">
                        {settingsForm.hero_cta_secondary_text || 'Explore Export Catalog'}
                      </span>
                    )}
                    {settingsForm.hero_show_primary_btn === '0' && settingsForm.hero_show_secondary_btn === '0' && (
                      <span className="text-[11px] font-mono text-slate-400 italic">
                        (Both Call to Action buttons are currently disabled / hidden)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Hero Banner Text &amp; CTAs</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Customize the primary value proposition and call to actions on the homepage.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Hero Eyebrow Pill Badge with Enable/Disable Toggle */}
                  <div className="space-y-2 p-4 rounded-2xl bg-[#F4F9F8] border border-[#D4ECE9]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                        Hero Eyebrow Pill Badge
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          const current = (settingsForm.hero_show_badge !== '0' && settingsForm.hero_show_badge !== 0 && settingsForm.hero_show_badge !== false);
                          handleSettingChange('hero_show_badge', current ? '0' : '1');
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className={`text-[11px] font-mono font-bold ${
                          (settingsForm.hero_show_badge !== '0' && settingsForm.hero_show_badge !== 0 && settingsForm.hero_show_badge !== false)
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}>
                          {(settingsForm.hero_show_badge !== '0' && settingsForm.hero_show_badge !== 0 && settingsForm.hero_show_badge !== false)
                            ? 'Enabled'
                            : 'Disabled'}
                        </span>
                        <div className={`relative inline-flex h-5 w-10 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                          (settingsForm.hero_show_badge !== '0' && settingsForm.hero_show_badge !== 0 && settingsForm.hero_show_badge !== false)
                            ? 'bg-[#00A79D]'
                            : 'bg-slate-300'
                        }`}>
                          <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            (settingsForm.hero_show_badge !== '0' && settingsForm.hero_show_badge !== 0 && settingsForm.hero_show_badge !== false)
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          }`} />
                        </div>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={settingsForm.hero_badge || ''}
                      onChange={(e) => handleSettingChange('hero_badge', e.target.value)}
                      placeholder="DIRECT AGRO & DAIRY EXPORTER FROM GUJARAT, INDIA"
                      disabled={settingsForm.hero_show_badge === '0' || settingsForm.hero_show_badge === 0 || settingsForm.hero_show_badge === false}
                      className="w-full bg-white border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                        Main Headline
                      </label>
                      <input
                        type="text"
                        value={settingsForm.hero_title || ''}
                        onChange={(e) => handleSettingChange('hero_title', e.target.value)}
                        placeholder="Origin-Direct Peanuts, Grains, Pulses & Pure"
                        className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                        Highlighted Keyword
                      </label>
                      <input
                        type="text"
                        value={settingsForm.hero_highlight || ''}
                        onChange={(e) => handleSettingChange('hero_highlight', e.target.value)}
                        placeholder="Dairy Ghee"
                        className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      rows={3}
                      value={settingsForm.hero_subtitle || ''}
                      onChange={(e) => handleSettingChange('hero_subtitle', e.target.value)}
                      placeholder="We source, process and export premium quality agricultural commodities..."
                      className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  {/* Hero Call to Action Buttons Configuration with Enable/Disable Switches */}
                  <div className="pt-4 border-t border-[#D4ECE9] space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-[#0C2422] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00A79D]" />
                        Hero Call to Action Buttons (Enable / Disable Controls)
                      </h3>
                      <p className="text-[11px] text-[#4D6765]">
                        Turn either button ON or OFF, change button text labels and customize destination links.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {/* 1. Primary Button Card */}
                      <div className={`p-5 rounded-2xl border transition-all ${
                        (settingsForm.hero_show_primary_btn !== '0' && settingsForm.hero_show_primary_btn !== 0 && settingsForm.hero_show_primary_btn !== false)
                          ? 'bg-white border-[#00A79D]/40 shadow-sm'
                          : 'bg-[#F4F9F8]/60 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#D4ECE9]">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-brand-primary" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                              Primary Action Button
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#E6F7F5] text-brand-primary font-mono font-semibold">
                              Solid Emerald
                            </span>
                          </div>

                          {/* Enable / Disable Toggle Switch */}
                          <button
                            type="button"
                            onClick={() => {
                              const current = (settingsForm.hero_show_primary_btn !== '0' && settingsForm.hero_show_primary_btn !== 0 && settingsForm.hero_show_primary_btn !== false);
                              handleSettingChange('hero_show_primary_btn', current ? '0' : '1');
                            }}
                            className="flex items-center gap-2 cursor-pointer group"
                            title="Toggle Primary Button On / Off"
                          >
                            <span className={`text-[11px] font-mono font-bold ${
                              (settingsForm.hero_show_primary_btn !== '0' && settingsForm.hero_show_primary_btn !== 0 && settingsForm.hero_show_primary_btn !== false)
                                ? 'text-emerald-700'
                                : 'text-slate-400'
                            }`}>
                              {(settingsForm.hero_show_primary_btn !== '0' && settingsForm.hero_show_primary_btn !== 0 && settingsForm.hero_show_primary_btn !== false)
                                ? 'Enabled (Active)'
                                : 'Disabled (Hidden)'}
                            </span>
                            <div className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                              (settingsForm.hero_show_primary_btn !== '0' && settingsForm.hero_show_primary_btn !== 0 && settingsForm.hero_show_primary_btn !== false)
                                ? 'bg-[#00A79D]'
                                : 'bg-slate-300'
                            }`}>
                              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                (settingsForm.hero_show_primary_btn !== '0' && settingsForm.hero_show_primary_btn !== 0 && settingsForm.hero_show_primary_btn !== false)
                                  ? 'translate-x-5'
                                  : 'translate-x-0'
                              }`} />
                            </div>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-[#0C2422] uppercase tracking-wider block">
                              Primary Button Label
                            </label>
                            <input
                              type="text"
                              value={settingsForm.hero_cta_primary_text || ''}
                              onChange={(e) => handleSettingChange('hero_cta_primary_text', e.target.value)}
                              placeholder="Request Proforma Quote"
                              disabled={settingsForm.hero_show_primary_btn === '0' || settingsForm.hero_show_primary_btn === 0 || settingsForm.hero_show_primary_btn === false}
                              className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3.5 py-2 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-[#0C2422] uppercase tracking-wider block">
                              Primary Button Link
                            </label>
                            <input
                              type="text"
                              value={settingsForm.hero_cta_primary_link || ''}
                              onChange={(e) => handleSettingChange('hero_cta_primary_link', e.target.value)}
                              placeholder="/rfq"
                              disabled={settingsForm.hero_show_primary_btn === '0' || settingsForm.hero_show_primary_btn === 0 || settingsForm.hero_show_primary_btn === false}
                              className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3.5 py-2 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono disabled:opacity-50"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 2. Secondary Button Card */}
                      <div className={`p-5 rounded-2xl border transition-all ${
                        (settingsForm.hero_show_secondary_btn !== '0' && settingsForm.hero_show_secondary_btn !== 0 && settingsForm.hero_show_secondary_btn !== false)
                          ? 'bg-white border-[#00A79D]/40 shadow-sm'
                          : 'bg-[#F4F9F8]/60 border-slate-200 opacity-75'
                      }`}>
                        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#D4ECE9]">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full border-2 border-[#0C2422]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                              Secondary Action Button
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono font-semibold">
                              Outline Button
                            </span>
                          </div>

                          {/* Enable / Disable Toggle Switch */}
                          <button
                            type="button"
                            onClick={() => {
                              const current = (settingsForm.hero_show_secondary_btn !== '0' && settingsForm.hero_show_secondary_btn !== 0 && settingsForm.hero_show_secondary_btn !== false);
                              handleSettingChange('hero_show_secondary_btn', current ? '0' : '1');
                            }}
                            className="flex items-center gap-2 cursor-pointer group"
                            title="Toggle Secondary Button On / Off"
                          >
                            <span className={`text-[11px] font-mono font-bold ${
                              (settingsForm.hero_show_secondary_btn !== '0' && settingsForm.hero_show_secondary_btn !== 0 && settingsForm.hero_show_secondary_btn !== false)
                                ? 'text-emerald-700'
                                : 'text-slate-400'
                            }`}>
                              {(settingsForm.hero_show_secondary_btn !== '0' && settingsForm.hero_show_secondary_btn !== 0 && settingsForm.hero_show_secondary_btn !== false)
                                ? 'Enabled (Active)'
                                : 'Disabled (Hidden)'}
                            </span>
                            <div className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                              (settingsForm.hero_show_secondary_btn !== '0' && settingsForm.hero_show_secondary_btn !== 0 && settingsForm.hero_show_secondary_btn !== false)
                                ? 'bg-[#00A79D]'
                                : 'bg-slate-300'
                            }`}>
                              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                (settingsForm.hero_show_secondary_btn !== '0' && settingsForm.hero_show_secondary_btn !== 0 && settingsForm.hero_show_secondary_btn !== false)
                                  ? 'translate-x-5'
                                  : 'translate-x-0'
                              }`} />
                            </div>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-[#0C2422] uppercase tracking-wider block">
                              Secondary Button Label
                            </label>
                            <input
                              type="text"
                              value={settingsForm.hero_cta_secondary_text || ''}
                              onChange={(e) => handleSettingChange('hero_cta_secondary_text', e.target.value)}
                              placeholder="Explore Export Catalog"
                              disabled={settingsForm.hero_show_secondary_btn === '0' || settingsForm.hero_show_secondary_btn === 0 || settingsForm.hero_show_secondary_btn === false}
                              className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3.5 py-2 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-[#0C2422] uppercase tracking-wider block">
                              Secondary Button Link
                            </label>
                            <input
                              type="text"
                              value={settingsForm.hero_cta_secondary_link || ''}
                              onChange={(e) => handleSettingChange('hero_cta_secondary_link', e.target.value)}
                              placeholder="/products"
                              disabled={settingsForm.hero_show_secondary_btn === '0' || settingsForm.hero_show_secondary_btn === 0 || settingsForm.hero_show_secondary_btn === false}
                              className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3.5 py-2 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono disabled:opacity-50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Features Bar Toggle */}
                  <div className="pt-4 border-t border-[#D4ECE9]">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F4F9F8] border border-[#D4ECE9]">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                          Hero Trust Bar (Direct Sourcing, Certified, Shipping, Partnerships)
                        </div>
                        <div className="text-[11px] text-[#4D6765]">
                          The 4 trust feature badges displayed right below the hero action buttons.
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const current = (settingsForm.hero_show_trust_bar !== '0' && settingsForm.hero_show_trust_bar !== 0 && settingsForm.hero_show_trust_bar !== false);
                          handleSettingChange('hero_show_trust_bar', current ? '0' : '1');
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                        title="Toggle Trust Bar"
                      >
                        <span className={`text-[11px] font-mono font-bold ${
                          (settingsForm.hero_show_trust_bar !== '0' && settingsForm.hero_show_trust_bar !== 0 && settingsForm.hero_show_trust_bar !== false)
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}>
                          {(settingsForm.hero_show_trust_bar !== '0' && settingsForm.hero_show_trust_bar !== 0 && settingsForm.hero_show_trust_bar !== false)
                            ? 'Enabled (Active)'
                            : 'Disabled (Hidden)'}
                        </span>
                        <div className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                          (settingsForm.hero_show_trust_bar !== '0' && settingsForm.hero_show_trust_bar !== 0 && settingsForm.hero_show_trust_bar !== false)
                            ? 'bg-[#00A79D]'
                            : 'bg-slate-300'
                        }`}>
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            (settingsForm.hero_show_trust_bar !== '0' && settingsForm.hero_show_trust_bar !== 0 && settingsForm.hero_show_trust_bar !== false)
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          }`} />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 4 Stat Counter Metrics */}
                  <div className="pt-4 border-t border-[#D4ECE9] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display font-bold text-base text-[#0C2422]">Homepage 4 Key Statistics Counters</h3>
                        <p className="text-[11px] text-[#4D6765]">Customize the verified metrics shown in the export record section.</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const current = (settingsForm.hero_show_stats !== '0' && settingsForm.hero_show_stats !== 0 && settingsForm.hero_show_stats !== false);
                          handleSettingChange('hero_show_stats', current ? '0' : '1');
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                        title="Toggle Statistics Counters"
                      >
                        <span className={`text-[11px] font-mono font-bold ${
                          (settingsForm.hero_show_stats !== '0' && settingsForm.hero_show_stats !== 0 && settingsForm.hero_show_stats !== false)
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}>
                          {(settingsForm.hero_show_stats !== '0' && settingsForm.hero_show_stats !== 0 && settingsForm.hero_show_stats !== false)
                            ? 'Enabled (Active)'
                            : 'Disabled (Hidden)'}
                        </span>
                        <div className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                          (settingsForm.hero_show_stats !== '0' && settingsForm.hero_show_stats !== 0 && settingsForm.hero_show_stats !== false)
                            ? 'bg-[#00A79D]'
                            : 'bg-slate-300'
                        }`}>
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            (settingsForm.hero_show_stats !== '0' && settingsForm.hero_show_stats !== 0 && settingsForm.hero_show_stats !== false)
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          }`} />
                        </div>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Stat 1 */}
                      <div className="p-4 rounded-2xl bg-[#F4F9F8] border border-[#D4ECE9] space-y-2">
                        <span className="text-[11px] font-bold text-brand-primary uppercase">Stat 01 (Experience)</span>
                        <input
                          type="text"
                          placeholder="Number: 10"
                          value={settingsForm.hero_stat_1_val || ''}
                          onChange={(e) => handleSettingChange('hero_stat_1_val', e.target.value)}
                          className="w-full bg-white border border-[#D4ECE9] rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Label: Years of Excellence"
                          value={settingsForm.hero_stat_1_lbl || ''}
                          onChange={(e) => handleSettingChange('hero_stat_1_lbl', e.target.value)}
                          className="w-full bg-white border border-[#D4ECE9] rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>

                      {/* Stat 2 */}
                      <div className="p-4 rounded-2xl bg-[#F4F9F8] border border-[#D4ECE9] space-y-2">
                        <span className="text-[11px] font-bold text-brand-primary uppercase">Stat 02 (Countries)</span>
                        <input
                          type="text"
                          placeholder="Number: 40"
                          value={settingsForm.hero_stat_2_val || ''}
                          onChange={(e) => handleSettingChange('hero_stat_2_val', e.target.value)}
                          className="w-full bg-white border border-[#D4ECE9] rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Label: Countries Served"
                          value={settingsForm.hero_stat_2_lbl || ''}
                          onChange={(e) => handleSettingChange('hero_stat_2_lbl', e.target.value)}
                          className="w-full bg-white border border-[#D4ECE9] rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>

                      {/* Stat 3 */}
                      <div className="p-4 rounded-2xl bg-[#F4F9F8] border border-[#D4ECE9] space-y-2">
                        <span className="text-[11px] font-bold text-brand-primary uppercase">Stat 03 (Shipments)</span>
                        <input
                          type="text"
                          placeholder="Number: 1800"
                          value={settingsForm.hero_stat_3_val || ''}
                          onChange={(e) => handleSettingChange('hero_stat_3_val', e.target.value)}
                          className="w-full bg-white border border-[#D4ECE9] rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Label: FCL Dispatches"
                          value={settingsForm.hero_stat_3_lbl || ''}
                          onChange={(e) => handleSettingChange('hero_stat_3_lbl', e.target.value)}
                          className="w-full bg-white border border-[#D4ECE9] rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>

                      {/* Stat 4 */}
                      <div className="p-4 rounded-2xl bg-[#F4F9F8] border border-[#D4ECE9] space-y-2">
                        <span className="text-[11px] font-bold text-brand-primary uppercase">Stat 04 (Tonnage)</span>
                        <input
                          type="text"
                          placeholder="Number: 50000"
                          value={settingsForm.hero_stat_4_val || ''}
                          onChange={(e) => handleSettingChange('hero_stat_4_val', e.target.value)}
                          className="w-full bg-white border border-[#D4ECE9] rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Label: Metric Tonnes Shipped"
                          value={settingsForm.hero_stat_4_lbl || ''}
                          onChange={(e) => handleSettingChange('hero_stat_4_lbl', e.target.value)}
                          className="w-full bg-white border border-[#D4ECE9] rounded-lg px-3 py-1.5 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4ECE9] flex justify-end">
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition disabled:opacity-60"
                  >
                    {saveLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Hero Settings</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              4. ABOUT & VALUE PROPOSITION CMS
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'about' && (
            <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-[#0C2422]">About Section &amp; Origin Narrative</h2>
                <p className="text-xs text-[#4D6765] mt-0.5">
                  Configure the corporate mission, origin aggregation story, and headline shown across the website.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    About Eyebrow Badge
                  </label>
                  <input
                    type="text"
                    value={settingsForm.about_badge || ''}
                    onChange={(e) => handleSettingChange('about_badge', e.target.value)}
                    placeholder="ORIGIN EXPORT PARTNER • GUJARAT, INDIA"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    About Section Main Headline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.about_headline || ''}
                    onChange={(e) => handleSettingChange('about_headline', e.target.value)}
                    placeholder="Your Trusted Partner for Agricultural & Dairy Exports"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Primary Company Narrative / Paragraph 1
                  </label>
                  <textarea
                    rows={4}
                    value={settingsForm.about_paragraph1 || ''}
                    onChange={(e) => handleSettingChange('about_paragraph1', e.target.value)}
                    placeholder="Agro Dairy Export LLP is an origin-direct exporter of Sortex-cleaned Peanuts..."
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Secondary Processing &amp; Quality Narrative / Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.about_paragraph2 || ''}
                    onChange={(e) => handleSettingChange('about_paragraph2', e.target.value)}
                    placeholder="We maintain rigorous quality governance through Buhler optical color sorters..."
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#D4ECE9] flex justify-end">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition disabled:opacity-60"
                >
                  {saveLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save About Settings</span>
                </button>
              </div>
            </form>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              5. COMPANY & STATUTORY CREDENTIALS CMS
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'company' && (
            <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-[#0C2422]">Company Info &amp; Statutory Certifications</h2>
                <p className="text-xs text-[#4D6765] mt-0.5">
                  Manage legal company registration codes, APEDA RCMC, FSSAI Central License, registered address, and gateway ports.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Legal Entity Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.company_name || ''}
                    onChange={(e) => handleSettingChange('company_name', e.target.value)}
                    placeholder="Agro Dairy Export LLP"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Corporate Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.company_tagline || ''}
                    onChange={(e) => handleSettingChange('company_tagline', e.target.value)}
                    placeholder="Exporting Pure Agricultural Commodities & Dairy to Global Markets"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Import Export Code (IEC)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.company_iec || ''}
                    onChange={(e) => handleSettingChange('company_iec', e.target.value)}
                    placeholder="0817029381"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    GSTIN Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.company_gstin || ''}
                    onChange={(e) => handleSettingChange('company_gstin', e.target.value)}
                    placeholder="24AAHFA3928L1Z9"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    APEDA RCMC Certificate Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.company_apeda || ''}
                    onChange={(e) => handleSettingChange('company_apeda', e.target.value)}
                    placeholder="APEDA/RCMC/2026/0892"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    FSSAI Central License
                  </label>
                  <input
                    type="text"
                    value={settingsForm.company_fssai || ''}
                    onChange={(e) => handleSettingChange('company_fssai', e.target.value)}
                    placeholder="10722026000148"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Registered Head Office Address
                  </label>
                  <input
                    type="text"
                    value={settingsForm.company_address || ''}
                    onChange={(e) => handleSettingChange('company_address', e.target.value)}
                    placeholder="Office no. -701, THE FUTURE CORNER, Sarthana, Surat-395013, Gujarat, India"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Primary Export Loading Ports
                  </label>
                  <input
                    type="text"
                    value={settingsForm.company_ports || ''}
                    onChange={(e) => handleSettingChange('company_ports', e.target.value)}
                    placeholder="Mundra Port, Kandla (Deendayal) Port, Hazira Port, Pipavav Port"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#D4ECE9] flex justify-end">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition disabled:opacity-60"
                >
                  {saveLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Company Info</span>
                </button>
              </div>
            </form>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              6. FOOTER & LEGAL TERMS CMS
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'footer' && (
            <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-[#0C2422]">Footer Summary &amp; Export Disclaimers</h2>
                <p className="text-xs text-[#4D6765] mt-0.5">
                  Manage the footer corporate summary, port operating hours, and standard export legal notice.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Footer Corporate Summary
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.footer_about || ''}
                    onChange={(e) => handleSettingChange('footer_about', e.target.value)}
                    placeholder="Agro Dairy Export LLP is an Indian agricultural and dairy export company operating from Surat and Rajkot..."
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Port &amp; Office Operating Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.footer_hours || ''}
                    onChange={(e) => handleSettingChange('footer_hours', e.target.value)}
                    placeholder="Mon - Sat: 9:00 AM - 7:00 PM IST | Port Operations: 24/7 Continuous"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0C2422]">
                    Export Regulatory Disclaimer
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.footer_disclaimer || ''}
                    onChange={(e) => handleSettingChange('footer_disclaimer', e.target.value)}
                    placeholder="All agricultural commodities and pure dairy ghee shipments are exported under phytosanitary inspection..."
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-xs text-[#0C2422]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#D4ECE9] flex justify-end">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition disabled:opacity-60"
                >
                  {saveLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Footer Settings</span>
                </button>
              </div>
            </form>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              7. COMMODITIES CATALOG MANAGER (WITH SEARCH & LIVE CRUD)
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'commodities' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4ECE9] gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Commodities &amp; Products Catalog</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Add, edit, or delete export agricultural commodities and dairy items shown in the catalog.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenCommodityModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Commodity</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-[#F4F9F8] px-4 py-2 rounded-2xl border border-[#D4ECE9] max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={commoditySearch}
                  onChange={(e) => setCommoditySearch(e.target.value)}
                  placeholder="Search commodities by name, category, or origin..."
                  className="w-full bg-transparent text-xs text-[#0C2422] focus:outline-none placeholder:text-slate-400"
                />
                {commoditySearch && (
                  <button onClick={() => setCommoditySearch('')} className="text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4F9F8] border-b border-[#D4ECE9] text-[#0C2422] uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Image</th>
                      <th className="px-5 py-3.5">Commodity Name</th>
                      <th className="px-5 py-3.5">Category</th>
                      <th className="px-5 py-3.5">Origin</th>
                      <th className="px-5 py-3.5">MOQ / Grade</th>
                      <th className="px-5 py-3.5">Featured</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4ECE9]">
                    {filteredCommodities.map((item) => (
                      <tr key={item.id} className="hover:bg-[#F4F9F8]/60 transition">
                        <td className="px-5 py-3.5">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-[#D4ECE9]">
                            <img
                              src={item.main_image || '/images/products/bold-peanuts.jpg'}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/products/bold-peanuts.jpg';
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-display font-bold text-sm text-[#0C2422]">{item.name}</div>
                          <div className="text-[11px] text-[#4D6765] line-clamp-1">{item.short_description}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                            {item.category_name || 'General'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[#4D6765]">
                          {item.origin || 'Gujarat, India'}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-mono font-bold text-[#0C2422]">{item.moq || 20} {item.moq_unit || 'MT'}</div>
                          <div className="text-[10px] text-[#4D6765]">{item.grade_variety || 'Export Grade'}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          {item.is_featured ? (
                            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                              Featured
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-400">Standard</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => handleOpenCommodityModal(item)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                            title="Edit Commodity"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCommodity(item.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                            title="Delete Commodity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              8. OPERATIONS & INFRASTRUCTURE GALLERY MANAGER
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'gallery' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4ECE9] gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Infrastructure &amp; Operations Gallery</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Manage the photos, facilities, ports, warehouses, and QC testing stations showcased on the Gallery page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenGalleryModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Gallery Photo</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-[#F4F9F8] px-4 py-2 rounded-2xl border border-[#D4ECE9] max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  placeholder="Search gallery by title, category, or location..."
                  className="w-full bg-transparent text-xs text-[#0C2422] focus:outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Photo-Only Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredGallery.map((item) => (
                  <div 
                    key={item.id} 
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-[#D4ECE9] shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => setViewingGalleryPhoto(item)}
                  >
                    {/* Full-Bleed Photo Only */}
                    <img
                      src={item.image}
                      alt={item.title || 'Photo'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/infrastructure.jpg';
                      }}
                    />

                    {/* Gradient overlay for contrast & floating actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Top Floating Controls */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs">
                        {item.category || 'Operations'}
                      </span>

                      {/* Floating Action Buttons */}
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setViewingGalleryPhoto(item)}
                          className="w-7 h-7 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-brand-primary flex items-center justify-center shadow-md transition"
                          title="View Full Photo"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenGalleryModal(item)}
                          className="w-7 h-7 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-brand-primary flex items-center justify-center shadow-md transition"
                          title="Edit Photo"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="w-7 h-7 rounded-full bg-white/95 hover:bg-rose-50 text-rose-600 flex items-center justify-center shadow-md transition"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Caption (Single-Line Title Only - No Bulky Content) */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <h4 className="text-white font-ui font-bold text-xs line-clamp-1 drop-shadow-md">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              9. FAQs KNOWLEDGEBASE MANAGER
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'faqs' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4ECE9] gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Frequently Asked Questions Manager</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Manage the official questions and answers shown in the FAQ accordion on the Homepage and Trade Desk.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenFaqModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New FAQ</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-[#F4F9F8] px-4 py-2 rounded-2xl border border-[#D4ECE9] max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Search FAQs by question or answer keyword..."
                  className="w-full bg-transparent text-xs text-[#0C2422] focus:outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-3">
                {filteredFaqs.map((faq, i) => (
                  <div key={faq.id} className="p-4 sm:p-5 rounded-2xl bg-[#F4F9F8] border border-[#D4ECE9] hover:border-brand-primary/40 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#D4ECE9] text-brand-primary">
                            #{i + 1} • {faq.category || 'General'}
                          </span>
                          {faq.is_active ? (
                            <span className="text-[10px] font-mono text-emerald-600 font-semibold">Active</span>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-400">Hidden</span>
                          )}
                        </div>
                        <h4 className="font-display font-bold text-sm sm:text-base text-[#0C2422]">{faq.question}</h4>
                        <p className="text-xs text-[#4D6765] leading-relaxed pt-1">{faq.answer}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenFaqModal(faq)}
                          className="p-1.5 rounded-lg bg-white border border-[#D4ECE9] text-slate-700 hover:bg-slate-50 transition"
                          title="Edit FAQ"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              10. BUYER TESTIMONIALS MANAGER
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'testimonials' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4ECE9] gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Buyer Reviews &amp; Testimonials</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Manage institutional client feedback, ratings, and endorsements from overseas importers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenTestimonialModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonialsList.map((t) => (
                  <div key={t.id} className="p-5 rounded-2xl bg-[#F4F9F8] border border-[#D4ECE9] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(t.rating || 5)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{t.country || 'Global Importer'}</span>
                      </div>
                      <p className="text-xs text-[#0C2422] italic leading-relaxed mb-3">"{t.content}"</p>
                    </div>

                    <div className="pt-3 border-t border-[#D4ECE9] flex items-center justify-between">
                      <div>
                        <div className="font-ui font-bold text-xs text-[#0C2422]">{t.client_name}</div>
                        <div className="text-[11px] text-[#4D6765]">{t.company_name}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenTestimonialModal(t)}
                          className="p-1.5 rounded-lg bg-white border border-[#D4ECE9] text-slate-700 hover:bg-slate-50 transition"
                          title="Edit Testimonial"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition"
                          title="Delete Testimonial"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              11. TRACEABILITY BATCHES & EXPORT LOTS
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'traceability' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4ECE9] gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Export Traceability Lots &amp; QC Batches</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Manage lot inspection certificates, harvest dates, optical Sortex purity, moisture, and container numbers queried by overseas buyers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBatchModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register New Export Lot</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-[#F4F9F8] px-4 py-2 rounded-2xl border border-[#D4ECE9] max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={batchSearch}
                  onChange={(e) => setBatchSearch(e.target.value)}
                  placeholder="Search batches by code, container #, or COA..."
                  className="w-full bg-transparent text-xs text-[#0C2422] focus:outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4F9F8] border-b border-[#D4ECE9] text-[#0C2422] uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Batch Code</th>
                      <th className="px-5 py-3.5">Origin Corridor</th>
                      <th className="px-5 py-3.5">Container &amp; Port</th>
                      <th className="px-5 py-3.5">Quality &amp; COA</th>
                      <th className="px-5 py-3.5">Shipment Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4ECE9]">
                    {filteredBatches.map((b) => (
                      <tr key={b.id} className="hover:bg-[#F4F9F8]/60 transition">
                        <td className="px-5 py-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">
                          {b.batch_code}
                          <span className="block text-[10px] text-slate-400 font-sans font-normal">
                            Pack: {b.packing_type || '50 kg Bags'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-bold text-[#0C2422]">{b.origin_region}</div>
                          <div className="text-[10px] text-[#4D6765]">
                            Harvest: {b.harvest_date ? new Date(b.harvest_date).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-mono font-semibold text-slate-800">{b.container_number || 'Pending Stuffing'}</div>
                          <div className="text-[10px] text-slate-500">{b.port_of_loading || 'Mundra Port'}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-semibold text-emerald-700">{b.purity_percentage} Purity • {b.moisture_percentage} Moisture</div>
                          <div className="text-[10px] font-mono text-slate-500">{b.certificate_of_analysis_no || b.inspection_status}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {b.shipment_status || 'Verified'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenBatchModal(b)}
                              className="p-1.5 rounded-lg bg-white border border-[#D4ECE9] text-slate-700 hover:bg-slate-50"
                              title="Edit Lot"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBatch(b.id)}
                              className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100"
                              title="Delete Lot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              12. GATEWAY PORTS & MARITIME ROUTES
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'ports' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4ECE9] gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Export Gateway Ports &amp; Logistics Hubs</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Configure coastal loading seaports and international discharge terminals utilized for container quote generation.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenPortModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Port</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-[#F4F9F8] px-4 py-2 rounded-2xl border border-[#D4ECE9] max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={portSearch}
                  onChange={(e) => setPortSearch(e.target.value)}
                  placeholder="Search ports by name or UN/LOCODE..."
                  className="w-full bg-transparent text-xs text-[#0C2422] focus:outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredPorts.map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl bg-[#F4F9F8] border border-[#D4ECE9] flex flex-col justify-between hover:border-brand-primary/40 transition">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-9 h-9 rounded-xl bg-white text-brand-primary border border-[#D4ECE9] flex items-center justify-center font-bold">
                          <Anchor className="w-4 h-4" />
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          p.is_major ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.is_major ? 'Major Gateway' : 'Regional'}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-sm text-[#0C2422]">{p.name}</h3>
                      <div className="text-[11px] font-mono text-brand-primary font-bold mt-1">Code: {p.code || 'N/A'}</div>
                      <div className="text-[11px] text-[#4D6765] mt-0.5">Type: {p.type || 'Sea Port'}</div>
                    </div>

                    <div className="pt-3 mt-4 border-t border-[#D4ECE9] flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenPortModal(p)}
                        className="p-1.5 rounded-lg bg-white border border-[#D4ECE9] text-slate-700 hover:bg-slate-50"
                        title="Edit Port"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePort(p.id)}
                        className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100"
                        title="Delete Port"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              13. PROCESSING PLANTS & INFRASTRUCTURE
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'infrastructure' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4ECE9] gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Processing Plants &amp; Sortex Facilities</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Showcase Buhler optical color sorters, dehumidified warehousing, HPLC lab testing, and container stuffing bays.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenInfraModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Facility / Plant</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-[#F4F9F8] px-4 py-2 rounded-2xl border border-[#D4ECE9] max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={infraSearch}
                  onChange={(e) => setInfraSearch(e.target.value)}
                  placeholder="Search facilities by title, category, or location..."
                  className="w-full bg-transparent text-xs text-[#0C2422] focus:outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredInfra.map((item) => (
                  <div key={item.id} className="p-5 rounded-3xl bg-[#F4F9F8] border border-[#D4ECE9] flex flex-col justify-between hover:border-brand-primary/40 transition">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-primary bg-white px-2.5 py-1 rounded-full border border-[#D4ECE9]">
                          {item.category || 'Plant'}
                        </span>
                        <span className="text-xs font-mono text-emerald-700 font-bold">
                          {item.capacity || 'Export Standard'}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base text-[#0C2422]">{item.title}</h3>
                      <p className="text-xs text-[#4D6765] leading-relaxed">{item.description}</p>
                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                        <span>{item.location || 'Gujarat, India'}</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#D4ECE9] flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenInfraModal(item)}
                        className="p-1.5 rounded-lg bg-white border border-[#D4ECE9] text-slate-700 hover:bg-slate-50"
                        title="Edit Facility"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteInfrastructure(item.id)}
                        className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100"
                        title="Delete Facility"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              14. EXECUTIVE LEADERSHIP & TRADE DESKS
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'team' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4ECE9] gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Executive Leadership &amp; Trade Desks</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Manage the founding partners, export trade directors, and QA laboratory officers featured on About and Contact pages.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenTeamModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Team Member</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-[#F4F9F8] px-4 py-2 rounded-2xl border border-[#D4ECE9] max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  placeholder="Search team by name, position, or email..."
                  className="w-full bg-transparent text-xs text-[#0C2422] focus:outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTeam.map((member) => (
                  <div key={member.id} className="p-5 rounded-3xl bg-[#F4F9F8] border border-[#D4ECE9] flex flex-col justify-between hover:border-brand-primary/40 transition">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary to-teal-500 text-white flex items-center justify-center font-display font-black text-sm shadow-md">
                          {member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-sm text-[#0C2422]">{member.name}</h3>
                          <span className="text-[11px] text-brand-primary font-semibold block leading-tight">{member.position}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#4D6765] leading-relaxed line-clamp-3">{member.bio}</p>

                      <div className="pt-2 border-t border-[#D4ECE9] text-[11px] font-mono text-slate-600 space-y-1">
                        {member.email && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Mail className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </div>
                        )}
                        {member.linkedin && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Phone className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                            <span className="truncate">{member.linkedin}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 mt-4 border-t border-[#D4ECE9] flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenTeamModal(member)}
                        className="p-1.5 rounded-lg bg-white border border-[#D4ECE9] text-slate-700 hover:bg-slate-50"
                        title="Edit Member"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100"
                        title="Delete Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              15. STATUTORY ACCREDITATIONS & LICENSES
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'certifications' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4ECE9] gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Statutory Certifications &amp; Accreditations</h2>
                  <p className="text-xs text-[#4D6765] mt-0.5">
                    Manage APEDA RCMC, FSSAI Central License, DGFT IEC, ISO 22000, and US FDA credentials queried by foreign trade auditors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenCertModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certification</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-[#F4F9F8] px-4 py-2 rounded-2xl border border-[#D4ECE9] max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  placeholder="Search certifications by name, number, or authority..."
                  className="w-full bg-transparent text-xs text-[#0C2422] focus:outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCerts.map((cert) => (
                  <div key={cert.id} className="p-5 rounded-3xl bg-[#F4F9F8] border border-[#D4ECE9] flex flex-col justify-between hover:border-brand-primary/40 transition">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          {cert.certificate_no || 'Pending Registration'}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {cert.status || 'Active'}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-base text-[#0C2422]">{cert.title}</h3>
                      <div className="text-[11px] font-mono text-slate-500">{cert.issuing_body}</div>
                      <p className="text-xs text-[#4D6765] leading-relaxed">{cert.description}</p>

                      {cert.verification_url && (
                        <a
                          href={cert.verification_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-brand-primary font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <span>Official Portal Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#D4ECE9] flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenCertModal(cert)}
                        className="p-1.5 rounded-lg bg-white border border-[#D4ECE9] text-slate-700 hover:bg-slate-50"
                        title="Edit Certificate"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCertification(cert.id)}
                        className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100"
                        title="Delete Certificate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              16. COMMERCIAL INQUIRIES & RFQ CRM
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm overflow-hidden">
              {/* Controls Bar */}
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#0C2422]">Commercial Inquiries Pipeline</h2>
                  <p className="text-xs text-[#4D6765]">Live request for quotations submitted via web portal &amp; API.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 px-3 py-2 rounded-xl focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="quotation_prepared">Quotation Prepared</option>
                    <option value="quotation_sent">Quotation Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={loadAllData}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                    title="Refresh Table"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4F9F8] border-b border-[#D4ECE9] text-slate-600 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Ref Number</th>
                      <th className="px-5 py-3.5">Date</th>
                      <th className="px-5 py-3.5">Buyer / Company</th>
                      <th className="px-5 py-3.5">Destination</th>
                      <th className="px-5 py-3.5">Commodity / Volume</th>
                      <th className="px-5 py-3.5">Pipeline Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="text-center py-16 text-slate-400">Loading inquiries...</td>
                      </tr>
                    ) : inquiries.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-16 text-slate-400">No inquiries found matching criteria.</td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/70 transition">
                          <td className="px-5 py-4 font-mono font-bold text-brand-primary whitespace-nowrap">
                            <button
                              onClick={() => handleOpenDetail(inq.id)}
                              className="hover:underline text-left"
                            >
                              {inq.inquiry_number}
                            </button>
                          </td>
                          <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-slate-900">{inq.name}</div>
                            <div className="text-[11px] text-slate-500">{inq.company || inq.email}</div>
                          </td>
                          <td className="px-5 py-4 text-slate-700 whitespace-nowrap">
                            {inq.country}
                            {inq.destination_port && <span className="block text-[11px] text-slate-400">Port: {inq.destination_port}</span>}
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-800">{inq.product_name || inq.product_variant || 'General'}</div>
                            {inq.quantity && (
                              <div className="text-[11px] font-mono text-slate-500">{inq.quantity} {inq.unit} ({inq.incoterm})</div>
                            )}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-full border focus:outline-none ${STATUS_COLORS[inq.status] || 'bg-slate-100 text-slate-700'}`}
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="assigned">Assigned</option>
                              <option value="quotation_prepared">Quotation Prepared</option>
                              <option value="quotation_sent">Quotation Sent</option>
                              <option value="negotiation">Negotiation</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleOpenDetail(inq.id)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg transition"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              12. SECURITY & AUDIT LOGS TAB
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'audit' && (
            <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-[#0C2422]">System Security &amp; Activity Audit Logs</h2>
                <p className="text-xs text-[#4D6765] mt-0.5">
                  Immutable record of staff logins, settings modifications, and catalog updates with IP tracking.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4F9F8] border-b border-[#D4ECE9] text-slate-600 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-5 py-3">Timestamp</th>
                      <th className="px-5 py-3">Staff User</th>
                      <th className="px-5 py-3">Action</th>
                      <th className="px-5 py-3">Entity</th>
                      <th className="px-5 py-3">Details</th>
                      <th className="px-5 py-3">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-5 py-3.5 font-mono text-slate-500 whitespace-nowrap">
                          {new Date(log.created_at).toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 font-bold text-slate-800">
                          {log.user_name || 'Administrator'}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                            log.action === 'login' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-slate-600">{log.model_type || 'System'}</td>
                        <td className="px-5 py-3.5 text-slate-700">{log.details}</td>
                        <td className="px-5 py-3.5 font-mono text-slate-400">{log.ip_address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          COMMODITY CREATE / EDIT MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {commodityModalOpen && editingCommodity && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveCommodity} className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-primary">Commodity Catalog</span>
                <h3 className="text-xl font-display font-bold text-[#0C2422]">
                  {editingCommodity.id ? 'Edit Commodity' : 'Add New Export Commodity'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCommodityModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Commodity Name</label>
                <input
                  type="text"
                  required
                  value={editingCommodity.name}
                  onChange={(e) => setEditingCommodity({ ...editingCommodity, name: e.target.value })}
                  placeholder="e.g. Bold Peanut Kernels 38/42"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Category Name</label>
                <select
                  value={editingCommodity.category_name}
                  onChange={(e) => setEditingCommodity({ ...editingCommodity, category_name: e.target.value })}
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="Peanuts">Peanuts</option>
                  <option value="Grains">Grains</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Dairy Ghee">Dairy Ghee</option>
                  <option value="Oilseeds">Oilseeds &amp; Sesame</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Origin / Growing Belt</label>
                <input
                  type="text"
                  value={editingCommodity.origin || ''}
                  onChange={(e) => setEditingCommodity({ ...editingCommodity, origin: e.target.value })}
                  placeholder="Saurashtra, Gujarat, India"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Minimum Order Quantity (MOQ)</label>
                <input
                  type="number"
                  value={editingCommodity.moq || 20}
                  onChange={(e) => setEditingCommodity({ ...editingCommodity, moq: Number(e.target.value) })}
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">MOQ Unit</label>
                <input
                  type="text"
                  value={editingCommodity.moq_unit || 'MT'}
                  onChange={(e) => setEditingCommodity({ ...editingCommodity, moq_unit: e.target.value })}
                  placeholder="MT or KG"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Grade &amp; Variety Specification</label>
                <input
                  type="text"
                  value={editingCommodity.grade_variety || ''}
                  onChange={(e) => setEditingCommodity({ ...editingCommodity, grade_variety: e.target.value })}
                  placeholder="e.g. 99% Sortex Clean • Buhler Optical QC"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Product Image Path or URL</label>
                <input
                  type="text"
                  value={editingCommodity.main_image || ''}
                  onChange={(e) => setEditingCommodity({ ...editingCommodity, main_image: e.target.value })}
                  placeholder="/images/products/bold-peanuts.jpg"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Short Description</label>
                <textarea
                  rows={2}
                  value={editingCommodity.short_description || ''}
                  onChange={(e) => setEditingCommodity({ ...editingCommodity, short_description: e.target.value })}
                  placeholder="Export specification, moisture specs, seed counts, packaging details..."
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0C2422]">
                  <input
                    type="checkbox"
                    checked={Boolean(editingCommodity.is_featured)}
                    onChange={(e) => setEditingCommodity({ ...editingCommodity, is_featured: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-brand-primary rounded"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0C2422]">
                  <input
                    type="checkbox"
                    checked={Boolean(editingCommodity.is_active !== 0)}
                    onChange={(e) => setEditingCommodity({ ...editingCommodity, is_active: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-brand-primary rounded"
                  />
                  <span>Active &amp; Export Ready</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCommodityModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md"
              >
                {saveLoading ? 'Saving...' : 'Save Commodity'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          GALLERY ITEM CREATE / EDIT MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {galleryModalOpen && editingGalleryItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveGalleryItem} className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-primary">Gallery &amp; Operations</span>
                <h3 className="text-xl font-display font-bold text-[#0C2422]">
                  {editingGalleryItem.id ? 'Edit Gallery Photo' : 'Add Facility or Operations Photo'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGalleryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Title / Caption</label>
                <input
                  type="text"
                  required
                  value={editingGalleryItem.title}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                  placeholder="e.g. Export Container Loading at Mundra Port"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Gallery Category</label>
                  <select
                    value={editingGalleryItem.category}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value })}
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Farm & Sourcing">Farm &amp; Sourcing</option>
                    <option value="Processing & Sorting">Processing &amp; Sorting</option>
                    <option value="Storage & Packaging">Storage &amp; Packaging</option>
                    <option value="Port & Shipping">Port &amp; Shipping</option>
                    <option value="Testing & Lab">Testing &amp; Lab</option>
                    <option value="Trade & Expo">Trade &amp; Expo</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Badge Tag</label>
                  <input
                    type="text"
                    value={editingGalleryItem.badge || ''}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, badge: e.target.value })}
                    placeholder="e.g. Buhler Sortex Clean"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Image URL or Path</label>
                <input
                  type="text"
                  required
                  value={editingGalleryItem.image}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, image: e.target.value })}
                  placeholder="/images/cargo-ship.jpg"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Location</label>
                  <input
                    type="text"
                    value={editingGalleryItem.location || ''}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, location: e.target.value })}
                    placeholder="Mundra Port, Gujarat"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Technical Specs Tag</label>
                  <input
                    type="text"
                    value={editingGalleryItem.specs || ''}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, specs: e.target.value })}
                    placeholder="Purity 99.5%+ • Lab Certified"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Description</label>
                <textarea
                  rows={2}
                  value={editingGalleryItem.description || ''}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, description: e.target.value })}
                  placeholder="Detailed narrative of this operation, facility, or dispatch standard..."
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setGalleryModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md"
              >
                {saveLoading ? 'Saving...' : 'Save Photo'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          FULL-SCREEN PHOTO LIGHTBOX MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {viewingGalleryPhoto && (
        <div 
          onClick={() => setViewingGalleryPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/10"
          >
            <button
              onClick={() => setViewingGalleryPhoto(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition shadow-lg cursor-pointer"
            >
              &times;
            </button>
            <div className="aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={viewingGalleryPhoto.image} 
                alt={viewingGalleryPhoto.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/infrastructure.jpg';
                }}
              />
            </div>
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-white/10 flex items-center justify-between text-white flex-wrap gap-3">
              <div>
                <h4 className="font-ui font-bold text-sm sm:text-base text-white">{viewingGalleryPhoto.title}</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{viewingGalleryPhoto.category || 'Operations Photo'}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const item = viewingGalleryPhoto;
                    setViewingGalleryPhoto(null);
                    handleOpenGalleryModal(item);
                  }}
                  className="px-4 py-2 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Photo Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingGalleryPhoto(null)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ CREATE / EDIT MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {faqModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveFaq} className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-primary">FAQ Knowledgebase</span>
                <h3 className="text-xl font-display font-bold text-[#0C2422]">
                  {editingFaq.id ? 'Edit FAQ' : 'Add New Question & Answer'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFaqModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Question Title</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  placeholder="e.g. Can one supplier ship grains, pulses, peanuts, and dairy ghee in a single container?"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Category Tag</label>
                <input
                  type="text"
                  value={editingFaq.category || 'general'}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  placeholder="e.g. Logistics, Packaging, Quality, Incoterms"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Comprehensive Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  placeholder="Provide a clear, detailed answer addressing foreign buyer questions..."
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0C2422]">
                  <input
                    type="checkbox"
                    checked={Boolean(editingFaq.is_active !== 0)}
                    onChange={(e) => setEditingFaq({ ...editingFaq, is_active: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-brand-primary rounded"
                  />
                  <span>Display on Website FAQ</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setFaqModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md"
              >
                {saveLoading ? 'Saving...' : 'Save FAQ'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          TESTIMONIAL CREATE / EDIT MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {testimonialModalOpen && editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveTestimonial} className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-primary">Client Feedback</span>
                <h3 className="text-xl font-display font-bold text-[#0C2422]">
                  {editingTestimonial.id ? 'Edit Testimonial' : 'Add Buyer Testimonial'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTestimonialModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Client Name</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.client_name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, client_name: e.target.value })}
                  placeholder="e.g. Tariq Al-Mansoor"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Company Name</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.company_name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company_name: e.target.value })}
                  placeholder="e.g. Al-Mansoor Foodstuff Trading LLC"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Country / Destination</label>
                <input
                  type="text"
                  value={editingTestimonial.country || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, country: e.target.value })}
                  placeholder="Dubai, UAE"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Rating (1 to 5 Stars)</label>
                <select
                  value={editingTestimonial.rating || 5}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Buyer Review / Quote</label>
                <textarea
                  rows={3}
                  required
                  value={editingTestimonial.content}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                  placeholder="Buyer remarks regarding product purity, container loading, and shipment documentation..."
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0C2422]">
                  <input
                    type="checkbox"
                    checked={Boolean(editingTestimonial.is_active !== 0)}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, is_active: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-brand-primary rounded"
                  />
                  <span>Active &amp; Published on Website</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setTestimonialModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md"
              >
                {saveLoading ? 'Saving...' : 'Save Review'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          TRACEABILITY BATCH CREATE / EDIT MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {batchModalOpen && editingBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveBatch} className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-primary">Traceability &amp; Container Lots</span>
                <h3 className="text-xl font-display font-bold text-[#0C2422]">
                  {editingBatch.id ? 'Edit Export Lot / Batch' : 'Add New Export Container Batch'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBatchModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Batch / Lot Code *</label>
                <input
                  type="text"
                  required
                  value={editingBatch.batch_code}
                  onChange={(e) => setEditingBatch({ ...editingBatch, batch_code: e.target.value })}
                  placeholder="e.g. LOT-2026-PN-889"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Commodity / Product *</label>
                <select
                  value={editingBatch.product_id}
                  onChange={(e) => setEditingBatch({ ...editingBatch, product_id: Number(e.target.value) })}
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  {commodities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.category_name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Origin Region</label>
                <input
                  type="text"
                  value={editingBatch.origin_region || ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, origin_region: e.target.value })}
                  placeholder="e.g. Saurashtra Groundnut Belt, Gujarat"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Container Number</label>
                <input
                  type="text"
                  value={editingBatch.container_number || ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, container_number: e.target.value })}
                  placeholder="e.g. MSCU-782190-4"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Port of Loading</label>
                <input
                  type="text"
                  value={editingBatch.port_of_loading || ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, port_of_loading: e.target.value })}
                  placeholder="e.g. Mundra Port (APSEZ)"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Inspection Status</label>
                <select
                  value={editingBatch.inspection_status || 'Passed Lab Audit'}
                  onChange={(e) => setEditingBatch({ ...editingBatch, inspection_status: e.target.value })}
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="Passed Lab Audit">Passed Lab Audit (Verified)</option>
                  <option value="Certified Export Quality">Certified Export Quality</option>
                  <option value="Under Inspection">Under Inspection</option>
                  <option value="Customs Bolt-Sealed">Customs Bolt-Sealed</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">COA / Certificate No.</label>
                <input
                  type="text"
                  value={editingBatch.certificate_of_analysis_no || ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, certificate_of_analysis_no: e.target.value })}
                  placeholder="e.g. COA-2026-A109"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Packing Type</label>
                <input
                  type="text"
                  value={editingBatch.packing_type || ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, packing_type: e.target.value })}
                  placeholder="e.g. 50 kg Jute Bags / 25 kg Vacuum PP"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Purity %</label>
                <input
                  type="text"
                  value={editingBatch.purity_percentage || ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, purity_percentage: e.target.value })}
                  placeholder="e.g. 99.5%"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Moisture %</label>
                <input
                  type="text"
                  value={editingBatch.moisture_percentage || ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, moisture_percentage: e.target.value })}
                  placeholder="e.g. 7.0% Max"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Harvest Date</label>
                <input
                  type="date"
                  value={editingBatch.harvest_date ? editingBatch.harvest_date.split('T')[0] : ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, harvest_date: e.target.value })}
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Processing Date</label>
                <input
                  type="date"
                  value={editingBatch.processing_date ? editingBatch.processing_date.split('T')[0] : ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, processing_date: e.target.value })}
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Packing Date</label>
                <input
                  type="date"
                  value={editingBatch.packing_date ? editingBatch.packing_date.split('T')[0] : ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, packing_date: e.target.value })}
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Shipment / Stage Status</label>
                <select
                  value={editingBatch.shipment_status || 'Customs Bolt-Sealed'}
                  onChange={(e) => setEditingBatch({ ...editingBatch, shipment_status: e.target.value })}
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="Customs Bolt-Sealed">Customs Bolt-Sealed</option>
                  <option value="Stuffed at Plant">Stuffed at Processing Plant</option>
                  <option value="Staged at Port">Staged at Port Terminal</option>
                  <option value="Vessel Dispatched">Vessel Dispatched / On Water</option>
                  <option value="Delivered">Delivered &amp; Discharged</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Public Quality Notes / Remarks</label>
                <textarea
                  rows={2}
                  value={editingBatch.public_notes || ''}
                  onChange={(e) => setEditingBatch({ ...editingBatch, public_notes: e.target.value })}
                  placeholder="Notes on aflatoxin testing, optical sort purity, container desiccant pouches..."
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0C2422]">
                  <input
                    type="checkbox"
                    checked={Boolean(editingBatch.is_active !== 0)}
                    onChange={(e) => setEditingBatch({ ...editingBatch, is_active: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-brand-primary rounded"
                  />
                  <span>Active &amp; Searchable in Buyer Traceability Portal</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setBatchModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md"
              >
                {saveLoading ? 'Saving...' : 'Save Export Lot'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          GATEWAY SEAPORT CREATE / EDIT MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {portModalOpen && editingPort && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSavePort} className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-primary">Logistics Hub</span>
                <h3 className="text-xl font-display font-bold text-[#0C2422]">
                  {editingPort.id ? 'Edit Seaport / Gateway' : 'Add Gateway Port'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPortModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Port Name *</label>
                <input
                  type="text"
                  required
                  value={editingPort.name}
                  onChange={(e) => setEditingPort({ ...editingPort, name: e.target.value })}
                  placeholder="e.g. Mundra Port (APSEZ)"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">UN/LOCODE Code *</label>
                  <input
                    type="text"
                    required
                    value={editingPort.code}
                    onChange={(e) => setEditingPort({ ...editingPort, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. INMUN"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Facility Type</label>
                  <select
                    value={editingPort.type || 'Sea Port'}
                    onChange={(e) => setEditingPort({ ...editingPort, type: e.target.value })}
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Sea Port">Deepwater Sea Port</option>
                    <option value="Inland Container Depot (ICD)">Inland Container Depot (ICD)</option>
                    <option value="Air Cargo Terminal">Air Cargo Terminal</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0C2422]">
                  <input
                    type="checkbox"
                    checked={Boolean(editingPort.is_major)}
                    onChange={(e) => setEditingPort({ ...editingPort, is_major: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-brand-primary rounded"
                  />
                  <span>Major Strategic Export Corridor (Highlighted)</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPortModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md"
              >
                {saveLoading ? 'Saving...' : 'Save Port'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          INFRASTRUCTURE & SORTEX FACILITY CREATE / EDIT MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {infraModalOpen && editingInfra && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveInfrastructure} className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-primary">Processing Asset</span>
                <h3 className="text-xl font-display font-bold text-[#0C2422]">
                  {editingInfra.id ? 'Edit Processing Facility' : 'Add Processing Facility'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInfraModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Facility Title *</label>
                <input
                  type="text"
                  required
                  value={editingInfra.title}
                  onChange={(e) => setEditingInfra({ ...editingInfra, title: e.target.value })}
                  placeholder="e.g. Sortex Optical Sorting &amp; Grading Line"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Category</label>
                  <select
                    value={editingInfra.category}
                    onChange={(e) => setEditingInfra({ ...editingInfra, category: e.target.value })}
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Processing Facility">Processing Facility</option>
                    <option value="Cold Storage">Cold Storage &amp; Warehousing</option>
                    <option value="HPLC Lab">HPLC &amp; Microbiological Lab</option>
                    <option value="Port Loading">Port Logistics &amp; Stuffing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Daily / Monthly Capacity</label>
                  <input
                    type="text"
                    value={editingInfra.capacity || ''}
                    onChange={(e) => setEditingInfra({ ...editingInfra, capacity: e.target.value })}
                    placeholder="e.g. 120 MT / Day Optical Sorting"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-bold text-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Plant Location</label>
                  <input
                    type="text"
                    value={editingInfra.location || ''}
                    onChange={(e) => setEditingInfra({ ...editingInfra, location: e.target.value })}
                    placeholder="e.g. Gondal GIDC, Rajkot Belt, Gujarat"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Sort Order</label>
                  <input
                    type="number"
                    value={editingInfra.sort_order ?? 0}
                    onChange={(e) => setEditingInfra({ ...editingInfra, sort_order: Number(e.target.value) })}
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Facility Image URL or Path</label>
                <input
                  type="text"
                  value={editingInfra.image || ''}
                  onChange={(e) => setEditingInfra({ ...editingInfra, image: e.target.value })}
                  placeholder="/images/infrastructure.jpg"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Operational Description</label>
                <textarea
                  rows={3}
                  value={editingInfra.description || ''}
                  onChange={(e) => setEditingInfra({ ...editingInfra, description: e.target.value })}
                  placeholder="Detail machine specifications, optical channels, de-stoning capabilities, purity guarantees..."
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0C2422]">
                  <input
                    type="checkbox"
                    checked={Boolean(editingInfra.is_active !== 0)}
                    onChange={(e) => setEditingInfra({ ...editingInfra, is_active: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-brand-primary rounded"
                  />
                  <span>Active &amp; Featured in Public Infrastructure Page</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setInfraModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md"
              >
                {saveLoading ? 'Saving...' : 'Save Facility'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          EXECUTIVE TEAM / TRADE DESK CREATE / EDIT MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {teamModalOpen && editingTeamMember && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveTeamMember} className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-primary">Leadership &amp; Trade Desks</span>
                <h3 className="text-xl font-display font-bold text-[#0C2422]">
                  {editingTeamMember.id ? 'Edit Executive Member' : 'Add Trade Desk Officer'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTeamModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingTeamMember.name}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                    placeholder="e.g. Rajesh Patel"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Position / Role *</label>
                  <input
                    type="text"
                    required
                    value={editingTeamMember.position}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, position: e.target.value })}
                    placeholder="e.g. Managing Partner &amp; Export Director"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Direct Email</label>
                  <input
                    type="email"
                    value={editingTeamMember.email || ''}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, email: e.target.value })}
                    placeholder="export@agrodairy.com"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Phone / WhatsApp / LinkedIn</label>
                  <input
                    type="text"
                    value={editingTeamMember.linkedin || ''}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, linkedin: e.target.value })}
                    placeholder="+91 98250 12345 or LinkedIn URL"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Profile Image URL / Initials</label>
                  <input
                    type="text"
                    value={editingTeamMember.image || ''}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, image: e.target.value })}
                    placeholder="/images/team/rajesh.jpg"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Display Sort Order</label>
                  <input
                    type="number"
                    value={editingTeamMember.sort_order ?? 0}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, sort_order: Number(e.target.value) })}
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Executive Bio &amp; Trade Background</label>
                <textarea
                  rows={3}
                  value={editingTeamMember.bio || ''}
                  onChange={(e) => setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })}
                  placeholder="20+ years steering international commodity exports, port execution, and quality systems..."
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0C2422]">
                  <input
                    type="checkbox"
                    checked={Boolean(editingTeamMember.is_active !== 0)}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, is_active: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-brand-primary rounded"
                  />
                  <span>Active &amp; Featured in About &amp; Trade Desks</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setTeamModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md"
              >
                {saveLoading ? 'Saving...' : 'Save Executive'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          CERTIFICATION & ACCREDITATION CREATE / EDIT MODAL
          ════════════════════════════════════════════════════════════════════════ */}
      {certModalOpen && editingCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveCertification} className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-primary">Statutory Accreditations</span>
                <h3 className="text-xl font-display font-bold text-[#0C2422]">
                  {editingCert.id ? 'Edit Accreditation' : 'Add Accreditation / License'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCertModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Accreditation / Certificate Title *</label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g. APEDA Export Registration Certificate"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Certificate / License Number</label>
                  <input
                    type="text"
                    value={editingCert.certificate_no || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, certificate_no: e.target.value })}
                    placeholder="e.g. APEDA/REG/2026/8841"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Issuing Authority / Body</label>
                  <input
                    type="text"
                    value={editingCert.issuing_body || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, issuing_body: e.target.value })}
                    placeholder="Govt. of India / SGS"
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Issue Date</label>
                  <input
                    type="date"
                    value={editingCert.issue_date ? editingCert.issue_date.split('T')[0] : ''}
                    onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Expiry Date</label>
                  <input
                    type="date"
                    value={editingCert.expiry_date ? editingCert.expiry_date.split('T')[0] : ''}
                    onChange={(e) => setEditingCert({ ...editingCert, expiry_date: e.target.value })}
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0C2422]">Status</label>
                  <select
                    value={editingCert.status || 'active'}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value })}
                    className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="active">Active &amp; In Good Standing</option>
                    <option value="pending_renewal">Pending Renewal</option>
                    <option value="lifetime">Lifetime Exemption</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Official Verification URL / Portal</label>
                <input
                  type="text"
                  value={editingCert.verification_url || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, verification_url: e.target.value })}
                  placeholder="https://apeda.gov.in/verify"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0C2422]">Description &amp; Authorized Scope</label>
                <textarea
                  rows={2}
                  value={editingCert.description || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                  placeholder="Authorized export scope: groundnuts, oilseeds, pulses, basmati grains, dairy ghee..."
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0C2422]">
                  <input
                    type="checkbox"
                    checked={Boolean(editingCert.is_active !== 0)}
                    onChange={(e) => setEditingCert({ ...editingCert, is_active: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-brand-primary rounded"
                  />
                  <span>Active &amp; Displayed on Public Website Credentials</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCertModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs shadow-md"
              >
                {saveLoading ? 'Saving...' : 'Save Certification'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          INQUIRY DOSSIER DETAILS MODAL (CRM)
          ════════════════════════════════════════════════════════════════════════ */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400">Inquiry Dossier</span>
                <h3 className="text-2xl font-black font-mono text-slate-900">{selectedInquiry.inquiry_number}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            {/* Buyer Contact Details */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Contact Person:</span>
                <span className="font-bold text-slate-800 text-sm">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Company:</span>
                <span className="font-bold text-slate-800 text-sm">{selectedInquiry.company || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-brand-primary font-bold underline">{selectedInquiry.email}</a>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Phone / WhatsApp:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.phone} {selectedInquiry.whatsapp && `(WA: ${selectedInquiry.whatsapp})`}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Country &amp; Port:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.country} {selectedInquiry.destination_port && `• ${selectedInquiry.destination_port}`}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Incoterm &amp; Target:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.incoterm} {selectedInquiry.target_price && `@ $${selectedInquiry.target_price}/MT`}</span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Buyer Specification / Message:</span>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message || 'No additional message provided.'}
              </div>
            </div>

            {/* Internal CRM Notes */}
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block mb-2">Staff CRM Communication Notes:</span>
              <div className="space-y-2 mb-3 max-h-40 overflow-y-auto custom-scrollbar">
                {selectedInquiry.notes && selectedInquiry.notes.length > 0 ? (
                  selectedInquiry.notes.map((n) => (
                    <div key={n.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                        <span className="font-semibold text-slate-600">{n.user_name || 'Staff'}</span>
                        <span>{new Date(n.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-700">{n.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No internal notes logged yet.</p>
                )}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add trade negotiation or status note..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button
                  type="submit"
                  className="bg-brand-primary text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0"
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          GLOBAL COMMAND PALETTE MODAL (CTRL+K / CMD+K)
          ════════════════════════════════════════════════════════════════════════ */}
      {commandPaletteOpen && (
        <div 
          onClick={() => setCommandPaletteOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 sm:px-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-slate-200 divide-y divide-slate-100"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 flex items-center gap-3 bg-[#F8FBFA]">
              <Search className="w-5 h-5 text-brand-primary shrink-0" />
              <input
                type="text"
                autoFocus
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                placeholder="Type to search sections, actions, or tools... (e.g. Hero, Commodity, Photo)"
                className="w-full bg-transparent text-sm sm:text-base font-sans text-[#0C2422] placeholder:text-slate-400 focus:outline-none"
              />
              <kbd className="hidden sm:inline-block text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-500 shadow-2xs">ESC to close</kbd>
            </div>

            {/* Command Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredCommandItems.length > 0 ? (
                filteredCommandItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        setCommandQuery('');
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#F0FAF8] text-left transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[#E6F7F5] group-hover:bg-brand-primary text-brand-primary group-hover:text-white flex items-center justify-center transition-all shrink-0 shadow-2xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="font-ui font-bold text-xs sm:text-sm text-[#0C2422] group-hover:text-brand-primary transition-colors truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 font-sans truncate">
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold group-hover:bg-white group-hover:text-brand-primary transition">
                          {item.category}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-xs font-semibold">No commands or sections found for "{commandQuery}"</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Try searching for "Hero", "Commodities", "Gallery", "RFQ", or "Settings"</p>
                </div>
              )}
            </div>

            {/* Quick Helper Footer */}
            <div className="px-5 py-3 bg-[#F8FBFA] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                <span>Agro Dairy Enterprise Command Center</span>
              </span>
              <span>20 Quick Actions Available</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
