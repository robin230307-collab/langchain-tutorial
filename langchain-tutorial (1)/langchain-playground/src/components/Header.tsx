import { Search, BookOpen, Github, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  onMenuClick: () => void
  isMenuOpen: boolean
}

export function Header({ onMenuClick, isMenuOpen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left: Logo + Mobile Menu Button */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>

          {/* Logo */}
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LC</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-slate-800">
            LangChain <span className="text-green-600 hidden sm:inline">Tutorial</span>
          </h1>
          <span className="hidden md:inline text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            入门指南
          </span>
        </div>

        {/* Center: Search - Hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-xl mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索教程、工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right: Nav Links */}
        <nav className="flex items-center gap-2 md:gap-4 lg:gap-6">
          {/* Mobile Search Icon */}
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Search className="w-5 h-5 text-slate-600" />
          </button>

          <a
            href="https://python.langchain.com/docs/introduction/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-600 hover:text-green-600 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden lg:inline">官方文档</span>
          </a>
          <a
            href="https://github.com/langchain-ai/langchain"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-600 hover:text-green-600 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden lg:inline">GitHub</span>
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3 md:px-4 py-1.5 md:py-2 bg-green-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            开始学习
          </button>
        </nav>
      </div>
    </header>
  )
}
