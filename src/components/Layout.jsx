import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
export default function Layout({handleTheme, theme}) {
  /* useEffect(() => {
    handleTheme()
  },[theme]) */
  return (
    <>
      <NavBar handleTheme={handleTheme} theme={theme}/>
      <Outlet/>
    </>
  );
}
