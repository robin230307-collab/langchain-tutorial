import { ChevronDown, ChevronRight, BookOpen, Home, X } from 'lucide-react'
import { useState } from 'react'
import { TutorialCategory } from '../types'

interface SidebarProps {
  categories: TutorialCategory[]
  selectedCategory: TutorialCategory
  onSelectCategory: (category: TutorialCategory) => void
  selectedTutorial: TutorialCategory['tutorials'][0] | null
  onSelectTutorial: (tutorial: TutorialCategory['tutorials'][0]) => void
  isMobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedTutorial,
  onSelectTutorial,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map((c) => c.id)
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <>
      {/* Desktop Sidebar - Always visible on md+ */}
      <aside className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 overflow-y-auto">
        <SidebarContent
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          selectedTutorial={selectedTutorial}
          onSelectTutorial={onSelectTutorial}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
        />
      </aside>

      {/* Mobile Sidebar - Drawer */}
      <aside
        className={`
          md:hidden fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white border-r border-slate-200 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">导航菜单</h2>
          <button
            onClick={onMobileClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Mobile Content */}
        <div className="p-4">
          <SidebarContent
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            selectedTutorial={selectedTutorial}
            onSelectTutorial={onSelectTutorial}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
            isMobile
          />
        </div>
      </aside>
    </>
  )
}

interface SidebarContentProps {
  categories: TutorialCategory[]
  selectedCategory: TutorialCategory
  onSelectCategory: (category: TutorialCategory) => void
  selectedTutorial: TutorialCategory['tutorials'][0] | null
  onSelectTutorial: (tutorial: TutorialCategory['tutorials'][0]) => void
  expandedCategories: string[]
  toggleCategory: (categoryId: string) => void
  isMobile?: boolean
}

function SidebarContent({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedTutorial,
  onSelectTutorial,
  expandedCategories,
  toggleCategory,
  isMobile,
}: SidebarContentProps) {
  return (
    <div className={isMobile ? '' : 'p-4'}>
      {/* Home Link */}
      <button
        onClick={() => {
          onSelectCategory(categories[0])
        }}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100 rounded-lg mb-4"
      >
        <Home className="w-4 h-4" />
        教程首页
      </button>

      {/* Learning Path */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
          学习路径
        </h3>
        <div className="space-y-1">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id)
            const isSelected = selectedCategory.id === category.id

            return (
              <div key={category.id}>
                <button
                  onClick={() => {
                    onSelectCategory(category)
                    toggleCategory(category.id)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {category.tutorials.map((tutorial) => {
                      const isActive = selectedTutorial?.id === tutorial.id

                      return (
                        <button
                          key={tutorial.id}
                          onClick={() => onSelectTutorial(tutorial)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                            isActive
                              ? 'bg-green-100 text-green-700 font-medium'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                          }`}
                        >
                          <span className="w-5 h-5 flex items-center justify-center text-base">
                            {tutorial.icon}
                          </span>
                          <span className="flex-1 truncate">{tutorial.name}</span>
                          {tutorial.difficulty === 'beginner' && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded shrink-0">
                              入门
                            </span>
                          )}
                          {tutorial.difficulty === 'intermediate' && (
                            <span className="text-xs bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded shrink-0">
                              进阶
                            </span>
                          )}
                          {tutorial.difficulty === 'advanced' && (
                            <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded shrink-0">
                              高级
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="border-t border-slate-200 pt-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
          快速参考
        </h3>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
            <BookOpen className="w-4 h-4" />
            Cheat Sheet
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
            工具选择指南
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
            常见问题
          </button>
        </div>
      </div>
    </div>
  )
}
