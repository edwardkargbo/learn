import React, { Suspense } from "react";
import { Button } from "@/Components/ui/button";
import { Carousel } from "@/Components/ui/carousel";

export default function page() {
  return (
    <div className=" bg-white flex flex-col items-center justify-center min-h-screen *bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-8">
      Navbar
      <Carousel />
      <Button variant="default" size="default" className="mt-8 cursor-pointer">
        Click Me yo
      </Button>
    </div>
  );
}
