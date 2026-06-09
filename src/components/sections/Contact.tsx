'use client';

import { Section } from '@/components/common/Section';
import { ContactForm } from '@/components/contact/ContactForm';
import { useTranslation } from '@/lib/i18n/useTranslation';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <Section id="contact" title={t('contact.title')} className="py-20 px-4">
      <div className="mt-12 max-w-3xl mx-auto">
        <p className="text-center text-gray-300 mb-8">
          {t('contact.description')}
        </p>
        <ContactForm className="glass-effect rounded-2xl p-6 md:p-8 border border-white/10" />
      </div>
    </Section>
  );
};
