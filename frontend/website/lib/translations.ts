export type Language = 'hi' | 'en';

export interface Translations {
  // Top bar & Navbar
  topBarWelcome: string;
  brandSubtag: string;
  navHome: string;
  navServices: string;
  navGayaGuide: string;
  navAiAssistant: string;
  navHelp: string;
  navLogin: string;
  navRegister: string;
  navGetStarted: string;

  // Dropdown services
  navPickDrop: string;
  navPindDaanPandits: string;
  navStaysHotels: string;
  navSatvikFood: string;
  navPujaMaterial: string;

  // Dropdown Gaya Guide
  navAboutGayaJi: string;
  navPitruPakshaGuide: string;
  navSacredFalguRiver: string;
  navGpsNavigation: string;
  navGayaMallsMarkets: string;
  navSafetyGuidelines: string;

  // Quick Action Buttons
  btnCallNow: string;
  btnWhatsApp: string;
  btnBookRide: string;
  btnSearchPandits: string;
  btnViewListings: string;
  btnGetDirections: string;
  btnExploreMore: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroSubtitle: string;

  // Search Tabs
  tabPickDrop: string;
  tabPandits: string;
  tabStays: string;
  tabFood: string;
  tabTilkut: string;
  tabPlaces: string;
  searchPlaceholder: string;
  btnSearch: string;

  // Mobile Bottom Nav
  mobHome: string;
  mobServices: string;
  mobAi: string;
  mobHelp: string;
  mobAccount: string;

  // 30 Homepage Sections Headlines
  sec1Notice: string;
  sec2Hero: string;
  sec3Banner: string;
  sec4QuickPills: string;
  sec5HistoryTitle: string;
  sec5HistorySubtitle: string;
  sec6PitruPakshaTitle: string;
  sec6PitruPakshaSubtitle: string;
  sec7FalguTitle: string;
  sec7FalguSubtitle: string;
  sec8GpsTitle: string;
  sec8GpsSubtitle: string;
  sec9PlacesTitle: string;
  sec9PlacesSubtitle: string;
  sec10ShoppingTitle: string;
  sec10ShoppingSubtitle: string;
  sec11FareTitle: string;
  sec11FareSubtitle: string;
  sec12PanditTitle: string;
  sec12PanditSubtitle: string;
  sec13HotelTitle: string;
  sec13HotelSubtitle: string;
  sec14FoodTitle: string;
  sec14FoodSubtitle: string;
  sec15TilkutTitle: string;
  sec15TilkutSubtitle: string;
  sec16AiTitle: string;
  sec16AiSubtitle: string;
  sec17ItineraryTitle: string;
  sec17ItinerarySubtitle: string;
  sec18WhyTrustTitle: string;
  sec18WhyTrustSubtitle: string;
  sec19ReviewsTitle: string;
  sec19ReviewsSubtitle: string;
  sec20EmergencyTitle: string;
  sec20EmergencySubtitle: string;
  sec21QrTitle: string;
  sec21QrSubtitle: string;
  sec22FaqTitle: string;
  sec22FaqSubtitle: string;
  sec23AppTitle: string;
  sec23AppSubtitle: string;
  sec24HelplineTitle: string;
  sec24HelplineSubtitle: string;
  sec25TransitTitle: string;
  sec25TransitSubtitle: string;
  sec26RefreshmentsTitle: string;
  sec26RefreshmentsSubtitle: string;
  sec27GreenGayaTitle: string;
  sec27GreenGayaSubtitle: string;
  sec28MapExplorerTitle: string;
  sec28MapExplorerSubtitle: string;

  // Language Labels
  langHindi: string;
  langEnglish: string;
}

