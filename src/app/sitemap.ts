import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tumidev.com';

  return [
    {
      url: baseUrl,
      priority: 1,
    },
  ];
}
