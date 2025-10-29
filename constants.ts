// FIX: Import React to resolve the 'Cannot find namespace 'React'' error for the CSSProperties type.
import React from 'react';

export const serviceCategories = [
    { 
        icon: 'facial', 
        title: 'Facial', 
        description: 'Rejuvenate your skin with our range of custom facials.',
        details: 'Choose from a variety of facials including fruit, gold, diamond, and VLCC brightening to cleanse, exfoliate, and nourish your skin for a radiant glow.'
    },
    { 
        icon: 'hair', 
        title: 'Hair Treatment', 
        description: 'From styling to spa treatments, we care for your hair.',
        details: 'We offer everything from stylish V-cuts and U-cuts to intensive hair spa, scalp treatments, and solutions for hair fall control.'
    },
    { 
        icon: 'makeup', 
        title: 'Pinki\'z Makeover', 
        description: 'Bridal, party, or reception makeup for any occasion.',
        details: 'Look your absolute best for any event with our professional makeup services, including bridal, party, reception, and normal makeup application.'
    },
    { 
        icon: 'waxing', 
        title: 'Waxing', 
        description: 'Smooth, hair-free skin with our professional waxing services.',
        details: 'Achieve silky-smooth skin with our comprehensive waxing services for underarms, hands, legs, full body, and face.'
    },
    { 
        icon: 'nails', 
        title: 'Pedicure & Manicure', 
        description: 'Pamper your hands and feet to perfection.',
        details: 'Indulge in our classic or spa pedicures and manicures to keep your hands and feet looking beautiful and feeling great.'
    },
    { 
        icon: 'eyebrow', 
        title: 'Threading', 
        description: 'Perfectly shaped eyebrows and facial threading.',
        details: 'Define your look with our precise threading services for eyebrows, upper lip, forehead, chin, and full face.'
    },
];

export const specialOffers = [
    {
        title: 'Fruit Facial',
        description: 'A refreshing facial using natural fruit extracts to revitalize your skin.',
        deal: 'Free Eyebrow & Massage'
    },
    {
        title: 'VLCC Brightening',
        description: 'Achieve a brighter, more even skin tone with this advanced treatment.',
        deal: 'Free Pedicure'
    },
    {
        title: 'Branded Facial',
        description: 'Experience luxury with a facial from a top-tier beauty brand.',
        deal: 'Free Manicure & Eyebrow'
    },
    {
        title: 'Hair SPA',
        description: 'Deeply condition and nourish your hair for a silky, healthy shine.',
        deal: 'Free Eyebrow & Forehead'
    },
    {
        title: 'Cleanup',
        description: 'A deep cleansing treatment to remove impurities and refresh your skin.',
        deal: 'Free Back Cleanup'
    },
    {
        title: 'Scalp Treatment',
        description: 'Soothe and treat your scalp to promote healthy hair growth.',
        deal: 'Free Shampoo Wash'
    }
];

export const priceList = [
    {
        title: 'Eyebrows & Threading',
        items: [
            { name: 'Eyebrow', price: '20/-' },
            { name: 'Upper lip', price: '10/-' },
            { name: 'Forehead', price: '10/-' },
            { name: 'Chin', price: '15/-' },
            { name: 'Full Face Threading', price: '149/-' },
        ],
    },
    {
        title: 'Pedicure & Manicure',
        items: [
            { name: 'Pedicure', price: '269/-' },
            { name: 'Manicure', price: '269/-' },
            { name: 'Spa Pedicure', price: '299/-' },
            { name: 'Spa Manicure', price: '299/-' },
        ],
    },
    {
        title: 'Waxing',
        items: [
            { name: 'Underarm', price: '29/-' },
            { name: 'Hand', price: '149/-' },
            { name: 'Half Leg', price: '149/-' },
            { name: 'Full hand', price: '199/-' },
            { name: 'Full Leg', price: '299/-' },
            { name: 'Full Body', price: '699/-' },
            { name: 'Full face waxing', price: '199/-' },
        ],
    },
    {
        title: 'Facials',
        items: [
            { name: 'Cleanup', price: '349/-', note: '(Back Cleanup Free)' },
            { name: 'Fruit', price: '399/-', note: '(Eye Brow & Masage Free)' },
            { name: 'Gold', price: '699/-' },
            { name: 'Diamond', price: '799/-' },
            { name: 'VLCC Brightening', price: '999/-', note: '(Pedicure Free)' },
            { name: 'Any Branded Fecial', price: '1999/-', note: '(Manicure & Eye Brow Free)' },
        ],
    },
    {
        title: 'Hair Cut & Treatment',
        items: [
            { name: 'V-Cut', price: '99/-' },
            { name: 'U-Cut', price: '99/-' },
            { name: 'One Lenght', price: '30/-' },
            { name: 'Hair SPA', price: '499-999/-', note: '(Eye Brow & Forehead Free)' },
            { name: 'Scalp Treatment', price: '199/-', note: '(Sampo Wash Free)' },
            { name: 'Hair Fall Treatment', price: '199/-' },
        ],
    },
    {
        title: 'Makeup',
        items: [
            { name: 'Normal Makeup', price: '799/-' },
            { name: 'Hair Style Normal', price: '299/-' },
            { name: 'Bridal hair Style', price: '499/-' },
            { name: 'Bridal Makeup', price: '3999/-' },
        ],
    },
];

