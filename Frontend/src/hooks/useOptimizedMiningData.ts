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

