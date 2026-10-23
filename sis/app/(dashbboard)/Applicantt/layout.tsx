import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white shadow-2xl justify-center">
      <main>{children}</main>
    </div>
  );
}
