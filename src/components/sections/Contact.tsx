'use client';

import { Section } from '@/components/common/Section';
import { ContactForm } from '@/components/contact/ContactForm';
import { useTranslation } from '@/lib/i18n/useTranslation';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="contact"
      title={t('contact.title')}
      className="py-16 md:py-20 lg:py-24 px-4"
    >
      <div className="mt-8 md:mt-12 max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-center text-gray-300 mb-6 md:mb-8 text-sm md:text-base max-ch-65 mx-auto">
          {t('contact.description')}
        </p>
        <ContactForm className="glass-effect rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10" />
      </div>
    </Section>
  );
};
