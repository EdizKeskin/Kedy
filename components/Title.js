"use client";
import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function Title() {
  return (
    <div>
      <RoughNotation
        type="box"
        show={true}
        color="#F59E0B"
        className="text-4xl font-bold"
      >
        KEDY
      </RoughNotation>
    </div>
  );
}
