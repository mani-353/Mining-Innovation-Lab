
// import { useState, useEffect, useMemo } from 'react';
// import { supabase } from '@/integrations/supabase/client';

// export interface MiningAccident {
//   Id: number;
//   Year?: number;
//   'Brief Cause'?: string;
//   State?: string;
//   'Date of Accident'?: string;
//   Killed?: string | number;
//   'Serious Inj.'?: string;
//   'S/Inj.'?: string;
//   'Name  of Mine'?: string;
//   Owner?: string;
//   'Place of Accident'?: string;
// }

// interface Filters {
//   years?: number[];
//   states?: string[];
//   causes?: string[];
// }

// interface FilterOptions {
//   years: number[];
//   states: string[];
//   causes: string[];
// }

// export const useOptimizedMiningData = () => {
//   const [coalData, setCoalData] = useState<MiningAccident[]>([]);
//   const [nonCoalData, setNonCoalData] = useState<MiningAccident[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [filterOptions, setFilterOptions] = useState<FilterOptions>({
//     years: [],
//     states: [],
//     causes: []
//   });

//   // Load filter options from localStorage or fetch from database
//   const loadFilterOptions = async () => {
//     console.log('🔄 Loading filter options...');

//     // Try to get from localStorage first
//     const storedOptions = localStorage.getItem('miningFilterOptions');
//     if (storedOptions) {
//       console.log('📦 Found cached filter options in localStorage');
//       const parsed = JSON.parse(storedOptions);
//       setFilterOptions(parsed);
//       return;
//     }

//     console.log('🌐 Fetching filter options from database...');
//     try {
//       // Fetch unique years from both tables
//       const [coalYears, nonCoalYears] = await Promise.all([
//         supabase.from('Coal Mining Accident data').select('Year').not('Year', 'is', null),
//         supabase.from('Non Coal Mining Accident data').select('Year').not('Year', 'is', null)
//       ]);

//       // Fetch unique states from both tables
//       const [coalStates, nonCoalStates] = await Promise.all([
//         supabase.from('Coal Mining Accident data').select('State').not('State', 'is', null),
//         supabase.from('Non Coal Mining Accident data').select('State').not('State', 'is', null)
//       ]);

//       // Fetch unique causes from both tables
//       const [coalCauses, nonCoalCauses] = await Promise.all([
//         supabase.from('Coal Mining Accident data').select('Brief Cause').not('Brief Cause', 'is', null),
//         supabase.from('Non Coal Mining Accident data').select('Brief Cause').not('Brief Cause', 'is', null)
//       ]);

//       // Combine and deduplicate
//       const allYears = [...new Set([
//         ...(coalYears.data?.map(item => item.Year).filter(Boolean) || []),
//         ...(nonCoalYears.data?.map(item => item.Year).filter(Boolean) || [])
//       ])].sort((a, b) => a - b);

//       const allStates = [...new Set([
//         ...(coalStates.data?.map(item => item.State).filter(Boolean) || []),
//         ...(nonCoalStates.data?.map(item => item.State).filter(Boolean) || [])
//       ])].sort();

//       const allCauses = [...new Set([
//         ...(coalCauses.data?.map(item => item['Brief Cause']).filter(Boolean) || []),
//         ...(nonCoalCauses.data?.map(item => item['Brief Cause']).filter(Boolean) || [])
//       ])].sort();

//       const options = {
//         years: allYears,
//         states: allStates,
//         causes: allCauses
//       };

//       console.log('✅ Filter options fetched successfully:', options);
//       setFilterOptions(options);

//       // Store in localStorage
//       localStorage.setItem('miningFilterOptions', JSON.stringify(options));

//     } catch (err) {
//       console.error('❌ Error fetching filter options:', err);
//     }
//   };

//   // Clear localStorage when tab is closed
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       localStorage.removeItem('miningFilterOptions');
//       console.log('🗑️ Cleared filter options from localStorage');
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, []);

//   const fetchOptimizedData = async (filters: Filters = {}, mineType: string = 'coal') => {
//     console.log('🔄 Fetching mining data with filters:', { filters, mineType });
//     setLoading(true);
//     setError(null);

//     try {
//       const tableName = mineType === 'coal' 
//         ? 'Coal Mining Accident data' 
//         : 'Non Coal Mining Accident data';

//       let query = supabase.from(tableName).select('*');

//       // Apply multi-selection filters
//       if (filters.years && filters.years.length > 0) {
//         query = query.in('Year', filters.years);
//         console.log('📅 Applied year filters:', filters.years);
//       }

//       if (filters.states && filters.states.length > 0) {
//         query = query.in('State', filters.states);
//         console.log('🗺️ Applied state filters:', filters.states);
//       }

//       if (filters.causes && filters.causes.length > 0) {
//         query = query.in('Brief Cause', filters.causes);
//         console.log('⚠️ Applied cause filters:', filters.causes);
//       }

//       const { data, error: queryError } = await query;

//       if (queryError) throw queryError;

//       console.log(`✅ Fetched ${data?.length || 0} records for ${mineType} mining`);

//       if (mineType === 'coal') {
//         setCoalData(data || []);
//       } else {
//         setNonCoalData(data || []);
//       }

//     } catch (err) {
//       console.error('❌ Error fetching data:', err);
//       setError(err instanceof Error ? err.message : 'Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize filter options on mount
//   useEffect(() => {
//     loadFilterOptions();
//   }, []);

