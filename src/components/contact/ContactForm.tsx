'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { announceToScreenReader } = useAdvancedAccessibility();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('contact.form.emailInvalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.form.required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.required');
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      announceToScreenReader('Formulario contiene errores. Por favor, revisa los campos marcados.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - replace with actual implementation
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        announceToScreenReader(t('contact.form.success'));
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      announceToScreenReader(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = (fieldName: keyof FormErrors) => `
    w-full px-4 py-3 rounded-lg border-2 transition-colors
    ${errors[fieldName] 
      ? 'border-red-500 focus:border-red-600' 
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
    }
    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      noValidate
    >
      {/* Name Field */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('contact.form.name')} *
        </label>
        <input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={inputClassName('name')}
          disabled={isSubmitting}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
          autoComplete="name"
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('contact.form.email')} *
        </label>
        <input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={inputClassName('email')}
          disabled={isSubmitting}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          autoComplete="email"
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('contact.form.subject')} *
        </label>
        <input
          id="contact-subject"
          type="text"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          className={inputClassName('subject')}
          disabled={isSubmitting}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          aria-invalid={!!errors.subject}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('contact.form.message')} *
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className={`${inputClassName('message')} resize-vertical`}
          disabled={isSubmitting}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          placeholder={t('contact.form.message')}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 disabled:cursor-not-allowed"
        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        aria-describedby="submit-status"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{t('contact.form.sending')}</span>
          </div>
        ) : (
          t('contact.form.send')
        )}
      </motion.button>

      {/* Status Messages */}
      {submitStatus !== 'idle' && (
        <motion.div
          id="submit-status"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            submitStatus === 'success'
              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center space-x-2">
            {submitStatus === 'success' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>
              {submitStatus === 'success' ? t('contact.form.success') : t('contact.form.error')}
            </span>
          </div>
        </motion.div>
      )}
    </motion.form>
  );
};

export default ContactForm;
