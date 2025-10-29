import React, { useState, FormEvent, useEffect, useRef, useCallback } from 'react';
import { serviceCategories, priceList, galleryImages, specialOffers, testimonials, faqs } from './constants';
import { ServiceIconProps } from './types';
import { FaceIcon, HairIcon, HandIcon, MakeupIcon, WaxingIcon, EyebrowIcon, PhoneIcon, MapPinIcon, FacebookIcon, InstagramIcon, WhatsAppIcon, QuoteIcon, SearchIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, TwitterIcon, ChevronUpIcon, StarIcon, PlayIcon, PauseIcon } from './components/Icons';

// --- Image Optimization Helpers ---
const imageProxyBase = 'https://images.weserv.nl/?url=';

const createSrcSet = (url: string, widths: number[]): string => {
  const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
  const encodedUrl = encodeURIComponent(urlWithoutProtocol);
  return widths
    .map(w => `${imageProxyBase}${encodedUrl}&w=${w}&we&q=80&output=webp ${w}w`)
    .join(', ');
};

const createPlaceholderSrc = (url: string): string => {
    const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
    const encodedUrl = encodeURIComponent(urlWithoutProtocol);
    // Request a tiny (32px wide), blurred (blur=10) image with low quality for the blur-up effect.
    return `${imageProxyBase}${encodedUrl}&w=32&blur=10&we&q=20&output=webp`;
};


// Component mapping for icons
const iconComponents: { [key: string]: React.FC<ServiceIconProps> } = {
  facial: FaceIcon,
  hair: HairIcon,
  makeup: MakeupIcon,
  nails: HandIcon,
  waxing: WaxingIcon,
  eyebrow: EyebrowIcon,
};

// --- Custom Hooks for Accessibility ---
const useIntersectionObserver = (elementRef: React.RefObject<HTMLElement>, { threshold = 0.1, root = null, rootMargin = '0%', triggerOnce = true }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold, root, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, threshold, root, rootMargin, triggerOnce]);

  return isIntersecting;
};

const useFocusTrap = (ref: React.RefObject<HTMLElement>, isOpen: boolean) => {
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isOpen || !ref.current) return;

        previouslyFocusedElement.current = document.activeElement as HTMLElement;

        const focusableElements = Array.from(ref.current.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )) as HTMLElement[];
        
        if(focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        firstElement?.focus();
        const currentRef = ref.current;
        currentRef.addEventListener('keydown', handleKeyDown);

        return () => {
            currentRef?.removeEventListener('keydown', handleKeyDown);
            previouslyFocusedElement.current?.focus();
        };
    }, [isOpen, ref]);
};

// --- Animated Section Component ---
const AnimatedSection: React.FC<{ children: React.ReactNode; id: string; className?: string }> = ({ children, id, className = '' }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.15, triggerOnce: true });

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`py-20 transition-all duration-700 ease-in-out transform ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            {children}
        </section>
    );
};


interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

const ServiceCard: React.FC<{ icon: string; title: string; description: string; details: string; }> = ({ icon, title, description, details }) => {
  const IconComponent = iconComponents[icon];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 text-center transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-describedby={`details-${title.replace(/\s+/g, '-')}`}
    >
      <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mx-auto bg-pink-200/30 text-pink-500 w-20 h-20 rounded-full flex items-center justify-center mb-4">
          {IconComponent && <IconComponent className="w-10 h-10" />}
        </div>
        <h3 className="text-2xl font-fancy text-white mb-2">{title}</h3>
        <p className="text-pink-200">{description}</p>
      </div>

      <div
        id={`details-${title.replace(/\s+/g, '-')}`}
        className={`absolute inset-0 p-6 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isHovered}
      >
        <h4 className="text-xl font-fancy text-pink-300 mb-2">{title}</h4>
        <p className="text-white text-sm text-center">{details}</p>
      </div>
    </div>
  );
};

