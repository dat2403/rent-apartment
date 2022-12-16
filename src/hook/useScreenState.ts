import { useEffect, useState } from 'react';

export default function useScreenState() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  return {
    loading,
    setLoading,
    mounted,
    setMounted,
    error,
    setError,
  };
}