export const translations: Record<Language, Translations> = {
  hi: {
    topBarWelcome: '🙏 Gaya Ji में आपका स्वागत है — पिंडदान, पिक एंड ड्रॉप, स्टे, इमरजेंसी एवं गया गाइड नेटवर्क',
    brandSubtag: 'यात्रा • सेवा • अनुभव',
    navHome: 'मुख्य पृष्ठ',
    navServices: 'सेवाएं',
    navGayaGuide: 'गया गाइड',
    navAiAssistant: 'एआई सहायक',
    navHelp: 'मदद',
    navLogin: 'लॉग इन',
    navRegister: 'पंजीकरण',
    navGetStarted: 'शुरू करें',

    navPickDrop: 'पिक एंड ड्रॉप (टैक्सी/ऑटो)',
    navPindDaanPandits: 'पिंडदान एवं तीर्थ पुरोहित',
    navStaysHotels: 'होटल एवं धर्मशालाएं',
    navSatvikFood: 'सात्विक भोजन एवं भोजनालय',
    navPujaMaterial: 'पूजा सामग्री एवं तिलक कूट',

    navAboutGayaJi: 'गया जी महात्म्य एवं इतिहास',
    navPitruPakshaGuide: 'पितृपक्ष एवं 48 वेदी गाइड',
    navSacredFalguRiver: 'पवित्र फल्गु नदी एवं आरती',
    navGpsNavigation: '1-क्लिक GPS तीर्थ नेविगेशन',
    navGayaMallsMarkets: 'गया जी मॉल एवं प्रसिद्ध बाजार',
    navSafetyGuidelines: 'तीर्थ यात्री सुरक्षा नियम',

    btnCallNow: 'तुरंत कॉल करें',
    btnWhatsApp: 'व्हाट्सएप करें',
    btnBookRide: 'राइड बुक करें',
    btnSearchPandits: 'पंडित जी खोजें',
    btnViewListings: 'सूची देखें',
    btnGetDirections: 'दिशा पाएं (GPS)',
    btnExploreMore: 'और जानें',

    heroBadge: 'गया जी तीर्थयात्रियों के लिए 100% सत्यापित नेटवर्क',
    heroTitle1: 'गया जी की पावन यात्रा',
    heroTitleHighlight: 'अब हुई और भी आसान',
    heroTitle2: 'सत्यापित सेवा प्रदाताओं के साथ',
    heroSubtitle: 'स्टेशन/एयरपोर्ट पिक एंड ड्रॉप, विष्णुपद एवं फल्गु नदी पर पिंडदान पंडित, बजट धर्मशाला एवं 24x7 इमरजेंसी सहायता सेवा।',

    tabPickDrop: 'पिक एंड ड्रॉप',
    tabPandits: 'पिंडदान पंडित',
    tabStays: 'होटल / स्टे',
    tabFood: 'सात्विक भोजन',
    tabTilkut: 'तिलकुट बाजार',
    tabPlaces: 'दर्शनीय स्थल',
    searchPlaceholder: 'जैसे: विष्णुपद मंदिर, पिकअप राइड, पंडित जी, होटल...',
    btnSearch: 'खोजें',

    mobHome: 'मुख्य',
    mobServices: 'सेवाएं',
    mobAi: 'एआई',
    mobHelp: 'मदद',
    mobAccount: 'खाता',

    sec1Notice: 'पितृपक्ष 2026 स्पेशल 24/7 हेल्पलाइन सक्रिय है। किसी भी सहायता के लिए संपर्क करें।',
    sec2Hero: 'गया सेवा - तीर्थ यात्रा सुलभ सेवा',
    sec3Banner: 'विशेष ऑफर एवं प्रायोजित सेवाएं',
    sec4QuickPills: 'त्वरित सेवाएं',
    sec5HistoryTitle: 'गया जी का पवित्र इतिहास एवं गयसुर कथा',
    sec5HistorySubtitle: 'वायु पुराण और अग्नि पुराण में वर्णित भगवान विष्णु के पदचिह्न और गया तीर्थ का पावन महात्म्य।',
    sec6PitruPakshaTitle: 'पितृपक्ष एवं 16 दिवसीय पिंडदान महात्म्य',
    sec6PitruPakshaSubtitle: 'पूर्वजों के मोक्ष और शांति हेतु विष्णुपद, फल्गु नदी और प्रेतशिला पर पिंडदान का महत्व।',
    sec7FalguTitle: 'पवित्र फल्गु नदी और माता सीता का श्राप',
    sec7FalguSubtitle: 'अंतःसलिला फल्गु नदी का रहस्य एवं देवघाट पर संध्या फल्गु महा आरती।',
    sec8GpsTitle: '1-क्लिक GPS तीर्थ नेविगेशन हब',
    sec8GpsSubtitle: 'एक क्लिक में गया जी के प्रसिद्ध मंदिरों, वेदियों और रेलवे स्टेशन के लिए Google Maps दिशाएं।',
    sec9PlacesTitle: 'गया जी के प्रमुख पवित्र दर्शनीय स्थल',
    sec9PlacesSubtitle: 'विष्णुपद मंदिर, बोधगया महाबोधि मंदिर, फल्गु नदी, अक्षय वट एवं प्रेतशिला।',
    sec10ShoppingTitle: 'गया जी के प्रसिद्ध मॉल, बाजार और हस्तशिल्प',
    sec10ShoppingSubtitle: 'MGB फूड मॉल, रमना तिलकुट बाजार, तिब्बती बाजार और पत्थर कला केंद्र।',
    sec11FareTitle: 'पारदर्शी पिक एंड ड्रॉप टैक्सी एवं ऑटो दरें',
    sec11FareSubtitle: 'रेलवे स्टेशन एवं एयरपोर्ट से विष्णुपद, बोधगया और राजगीर की निश्चित दरें।',
    sec12PanditTitle: 'सत्यापित गया जी तीर्थ पुरोहित (पंडित जी)',
    sec12PanditSubtitle: 'विष्णुपद एवं फल्गु तट के प्रामाणिक एवं अनुभवी तीर्थ पुरोहितों से सीधा संपर्क।',
    sec13HotelTitle: 'विष्णुपद के समीप सत्यापित होटल एवं धर्मशालाएं',
    sec13HotelSubtitle: 'तीर्थयात्रियों और परिवारों के लिए सुरक्षित, स्वच्छ और सुलभ आवास।',
    sec14FoodTitle: 'शुद्ध सात्विक एवं बिना लहसुन-प्याज भोजनालय',
    sec14FoodSubtitle: 'श्राद्ध और व्रत के दौरान शुद्ध सात्विक राजस्थानी एवं बिहारी थाली।',
    sec15TilkutTitle: 'प्रसिद्ध गया तिलकुट एवं प्रामाणिक पूजा सामग्री',
    sec15TilkutSubtitle: 'शुद्ध गुड़ एवं चीनी तिलकुट, सत्तू, एवं 48 वेदी पिंडदान किट।',
    sec16AiTitle: 'गया सेवा एआई सहायक — 24x7 तीर्थ गाइड',
    sec16AiSubtitle: 'हिंदी एवं अंग्रेजी में यात्रा, रेट, मंदिर समय और दिशाओं की तुरंत जानकारी।',
    sec17ItineraryTitle: 'कस्टम गया जी यात्रा योजना (1 से 3 दिवसीय)',
    sec17ItinerarySubtitle: 'समय और आवश्यकता के अनुसार तैयार किया गया सर्वोत्तम तीर्थ यात्रा कार्यक्रम।',
    sec18WhyTrustTitle: 'तीर्थयात्री गया सेवा पर क्यों भरोसा करते हैं?',
    sec18WhyTrustSubtitle: '100% पृष्ठभूमि सत्यापित ड्राइवर, पंडित और होटल नेटवर्क।',
    sec19ReviewsTitle: 'तीर्थयात्रियों के अनुभव एवं समीक्षाएं',
    sec19ReviewsSubtitle: 'देशभर से आए श्रद्धालुओं के सच्चे अनुभव।',
    sec20EmergencyTitle: '24/7 आपातकालीन हेल्पलाइन एवं चिकित्सा केंद्र',
    sec20EmergencySubtitle: 'एम्बुलेंस (108), पुलिस (112), रेलवे (139) और मगध मेडिकल अस्पताल।',
    sec21QrTitle: 'ऑफलाइन QR कोड स्कैन एवं तुरंत सेवा ऐप',
    sec21QrSubtitle: 'बिना ऐप डाउनलोड किए सीधा व्हाट्सएप और कॉल कनेक्ट।',
    sec22FaqTitle: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    sec22FaqSubtitle: 'पिंडदान, पिकअप राइड, होटल बुकिंग और यात्रा से जुड़े आपके सभी सवालों के जवाब।',
    sec23AppTitle: 'गया सेवा PWA मोबाइल ऐप डाउनलोड करें',
    sec23AppSubtitle: 'ऑफलाइन मोड और तेज़ बुकिंग के लिए होम स्क्रीन पर जोड़ें।',
    sec24HelplineTitle: '24/7 तीर्थ यात्री हेल्पलाइन पट्टी',
    sec24HelplineSubtitle: 'कॉल करें या सीधे व्हाट्सएप पर मैसेज करें।',
    sec25TransitTitle: 'स्थानीय यातायात एवं ई-रिक्शा रूट गाइड',
    sec25TransitSubtitle: 'टाउन बस, ई-रिक्शा एवं शेयरिंग टेम्पो मार्ग।',
    sec26RefreshmentsTitle: 'गया के प्रसिद्ध व्यंजन एवं रिफ्रेशमेंट',
    sec26RefreshmentsSubtitle: 'सत्तू शर्बत, कुल्हड़ चाय, केसरिया रबड़ी और लाई।',
    sec27GreenGayaTitle: 'स्वच्छ एवं हरित फल्गु नदी अभियान',
    sec27GreenGayaSubtitle: 'पवित्र नदी को स्वच्छ और प्लास्टिक-मुक्त रखने का संकल्प।',
    sec28MapExplorerTitle: 'इंटरएक्टिव गया जी सिटी मैप एक्सप्लोरर',
    sec28MapExplorerSubtitle: '48 वेदियों और दर्शनीय स्थलों का डिजिटल नक्शा।',

    langHindi: 'हिंदी',
    langEnglish: 'English',
  },
  en: {
    topBarWelcome: '🙏 Welcome to Gaya Ji — Pinddaan, Pick & Drop, Stay, Emergency & Gaya Guide Network',
    brandSubtag: 'Travel • Connect • Experience',
    navHome: 'Home',
    navServices: 'Services',
    navGayaGuide: 'Gaya Guide',
    navAiAssistant: 'AI Assistant',
    navHelp: 'Help',
    navLogin: 'Login',
    navRegister: 'Register',
    navGetStarted: 'Get Started',

    navPickDrop: 'Pick & Drop (Taxi/Auto)',
    navPindDaanPandits: 'Pinddaan & Pilgrimage Pandits',
    navStaysHotels: 'Hotels & Dharamshalas',
    navSatvikFood: 'Satvik Food & Dining',
    navPujaMaterial: 'Puja Kits & Gaya Tilkut',

    navAboutGayaJi: 'Gaya Ji History & Significance',
    navPitruPakshaGuide: 'Pitru Paksha & 48 Vedis Guide',
    navSacredFalguRiver: 'Sacred Falgu River & Aarti',
    navGpsNavigation: '1-Click GPS Pilgrimage Navigation',
    navGayaMallsMarkets: 'Famous Malls & Markets in Gaya',
    navSafetyGuidelines: 'Pilgrim Safety Rules',

    btnCallNow: 'Call Now',
    btnWhatsApp: 'WhatsApp Us',
    btnBookRide: 'Book Ride',
    btnSearchPandits: 'Search Pandits',
    btnViewListings: 'View Listings',
    btnGetDirections: 'Get Directions (GPS)',
    btnExploreMore: 'Explore More',

    heroBadge: '100% Verified Network for Gaya Ji Pilgrims',
    heroTitle1: 'Sacred Pilgrimage to Gaya Ji',
    heroTitleHighlight: 'Made Simple & Hassle-Free',
    heroTitle2: 'With Verified Local Providers',
    heroSubtitle: 'Station/Airport Pick & Drop, Verified Pandits at Vishnupad & Falgu River, Budget Dharamshalas, and 24x7 Emergency Assistance.',

    tabPickDrop: 'Pick & Drop',
    tabPandits: 'Pinddaan Pandits',
    tabStays: 'Hotels / Stays',
    tabFood: 'Satvik Food',
    tabTilkut: 'Tilkut Bazaar',
    tabPlaces: 'Sacred Places',
    searchPlaceholder: 'Search e.g. Vishnupad Temple, Taxi, Pandit, Hotel...',
    btnSearch: 'Search',

    mobHome: 'Home',
    mobServices: 'Services',
    mobAi: 'AI',
    mobHelp: 'Help',
    mobAccount: 'Account',

    sec1Notice: 'Pitru Paksha 2026 Special 24/7 Helpline is Active. Contact us for any assistance.',
    sec2Hero: 'GayaSeva - Pilgrimage Service Hub',
    sec3Banner: 'Special Offers & Sponsored Services',
    sec4QuickPills: 'Quick Services',
    sec5HistoryTitle: 'Sacred History of Gaya Ji & Legend of Gayasur',
    sec5HistorySubtitle: 'Ancient accounts from Vayu Purana and Agni Purana detailing Lord Vishnu footprint.',
    sec6PitruPakshaTitle: 'Pitru Paksha & 16-Day Pinddaan Significance',
    sec6PitruPakshaSubtitle: 'Ancestor salvation rites at Vishnupad, Falgu River, and Pretshila.',
    sec7FalguTitle: 'Sacred Falgu River & Mother Sita Curse',
    sec7FalguSubtitle: 'Mystery of Antarsalila dry riverbed & evening Falgu Maha Aarti at Devghat.',
    sec8GpsTitle: '1-Click GPS Teerth Navigation Hub',
    sec8GpsSubtitle: 'Instant Google Maps directions for temples, Vedis, and Railway station.',
    sec9PlacesTitle: 'Major Sacred Places in Gaya Ji',
    sec9PlacesSubtitle: 'Vishnupad Temple, Bodh Gaya Mahabodhi, Falgu River, Akshay Vat & Pretshila.',
    sec10ShoppingTitle: 'Famous Malls, Markets & Handicrafts in Gaya',
    sec10ShoppingSubtitle: 'MGB Food Mall, Ramna Tilkut Bazaar, Tibetan Market & Stone Crafting Center.',
    sec11FareTitle: 'Transparent Pick & Drop Taxi & Auto Fares',
    sec11FareSubtitle: 'Fixed rates from Railway Station & Airport to Vishnupad, Bodh Gaya & Rajgir.',
    sec12PanditTitle: 'Verified Gaya Ji Pilgrimage Pandits',
    sec12PanditSubtitle: 'Direct connection with authentic and experienced Tirth Purohits at Vishnupad & Falgu.',
    sec13HotelTitle: 'Verified Hotels & Dharamshalas Near Vishnupad',
    sec13HotelSubtitle: 'Safe, clean, and accessible accommodation for pilgrims and families.',
    sec14FoodTitle: 'Pure Satvik & No Onion-Garlic Restaurants',
    sec14FoodSubtitle: 'Pure Satvik Rajasthani & Bihari thali during rituals and fasts.',
    sec15TilkutTitle: 'Famous Gaya Tilkut & Authentic Puja Samagri',
    sec15TilkutSubtitle: 'Pure Jaggery & Sugar Tilkut, Sattu, and 48 Vedi Pinddaan kits.',
    sec16AiTitle: 'GayaSeva AI Assistant — 24x7 Teerth Guide',
    sec16AiSubtitle: 'Instant bilingual information for routes, fares, temple timings, and rituals.',
    sec17ItineraryTitle: 'Custom Gaya Ji Trip Itinerary (1 to 3 Days)',
    sec17ItinerarySubtitle: 'Tailored pilgrimage plans crafted according to your schedule.',
    sec18WhyTrustTitle: 'Why Pilgrims Trust GayaSeva?',
    sec18WhyTrustSubtitle: '100% background-verified drivers, pandits, and hotel network.',
    sec19ReviewsTitle: 'Pilgrim Experiences & Reviews',
    sec19ReviewsSubtitle: 'Genuine feedback from devotees across India.',
    sec20EmergencyTitle: '24/7 Emergency Helpline & Medical Center',
    sec20EmergencySubtitle: 'Ambulance (108), Police (112), Railway (139) and Magadh Medical Hospital.',
    sec21QrTitle: 'Offline QR Code Scanning & Instant Service App',
    sec21QrSubtitle: 'Direct WhatsApp and Call connectivity without mandatory app downloads.',
    sec22FaqTitle: 'Frequently Asked Questions (FAQ)',
    sec22FaqSubtitle: 'Clear answers for Pinddaan, taxi booking, hotel stays, and travel tips.',
    sec23AppTitle: 'Download GayaSeva PWA Mobile App',
    sec23AppSubtitle: 'Add to home screen for offline access and instant booking.',
    sec24HelplineTitle: '24/7 Pilgrim Helpline Strip',
    sec24HelplineSubtitle: 'Call directly or send a message on WhatsApp.',
    sec25TransitTitle: 'Local Transit & E-Rickshaw Route Guide',
    sec25TransitSubtitle: 'Town bus, E-Rickshaw, and shared auto routes.',
    sec26RefreshmentsTitle: 'Famous Gaya Delicacies & Refreshments',
    sec26RefreshmentsSubtitle: 'Sattu drink, Kulhad tea, Kesaria Rabri, and Lai.',
    sec27GreenGayaTitle: 'Clean & Green Falgu River Initiative',
    sec27GreenGayaSubtitle: 'Pledge to keep the holy river clean and plastic-free.',
    sec28MapExplorerTitle: 'Interactive Gaya City Map Explorer',
    sec28MapExplorerSubtitle: 'Digital map of 48 Vedis and sacred places.',

    langHindi: 'हिंदी',
    langEnglish: 'English',
  },
};
