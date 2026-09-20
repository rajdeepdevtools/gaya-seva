import { ContentStore, SacredPlace, ServiceConfigItem, SliderBanner } from './contentStore';

export interface AIResponseCard {
  text: string;
  category?: string;
  links?: { label: string; url: string; icon?: string }[];
  phone?: string;
  whatsapp?: string;
  gpsQuery?: string;
}

// Extensive Gaya Ji, Bodh Gaya & Nearby Teerth Knowledge Base
const KNOWLEDGE_TOPICS = [
  {
    keywords: ['vishnupad', 'footprint', 'charan', 'basalt', 'vayu purana'],
    title: 'Vishnupad Temple & Lord Vishnu Footprint',
    answer: 'Vishnupad Temple in Gaya Ji houses the 40-cm divine footprint of Lord Vishnu stamped on solid basalt rock. According to Vayu Purana, Lord Vishnu placed his foot on Gayasur’s chest to grant eternal salvation.\n\n• Timings: 5:00 AM to 9:00 PM daily\n• Main Rites: Pinda Daan, Tripindi Shradh, Narayan Bali\n• Location: Chandurchoti, Vishnupad Devghat Area, Gaya Ji',
    links: [
      { label: 'View Vishnupad Guide', url: '/gaya-guide/vishnupad' },
      { label: 'Book Vishnupad Taxi', url: '/pick-drop' },
    ],
    gpsQuery: '24.7865,85.0080',
    phone: '+919876543200',
    whatsapp: '919876543200',
  },
  {
    keywords: ['falgu', 'river', 'sita', 'curse', 'antarsalila', 'aarti', 'sand'],
    title: 'Holy Falgu River & Goddess Sita’s Curse',
    answer: 'Falgu River is the sacred river where Goddess Sita offered sand Pindas to King Dasharatha. Cursed by Goddess Sita, the river flows beneath the sandy bed (Antarsalila).\n\n• Rites: Digging dry sand to draw holy water for Pinda Daan.\n• Evening Falgu Aarti: 6:30 PM daily at Devghat.\n• Open 24 Hours.',
    links: [
      { label: 'View Falgu River Guide', url: '/gaya-guide/falgu-river' },
      { label: 'Book Devghat Pandit', url: '/pandit' },
    ],
    gpsQuery: '24.7880,85.0120',
  },
  {
    keywords: ['bodh gaya', 'buddha', 'mahabodhi', 'enlightenment', 'tree'],
    title: 'Bodh Gaya Mahabodhi Temple & Bodhi Tree',
    answer: 'Bodh Gaya is a UNESCO World Heritage site located 12 km from Gaya Ji city. It is the holy sanctuary where Prince Siddhartha attained supreme Buddha Enlightenment under the Mahabodhi Tree.\n\n• Timings: 5:00 AM to 9:00 PM\n• Key Spots: Mahabodhi Tree, 80-ft Great Buddha Statue, Thai Monastery, Tibetan Market\n• Cab Fare from Station: ₹500 - ₹750',
    links: [
      { label: 'View Bodh Gaya Guide', url: '/gaya-guide/bodh-gaya' },
      { label: 'Book Bodh Gaya Cab', url: '/pick-drop' },
    ],
    gpsQuery: '24.6960,84.9915',
    phone: '+919876543201',
    whatsapp: '919876543201',
  },
  {
    keywords: ['pinda daan', 'pind', 'shradh', 'ancestor', 'pitru', 'moksha'],
    title: 'Pinda Daan Ritual Process & Verification',
    answer: 'Pinda Daan in Gaya Ji releases 21 generations of departed ancestors into Pitru Loka. It involves rice flour & sesame oblation balls, kusha grass, holy Falgu water, and final sealing under Akshayavat banyan tree.\n\n• Best Fortnight: Pitru Paksha (Lunar 16 days)\n• Main Vedis: Vishnupad, Falgu Devghat, Akshayavat, Pretshila',
    links: [
      { label: 'Find Verified Pandits', url: '/pandit' },
      { label: 'Order Samagri Kit', url: '/puja-material' },
    ],
    phone: '+919876543210',
    whatsapp: '919876543210',
  },
  {
    keywords: ['tilkut', 'sweets', 'ramna', 'shopping', 'anarsa', 'market', 'mall'],
    title: 'Famous Gaya Tilkut, Sweets & Malls',
    answer: 'Gaya Ji is world-famous for organic sesame Tilkut made with Jaggery or Sugar at Ramna Road Tilkut Bazaar.\n\n• Ramna Road Tilkut Market: World famous fresh Tilkut & Anarsa\n• MGB Food Mall (GB Road): Shopping, food court & cinema\n• Tibetan Refugee Market (Bodh Gaya): Handicrafts & winter woolens',
    links: [
      { label: 'Order Tilkut & Samagri', url: '/puja-material' },
    ],
    gpsQuery: '24.7980,85.0050',
  },
  {
    keywords: ['emergency', 'police', 'hospital', 'doctor', 'help', 'lost', 'ambulance'],
    title: '24/7 Gaya Emergency & Medical Helplines',
    answer: 'GayaSeva Emergency Support for Yatris:\n\n• Medical Emergency: 108\n• Police Control: 112\n• Railway Inquiry (GAYA Junction): 139\n• ANMMCH Government Medical Hospital: Station Road, Gaya\n• 24/7 Yatri Support: +91 98765 43200',
    links: [
      { label: 'Open Emergency Center', url: '/help' },
      { label: 'Lost & Found Portal', url: '/help/lost-and-found' },
    ],
    phone: '+919876543200',
    whatsapp: '919876543200',
  },
  {
    keywords: ['itinerary', 'trip', 'plan', '1 day', '2 day', 'schedule', 'gaya visit'],
    title: 'Custom 1-Day & 2-Day Gaya Ji Trip Plan',
    answer: 'Recommended 1-Day Teerth Plan:\n• Morning 6:00 AM: Holy Falgu River Pinda Daan & Devghat bath\n• 8:30 AM: Vishnupad Temple Darshan & Darshan\n• 11:00 AM: Akshayavat Banyan Tree Final Oblations\n• 1:00 PM: Satvik Pure Veg Bhojanalaya Lunch\n• Afternoon 3:00 PM: Bodh Gaya Mahabodhi Temple & Great Buddha Statue Visit',
    links: [
      { label: 'Open Trip Planner Tool', url: '/my-trip' },
    ],
  },
];

