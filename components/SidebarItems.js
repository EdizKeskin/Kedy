"use client";
import { useSettings } from "@/context/settingsContext";
import React, { useState } from "react";
import { RefreshIcon, SettingsIcon } from "./icons";
import { useImage } from "@/context/imageContext";
import { getImage } from "@/utils";
import Title from "./Title";

export default function SidebarItems() {
  const {
    text,
    setText,
    fontColor,
    setFontColor,
    filter,
    setFilter,
    brightness,
    setBrightness,
    lightness,
    setLightness,
    saturation,
    setSaturation,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
  } = useSettings();
  const { id, setUrl, setLoading } = useImage();
  const [textSettings, setTextSettings] = useState(false);

  const RefreshImage = async () => {
    setLoading(true);
    const res = await getImage({
      id: id,
      text: text,
      filter: filter,
      brightness: brightness,
      saturation: saturation,
      lightness: lightness,
      fontColor: fontColor,
      fontSize: fontSize,
      fontFamily: fontFamily,
    });

    setUrl(res);
    setLoading(false);
  };
  const fonts = [
    "Andale Mono",
    "Impact",
    "Arial",
    "Arial Black",
    "Comic Sans MS",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana",
    "Webdings",
  ];
  return (
    <div className="flex flex-col gap-5">
      <Title />
      <div className="flex flex-row items-end justify-end gap-3 ">
        <label className="w-full max-w-xs form-control">
          <div className="label">
            <span className="label-text">Text</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="w-full max-w-xs input input-bordered"
            value={text || ""}
            onChange={(e) => setText(e.target.value)}
          />
        </label>

        <button
          className="btn btn-secondary"
          onClick={() => setTextSettings(!textSettings)}
        >
          <SettingsIcon />
        </button>
      </div>
      {textSettings && (
        <div className="collapse collapse-open ">
          <div className="collapse-content">
            <label className="w-full max-w-xs form-control">
              <div className="label">
                <span className="label-text">Color</span>
              </div>
              <input
                type="color"
                className="w-full max-w-xs input input-sm"
                value={fontColor || ""}
                onChange={(e) => {
                  setFontColor(e.target.value);
                }}
              />
            </label>
            <label className="w-full max-w-xs form-control">
              <div className="label">
                <span className="label-text">Font</span>
              </div>
              <select
                className="select select-bordered select-sm"
                onChange={(e) => setFontFamily(e.target.value)}
                defaultValue={"Impact"}
              >
                {fonts.map((font, i) => {
                  return (
                    <option key={i} value={font}>
                      {font}
                    </option>
                  );
                })}
              </select>
            </label>

            <label className="w-full max-w-xs form-control">
              <div className="label">
                <span className="label-text">Font Size</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                className="w-full max-w-xs input input-bordered input-sm"
                value={fontSize}
                onChange={(e) => {
                  setFontSize(e.target.value);
                  console.log(fontSize);
                }}
              />
            </label>
          </div>
        </div>
      )}

      <label className="w-full max-w-xs form-control">
        <div className="label">
          <span className="label-text">Filter</span>
        </div>
        <select
          className="select select-bordered"
          onChange={(e) => setFilter(e.target.value)}
          defaultValue={"none"}
        >
          <option value={"none"}>none</option>
          <option value={"mono"}>mono</option>
          <option value={"negate"}>negate</option>
          <option value={"custom"}>custom</option>
        </select>
      </label>
      {filter === "custom" && (
        <div className="collapse bg-base-200 collapse-arrow">
          <input type="checkbox" />
          <div className="text-xl font-medium collapse-title">
            Custom Filters
          </div>
          <div className="collapse-content">
            <label className="w-full max-w-xs form-control">
              <div className="label">
                <span className="label-text">Brightness</span>
              </div>
              <div className="flex flex-row items-center justify-center">
                <input
                  type="range"
                  min={0}
                  max={2.5}
                  step={0.1}
                  value={brightness || 1}
                  className="range range-primary"
                  onChange={(e) => setBrightness(e.target.value)}
                />
                <span className="ml-2">{brightness}</span>
                <button
                  className="ml-2 btn btn-primary btn-xs btn-square"
                  onClick={() => setBrightness(1)}
                >
                  <RefreshIcon />
                </button>
              </div>
            </label>

            <label className="w-full max-w-xs form-control">
              <div className="label">
                <span className="label-text">Lightness</span>
              </div>
              <div className="flex flex-row items-center justify-center">
                <input
                  type="range"
                  min={0}
                  max={2.5}
                  step={0.1}
                  value={lightness || 1}
                  className="range range-secondary"
                  onChange={(e) => setLightness(e.target.value)}
                />
                <span className="ml-2">{lightness}</span>
                <button
                  className="ml-2 btn btn-primary btn-xs btn-square"
                  onClick={() => setLightness(1)}
                >
                  <RefreshIcon />
                </button>
              </div>
            </label>
            <label className="w-full max-w-xs form-control">
              <div className="label">
                <span className="label-text">Saturation</span>
              </div>
              <div className="flex flex-row items-center justify-center ">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={saturation || 1}
                  className="range range-accent"
                  onChange={(e) => setSaturation(e.target.value)}
                />
                <span className="ml-2">{saturation}</span>
                <button
                  className="ml-2 btn btn-primary btn-xs btn-square"
                  onClick={() => setSaturation(1)}
                >
                  <RefreshIcon />
                </button>
              </div>
            </label>
          </div>
        </div>
      )}
      <button className="btn btn-primary" onClick={() => RefreshImage()}>
        Apply
      </button>
    </div>
  );
}
