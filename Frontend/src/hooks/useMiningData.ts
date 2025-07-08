
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

export const useMiningData = () => {
  const [coalData, setCoalData] = useState<MiningAccident[]>([]);
  const [nonCoalData, setNonCoalData] = useState<MiningAccident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoalData = async (filters: any = {}) => {
    try {
      let query = supabase.from('Coal Mining Accident data').select('*');
      
      if (filters.year) {
        query = query.eq('Year', filters.year);
      }
      if (filters.state && filters.state !== 'all') {
        query = query.ilike('State', `%${filters.state}%`);
      }
      if (filters.cause && filters.cause !== 'all') {
        query = query.ilike('Brief Cause', `%${filters.cause}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching coal data:', err);
      throw err;
    }
  };

  const fetchNonCoalData = async (filters: any = {}) => {
    try {
      let query = supabase.from('Non Coal Mining Accident data').select('*');
      
      if (filters.year) {
        query = query.eq('Year', filters.year);
      }
      if (filters.state && filters.state !== 'all') {
        query = query.ilike('State', `%${filters.state}%`);
      }
      if (filters.cause && filters.cause !== 'all') {
        query = query.ilike('Brief Cause', `%${filters.cause}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching non-coal data:', err);
      throw err;
    }
  };

  const fetchData = async (filters: any = {}) => {
    setLoading(true);
    setError(null);
    try {
      const [coalResults, nonCoalResults] = await Promise.all([
        fetchCoalData(filters),
        fetchNonCoalData(filters)
      ]);
      
      setCoalData(coalResults);
      setNonCoalData(nonCoalResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    coalData,
    nonCoalData,
    loading,
    error,
    refetch: fetchData
  };
};