const PriceCategory: React.FC<{ category: typeof priceList[0] }> = ({ category }) => (
  <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 w-full">
    <h3 className="text-3xl font-fancy text-pink-300 mb-6 text-center border-b-2 border-pink-300/50 pb-3">{category.title}</h3>
    <ul className="space-y-4">
      {category.items.map((item, index) => (
        <li key={index} className="flex justify-between items-center text-lg">
          <span className="text-gray-200">{item.name} <em className="text-pink-300 text-sm block opacity-80">{item.note}</em></span>
          <span className="font-semibold text-white bg-pink-500/20 px-3 py-1 rounded-full">{item.price}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Calendar: React.FC<{ value: string; onChange: (date: string) => void; }> = ({ value, onChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const selectedDate = value ? new Date(value + 'T00:00:00') : null;

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const days = [];

        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} />);
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month, day);
            const dateString = date.toISOString().split('T')[0];
            const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
            const isToday = date.getTime() === today.getTime();
            const isPast = date < today;

            const classNames = [
                'w-10 h-10 flex items-center justify-center rounded-full transition-colors text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500',
                isPast ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-pink-500/30 cursor-pointer',
                isSelected ? 'bg-pink-500 font-bold !text-white' : '',
                !isSelected && isToday ? 'border border-pink-400' : ''
            ].join(' ');

            days.push(
                <button
                    key={day}
                    type="button"
                    onClick={() => !isPast && onChange(dateString)}
                    className={classNames}
                    disabled={isPast}
                    aria-label={isPast ? `${day}, past date, unavailable` : `Select date ${day}`}
                >
                    {day}
                </button>
            );
        }
        return days;
    };
    
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    return (
        <div className="absolute top-full mt-2 left-0 w-80 bg-gray-800 border border-white/20 rounded-lg shadow-2xl p-4 z-20">
            <div className="flex justify-between items-center mb-4">
                <button type="button" onClick={prevMonth} aria-label="Previous month" className="p-2 rounded-full hover:bg-white/10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <div className="font-bold text-lg text-pink-300" aria-live="polite">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </div>
                <button type="button" onClick={nextMonth} aria-label="Next month" className="p-2 rounded-full hover:bg-white/10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}><span className="sr-only">{d}</span><span aria-hidden="true">{d.charAt(0)}</span></div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {renderDays()}
            </div>
        </div>
    );
};

