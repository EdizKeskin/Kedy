"use client";
import { useSettings } from "@/context/settingsContext";
import { getData, getImage } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HamburgerIcon, RightIcon } from "./icons";
import { useImage } from "@/context/imageContext";

export default function Main({ data: initialData }) {
  const [data, setData] = useState(initialData);
  const [isGif, setIsGif] = useState(false);
  const { url, setUrl, loading, setLoading, setId, fontFamily } = useImage();
  const {
    text,
    filter,
    brightness,
    lightness,
    saturation,
    fontColor,
    fontSize,
  } = useSettings();

  useEffect(() => {
    setId(initialData._id);
  }, [initialData, setId, data]);

  useEffect(() => {
    setLoading(true);
    getImage({
      id: data._id,
      text: text,
      filter: filter,
      brightness: brightness,
      saturation: saturation,
      lightness: lightness,
      fontColor: fontColor,
      fontSize: fontSize,
      fontFamily: fontFamily,
    }).then((res) => {
      setUrl(res);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setUrl, setLoading]);

  const nextImage = async () => {
    setLoading(true);
    const res = await getData(isGif);
    console.log(res);

    setData(res);
    setId(res._id);
    setLoading(false);
  };

  return (
    <div className="relative w-full">
      <div className="absolute flex flex-col items-start justify-center gap-5 top-6 left-6">
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
          <HamburgerIcon />
        </label>

        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="mr-2 text-lg font-medium label-text">GIF</span>
            <input
              type="checkbox"
              checked={isGif}
              onChange={(e) => setIsGif(e.target.checked)}
              className="checkbox checkbox-primary checkbox-md"
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen px-10">
        {loading ? (
          <div className="flex items-center justify-center ">
            <div className="skeleton w-[200px] h-[200px] lg:w-[500px] lg:h-[500px]"></div>
          </div>
        ) : (
          url && (
            <Image
              src={url}
              alt="Random cat"
              width={500}
              height={500}
              className="rounded-lg "
              priority
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          )
        )}
        <div className="flex flex-row flex-wrap items-center justify-center gap-2 mt-3">
          {data.tags.map((tag, i) => {
            return (
              <div className={`badge badge-secondary`} key={i}>
                {tag}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-5 mt-6">
          <div className="tooltip tooltip-top" data-tip="Next Cat">
            <button className="btn btn-primary" onClick={() => nextImage()}>
              <RightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
