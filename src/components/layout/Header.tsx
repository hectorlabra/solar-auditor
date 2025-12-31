"use client";

import Link from "next/link";
import { Sun } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Sun className="h-6 w-6 text-amber-500 fill-amber-500" />
          <span>Solar Auditor</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Calculadora
          </Link>
          <a
            href="#"
            className="hover:text-foreground transition-colors hidden sm:block"
          >
            Cómo funciona
          </a>
        </nav>
      </div>
    </header>
  );
}
