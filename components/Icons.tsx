import React from 'react';

interface IconProps {
  className?: string;
}

export const CameraIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 15M20 20l-1.5-1.5A9 9 0 003.5 9" />
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const CropIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.628 3H3v4.628M16.372 3H21v4.628M3 16.372V21h4.628M16.372 21H21v-4.628" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
    <path d="M5.5 5.5A.5.5 0 0 1 6 5h12a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zM5 8.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0-.5.5zM12 4.5v15m7.5-7.5h-15M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.6,10.5H16.4a.9.9,0,0,1-.9-.9V5.4a.9.9,0,0,1,.9-.9h4.2a.9.9,0,0,1,.9.9v4.2A.9.9,0,0,1,20.6,10.5Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.5,21V16.8a.9.9,0,0,0-.9-.9H7.4a.9.9,0,0,0-.9.9V21" />
  </svg>
);

// Category Icons
export const ClothingIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 12h16M4 16h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4v16M15 4v16" />
  </svg>
);

export const ShoesIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 15v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 15h16" />
  </svg>
);

export const ElectronicsIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="4" y="6" width="16" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5V4.5A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const FoodIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-6m0-4h.01" />
  </svg>
);

export const DrinkwareIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 8h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v4H5v-4h2a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H5V4h14v4z" />
  </svg>
);

export const FurnitureIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6v12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6v12" />
  </svg>
);

export const ToolIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9.26 5.5-5.5-1.42-1.42-5.5 5.5-2.12-2.12-5.5 5.5 1.42 1.42 5.5-5.5 2.12 2.12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m12 12 5.5-5.5" />
  </svg>
);

export const ToyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12m0-10v10m0 0h10M12 12H2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
  </svg>
);

// Shopping Icons
export const AmazonIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.33 21.362c1.434.793 3.039 1.125 4.67 1.018 2.05-.134 3.93-.93 5.438-2.22l.206-.176c.036-.03.072-.06.108-.093l.063-.058c.24-.224.288-.616.1-.913-.186-.296-.583-.393-.895-.22l-.233.125c-1.2.645-2.583.99-3.992.934-1.228-.048-2.42-.4-3.468-1.02-.33-.194-.755.035-.788.455-.034.42.3.74.63.843zm9.352-7.234c.324.24.78.12.96-.24 1.54-3.09 3.1-6.16 4.63-9.25.12-.24.04-5.4-.18-5.3-.22.1-3.15 1.8-3.15 1.8s-.17.3-.34.3c-.17 0-1.8-1.3-1.8-1.3-.2-.14-.47-.07-.58.13-.11.2-.04.47.13.58l1.3 1c.14.07.2.14.2.2 0 .07-3.1 6.2-4.1 8.2-.1.2-.04.47.14.58z"/></svg>
);
export const EbayIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.02 14.53c-.31-.82-.76-1.56-1.32-2.22-.57-.66-1.25-1.23-2.02-1.72-1.07-.68-2.33-1.05-3.64-1.1-1.31-.05-2.62.22-3.83.79-.81.38-1.57.88-2.26 1.47-.69.59-1.3 1.27-1.81 2.03-.51.76-.91 1.6-1.18 2.48C5.55 19.89 6.42 21 7.6 21c1.47 0 2.4-1.38 2.76-2.43.36-1.05.99-1.95 1.81-2.64.82-.69 1.8-1.13 2.86-1.27.4-.05.8-.08 1.2-.08.64 0 1.28.08 1.89.24.61.16 1.18.42 1.69.76.51.34.95.76 1.29 1.24s.58 1.02.7 1.58c.11.56.12 1.13.01 1.69-.11.56-.34 1.09-.67 1.57-.33.48-.75.89-1.23 1.22-.48.33-.99.58-1.52.74-.53.16-1.06.23-1.58.23-.42 0-.84-.04-1.24-.11-.4-.07-.79-.18-1.16-.32-.37-.14-.71-.32-1.03-.52-.32-.2-.6-.42-.85-.66-.25-.24-.46-.5-.62-.76-.16-.26-.26-.52-.3-.78-.04-.26-.02-.52.06-.78.08-.26.22-.5.42-.71l-1.6-3.85c-.32.2-.6.42-.85.66-.25-.24-.46.5-.62.76-.16-.26-.26-.52-.3.78-.04-.26-.02-.52.06-.78.08-.26.22-.5.42-.71l1.52-1.31c.33-.28.7-.51 1.1-.67.4-.16.83-.26 1.26-.28.43-.02.86.03 1.28.15.42.12.82.31 1.2.56.38.25.73.56.9.79l2.25 3.03c.56.75 1.3 1.33 2.16 1.69.86.36 1.8.48 2.73.34.93-.14 1.81-.54 2.56-1.15.75-.61 1.34-1.4 1.72-2.29.38-.89.55-1.84.48-2.78zM10.1 2.1c-.02-.68-.56-1.23-1.24-1.23H3.14c-.68 0-1.23.55-1.24 1.23v14.77c0 .68.55 1.23 1.24 1.23h5.72c.68 0 1.23-.55 1.24-1.23V2.1z"/></svg>
);
export const AlibabaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5v-2.5c0-.28.22-.5.5-.5s.5.22.5.5v2.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5zm3-5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-5zm-3-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5zm-1.5-3c.83 0 1.5-.67 1.5-1.5S9.33 6.5 8.5 6.5 7 7.17 7 8s.67 1.5 1.5 1.5z"/></svg>
);
export const AliexpressIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14h-1.85l-1.65-3.45L10.35 16H8.5l3.5-5.5L8.5 5h1.85l1.65 3.45L13.65 5h1.85l-3.5 5.5L15.5 16z"/></svg>
);
export const WalmartIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.6c-5.18 0-9.4 4.22-9.4 9.4s4.22 9.4 9.4 9.4 9.4-4.22 9.4-9.4S17.18 2.6 12 2.6zm-1.88 12.21L6.2 12l3.92-2.81.94.94L8.71 12l2.35 1.88-.94.93zm3.76 0l-3.92-2.81.94-.94L15.29 12l-2.35-1.88.94-.93L17.8 12l-3.92 2.81z"/></svg>
);
export const TargetIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>
);
export const BestBuyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.9 2.1H5.1C3.4 2.1 2.1 3.4 2.1 5.1v13.8c0 1.7 1.3 3 3 3h13.8c1.7 0 3-1.3 3-3V5.1c0-1.7-1.3-3-3-3zM12 18.5c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z"/></svg>
);
export const EtsyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 12c0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);