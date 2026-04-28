import { useState, useEffect } from "react";

function useCountry(code) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) {
      setCountry(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(`https://restcountries.com/v3.1/alpha/${code}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch country data");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setCountry(data[0] || null);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError" && isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [code]);

  return { country, loading, error };
}

export default useCountry;