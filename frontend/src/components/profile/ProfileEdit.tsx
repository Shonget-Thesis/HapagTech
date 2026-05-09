import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from "../../hooks/auth/useauth";
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileEditModalProps, DietaryPreferences } from '../../utils/types';

const dietaryOptions = [
  { key: 'is_vegetarian', label: 'Vegetarian' },
  { key: 'is_vegan', label: 'Vegan' },
  { key: 'is_pescatarian', label: 'Pescatarian' },
  { key: 'is_flexitarian', label: 'Flexitarian' },
  { key: 'is_paleo', label: 'Paleolithic' },
  { key: 'is_ketogenic', label: 'Ketogenic' },
  { key: 'is_halal', label: 'Halal' },
  { key: 'is_kosher', label: 'Kosher' },
  { key: 'is_fruitarian', label: 'Fruitarian' },
  { key: 'is_gluten_free', label: 'Gluten-Free' },
  { key: 'is_dairy_free', label: 'Dairy-free' },
  { key: 'is_organic', label: 'Organic' },
];

const defaultDietaryPreferences: DietaryPreferences = {
  is_vegetarian: false,
  is_vegan: false,
  is_pescatarian: false,
  is_flexitarian: false,
  is_paleo: false,
  is_ketogenic: false,
  is_halal: false,
  is_kosher: false,
  is_fruitarian: false,
  is_gluten_free: false,
  is_dairy_free: false,
  is_organic: false
};

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, initialData }) => {
  const { updateProfile, updateDietaryPreferences, updateProfilePicture, refreshUserData } = useAuthStore();
  const [formData, setFormData] = useState({
    full_name: initialData?.full_name || '',
    email: initialData?.email || '',
    phone_number: initialData?.phone_number || '',
  });
  const [dietaryPreferences, setDietaryPreferences] = useState<DietaryPreferences>({
    ...defaultDietaryPreferences,
    ...(initialData?.dietaryPreferences || {})
  });
  const [previewImage, setPreviewImage] = useState<string | undefined>(initialData?.profile_picture);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: initialData.full_name || '',
        email: initialData.email || '',
        phone_number: initialData.phone_number || '',
      });
      setPreviewImage(initialData.profile_picture);
      setDietaryPreferences({
        is_vegetarian: initialData.dietaryPreferences?.is_vegetarian || false,
        is_vegan: initialData.dietaryPreferences?.is_vegan || false,
        is_pescatarian: initialData.dietaryPreferences?.is_pescatarian || false,
        is_flexitarian: initialData.dietaryPreferences?.is_flexitarian || false,
        is_paleo: initialData.dietaryPreferences?.is_paleo || false,
        is_ketogenic: initialData.dietaryPreferences?.is_ketogenic || false,
        is_halal: initialData.dietaryPreferences?.is_halal || false,
        is_kosher: initialData.dietaryPreferences?.is_kosher || false,
        is_fruitarian: initialData.dietaryPreferences?.is_fruitarian || false,
        is_gluten_free: initialData.dietaryPreferences?.is_gluten_free || false,
        is_dairy_free: initialData.dietaryPreferences?.is_dairy_free || false,
        is_organic: initialData.dietaryPreferences?.is_organic || false
      });
      setUpdateError(null);
      setErrors({});
      setTouched({});
      setNewImageFile(null);
    }
  }, [isOpen, initialData]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'full_name' && !value.trim()) error = 'Full name is required';
    if (name === 'email') {
      if (!value.trim()) error = 'Email address is required';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Please enter a valid email address';
    }
    if (name === 'phone_number' && !value.trim()) error = 'Phone number is required';
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleDietaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDietaryPreferences(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setUpdateError('Image size should be less than 5MB');
        return;
      }
      setNewImageFile(file);
      setUpdateError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setPreviewImage(event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const allTouched = { full_name: true, email: true, phone_number: true };
    setTouched(allTouched);
    const newErrors: { [key: string]: string } = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to first error
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      if (newImageFile) await updateProfilePicture(newImageFile);
      await updateProfile({ full_name: formData.full_name, email: formData.email, phone_number: formData.phone_number });
      await updateDietaryPreferences(dietaryPreferences);
      await refreshUserData();
      onClose();
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : 'Failed to update profile. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const getFieldState = (name: string) => {
    if (errors[name] && touched[name]) return 'error';
    if (!errors[name] && touched[name] && formData[name as keyof typeof formData]) return 'success';
    return 'default';
  };

  const inputClass = (name: string) => {
    const state = getFieldState(name);
    const base = 'mt-2 w-full rounded-2xl border-2 px-4 py-3 text-sm text-[#2D2D2D] outline-none transition-all duration-200 placeholder:text-[#2D2D2D]/35';
    if (state === 'error') return `${base} border-[#EC5A4A] bg-[#FFF5F4] focus:border-[#EC5A4A] focus:ring-3 focus:ring-[#EC5A4A]/10`;
    if (state === 'success') return `${base} border-[#2ECC71] bg-[#F4FFF9] focus:border-[#2ECC71] focus:ring-3 focus:ring-[#2ECC71]/10`;
    return `${base} border-[#D8B57C] bg-[#FFF7EA] focus:border-[#FF5300] focus:ring-3 focus:ring-[#FF5300]/10`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 lg:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_rgba(45,45,45,0.22)]"
            style={{ maxHeight: 'min(92vh, 860px)' }}
          >
            {/* Header — fixed, never scrolls */}
            <div className="flex shrink-0 flex-col gap-3 border-b border-[#F1D9AA] bg-[#2D2D2D] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
              <div className="min-w-0">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-[#FF5300]">Edit profile</h2>
                <p className="mt-0.5 text-md text-[#F3E8CC]/85 sm:text-lg">Update your details, photo, and dietary settings.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 self-start rounded-full bg-[#FF5300] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e14a00] sm:self-auto"
              >
                ✕ Close
              </button>
            </div>

            {/* Scrollable body */}
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-hidden"
              style={{ scrollbarGutter: 'stable' }}
            >
              <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-7 xl:grid-cols-[340px_minmax(0,1fr)]">

                {/* ── Left panel: avatar + tips ── */}
                <div className="flex flex-col gap-4">
                  {/* Avatar card */}
                  <div className="flex flex-col items-center gap-4 rounded-[22px] border border-[#F1D9AA] bg-[#F3E8CC] p-5">
                    {/* On mobile, avatar + upload sit side-by-side to save vertical space */}
                    <div className="flex w-full items-center gap-5 lg:flex-col lg:items-center">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-[#FFAE00] bg-white shadow-inner sm:h-28 sm:w-28 lg:h-36 lg:w-36">
                        {previewImage ? (
                          <img src={previewImage} alt="Profile preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-[#2D2D2D]/30 lg:text-5xl">?</div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-2 lg:w-full lg:flex-none">
                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#D8B57C] bg-white px-4 py-2.5 text-sm font-semibold text-[#2D2D2D] transition hover:border-[#FF5300] hover:bg-[#FFF2E6] active:scale-[0.98] lg:py-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                          Upload photo
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                        <p className="text-xs leading-5 text-[#2D2D2D]/60 lg:text-sm">JPG, PNG · Max 5MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick tips — hidden on mobile to save space, shown md+ */}
                  <div className="hidden rounded-[22px] border border-[#F1D9AA] bg-white p-5 md:block">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2D2D2D]/60">Quick tips</h3>
                    <ul className="mt-3 space-y-2 text-sm text-[#2D2D2D]/75">
                      <li className="flex items-start gap-2"><span className="mt-0.5 text-[#FF5300]">•</span>Keep your profile picture bright and simple.</li>
                      <li className="flex items-start gap-2"><span className="mt-0.5 text-[#FF5300]">•</span>Update dietary preferences to improve personalized recommendations.</li>
                    </ul>
                  </div>
                </div>

                {/* ── Right panel: fields + dietary ── */}
                <div className="space-y-5">

                  {/* Personal info card */}
                  <div className="rounded-[22px] border border-[#F1D9AA] bg-white p-5 shadow-sm sm:p-6">
                    <h3 className="mb-4 text-base font-semibold text-[#2D2D2D]">Personal information</h3>
                    <div className="grid gap-4">

                      {/* Full name */}
                      <div>
                        <label className="block text-sm font-semibold text-[#2D2D2D]">
                          Full name <span className="text-[#EC5A4A]">*</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={inputClass('full_name')}
                          placeholder="Enter your full name"
                          autoComplete="name"
                        />
                        <AnimatePresence>
                          {errors.full_name && touched.full_name && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#EC5A4A]"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                              {errors.full_name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-[#2D2D2D]">
                          Email address <span className="text-[#EC5A4A]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={inputClass('email')}
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                        <AnimatePresence>
                          {errors.email && touched.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#EC5A4A]"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-[#2D2D2D]">
                          Phone number <span className="text-[#EC5A4A]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={inputClass('phone_number')}
                          placeholder="Enter your phone number"
                          autoComplete="tel"
                        />
                        <AnimatePresence>
                          {errors.phone_number && touched.phone_number && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#EC5A4A]"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                              {errors.phone_number}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </div>

                  {/* Dietary preferences card */}
                  <div className="rounded-[22px] border border-[#F1D9AA] bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-[#2D2D2D]">Dietary preferences</h3>
                        <p className="mt-0.5 text-sm text-[#2D2D2D]/60">Choose tags that match your lifestyle.</p>
                      </div>
                      <span className="rounded-full bg-[#FFAE00]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2D2D2D]">Personalized</span>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-2">
                      {dietaryOptions.map((option) => {
                        const checked = dietaryPreferences[option.key as keyof DietaryPreferences] || false;
                        return (
                          <label
                            key={option.key}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 text-sm font-medium transition-all duration-150 active:scale-[0.98] ${
                              checked
                                ? 'border-[#FF5300] bg-[#FFF2E6] text-[#FF5300]'
                                : 'border-[#E8D9BA] bg-[#FFF7EA] text-[#2D2D2D] hover:border-[#FF5300]/40 hover:bg-[#FFF4EC]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              name={option.key}
                              checked={checked}
                              onChange={handleDietaryChange}
                              className="sr-only"
                            />
                            {/* Custom checkbox */}
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors duration-150 ${
                              checked ? 'border-[#FF5300] bg-[#FF5300]' : 'border-[#C6B284] bg-white'
                            }`}>
                              {checked && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              )}
                            </span>
                            <span className="leading-tight">
                              {option.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* Footer — inside scroll area, sticks visually at the bottom */}
              <div className="sticky bottom-0 z-10 border-t border-[#F1D9AA] bg-white/95 px-5 py-4 backdrop-blur-sm sm:px-6">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-h-[20px]">
                    <AnimatePresence>
                      {updateError && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-sm font-medium text-[#EC5A4A]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                          {updateError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex gap-3 sm:shrink-0">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 rounded-2xl border-2 border-[#2D2D2D]/15 bg-white px-4 py-2 text-sm font-semibold text-[#2D2D2D] transition hover:border-[#2D2D2D]/30 hover:bg-[#2D2D2D]/5 active:scale-[0.98] sm:flex-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={updateLoading}
                      className="flex-1 rounded-2xl bg-[#FF5300] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-[#e14a00] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                    >
                      {updateLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3-3-3h4z"/></svg>
                          Saving…
                        </span>
                      ) : 'Save changes'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileEditModal;