"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap } from "lucide-react"
import Logo from "./Logo"

export function Header() {
  return (
    <motion.header
      className=" border-b"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo slideText={true} />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about">
                <Button variant="ghost" className="transition-all duration-200 hover:bg-primary/20">
                  About
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/review">
                <Button className="transition-all duration-200 hover:bg-primary/90">
                  <Zap className="mr-2 h-4 w-4" />
                  Try it out
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}

