export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'residential' | 'commercial' | 'emergency' | 'smart-home' | 'ev-charger';
  details: string[];
  baseCost: number;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'smart-home' | 'ev';
  description: string;
  imageUrl: string;
  isBeforeAfter?: boolean;
  beforeImageUrl?: string;
  afterImageUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 - 11:00"
  serviceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  isConfirmed: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO String or YYYY-MM-DDTHH:mm:ss
  end: string;
  isBusy: boolean;
}
