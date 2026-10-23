import { Button } from "@/Components/ui/button";
import Link from "next/link";
import React from "react";

export default async function Found() {
  return (
    <>
      <div className="min-h-screen justify-center items-center flex">
        <h1 className="text-red-500">Page Not Found</h1>
      </div>
      <Button className="bg-blue-400 hover:bg-blue-700 w-20 cursor-pointer">
        <Link href="/">Home</Link>
      </Button>
    </>
  );
}
