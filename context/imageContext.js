"use client";
import React, { createContext, useContext, useState } from "react";

export const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const [url, setUrl] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  const values = {
    url,
    setUrl,
    loading,
    setLoading,
    id,
    setId,
  };

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  );
};

const useImage = () => useContext(ImageContext);

export { ImageProvider, useImage };
