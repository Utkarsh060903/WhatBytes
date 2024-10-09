import Link from 'next/link'
import { LayoutDashboard, BrainCircuit, Briefcase } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-white border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold">WhatBytes</h1>
      </div>
      <nav className="mt-6 space-y-1">
        <Link href="/" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        <Link href="/skill-test" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 bg-gray-100">
          <BrainCircuit className="mr-3 h-5 w-5" />
          Skill Test
        </Link>
        <Link href="/internship" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
          <Briefcase className="mr-3 h-5 w-5" />
          Internship
        </Link>
      </nav>
    </div>
  )
}