const BookingForm: React.FC<{ bookings: Booking[], onBookingSuccess: () => void }> = ({ bookings, onBookingSuccess }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', date: '', time: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
            setIsCalendarOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!formData.date) {
      setAvailableTimes([]);
      return;
    }

    const getAvailableTimes = () => {
      const businessHours = { start: 10, end: 20 };
      const slotDuration = 30;
      const times: string[] = [];
      const selectedDateObj = new Date(formData.date);
      selectedDateObj.setMinutes(selectedDateObj.getMinutes() + selectedDateObj.getTimezoneOffset());
      const isToday = selectedDateObj.toDateString() === new Date().toDateString();
      const bookedTimes = bookings.filter(b => b.date === formData.date).map(b => b.time);

      for (let hour = businessHours.start; hour < businessHours.end; hour++) {
        for (let minute = 0; minute < 60; minute += slotDuration) {
          const now = new Date();
          const slotTime = new Date(formData.date);
          slotTime.setHours(hour, minute, 0, 0);

          if (isToday && slotTime < now) {
            continue;
          }

          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          if (!bookedTimes.includes(timeString)) {
            times.push(timeString);
          }
        }
      }
      setAvailableTimes(times);
    };

    getAvailableTimes();
  }, [formData.date, bookings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
     if (name === 'date') {
        setFormData(prev => ({...prev, time: ''}));
    }
  };

  const handleDateChange = (date: string) => {
    setFormData(prev => ({...prev, date, time: ''}));
    setIsCalendarOpen(false);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      setError('All fields are required.');
      return;
    }
    setError('');

    setIsLoading(true);
    setTimeout(() => {
        try {
            const newBooking: Booking = {
                id: new Date().toISOString(),
                ...formData,
            };
            const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
            
            setSubmitted(true);
            onBookingSuccess();
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', service: '', date: '', time: '' });
            }, 8000);
        } catch (e) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, 1500);
  };

  if (submitted) {
    const whatsappMessage = `Hello Pinki'z Glam Room! I've just booked an appointment for ${formData.service} on ${new Date(formData.date + 'T00:00:00').toLocaleDateString()} at ${formData.time}. My name is ${formData.name}. Please confirm my booking.`;
    const whatsappUrl = `https://wa.me/918389958668?text=${encodeURIComponent(whatsappMessage)}`;

    return (
      <div className="text-center bg-green-500/10 border border-green-500 p-8 rounded-lg animate-fadeIn" role="alert">
        <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-3xl font-fancy text-white mb-2">Success!</h3>
        <p className="text-green-300 mb-6">Your appointment request has been sent. Please click the button below to confirm your booking on WhatsApp.</p>
        <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 focus-visible:ring-offset-gray-800"
        >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Confirm on WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-400 bg-red-500/10 p-3 rounded-md" role="alert">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="sr-only">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full bg-white/10 border border-white/20 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500" />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full bg-white/10 border border-white/20 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500" />
          </div>
        </div>
        <div className="relative">
            <label htmlFor="service" className="sr-only">Select a Service</label>
            <select 
                id="service" 
                name="service" 
                value={formData.service} 
                onChange={handleChange} 
                className={`w-full appearance-none bg-white/10 border border-white/20 rounded-md p-3 pr-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 transition-colors ${formData.service ? 'text-white' : 'text-gray-400'}`}
            >
                <option value="">Select a Service</option>
                {priceList.flatMap(category => category.items).map(item => (
                    <option key={item.name} value={item.name} className="bg-gray-800 text-white">
                        {item.name}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-pink-300">
                <ChevronDownIcon className="w-5 h-5" />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative" ref={datePickerRef}>
            <label htmlFor="date-button" className="sr-only">Select a Date</label>
            <button id="date-button" type="button" onClick={() => setIsCalendarOpen(!isCalendarOpen)} className={`w-full text-left bg-white/10 border border-white/20 rounded-md p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 transition-colors ${formData.date ? 'text-white' : 'text-gray-400'}`} aria-haspopup="dialog" aria-expanded={isCalendarOpen}>
              {formData.date ? new Date(formData.date + 'T00:00:00').toLocaleDateString() : 'Select a Date'}
            </button>
            {isCalendarOpen && <Calendar value={formData.date} onChange={handleDateChange} />}
          </div>
          <div className="relative">
            <label htmlFor="time" className="sr-only">Select a Time</label>
            <select id="time" name="time" value={formData.time} onChange={handleChange} className={`w-full appearance-none bg-white/10 border border-white/20 rounded-md p-3 pr-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 transition-colors ${formData.time ? 'text-white' : 'text-gray-400'}`} disabled={!formData.date}>
                <option value="">Select a Time</option>
                {availableTimes.map(time => <option key={time} value={time} className="bg-gray-800 text-white">{time}</option>)}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-pink-300">
                <ChevronDownIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300 shadow-lg flex items-center justify-center disabled:bg-pink-800 disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900 min-h-[52px]">
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Booking your appointment...
                </>
            ) : (
                'Book an Appointment'
            )}
        </button>
      </form>
    </>
  );
};

const TestimonialsCarousel: React.FC<{ testimonials: typeof testimonials }> = ({ testimonials }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    useEffect(() => {
        resetTimeout();
        if (!isInteracting && !isPaused) {
            timeoutRef.current = window.setTimeout(
                () => setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1)),
                5000 // Change slide every 5 seconds
            );
        }
        return () => {
            resetTimeout();
        };
    }, [activeIndex, testimonials.length, isInteracting, isPaused, resetTimeout]);

    const goToPrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToNext();
        }
    };

    return (
        <div 
            className="max-w-4xl mx-auto relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900 rounded-lg"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onFocus={() => setIsInteracting(true)}
            onBlur={() => setIsInteracting(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
        >
             <button
                onClick={() => setIsPaused(p => !p)}
                aria-label={isPaused ? "Resume automatic sliding" : "Pause automatic sliding"}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
                {isPaused ? <PlayIcon className="w-6 h-6" /> : <PauseIcon className="w-6 h-6" />}
            </button>
            <div className="overflow-hidden relative min-h-[500px] sm:min-h-[420px] md:min-h-[340px]">
                <div
                    className="whitespace-nowrap transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    aria-live="polite"
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="inline-block w-full align-top h-full p-4">
                           <div className={`bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-white/20 text-center relative h-full flex flex-col justify-center transition-all duration-500 ease-in-out ${activeIndex === index ? 'scale-100 opacity-100' : 'scale-90 opacity-60'}`}>
                                <QuoteIcon className="w-32 h-32 text-pink-400/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-2/3 md:-translate-y-2/3" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={testimonial.image}
                                            srcSet={createSrcSet(testimonial.image, [128, 256])}
                                            sizes="128px"
                                            alt={`Photo of ${testimonial.name}, a happy client.`}
                                            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-pink-500/30 object-cover shadow-lg"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <div className="md:text-left">
                                        <div className="flex justify-center md:justify-start mb-2" aria-label={`${testimonial.rating} out of 5 stars`}>
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                                            ))}
                                        </div>
                                        <h4 className="font-bold text-white text-2xl">{testimonial.name}</h4>
                                        <p className="text-pink-300 mb-4 text-sm uppercase tracking-wider">{testimonial.service}</p>
                                        <p className="text-gray-200 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <button 
                onClick={goToPrev} 
                aria-label="Previous testimonial"
                className="absolute top-1/2 -translate-y-1/2 left-4 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button 
                onClick={goToNext} 
                aria-label="Next testimonial"
                className="absolute top-1/2 -translate-y-1/2 right-4 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                        className={`w-3 h-3 rounded-full transition-colors ${activeIndex === index ? 'bg-pink-500' : 'bg-white/30 hover:bg-white/50'}`}
                    >
                        <span className="sr-only">Go to slide {index + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const ShareButtons: React.FC<{ text: string; url: string; className?: string }> = ({ text, url, className = '' }) => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    };

    const openShareWindow = (shareUrl: string) => {
        window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className="text-sm font-semibold text-gray-300">Share:</span>
            <button onClick={() => openShareWindow(shareLinks.facebook)} aria-label="Share on Facebook" className="text-gray-400 hover:text-pink-400 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-800">
                <FacebookIcon className="w-5 h-5" />
            </button>
            <button onClick={() => openShareWindow(shareLinks.twitter)} aria-label="Share on Twitter" className="text-gray-400 hover:text-pink-400 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-800">
                <TwitterIcon className="w-5 h-5" />
            </button>
            <button onClick={() => openShareWindow(shareLinks.whatsapp)} aria-label="Share on WhatsApp" className="text-gray-400 hover:text-pink-400 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-800">
                <WhatsAppIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

const GalleryModal: React.FC<{ images: typeof galleryImages; selectedIndex: number; onClose: () => void; onPrev: () => void; onNext: () => void; }> = ({ images, selectedIndex, onClose, onPrev, onNext }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useFocusTrap(modalRef, true);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onPrev, onNext]);

    useEffect(() => {
        // Reset loaded state when image changes to re-trigger the blur-up effect
        setIsLoaded(false);
    }, [selectedIndex]);

    const image = images[selectedIndex];
    const placeholderSrc = createPlaceholderSrc(image.src);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="gallery-caption">
            <div 
                ref={modalRef} 
                className="relative max-w-4xl max-h-[90vh] w-full bg-cover bg-center bg-no-repeat" 
                onClick={e => e.stopPropagation()}
                style={{ backgroundImage: `url(${placeholderSrc})` }}
            >
                <img 
                    src={image.src} 
                    srcSet={createSrcSet(image.src, [400, 800, 1280])}
                    sizes="(max-width: 1280px) 90vw, 1280px"
                    alt={image.alt} 
                    style={image.style} 
                    className={`w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                 />
                
                <div className="flex justify-between items-center mt-3 px-2">
                    <p id="gallery-caption" className="text-white text-lg font-light flex-1 pr-4">{image.caption}</p>
                    <ShareButtons
                        text={`Look at this amazing work from Pinki'z Glam Room: ${image.caption}`}
                        url={window.location.href.split('#')[0] + '#gallery'}
                    />
                </div>
                
                <button 
                  onClick={onClose}
                  aria-label="Close gallery"
                  className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl leading-none hover:bg-black/75 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    &times;
                </button>

                <button 
                  onClick={onPrev}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl hover:bg-black/75 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    &larr;
                </button>
                
                <button
                  onClick={onNext}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl hover:bg-black/75 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    &rarr;
                </button>
            </div>
        </div>
    );
};

