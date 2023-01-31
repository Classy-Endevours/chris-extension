import React, { useState, useEffect } from "react";
import Backend from "../lib/backend";
const useExtensionProviders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [extensionProviders, setExtensionProviders] = useState([]);

  const fetchExtensionProviders = async () => {
    try {
      setLoading(true);
      const userId = "63611cf16c50396040359085"; //hardcoded
      const backend = new Backend(); // should come from useUser hook
      const { data: extensionConstants } = await backend.getExtensionConst(
        userId
      );
    
      const { data: providers } = await backend.getExtensionProviders(
        extensionConstants.data[0]._id
      );
      setExtensionProviders([...providers]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExtensionProviders();
  }, []);

  return {
    loading,
    error,
    extensionProviders,
  };
};

export default useExtensionProviders;