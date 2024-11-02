// src/app/components/Navbar.tsx
"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import ScribeLogo from "../ScribeLogo";

const AppNavbar: React.FC = () => {
  return (
    <Navbar className="bg-transparent h-20">
      <NavbarBrand>
        <Link href="/" className="text-white">
          <ScribeLogo width={60} height={60} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex gap-20" justify="center">
        <NavbarItem>
          <Link className="text-white" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="/train">
            Train
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="/chat">
            Chat
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="">
          <Button>Logout</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