export class AIKnowledgeEngine {
  static queryAssistant(userQuery: string): AIResponseCard {
    const q = userQuery.toLowerCase().trim();

    // 1. Search Dynamic ContentStore Places
    const dynamicPlaces = ContentStore.getPlaces();
    const matchedPlace = dynamicPlaces.find(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    );

    if (matchedPlace) {
      return {
        text: `📍 **${matchedPlace.title}** (${matchedPlace.category})\n\n${matchedPlace.description}\n\n• **Timings/Hours**: ${matchedPlace.timing}\n• **Category**: ${matchedPlace.category}`,
        links: [
          { label: `View ${matchedPlace.title} Details`, url: `/gaya-guide/${matchedPlace.slug}` },
          { label: 'Book Pick & Drop Cab', url: '/pick-drop' },
        ],
        gpsQuery: `${matchedPlace.lat},${matchedPlace.lng}`,
        phone: '+919876543201',
        whatsapp: '919876543201',
      };
    }

    // 2. Search Dynamic ContentStore Services
    const dynamicServices = ContentStore.getServices();
    const matchedService = dynamicServices.find(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.details.toLowerCase().includes(q)
    );

    if (matchedService) {
      return {
        text: `🚕 **${matchedService.title}**\n\n${matchedService.details}\n\n• **Estimate / Fare**: ${matchedService.priceText}\n• **Category**: ${matchedService.subtitle}`,
        links: [
          { label: 'Book Service Now', url: '/pick-drop' },
        ],
        phone: matchedService.phone || '+919876543201',
        whatsapp: matchedService.whatsapp || '919876543201',
      };
    }

    // 3. Search Static Knowledge Base Topics
    for (const topic of KNOWLEDGE_TOPICS) {
      if (topic.keywords.some((kw) => q.includes(kw))) {
        return {
          text: `🙏 **${topic.title}**\n\n${topic.answer}`,
          links: topic.links,
          gpsQuery: topic.gpsQuery,
          phone: topic.phone,
          whatsapp: topic.whatsapp,
        };
      }
    }

    // 4. Fallback Comprehensive Dynamic Knowledge Synthesis
    return {
      text: `GayaJi Assistant Knowledge Base Synthesis:\n\nMain services and sacred places active in Gaya Ji:\n\n1. **Pick & Drop Taxis**: Gaya Junction Station to Vishnupad (₹250-₹350), Station to Bodh Gaya (₹500-₹750), Airport Transfer (₹600-₹900).\n2. **Verified Pandits**: Shastri Ji & Tiwari Ji for Pinda Daan rites at Falgu Devghat & Vishnupad.\n3. **Sacred Places**: Vishnupad Temple (5 AM - 9 PM), Falgu River Devghat (24 Hrs), Bodh Gaya Mahabodhi (5 AM - 9 PM).\n4. **Satvik Food & Tilkut**: Pure No-Onion Garlic Thali & Ramna Road Original Tilkut.\n\nAapko inme se kiske baare me vistar se jankari chahiye?`,
      links: [
        { label: 'Explore Pick & Drop', url: '/pick-drop' },
        { label: 'Find Verified Pandits', url: '/pandit' },
        { label: 'View Gaya Guide', url: '/gaya-guide' },
        { label: 'Emergency Support', url: '/help' },
      ],
      phone: '+919876543200',
      whatsapp: '919876543200',
    };
  }
}