const FaqItem: React.FC<{
    faq: { question: string; answer: string };
    isOpen: boolean;
    onClick: () => void;
    id: string;
}> = ({ faq, isOpen, onClick, id }) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left p-6 font-semibold text-lg text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink-500"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
            >
                <span id={`faq-question-${id}`}>{faq.question}</span>
                <ChevronDownIcon className={`w-6 h-6 text-pink-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                id={`faq-answer-${id}`}
                role="region"
                aria-labelledby={`faq-question-${id}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="p-6 pt-0 text-gray-300">
                    {faq.answer}
                </div>
            </div>
        </div>
    );
};

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-8 right-8 bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-700 transition-all duration-300 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
        >
            <ChevronUpIcon className="w-6 h-6" />
        </button>
    );
};

const LazyGalleryImage: React.FC<{
  image: typeof galleryImages[0];
  onClick: () => void;
  srcSet: string;
}> = ({ image, onClick, srcSet }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1, triggerOnce: true });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className="mb-4 break-inside-avoid"
    >
      <button 
        onClick={onClick}
        aria-label={`View image: ${image.caption}`}
        className={`w-full h-auto rounded-lg shadow-lg cursor-pointer transition-all duration-500 transform hover:scale-105 block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900 bg-cover bg-center ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
        style={{ backgroundImage: isVisible ? `url(${createPlaceholderSrc(image.src)})` : 'none' }}
      >
        <img
          src={isVisible ? image.src : undefined}
          srcSet={isVisible ? srcSet : undefined}
          sizes="(max-width: 767px) 45vw, 30vw"
          alt={image.alt}
          className={`w-full h-auto rounded-lg pointer-events-none transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          style={image.style}
        />
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState('All');
  const [isFiltering, setIsFiltering] = useState(false);

  const loadBookings = () => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const deleteBooking = (id: string) => {
    const updatedBookings = bookings.filter(b => b.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const openGallery = (image: typeof galleryImages[0]) => {
    const originalIndex = galleryImages.findIndex(img => img.src === image.src);
    if (originalIndex !== -1) {
      setSelectedImageIndex(originalIndex);
    }
  };

  const closeGallery = () => setSelectedImageIndex(null);

  const showNextImage = () => {
    setSelectedImageIndex(prev => (prev === null ? null : (prev + 1) % galleryImages.length));
  };
  const showPrevImage = () => {
    setSelectedImageIndex(prev => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length));
  };
  
  const filteredServices = serviceCategories.filter(service => {
    const query = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.details.toLowerCase().includes(query)
    );
  });
  
  const galleryCategories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const filteredGalleryImages = galleryImages.filter(image => 
    activeGalleryCategory === 'All' || image.category === activeGalleryCategory
  );
  
  const handleFilterChange = (category: string) => {
    if (category === activeGalleryCategory) return;
    setIsFiltering(true);
    setTimeout(() => {
        setActiveGalleryCategory(category);
        setIsFiltering(false);
    }, 300);
  };

  const historyModalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(historyModalRef, isHistoryModalOpen);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen bg-cover bg-fixed" style={{backgroundImage: "linear-gradient(rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.9)), url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop')"}}>
      <header className="bg-gray-900/50 backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-3xl font-fancy text-pink-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">Pinki'z Glam Room</a>
          <ul className="hidden md:flex items-center space-x-6 text-lg">
            <li><a href="#about" onClick={handleSmoothScroll} className="hover:text-pink-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 p-1">About</a></li>
            <li><a href="#services" onClick={handleSmoothScroll} className="hover:text-pink-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 p-1">Services</a></li>
            <li><a href="#offers" onClick={handleSmoothScroll} className="hover:text-pink-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 p-1">Offers</a></li>
            <li><a href="#pricing" onClick={handleSmoothScroll} className="hover:text-pink-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 p-1">Price List</a></li>
            <li><a href="#gallery" onClick={handleSmoothScroll} className="hover:text-pink-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 p-1">Gallery</a></li>
            <li><a href="#testimonials" onClick={handleSmoothScroll} className="hover:text-pink-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 p-1">Testimonials</a></li>
            <li><a href="#faq" onClick={handleSmoothScroll} className="hover:text-pink-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 p-1">FAQ</a></li>
            <li><a href="#contact" onClick={handleSmoothScroll} className="bg-pink-600 px-4 py-2 rounded-full hover:bg-pink-700 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900">Book an Appointment</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="h-screen relative flex items-center justify-center text-center overflow-hidden bg-gray-900">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="https://videos.pexels.com/video-files/8571444/8571444-sd_640_360_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
            <div className="relative z-20 p-10">
                <h1 className="text-6xl md:text-8xl font-fancy text-white mb-4 animate-fadeIn">Pinki'z Glamour & Glam Room</h1>
                <p className="text-xl md:text-2xl text-pink-200 mb-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>Your one-stop destination for beauty and elegance.</p>
                <a 
                    href="#contact" 
                    onClick={handleSmoothScroll}
                    className="inline-block bg-pink-600 text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg transform hover:scale-105 animate-fadeIn focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900"
                    style={{ animationDelay: '0.6s' }}
                >
                    Book Your Visit
                </a>
            </div>
        </section>

        {/* About Section */}
        <AnimatedSection id="about" className="bg-gray-900/50">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-5xl font-fancy text-pink-300 mb-6">Welcome to Our Glam Room</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        At Pinki'z Glamour & Glam Room, we believe in the power of beauty to inspire confidence. With years of experience and a passion for artistry, our certified beautician Pinki provides top-notch services tailored to your unique style.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        From stunning bridal makeovers to relaxing spa treatments, we use only the best products to ensure you look and feel your absolute best. Step into our parlour and let us pamper you.
                    </p>
                </div>
            </div>
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection id="services">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-5xl font-fancy text-pink-300 mb-6">Our Services</h2>
                <div className="max-w-xl mx-auto mb-12 relative">
                    <label htmlFor="search-service" className="sr-only">Search for a service</label>
                    <input
                        type="text"
                        id="search-service"
                        placeholder="Search for a service (e.g., Bridal, Waxing...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <SearchIcon className="w-6 h-6" />
                    </div>
                </div>

                {filteredServices.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map(service => (
                            <ServiceCard key={service.title} {...service} />
                        ))}
                    </div>
                ) : (
                    <p className="text-xl text-gray-400 mt-8">No services found matching your search.</p>
                )}
            </div>
        </AnimatedSection>

        {/* Special Offers Section */}
        <AnimatedSection id="offers" className="bg-gray-900/50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-5xl font-fancy text-pink-300 mb-12">Special Offers</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specialOffers.map(offer => (
                        <div key={offer.title} className="bg-white/5 border border-pink-500/30 p-8 rounded-2xl shadow-lg relative overflow-hidden transform hover:scale-105 transition-transform duration-300 group flex flex-col">
                           <div className="flex-grow">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute -top-1 -right-1 bg-pink-500 text-white px-4 py-1 rounded-bl-lg text-sm font-bold transform -rotate-45 translate-x-8 translate-y-2 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300">{offer.deal}</div>
                                <h3 className="text-3xl font-fancy text-white mb-3">{offer.title}</h3>
                                <p className="text-gray-300 mb-6">{offer.description}</p>
                            </div>
                             <div className="mt-auto pt-6 border-t border-white/10">
                                <a href="#contact" onClick={handleSmoothScroll} className="block text-center w-full bg-pink-600 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-md mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900">Book This Offer</a>
                                <ShareButtons
                                    text={`Check out this amazing offer at Pinki'z Glam Room: ${offer.title} - ${offer.description}`}
                                    url={window.location.href.split('#')[0] + '#offers'}
                                    className="justify-center"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
        
        {/* Price List Section */}
        <AnimatedSection id="pricing">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-5xl font-fancy text-pink-300 mb-12">Price List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {priceList.map(category => (
                        <PriceCategory key={category.title} category={category} />
                    ))}
                </div>
            </div>
        </AnimatedSection>

        {/* Gallery Section */}
        <AnimatedSection id="gallery" className="bg-gray-900/50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-5xl font-fancy text-pink-300 mb-12">Our Work</h2>
                <div className="mb-12 flex justify-center flex-wrap gap-3 md:gap-4" role="group" aria-label="Gallery categories">
                    {galleryCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleFilterChange(category)}
                            aria-pressed={activeGalleryCategory === category}
                            aria-label={`Filter gallery by ${category}`}
                            className={`px-5 py-2 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
                                activeGalleryCategory === category
                                    ? 'bg-pink-600 text-white shadow-lg focus-visible:ring-white'
                                    : 'bg-white/10 text-pink-200 hover:bg-white/20 focus-visible:ring-pink-500'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className={`columns-2 md:columns-3 gap-4 transition-opacity duration-300 ease-in-out ${isFiltering ? 'opacity-0' : 'opacity-100'}`}>
                    {filteredGalleryImages.map((image) => (
                        <LazyGalleryImage 
                            key={image.src}
                            image={image}
                            onClick={() => openGallery(image)}
                            srcSet={createSrcSet(image.src, [300, 500, 800])}
                        />
                    ))}
                </div>
            </div>
        </AnimatedSection>
        {selectedImageIndex !== null && <GalleryModal images={galleryImages} selectedIndex={selectedImageIndex} onClose={closeGallery} onPrev={showPrevImage} onNext={showNextImage} />}

        {/* Testimonials Section */}
        <AnimatedSection id="testimonials" className="pb-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-5xl font-fancy text-pink-300 mb-12">What Our Clients Say</h2>
                <TestimonialsCarousel testimonials={testimonials} />
                <div className="mt-16">
                    <ShareButtons
                        text="Check out what people are saying about Pinki'z Glamour & Glam Room!"
                        url={window.location.href.split('#')[0] + '#testimonials'}
                        className="justify-center"
                    />
                </div>
                <div className="mt-8">
                    <a 
                        href="#contact" 
                        onClick={handleSmoothScroll}
                        className="inline-block bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900"
                    >
                        Book an Appointment
                    </a>
                </div>
            </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection id="faq" className="bg-gray-900/50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-5xl font-fancy text-pink-300 mb-12">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto text-left space-y-4">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            id={index.toString()}
                            faq={faq}
                            isOpen={openFaqIndex === index}
                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-5xl font-fancy text-pink-300 mb-12 text-center">Book an Appointment</h2>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10">
                <BookingForm bookings={bookings} onBookingSuccess={loadBookings} />
            </div>
            <div className="text-center mt-8">
              <button onClick={() => setIsHistoryModalOpen(true)} className="bg-white/10 text-pink-300 font-bold py-3 px-8 rounded-lg hover:bg-white/20 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900">
                View My Bookings
              </button>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="bg-gray-900 border-t border-white/10 py-10">
        <div className="container mx-auto px-6 text-center text-gray-400">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6">
                <a href="tel:+918389958668" target="_blank" rel="noopener noreferrer" aria-label="Call us at 8389958668" className="flex items-center gap-2 hover:text-pink-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 p-1">
                    <PhoneIcon className="w-5 h-5" />
                    <span>8389958668</span>
                </a>
                <a href="https://maps.google.com/?q=RATH+SARAK+BZAR" target="_blank" rel="noopener noreferrer" aria-label="View our location on Google Maps" className="flex items-center gap-2 hover:text-pink-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 p-1">
                    <MapPinIcon className="w-5 h-5" />
                    <span>RATH SARAK BZAR</span>
                </a>
            </div>
             <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
                <div className="flex justify-center items-center gap-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="text-gray-400 hover:text-pink-400 transition-colors p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900"><FacebookIcon className="w-7 h-7" /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="text-gray-400 hover:text-pink-400 transition-colors p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900"><InstagramIcon className="w-7 h-7" /></a>
                    <a href="#" aria-label="Follow us on Twitter" className="text-gray-400 hover:text-pink-400 transition-colors p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900"><TwitterIcon className="w-7 h-7" /></a>
                    <a href="https://wa.me/918389958668" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp" className="text-gray-400 hover:text-pink-400 transition-colors p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-900"><WhatsAppIcon className="w-7 h-7" /></a>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-sm">
                <a href="#/privacy-policy" target="_blank" rel="noopener noreferrer" aria-label="Read our Privacy Policy" className="hover:text-pink-300 transition-colors underline focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-sm">
                    Privacy Policy
                </a>
                <p className="mt-2">&copy; {new Date().getFullYear()} Pinki'z Glamour & Glam Room. All Rights Reserved.</p>
            </div>
        </div>
      </footer>

      {isHistoryModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn" onClick={() => setIsHistoryModalOpen(false)} role="dialog" aria-modal="true" aria-labelledby="history-heading">
          <div ref={historyModalRef} className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 id="history-heading" className="text-3xl font-fancy text-pink-300 mb-6">Your Bookings</h3>
            {bookings.length > 0 ? (
              <ul className="space-y-4">
                {bookings.map(booking => (
                  <li key={booking.id} className="bg-white/5 p-4 rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">{booking.service}</p>
                      <p className="text-sm text-gray-300">{new Date(booking.date + 'T00:00:00').toLocaleDateString()} at {booking.time}</p>
                      <p className="text-xs text-gray-400">For: {booking.name} ({booking.phone})</p>
                    </div>
                    <button onClick={() => deleteBooking(booking.id)} aria-label={`Delete booking for ${booking.service} on ${new Date(booking.date + 'T00:00:00').toLocaleDateString()}`} className="bg-red-500/20 text-red-400 px-3 py-1 rounded-md hover:bg-red-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-800">Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">You have no upcoming appointments.</p>
            )}
            <button onClick={() => setIsHistoryModalOpen(false)} className="mt-6 bg-pink-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 focus-visible:ring-offset-gray-800">Close</button>
          </div>
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default App;