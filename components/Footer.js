import React from "react";
import { GithubIcon, PawIcon } from "./icons";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="absolute z-10 bottom-6 right-6">
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="tooltip tooltip-top" data-tip="Github">
          <Link href="https://github.com/EdizKeskin/cat" target="_blank">
            <button className="btn btn-ghost btn-circle">
              <GithubIcon />
            </button>
          </Link>
        </div>

        <div className="tooltip tooltip-top" data-tip="API">
          <Link href="https://cataas.com/" target="_blank">
            <button className="btn btn-ghost btn-circle">
              <PawIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
