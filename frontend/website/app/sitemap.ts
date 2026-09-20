import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gayaseva.org';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/guide',
    '/guide/vishnupad',
    '/guide/falgu-river',
    '/guide/bodh-gaya',
    '/guide/akshayavat',
    '/guide/pretshila',
    '/guide/ramshila',
    '/guide/sitakund',
    '/travel',
    '/stay',
    '/help/lost-and-found',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
