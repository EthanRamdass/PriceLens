import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AnalysisResult, RecommendedItem } from '../types';
import {
  RefreshIcon, TagIcon, ClothingIcon, ShoesIcon, ElectronicsIcon,
  BookIcon, FoodIcon, DrinkwareIcon, FurnitureIcon, ToolIcon, ToyIcon,
  AmazonIcon, EbayIcon, AlibabaIcon, AliexpressIcon, WalmartIcon, TargetIcon,
  BestBuyIcon, EtsyIcon, PlusIcon, ChevronDownIcon, ChevronUpIcon, LinkIcon,
  ChevronLeftIcon, ChevronRightIcon,
} from './Icons';

interface ResultsDisplayProps {
  results: AnalysisResult;
  imagePreviewUrl: string;
  onReset: () => void;
}

const sellerInfoMap: { [key: string]: { name: string; Icon: React.FC<{className?: string}>; iconClassName: string; } } = {
  amazon: { name: 'Amazon', Icon: AmazonIcon, iconClassName: "w-12 h-5" },
  ebay: { name: 'eBay', Icon: EbayIcon, iconClassName: "w-12 h-5" },
  aliexpress: { name: 'AliExpress', Icon: AliexpressIcon, iconClassName: "w-5 h-5" },
  alibaba: { name: 'Alibaba', Icon: AlibabaIcon, iconClassName: "w-5 h-5" },
  walmart: { name: 'Walmart', Icon: WalmartIcon, iconClassName: "w-5 h-5" },
  target: { name: 'Target', Icon: TargetIcon, iconClassName: "w-5 h-5" },
  bestbuy: { name: 'Best Buy', Icon: BestBuyIcon, iconClassName: "w-5 h-5" },
  etsy: { name: 'Etsy', Icon: EtsyIcon, iconClassName: "w-5 h-5" },
  unknown: { name: 'Unknown', Icon: LinkIcon, iconClassName: "w-5 h-5"}
};

// Define a canonical list of all possible sellers for the filter
const ALL_SELLERS = Object.keys(sellerInfoMap).filter(s => s !== 'unknown').sort();

const getSellerInfo = (seller?: string) => {
  if (!seller || !sellerInfoMap[seller.toLowerCase()]) {
    return sellerInfoMap['unknown'];
  }
  return sellerInfoMap[seller.toLowerCase()];
};

const createSearchUrl = (mainItemName: string, recommendedItemName: string, seller?: string): string => {
  const query = `${mainItemName} ${recommendedItemName}`;
  const encodedName = encodeURIComponent(query);
  switch (seller?.toLowerCase()) {
    case 'amazon':
      return `https://www.amazon.com/s?k=${encodedName}`;
    case 'ebay':
      return `https://www.ebay.com/sch/i.html?_nkw=${encodedName}`;
    case 'aliexpress':
      return `https://www.aliexpress.com/wholesale?SearchText=${encodedName}`;
    case 'alibaba':
      return `https://www.alibaba.com/trade/search?SearchText=${encodedName}`;
    case 'walmart':
        return `https://www.walmart.com/search?q=${encodedName}`;
    case 'target':
        return `https://www.target.com/s?searchTerm=${encodedName}`;
    case 'bestbuy':
        return `https://www.bestbuy.com/site/searchpage.jsp?st=${encodedName}`;
    case 'etsy':
        return `https://www.etsy.com/search?q=${encodedName}`;
    default:
      return `https://www.google.com/search?q=${encodedName}`;
  }
};

