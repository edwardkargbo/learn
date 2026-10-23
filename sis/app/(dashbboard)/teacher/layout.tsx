import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Teacher Dashboard </h1>
      {children}
    </div>
  );
};
export default Layout;
