"use client";
import { useSettings } from "@/context/settingsContext";
import { getData, getImage } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HamburgerIcon, RightIcon } from "./icons";
import ThemeSwitch from "./ThemeSwitch";
import { useImage } from "@/context/imageContext";

export default function Main({ data: initialData }) {
  const [data, setData] = useState(initialData);
  const { url, setUrl, loading, setLoading, setId } = useImage();
  const { text, filter, brightness, lightness, saturation, fontColor } =
    useSettings();

  useEffect(() => {
    setId(initialData._id);
  }, [initialData, setId]);

  useEffect(() => {
    getImage({
      id: data._id,
      text: text,
      filter: filter,
      brightness: brightness,
      saturation: saturation,
      lightness: lightness,
      fontColor: fontColor,
    }).then((res) => {
      setUrl(res);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setUrl, setLoading]);

  const nextImage = async () => {
    setLoading(true);
    const res = await getData();

    setData(res);
    setId(res._id);
    setLoading(false);
  };

  return (
    <>
      <ThemeSwitch />
      <div className="absolute top-6 left-6">
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
          <HamburgerIcon />
        </label>
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-10">
        {loading ? (
          <div className="flex items-center justify-center ">
            <div className="skeleton w-[500px] h-[500px]"></div>
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

        <div className="flex items-center justify-center gap-5 mt-6">
          <div className="tooltip tooltip-top" data-tip="Next Cat">
            <button className="btn btn-primary" onClick={() => nextImage()}>
              <RightIcon />
            </button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
}