//   // Memoized data processing
//   const processedData = useMemo(() => {
//     return {
//       coalSummary: {
//         totalAccidents: coalData.length,
//         totalFatalities: coalData.reduce((sum, accident) => {
//           const killed = typeof accident.Killed === 'string' 
//             ? parseInt(accident.Killed) || 0 
//             : (accident.Killed as number) || 0;
//           return sum + killed;
//         }, 0)
//       },
//       nonCoalSummary: {
//         totalAccidents: nonCoalData.length,
//         totalFatalities: nonCoalData.reduce((sum, accident) => {
//           const killed = typeof accident.Killed === 'string' 
//             ? parseInt(accident.Killed) || 0 
//             : (accident.Killed as number) || 0;
//           return sum + killed;
//         }, 0)
//       }
//     };
//   }, [coalData, nonCoalData]);

//   return {
//     coalData,
//     nonCoalData,
//     loading,
//     error,
//     filterOptions,
//     processedData,
//     refetch: fetchOptimizedData,
//     loadFilterOptions
//   };
// };


import { useState, useEffect, useMemo } from 'react';
import { db } from '@/integrations/firebase/client';
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData
} from 'firebase/firestore';

export interface MiningAccident {
  Id: number;
  Year?: number;
  'Brief Cause'?: string;
  State?: string;
  'Date of Accident'?: string;
  Killed?: string | number;
  'Serious Inj.'?: string;
  'S/Inj.'?: string;
  'Name  of Mine'?: string;
  Owner?: string;
  'Place of Accident'?: string;
}

interface Filters {
  years?: number[];
  states?: string[];
  causes?: string[];
}

interface FilterOptions {
  years: number[];
  states: string[];
  causes: string[];
}

export const useOptimizedMiningData = () => {
  const [coalData, setCoalData] = useState<MiningAccident[]>([]);
  const [nonCoalData, setNonCoalData] = useState<MiningAccident[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    years: [],
    states: [],
    causes: []
  });

  // 🔄 Helper: Convert Firestore documents to usable data
  const getAllDocuments = async (collectionName: string): Promise<MiningAccident[]> => {
    try {
      const q = query(collection(db, collectionName));
      const snapshot = await getDocs(q);
      const data: MiningAccident[] = snapshot.docs.map(doc => doc.data() as MiningAccident);
      console.log(`📥 Retrieved ${data.length} documents from ${collectionName}`);
      console.log('🔍 Sample Row:', data[0]); // Show 1 row for debugging
      return data;
    } catch (err) {
      console.error(`❌ Error fetching documents from ${collectionName}:`, err);
      throw err;
    }
  };

  // 🔁 Load unique filter options
  const loadFilterOptions = async () => {
    try {
      const [coal, nonCoal] = await Promise.all([
        getAllDocuments('coalAccidentData'),
        getAllDocuments('NonCoalAccidentData')
      ]);

      const getUnique = (arr: any[], key: keyof MiningAccident) =>
        Array.from(new Set(arr.map(item => item[key]).filter(Boolean))).sort();

      const options = {
        years: getUnique([...coal, ...nonCoal], 'Year') as number[],
        states: getUnique([...coal, ...nonCoal], 'State') as string[],
        causes: getUnique([...coal, ...nonCoal], 'Brief Cause') as string[]
      };

      setFilterOptions(options);
      localStorage.setItem('miningFilterOptions', JSON.stringify(options));
      console.log('✅ Filter options loaded:', options);
    } catch (err) {
      console.error('❌ Failed to load filter options:', err);
    }
  };

  const fetchOptimizedData = async (filters: Filters = {}, mineType = 'coal') => {
    setLoading(true);
    try {
      const collectionName = mineType === 'coal' ? 'coalAccidentData' : 'NonCoalAccidentData';
      let data = await getAllDocuments(collectionName);

      if (filters.years?.length) {
        data = data.filter(item => filters.years?.includes(item.Year!));
        console.log('📅 Year Filter Applied');
      }
      if (filters.states?.length) {
        data = data.filter(item => filters.states?.includes(item.State!));
        console.log('🗺️ State Filter Applied');
      }
      if (filters.causes?.length) {
        data = data.filter(item => filters.causes?.includes(item['Brief Cause']!));
        console.log('⚠️ Cause Filter Applied');
      }

      if (mineType === 'coal') {
        setCoalData(data);
      } else {
        setNonCoalData(data);
      }
      console.log(`✅ Fetched ${data.length} records after filtering`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFilterOptions();

    return () => {
      localStorage.removeItem('miningFilterOptions');
    };
  }, []);

  const processedData = useMemo(() => {
    return {
      coalSummary: {
        totalAccidents: coalData.length,
        totalFatalities: coalData.reduce((sum, a) => sum + (parseInt(a.Killed as string) || 0), 0)
      },
      nonCoalSummary: {
        totalAccidents: nonCoalData.length,
        totalFatalities: nonCoalData.reduce((sum, a) => sum + (parseInt(a.Killed as string) || 0), 0)
      }
    };
  }, [coalData, nonCoalData]);

  return {
    coalData,
    nonCoalData,
    loading,
    error,
    filterOptions,
    processedData,
    refetch: fetchOptimizedData,
    loadFilterOptions
  };
};