const parsePrice = (priceString?: string): number => {
    if (!priceString) return Infinity;
    const match = priceString.match(/[\d,.]+/);
    if (match) {
        return parseFloat(match[0].replace(/,/g, ''));
    }
    return Infinity;
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, imagePreviewUrl, onReset }) => {
  const [processedRecommendations, setProcessedRecommendations] = useState<RecommendedItem[]>(results.recommendations);
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  
  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const availableSellers = useMemo(() => {
    return new Set(results.recommendations.map(item => item.seller));
  }, [results.recommendations]);
  const [selectedSellers, setSelectedSellers] = useState<string[]>(Array.from(availableSellers));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // When the results change, we must update the selected sellers to reflect the new set of available sellers.
  useEffect(() => {
    setSelectedSellers(Array.from(availableSellers));
  }, [availableSellers]);
  
  // Effect to handle filtering and sorting
  useEffect(() => {
    let processed = [...results.recommendations].filter(item => selectedSellers.includes(item.seller));

    if (sortOrder !== 'default') {
        processed.sort((a, b) => {
            const priceA = parsePrice(a.averagePrice);
            const priceB = parsePrice(b.averagePrice);
            if (priceA === Infinity && priceB === Infinity) return 0;
            if (priceA === Infinity) return 1;
            if (priceB === Infinity) return -1;
            return sortOrder === 'price-asc' ? priceA - priceB : priceB - priceA;
        });
    }
    setProcessedRecommendations(processed);
    setCurrentPage(1); // Reset to page 1 whenever filters or sort order change
  }, [results.id, sortOrder, selectedSellers]);

  // Effect to handle closing filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setIsFilterOpen(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);


  const handleSort = () => {
    const nextSortOrder = sortOrder === 'price-asc' ? 'price-desc' : 'price-asc';
    setSortOrder(nextSortOrder);
  };

  const handleSellerToggle = (seller: string) => {
    setSelectedSellers(prev =>
        prev.includes(seller)
            ? prev.filter(s => s !== seller)
            : [...prev, seller]
    );
  };

  const handleSelectAll = () => {
    setSelectedSellers(ALL_SELLERS.filter(seller => availableSellers.has(seller)));
  };
  
  const handleClearAll = () => {
    setSelectedSellers([]);
  };

  const renderSortIcon = () => {
    const className = "w-4 h-4";
    if (sortOrder === 'price-asc') return <ChevronUpIcon className={className} />;
    if (sortOrder === 'price-desc') return <ChevronDownIcon className={className} />;
    return <ChevronDownIcon className={`${className} opacity-50`} />;
  };

  // Pagination calculations
  const totalPages = Math.ceil(processedRecommendations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedRecommendations.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(1); // Reset to first page
  };
  
  const renderPagination = () => (
    <div className="mt-8 flex justify-center items-center gap-2 sm:gap-4 text-sm sm:text-base">
        <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
        >
            <ChevronLeftIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
            <label htmlFor="page-select" className="text-gray-400">Page:</label>
            <select
                id="page-select"
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="bg-gray-800 border border-gray-600 rounded-md py-1.5 px-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <option key={pageNumber} value={pageNumber}>
                        {pageNumber} of {totalPages}
                    </option>
                ))}
            </select>
        </div>

        <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
        >
            <ChevronRightIcon className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
            <select
                id="items-per-page-select"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-gray-800 border border-gray-600 rounded-md py-1.5 px-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
                <option value={6}>6 per page</option>
                <option value={9}>9 per page</option>
                <option value={12}>12 per page</option>
            </select>
        </div>
    </div>
  );

  const renderItemCard = (item: RecommendedItem, index: number) => {
    const sellerInfo = getSellerInfo(item.seller);
    const finalUrl = createSearchUrl(results.itemName, item.name, item.seller);

    return (
      <a href={finalUrl} target="_blank" rel="noopener noreferrer" key={`${item.name}-${index}`} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col group transition-all duration-200 hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-square w-full bg-gray-700 overflow-hidden">
          <img 
              src={item.imageUrl && 
                   !item.imageUrl.includes('placeholder') && 
                   !item.imageUrl.includes('not-available') &&
                   !item.imageUrl.includes('picsum') &&
                   item.imageUrl.startsWith('http') ? 
                   item.imageUrl : 
                   `https://picsum.photos/seed/${encodeURIComponent(item.name)}/300/300`} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                console.log(`Image failed to load for ${item.name}: ${item.imageUrl}`);
                e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(item.name)}/300/300`;
              }}
          />
          {item.averagePrice && (
            <div className="absolute bottom-2 left-2 bg-yellow-400/90 backdrop-blur-sm text-gray-900 font-bold text-lg py-1 px-3 rounded-md shadow-lg">
              {item.averagePrice}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <p className="font-semibold text-white flex-grow mb-3 leading-tight h-12 group-hover:text-indigo-300 transition-colors">{item.name}</p>
          <div className="mt-auto flex justify-between items-center">
            {sellerInfo ? (
                <div className="flex items-center gap-1.5">
                    <sellerInfo.Icon className={sellerInfo.iconClassName} />
                    <span className="text-sm text-gray-400">{sellerInfo.name}</span>
                </div>
            ) : null}
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
          <img src={imagePreviewUrl} alt="Scanned item" className="w-full h-auto object-cover rounded-2xl shadow-lg border-2 border-gray-700" />
          <p className="text-2xl font-bold text-white tracking-tight mt-4">{results.itemName}</p>
          <p className="text-lg text-gray-400 mt-1">Estimated Average Price</p>
          <p className="text-4xl font-bold text-emerald-400">{results.averagePrice}</p>
          <button
            onClick={onReset}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200"
          >
            <RefreshIcon className="w-5 h-5" />
            Scan Another Item
          </button>
        </div>
        
        <div className="md:w-2/3 lg:w-3-4">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-semibold text-white">Similar Items</h2>
             <div className="hidden sm:flex items-center gap-4">
                <div className="relative" ref={filterRef}>
                  <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-full text-sm hover:bg-gray-600 transition-colors">
                    Filter
                    <PlusIcon className="w-4 h-4" />
                  </button>
                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-white text-sm">Filter by Seller</h3>
                        <div className="flex gap-2">
                           <button onClick={handleSelectAll} className="text-xs text-indigo-400 hover:underline">All</button>
                           <button onClick={handleClearAll} className="text-xs text-gray-400 hover:underline">None</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-60 overflow-y-auto pr-2">
                        {ALL_SELLERS.map(seller => {
                          const isAvailable = availableSellers.has(seller);
                          const labelClass = isAvailable ? 'text-white cursor-pointer' : 'text-gray-500 line-through cursor-not-allowed';

                          return (
                            <label key={seller} className={`flex items-center gap-2 capitalize text-sm ${labelClass}`}>
                              <input
                                type="checkbox"
                                checked={selectedSellers.includes(seller)}
                                onChange={() => handleSellerToggle(seller)}
                                disabled={!isAvailable}
                                className="h-4 w-4 bg-gray-700 border-gray-500 rounded text-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              />
                              <span>{getSellerInfo(seller)?.name || seller}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Sort by:</span>
                  <button onClick={handleSort} className="flex items-center gap-1 font-semibold text-white">
                      Price
                      {renderSortIcon()}
                  </button>
                </div>
             </div>
          </div>
          {currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map(renderItemCard)}
              </div>
              {totalPages > 1 && renderPagination()}
            </>
          ) : (
            <div className="text-center py-16 px-4 bg-gray-800 rounded-lg">
              <p className="text-gray-400">No items match your current filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;