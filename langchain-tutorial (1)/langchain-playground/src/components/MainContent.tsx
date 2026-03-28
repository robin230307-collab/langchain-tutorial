import { ArrowRight, Star, Target, Zap, BookOpen } from 'lucide-react'
import { TutorialCategory } from '../types'

interface MainContentProps {
  category: TutorialCategory
  onSelectTutorial: (tutorial: TutorialCategory['tutorials'][0]) => void
}

export function MainContent({ category, onSelectTutorial }: MainContentProps) {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Hero Section */}
      <div className="mb-8 md:mb-12">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${category.color} bg-opacity-10 mb-4`}>
          <span className="text-2xl">{category.icon}</span>
          <span className={`text-sm font-medium ${category.color.replace('bg-', 'text-')}`}>
            {category.nameEn}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4">
          {category.name}
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl">
          {category.description}
        </p>
      </div>

      {/* Quick Navigation - 3 columns on desktop, stack on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-12">
        {category.tutorials.slice(0, 3).map((tutorial) => (
          <button
            key={tutorial.id}
            onClick={() => onSelectTutorial(tutorial)}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-md transition-all group text-left"
          >
            <span className="text-2xl">{tutorial.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-800 group-hover:text-green-600 transition-colors truncate">
                {tutorial.name}
              </div>
              <div className="text-sm text-slate-500 hidden sm:block truncate">{tutorial.description}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-500 transition-colors shrink-0" />
          </button>
        ))}
      </div>

      {/* All Tutorials */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">
          全部教程 <span className="text-slate-400 font-normal text-base md:text-lg">({category.tutorials.length})</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {category.tutorials.map((tutorial) => (
            <button
              key={tutorial.id}
              onClick={() => onSelectTutorial(tutorial)}
              className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 hover:border-green-300 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-100 rounded-xl flex items-center justify-center text-xl md:text-2xl group-hover:bg-green-50 transition-colors shrink-0">
                  {tutorial.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-green-600 transition-colors text-sm md:text-base">
                      {tutorial.name}
                    </h3>
                    {tutorial.difficulty === 'beginner' && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                        入门
                      </span>
                    )}
                    {tutorial.difficulty === 'intermediate' && (
                      <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">
                        进阶
                      </span>
                    )}
                    {tutorial.difficulty === 'advanced' && (
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                        高级
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center gap-3 md:gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {tutorial.sections.length} 章节
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {tutorial.relatedTools.length} 工具
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Related Categories */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">探索更多系列</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { icon: '💬', name: '输入与输出', color: 'bg-blue-500' },
            { icon: '📄', name: '文档处理', color: 'bg-green-500' },
            { icon: '🧠', name: '对话记忆', color: 'bg-purple-500' },
            { icon: '🔍', name: 'RAG检索', color: 'bg-orange-500' },
          ].map((item) => (
            <div
              key={item.name}
              className="p-3 md:p-4 bg-white rounded-xl border border-slate-200 text-center"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 ${item.color} rounded-xl mx-auto mb-2 md:mb-3 flex items-center justify-center text-xl md:text-2xl`}>
                {item.icon}
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-700">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
