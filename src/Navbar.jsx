import { useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import Numresults from "./Numresults";
export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
