// HorizontalCardSkeleton.tsx
import React from "react";
import { cn } from "@/lib/utils"; // Assuming you use `cn` for class concatenation

const HorizontalCardSkeleton = ({ isBig = false }: { isBig?: boolean }) => {
  return (
    <div
      className={cn("flex flex-col md:flex-row mb-4 flex-[1,1,auto] animate-pulse", {
        "md:flex-row": isBig,
      })}
    >
      <div
        className={cn("bg-gray-300 rounded-[30px]", {
          "w-full max-w-[200px] sm:max-w-[300px] aspect-[1.6/1]": !isBig,
          "w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px] aspect-[1.6/1]": isBig,
        })}
      ></div>
      <div className="pl-12 py-4 flex-grow content-center space-y-4">
        <div
          className={cn("flex items-center text-black mb-2", {
            "text-xl": isBig,
            "text-sm": !isBig,
          })}
        >
          <div className="bg-gray-300 h-4 w-20 rounded"></div>
          <span className="mx-4 font-bold">&#903;</span>
          <div className="bg-gray-300 h-4 w-16 rounded"></div>
        </div>
        <div
          className={cn("font-semibold mb-2 bg-gray-300 rounded", {
            "h-8 w-3/4": isBig,
            "h-6 w-1/2": !isBig,
          })}
        ></div>
        <div className="flex items-center text-primary">
          <div className="bg-gray-300 h-4 w-32 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardSkeleton;
