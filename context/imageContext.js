"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const [url, setUrl] = useState(null);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionStorage.setItem("datas", [datas]);
  }, [datas]);

  const values = {
    url,
    setUrl,
    loading,
    setLoading,
    id,
    setId,
    setDatas,
    datas,
  };

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  );
};

const useImage = () => useContext(ImageContext);

export { ImageProvider, useImage };
