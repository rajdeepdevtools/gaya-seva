'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  MapPin, 
  Search, 
  Navigation, 
  Check, 
  X, 
  Building, 
  ShoppingBag,
  Clock
} from 'lucide-react';
import { ContentStore, SacredPlace } from '../../lib/contentStore';

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState<SacredPlace[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<SacredPlace | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'TEERTH' | 'MALL' | 'MARKET' | 'TRANSIT' | 'FOOD'>('TEERTH');
  const [timing, setTiming] = useState('5:00 AM - 9:00 PM');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('24.7865');
  const [lng, setLng] = useState('85.0080');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);

  const loadPlaces = () => {
    setPlaces(ContentStore.getPlaces());
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  const handleOpenAddModal = () => {
    setEditingPlace(null);
    setTitle('');
    setSlug('');
    setCategory('TEERTH');
    setTiming('5:00 AM - 9:00 PM');
    setDescription('');
    setLat('24.7865');
    setLng('85.0080');
    setImageUrl('');
    setIsFeatured(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (place: SacredPlace) => {
    setEditingPlace(place);
    setTitle(place.title);
    setSlug(place.slug);
    setCategory(place.category);
    setTiming(place.timing);
    setDescription(place.description);
    setLat(place.lat);
    setLng(place.lng);
    setImageUrl(place.imageUrl || '');
    setIsFeatured(place.isFeatured);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingPlace) {
      ContentStore.updatePlace(editingPlace.id, {
        title,
        slug: generatedSlug,
        category,
        timing,
        description,
        lat,
        lng,
        imageUrl,
        isFeatured,
      });
    } else {
      ContentStore.addPlace({
        title,
        slug: generatedSlug,
        category,
        timing,
        description,
        lat,
        lng,
        imageUrl,
        isFeatured,
      });
    }

    setIsModalOpen(false);
    loadPlaces();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this place?')) {
      ContentStore.deletePlace(id);
      loadPlaces();
    }
  };

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || place.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#F58220]" />
            <h1 className="text-2xl font-serif font-bold text-[#4A2E1A]">Sacred Places & Markets CRUD</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Add, update, or remove teerth locations, malls, markets, and 1-Click GPS coordinates across Gaya Ji.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-[#F58220] hover:bg-[#E07210] text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Place
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search places by name or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#F58220]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        </div>

        <div className="flex bg-[#F8F6EF] p-1 rounded-xl text-xs font-bold gap-1 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'TEERTH', 'MALL', 'MARKET', 'TRANSIT', 'FOOD'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                categoryFilter === cat ? 'bg-[#4A2E1A] text-white shadow-sm' : 'text-gray-700 hover:text-[#4A2E1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Places Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => (
          <div key={place.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#F58220] transition-colors">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#F58220]/10 text-[#F58220]">
                  {place.category}
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded flex items-center gap-1 hover:bg-emerald-100"
                >
                  <Navigation className="w-3 h-3" /> GPS ({place.lat}, {place.lng})
                </a>
              </div>

              <h3 className="font-serif font-bold text-lg text-[#4A2E1A]">{place.title}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> {place.timing}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">{place.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className={`text-[10px] font-bold ${place.isFeatured ? 'text-amber-600' : 'text-gray-400'}`}>
                {place.isFeatured ? '⭐ Featured' : 'Standard'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(place)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(place.id)}
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
                {editingPlace ? 'Edit Sacred Place / Location' : 'Add New Sacred Place / Location'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#4A2E1A] block mb-1">Place Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vishnupad Temple"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#4A2E1A] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 font-medium"
                  >
                    <option value="TEERTH">TEERTH (Sacred Teerth Spot)</option>
                    <option value="MALL">MALL (Shopping Mall)</option>
                    <option value="MARKET">MARKET (Local Market)</option>
                    <option value="TRANSIT">TRANSIT (Station / Airport)</option>
                    <option value="FOOD">FOOD (Bhojanalaya)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#4A2E1A] block mb-1">Operating Hours / Timing</label>
                  <input
                    type="text"
                    placeholder="e.g. 5:00 AM - 9:00 PM"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#4A2E1A] block mb-1">Description & Puranic Significance</label>
                <textarea
                  rows={3}
                  placeholder="Details about place, history, rites performed..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#4A2E1A] block mb-1">GPS Latitude (e.g. 24.7865)</label>
                  <input
                    type="text"
                    required
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#4A2E1A] block mb-1">GPS Longitude (e.g. 85.0080)</label>
                  <input
                    type="text"
                    required
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#4A2E1A] block mb-1">Photo Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#4A2E1A]">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-[#F58220] focus:ring-[#F58220]"
                  />
                  <span>Show as Featured Place on Home Page</span>
                </label>
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
                  Save Place
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