export const galleryImages: {
    src: string;
    alt: string;
    caption: string;
    category: string;
    style?: React.CSSProperties;
}[] = [
    {
        src: 'https://storage.googleapis.com/generative-ai-pro-is-external-images/user-1718833987118.jpeg',
        alt: 'Stunning Indian bridal makeover by Pinki\'z Glam Room, featuring intricate traditional makeup, radiant skin, and elegant gold jewelry.',
        caption: 'Elegant bridal transformations for your most special day.',
        category: 'Bridal',
    },
    {
        src: 'https://storage.googleapis.com/generative-ai-pro-is-external-images/user-1718833987132.jpeg',
        alt: 'Elegant updo hairstyle with delicate floral accessories created at Pinki\'z Glam Room, perfect for weddings or special events.',
        caption: 'Creative and chic hairstyles for any occasion.',
        category: 'Hair',
    },
    {
        src: 'https://storage.googleapis.com/generative-ai-pro-is-external-images/user-1718833987135.jpeg',
        alt: 'Professional party makeup from Pinki\'z Glam Room, showcasing dramatic smokey eye makeup, flawless airbrushed skin, and a bold lip.',
        caption: 'Glamorous party makeup that makes you shine.',
        category: 'Makeup',
    },
    {
        src: 'https://storage.googleapis.com/generative-ai-pro-is-external-images/user-1718833987114.jpeg',
        alt: 'Beautician and owner Pinki of Pinki\'z Glam Room proudly holding a trophy and certificate, recognized for excellence in beauty and makeup artistry.',
        caption: 'Proud moments: Recognized for excellence in beauty services.',
        category: 'Awards',
    },
    {
        src: 'https://storage.googleapis.com/generative-ai-pro-is-external-images/user-1718833987123.jpeg',
        alt: 'Joyful bride after her makeover at Pinki\'z Glam Room, wearing a vibrant red and yellow saree and showcasing a complete traditional bridal look.',
        caption: 'Capturing the joy of our beautiful brides.',
        category: 'Bridal',
    },
    {
        src: 'https://storage.googleapis.com/generative-ai-pro-is-external-images/user-1718833987127.jpeg',
        alt: 'A happy client poses with makeup artist Pinki, showcasing a complete traditional Indian bridal makeup look from Pinki\'z Glam Room.',
        caption: 'Happy clients, our greatest reward.',
        category: 'Makeup',
    }
];

export const testimonials = [
  {
    quote: "Pinki is a true artist! For my wedding, she not only created the most flawless, radiant look that lasted through tears and dancing, but she also made me feel so calm and beautiful during the whole process. I received endless compliments, and the photos are a dream. I can't recommend her enough for any bride!",
    name: 'Anjali S.',
    service: 'Bridal Makeup',
    image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=800&auto=format&fit=crop',
    rating: 5,
  },
  {
    quote: "The hair spa at Pinki'z is my secret weapon! I walked in with dry, lifeless hair and left feeling like a movie star. It's now unbelievably soft, shiny, and manageable. The salon has such a relaxing vibe, it's the perfect escape. A must-try service!",
    name: 'Priya K.',
    service: 'Hair Spa',
    image: 'https://images.unsplash.com/photo-1599577181262-29215b205364?q=80&w=800&auto=format&fit=crop',
    rating: 5,
  },
  {
    quote: "For years, Pinki'z has been my go-to for waxing and threading. The results are always perfect and the process is quick and as painless as possible. What stands out is their commitment to hygiene and making you feel comfortable. It's rare to find a place you trust so completely.",
    name: 'Roshni M.',
    service: 'Waxing & Threading',
    image: 'https://images.unsplash.com/photo-1552695845-42a00b8a1c93?q=80&w=800&auto=format&fit=crop',
    rating: 5,
  },
  {
    quote: "I'm absolutely obsessed with my nails! Pinki is so creative and her attention to detail is incredible. I showed her an inspiration picture and she created something even more beautiful. The salon is clean and the whole experience was so relaxing. I've found my forever nail artist!",
    name: 'Sneha P.',
    service: 'Nail Art & Manicure',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    rating: 5,
  },
  {
    quote: "The Gold Facial was pure magic. My skin has never felt so soft or looked so bright and hydrated. Pinki really takes the time to understand your skin's needs. It was an incredibly relaxing experience, and the results speak for themselves. I'm already glowing for my cousin's wedding!",
    name: 'Meera D.',
    service: 'Gold Facial',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    rating: 5,
  },
  {
    quote: "I was so nervous to get a new haircut, but Pinki listened to exactly what I wanted and gave me the most stylish, modern V-cut. It's so easy to manage and I've gotten so many compliments. She has a real talent for hair! Thank you for boosting my confidence.",
    name: 'Kavita R.',
    service: 'Haircut & Styling',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    rating: 5,
  }
];

export const faqs = [
    {
        question: "What payment methods do you accept?",
        answer: "We accept cash, UPI (like Google Pay, PhonePe), and all major credit and debit cards for your convenience."
    },
    {
        question: "Do I need to book an appointment in advance?",
        answer: "While walk-ins are welcome, we highly recommend booking an appointment in advance to ensure availability and avoid waiting times, especially for longer services like bridal makeup or hair spas."
    },
    {
        question: "How long does a typical bridal makeup session take?",
        answer: "A complete bridal makeup session, including hair styling, typically takes around 2.5 to 3 hours. We recommend a consultation beforehand to discuss your desired look."
    },
    {
        question: "Are your products safe for sensitive skin?",
        answer: "Yes, we prioritize your skin's health. We use high-quality, hypoallergenic products from reputable brands. Please inform us of any specific allergies or skin sensitivities during your consultation."
    },
    {
        question: "What is your cancellation policy?",
        answer: "We understand that plans can change. Please inform us at least 24 hours in advance if you need to cancel or reschedule your appointment to avoid any cancellation fees."
    }
];