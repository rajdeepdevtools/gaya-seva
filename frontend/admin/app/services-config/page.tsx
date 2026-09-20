'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Car, 
  Flame, 
  Hotel, 
  Utensils, 
  ShoppingBag,
  X
} from 'lucide-react';
import { ContentStore, ServiceConfigItem } from '../../lib/contentStore';

export default function AdminServicesConfigPage() {
  const [services, setServices] = useState<ServiceConfigItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceConfigItem | null>(null);

  // Form State
  const [category, setCategory] = useState<'PICK_DROP' | 'PANDIT' | 'STAY' | 'FOOD' | 'PUJA_KIT'>('PICK_DROP');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [priceText, setPriceText] = useState('');
  const [details, setDetails] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const loadServices = () => {
    setServices(ContentStore.getServices());
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAddModal = () => {
    setEditingService(null);
    setCategory('PICK_DROP');
    setTitle('');
    setSubtitle('');
    setPriceText('₹300');
    setDetails('');
    setPhone('+919876543201');
    setWhatsapp('919876543201');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (srv: ServiceConfigItem) => {
    setEditingService(srv);
    setCategory(srv.category);
    setTitle(srv.title);
    setSubtitle(srv.subtitle);
    setPriceText(srv.priceText);
    setDetails(srv.details);
    setPhone(srv.phone || '');
    setWhatsapp(srv.whatsapp || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (editingService) {
      ContentStore.updateService(editingService.id, {
        category,
        title,
        subtitle,
        priceText,
        details,
        phone,
        whatsapp,
      });
    } else {
      ContentStore.addService({
        category,
        title,
        subtitle,
        priceText,
        details,
        phone,
        whatsapp,
      });
    }

    setIsModalOpen(false);
    loadServices();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service entry?')) {
      ContentStore.deleteService(id);
      loadServices();
    }
  };

  const filteredServices = services.filter(
    (srv) => activeCategory === 'ALL' || srv.category === activeCategory
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#4A2E1A]">Service Catalog & Fares CRUD</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage Pick & Drop routes, Pandit directory listings, Stay fares, and Puja Kits.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Service Listing
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex bg-white p-2 rounded-2xl border border-gray-200 shadow-sm text-xs font-bold gap-2 overflow-x-auto">
        {['ALL', 'PICK_DROP', 'PANDIT', 'STAY', 'FOOD', 'PUJA_KIT'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeCategory === cat ? 'bg-[#4A2E1A] text-white shadow-sm' : 'text-gray-700 hover:text-[#4A2E1A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredServices.map((srv) => (
          <div key={srv.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#F58220] transition-colors">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800">
                {srv.category}
              </span>
              <h3 className="font-bold text-base text-[#4A2E1A]">{srv.title}</h3>
              <p className="text-xs font-medium text-[#F58220]">{srv.subtitle}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{srv.details}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="font-serif font-bold text-sm text-[#4A2E1A]">{srv.priceText}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(srv)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(srv.id)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="font-serif font-bold text-lg text-[#4A2E1A]">
                {editingService ? 'Edit Service Entry' : 'Add New Service Entry'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#4A2E1A] block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 font-medium"
                >
                  <option value="PICK_DROP">PICK_DROP (Taxi / Pick & Drop Transfer)</option>
                  <option value="PANDIT">PANDIT (Verified Pandit Service)</option>
                  <option value="STAY">STAY (Hotel / Dharamshala)</option>
                  <option value="FOOD">FOOD (Satvik Food / Meal)</option>
                  <option value="PUJA_KIT">PUJA_KIT (Pinda Daan Kit / Tilkut)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#4A2E1A] block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gaya Station → Vishnupad Temple"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A2E1A] block mb-1">Subtitle / Vehicle / Experience</label>
                <input
                  type="text"
                  placeholder="e.g. AC Sedan Cab • 20+ Yrs Experience"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A2E1A] block mb-1">Price / Estimate Text</label>
                <input
                  type="text"
                  placeholder="e.g. ₹250 - ₹350 or GayaSeva Verified"
                  value={priceText}
                  onChange={(e) => setPriceText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A2E1A] block mb-1">Details & Description</label>
                <textarea
                  rows={2}
                  placeholder="Service details..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#4A2E1A] block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+919876543201"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#4A2E1A] block mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    placeholder="919876543201"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F58220] hover:bg-[#E07210] text-white font-bold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
