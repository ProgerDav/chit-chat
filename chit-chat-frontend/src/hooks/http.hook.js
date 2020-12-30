import { useState, useCallback } from "react";
import axios from "../axios";
import { useAuthState } from "../State/auth/AuthStateProvider";

export const useHttp = () => {
  const [
    {
      user: { uid },
    },
  ] = useAuthState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async ({ method = "GET", url, data = null, headers = {} }) => {
      try {
        if (uid) headers.Authorization = `Bearer ${uid}`;

        setLoading(true);
        setError(null);
        const response = await axios.request({ method, url, data, headers });

        setLoading(false);

        if (!response.status >= 400) {
          throw new Error(response.data.message || "An error occured");
        }

        return response;
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    },
    [uid]
  );

  const clearError = useCallback(() => setError(null), [setError]);

  return { request, error, loading, clearError };
};
