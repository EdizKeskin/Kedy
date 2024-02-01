"use client";
import React, { createContext, useContext, useState } from "react";

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [text, setText] = useState(null);
  const [filter, setFilter] = useState("none");
  const [brightness, setBrightness] = useState(1);
  const [lightness, setLightness] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(30);
  const [fontFamily, setFontFamily] = useState("Impact");

  const values = {
    text,
    setText,
    filter,
    setFilter,
    brightness,
    setBrightness,
    lightness,
    setLightness,
    saturation,
    setSaturation,
    fontColor,
    setFontColor,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
