/**
 * GayaSeva Professional WhatsApp Link & Pre-filled Message Generator
 * Formats polite, well-structured, professional WhatsApp messages for pilgrims.
 */

export interface WhatsAppMessageOptions {
  phone: string;
  title: string;
  subtitle?: string;
  sourceType?: 'POPUP_AD' | 'SLIDER_BANNER' | 'PANDIT' | 'TAXI' | 'HOTEL' | 'GENERAL';
  lang?: 'hi' | 'en';
}

/**
 * Cleans phone number string into international format for WhatsApp wa.me links
 * e.g., "+91 98765 43200" -> "919876543200"
 */
export function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[^\d]/g, '');
  if (cleaned.length === 10) {
    cleaned = `91${cleaned}`;
  }
  return cleaned;
}

/**
 * Constructs a fully professional pre-filled WhatsApp message URL
 */
export function getProfessionalWhatsAppUrl({
  phone,
  title,
  subtitle,
  sourceType = 'GENERAL',
  lang = 'hi',
}: WhatsAppMessageOptions): string {
  const cleanPhone = formatPhoneNumber(phone);

  let messageText = '';

  if (lang === 'hi') {
    let sourceHeader = 'गया सेवा (GayaSeva)';
    if (sourceType === 'POPUP_AD') sourceHeader = 'गया सेवा विशेष विज्ञापन / ऑफर';
    if (sourceType === 'SLIDER_BANNER') sourceHeader = 'गया सेवा होमपेज बैनर ऑफर';
    if (sourceType === 'PANDIT') sourceHeader = 'गया सेवा पिंडदान पंडित बुकिंग';
    if (sourceType === 'TAXI') sourceHeader = 'गया सेवा पिक एंड ड्रॉप टैक्सी बुक';
    if (sourceType === 'HOTEL') sourceHeader = 'गया सेवा होटल एवं स्टे सहायता';

    messageText = `🙏 *जय श्री हरि विष्णु | ${sourceHeader}*

नमस्ते! मैंने आपकी गया सेवा (GayaSeva) वेबसाइट पर यह जानकारी देखी है:

📢 *विषय / सेवा:* ${title.trim()}
${subtitle ? `ℹ️ *विवरण:* ${subtitle.trim()}\n` : ''}
मुझे इसके संबंध में निम्नलिखित जानकारी चाहिए:
▪️ *उपलब्धता एवं प्रक्रिया (Availability & Process)*
▪️ *दरें एवं पैकेज शुल्क (Fares & Pricing)*
▪️ *बुकिंग एवं समय मार्गदर्शन (Booking & Timing)*

कृपया मुझे जल्द से जल्द मार्गदर्शन प्रदान करें। धन्यवाद!`;
  } else {
    let sourceHeader = 'GayaSeva Pilgrim Support';
    if (sourceType === 'POPUP_AD') sourceHeader = 'GayaSeva Official Announcement';
    if (sourceType === 'SLIDER_BANNER') sourceHeader = 'GayaSeva Featured Offer';
    if (sourceType === 'PANDIT') sourceHeader = 'GayaSeva Pinddaan Pandit Service';
    if (sourceType === 'TAXI') sourceHeader = 'GayaSeva Pick & Drop Taxi Service';
    if (sourceType === 'HOTEL') sourceHeader = 'GayaSeva Hotel & Stay Service';

    messageText = `🙏 *Jai Shri Hari Vishnu | ${sourceHeader}*

Hello! I am inquiring via the *GayaSeva* platform regarding the following:

📢 *Service / Offer:* ${title.trim()}
${subtitle ? `ℹ️ *Details:* ${subtitle.trim()}\n` : ''}
I would like to receive details on:
▪️ *Availability & Booking Process*
▪️ *Fares & Package Pricing*
▪️ *Timing & Further Guidance*

Please guide me at your earliest convenience. Thank you!`;
  }

  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
