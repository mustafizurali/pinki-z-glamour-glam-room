import React from 'react';
import { ServiceIconProps } from '../types';

export const FaceIcon: React.FC<ServiceIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9v-.008zm6 0h.008v.008H15v-.008z" />
  </svg>
);

export const HairIcon: React.FC<ServiceIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c-2.483 0-4.5 2.017-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.017 4.5-4.5-2.017-4.5-4.5-4.5zm0 0V3m-6.364 3.364c1.171-1.171 2.707-1.864 4.364-1.864s3.193.693 4.364 1.864m-8.728 0a4.5 4.5 0 01-6.364 0m6.364 0a4.5 4.5 0 00-6.364 0m6.364 0V3m-2.25 6.75a4.5 4.5 0 00-6.364-6.364M3.75 12a4.5 4.5 0 006.364 6.364" />
  </svg>
);

export const MakeupIcon: React.FC<ServiceIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25c-5.508 0-10.734 2.186-14.17 6.084A14.98 14.98 0 001.03 21.75a14.98 14.98 0 0014.56-7.38z" />
  </svg>
);

export const HandIcon: React.FC<ServiceIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const WaxingIcon: React.FC<ServiceIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 012.827-5.586l.292-.122a4.5 4.5 0 015.586 2.827l.122.292a4.5 4.5 0 01-5.586 2.827z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 3.75l-1.5 1.5M17.25 6l-1.5-1.5M16.5 4.5l-1.5 1.5M15 6l-1.5-1.5M12.75 3.75l-1.5 1.5M11.25 6l-1.5-1.5" />
  </svg>
);

export const EyebrowIcon: React.FC<ServiceIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const PhoneIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
);

export const MapPinIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

export const FacebookIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
    </svg>
);

export const InstagramIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.441c-3.116 0-3.483.011-4.71.069-2.734.124-3.957 1.35-4.081 4.081-.058 1.226-.069 1.593-.069 4.71s.011 3.483.069 4.71c.124 2.734 1.347 3.957 4.081 4.081 1.227.058 1.594.069 4.71.069s3.483-.011 4.71-.069c2.734-.124 3.957-1.347 4.081-4.081.058-1.227.069-1.594.069-4.71s-.011-3.483-.069-4.71c-.124-2.734-1.347-3.957-4.081-4.081-1.227-.058-1.594-.069-4.71-.069z"></path><path d="M12 6.848c-2.835 0-5.152 2.316-5.152 5.152s2.317 5.152 5.152 5.152 5.152-2.316 5.152-5.152-2.317-5.152-5.152-5.152zm0 8.864c-2.049 0-3.712-1.663-3.712-3.712s1.663-3.712 3.712-3.712 3.712 1.663 3.712 3.712-1.663 3.712-3.712 3.712zm6.406-9.663c-.755 0-1.367.612-1.367 1.367s.612 1.367 1.367 1.367 1.367-.612 1.367-1.367-.612-1.367-1.367-1.367z"></path>
    </svg>
);

export const TwitterIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.646 1.956 2.523 3.379 4.75 3.42a9.875 9.875 0 01-6.117 2.107c-.397 0-.79-.023-1.175-.068a13.963 13.963 0 007.548 2.212c9.054 0 14.01-7.496 14.01-14.013 0-.213-.005-.426-.015-.637a9.935 9.935 0 002.433-2.52z"></path>
    </svg>
);

export const WhatsAppIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.82l-1.34 4.92 5.04-1.32c1.4.74 2.97 1.18 4.63 1.18h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.22 15.2c-.28-.14-1.65-.81-1.91-.91s-.45-.14-.64.14-.72.91-.88 1.09-.32.2-.59.07c-1.12-.52-2.11-1.15-2.95-1.92s-1.4-1.74-1.58-2.04c-.17-.3-.02-.46.12-.6l.54-.62c.09-.1.14-.23.21-.38.07-.14.04-.28-.02-.42l-.6-1.44c-.25-.59-.5-.64-.69-.65-.17-.02-.37-.02-.57-.02s-.52.07-.79.35c-.27.28-1.03.99-1.03 2.41s1.06 2.81 1.21 3.01c.14.2 2.08 3.18 5.04 4.49 2.95 1.3 2.95.88 3.48.82.53-.06 1.65-.67 1.88-1.32.24-.65.24-1.21.17-1.32-.07-.11-.26-.18-.54-.32z"></path>
    </svg>
);

export const QuoteIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
    </svg>
);

export const SearchIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const ChevronDownIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const ChevronLeftIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

export const ChevronRightIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export const ChevronUpIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
);

export const StarIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const PlayIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
);

export const PauseIcon: React.FC<ServiceIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5zm6.5 0a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
    </svg>
);