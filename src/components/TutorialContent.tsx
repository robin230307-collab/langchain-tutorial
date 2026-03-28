import { ArrowLeft, ChevronDown, ChevronUp, Copy, Check, BookOpen, Target, Lightbulb, Code, Layers, HelpCircle, Cpu, ArrowRight, Bot, Key, Terminal, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Tutorial, TutorialSection, CodeExample } from '../types'

interface TutorialContentProps {
  tutorial: Tutorial
  onBack: () => void
  onNavigateToTool?: (toolId: string) => void
}

export function TutorialContent({ tutorial, onBack, onNavigateToTool }: TutorialContentProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['what', 'how'])
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const toggleSection = (type: string) => {
    setExpandedSections((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const renderSection = (section: TutorialSection, index: number) => {
    const isExpanded = expandedSections.includes(section.type)
    const iconMap: Record<string, JSX.Element> = {
      what: <HelpCircle className="w-5 h-5" />,
      why: <Lightbulb className="w-5 h-5" />,
      how: <Target className="w-5 h-5" />,
      example: <Code className="w-5 h-5" />,
      usecase: <Layers className="w-5 h-5" />,
      comparison: <BookOpen className="w-5 h-5" />,
      deepdive: <Cpu className="w-5 h-5" />,
      exercise: <Target className="w-5 h-5" />,
    }

    return (
      <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <button
          onClick={() => toggleSection(section.type)}
          className="w-full flex items-center gap-3 p-4 md:p-5 text-left hover:bg-slate-50 transition-colors active:bg-slate-100"
        >
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
            {iconMap[section.type]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 text-sm md:text-base">{section.title}</h3>
            {section.type === 'deepdive' && (
              <p className="text-xs md:text-sm text-green-600 mt-0.5">
                In Case You Want to Know How It Works
              </p>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {isExpanded && (
          <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-slate-100">
            <div className="pt-4 md:pt-5">
              {/* Content Text */}
              <div className="prose prose-slate max-w-none mb-4 md:mb-6">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {section.content}
                </p>
              </div>

              {/* Code Examples */}
              {section.codeExamples && section.codeExamples.length > 0 && (
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  {section.codeExamples.map((example, idx) => (
                    <CodeBlock key={idx} example={example} />
                  ))}
                </div>
              )}

              {/* Use Cases */}
              {section.useCases && section.useCases.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-4 md:p-5 mb-4 md:mb-6">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2 text-sm md:text-base">
                    <Layers className="w-4 h-4 text-blue-600" />
                    典型使用场景
                  </h4>
                  <div className="space-y-3 md:space-y-4">
                    {section.useCases.map((useCase, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 md:p-4">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs md:text-sm rounded-lg font-medium">
                            {useCase.scenario}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          <span className="font-medium text-slate-700">为什么：</span>
                          {useCase.why}
                        </p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium text-slate-700">示例：</span>
                          {useCase.example}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comparisons */}
              {section.comparisons && section.comparisons.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 md:p-5 mb-4 md:mb-6">
                  <h4 className="font-semibold text-slate-800 mb-3 md:mb-4 text-sm md:text-base">
                    对比分析
                  </h4>
                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <table className="w-full min-w-[500px] text-xs md:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-2 px-3 font-medium text-slate-600">
                            名称
                          </th>
                          <th className="text-left py-2 px-3 font-medium text-slate-600">
                            适用场景
                          </th>
                          <th className="text-left py-2 px-3 font-medium text-slate-600">
                            示例
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.comparisons.map((comp, idx) => (
                          <tr key={idx} className="border-b border-slate-100 last:border-0">
                            <td className="py-3 px-3 font-medium text-green-600">
                              {comp.name}
                            </td>
                            <td className="py-3 px-3 text-slate-600">
                              {comp.whenToUse}
                            </td>
                            <td className="py-3 px-3 text-slate-500">
                              {comp.example}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Deep Dive Content */}
              {section.deepDiveContent && (
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 md:p-5 text-white">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm md:text-base">
                    <Cpu className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">In Case You Want to Know How It Works</span>
                  </h4>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div
                      className="text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: section.deepDiveContent
                          .replace(/`([^`]+)`/g, '<code class="bg-slate-700 px-1.5 py-0.5 rounded text-green-300">$1</code>')
                          .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors text-sm md:text-base py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500 text-sm md:text-base truncate">{tutorial.name}</span>
      </div>

      {/* Tutorial Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <span className="text-3xl md:text-4xl">{tutorial.icon}</span>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">{tutorial.name}</h1>
            <p className="text-sm md:text-base text-slate-600 mt-1 hidden sm:block">{tutorial.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <span
            className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
              tutorial.difficulty === 'beginner'
                ? 'bg-blue-100 text-blue-600'
                : tutorial.difficulty === 'intermediate'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-purple-100 text-purple-600'
            }`}
          >
            {tutorial.difficulty === 'beginner'
              ? '入门'
              : tutorial.difficulty === 'intermediate'
              ? '进阶'
              : '高级'}
          </span>
          <span className="text-xs md:text-sm text-slate-500">
            {tutorial.sections.length} 个章节
          </span>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <span>相关工具：</span>
            {tutorial.relatedTools.map((tool, idx) => (
              <span key={idx} className="text-green-600">
                {tool}
                {idx < tutorial.relatedTools.length - 1 && '、'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Start Card */}
      {tutorial.quickStart && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 md:p-6 text-white mb-6 md:mb-8">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-semibold mb-1">{tutorial.quickStart.title}</h3>
              <p className="text-green-100 text-xs md:text-sm mb-3">{tutorial.quickStart.description}</p>
              <div className="bg-slate-900 rounded-lg p-3 md:p-4 font-mono text-xs md:text-sm overflow-x-auto">
                <pre className="text-green-300 whitespace-pre-wrap sm:whitespace-pre">{tutorial.quickStart.code}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-3 md:space-y-4">
        {tutorial.sections.map((section, index) => renderSection(section, index))}
      </div>

      {/* Related Tools */}
      <div className="mt-6 md:mt-8 p-4 md:p-6 bg-slate-50 rounded-2xl">
        <h3 className="font-semibold text-slate-800 mb-3 md:mb-4 text-sm md:text-base">相关工具</h3>
        <div className="flex flex-wrap gap-2">
          {tutorial.relatedTools.map((tool, idx) => (
            <span
              key={idx}
              className="px-3 md:px-4 py-1.5 md:py-2 bg-white border border-slate-200 rounded-lg text-xs md:text-sm text-slate-500 flex items-center gap-1.5 md:gap-2"
            >
              <ArrowRight className="w-3 h-3 text-slate-400" />
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* AI Integration Guide */}
      {tutorial.aiIntegration && (
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2 text-sm md:text-base">
            <Bot className="w-5 h-5" />
            如何连接 AI 使用这个工具
          </h3>

          {/* Install */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              第一步：安装 LangChain
            </h4>
            <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
              <code className="text-green-400 text-xs md:text-sm">{tutorial.aiIntegration.installCommand}</code>
            </div>
          </div>

          {/* API Key */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
              <Key className="w-4 h-4" />
              第二步：获取 API Key
            </h4>
            <p className="text-sm text-green-600 mb-2">获取以下任一AI的API Key：</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {tutorial.aiIntegration.supportedAIs.map((ai, idx) => (
                <span key={idx} className="px-2 py-1 bg-white rounded text-xs text-green-700 border border-green-200">
                  {ai}
                </span>
              ))}
            </div>
            <a
              href={tutorial.aiIntegration.apiKeyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:text-green-700 underline"
            >
              → 点击这里获取 API Key
            </a>
          </div>

          {/* Basic Code */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-green-700 mb-2">
              第三步：编写代码
            </h4>
            <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
              <pre className="text-green-300 text-xs md:text-sm font-mono whitespace-pre-wrap">{tutorial.aiIntegration.basicCode}</pre>
            </div>
          </div>

          {/* Notes */}
          {tutorial.aiIntegration.notes.length > 0 && (
            <div className="flex items-start gap-2 text-sm text-green-700 bg-white rounded-lg p-3">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium mb-1">注意事项：</p>
                <ul className="list-disc list-inside space-y-1">
                  {tutorial.aiIntegration.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CodeBlock({ example }: { example: CodeExample }) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(example.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-slate-800">
        <span className="text-xs md:text-sm text-slate-400">{example.title}</span>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 text-xs md:text-sm text-slate-400 hover:text-white transition-colors py-1 px-2 rounded hover:bg-slate-700"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">复制</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 md:p-4 overflow-x-auto">
        <pre className="text-xs md:text-sm text-green-300 font-mono leading-relaxed">
          <code>{example.code}</code>
        </pre>
      </div>
      {example.description && (
        <div className="px-3 md:px-4 py-2 md:py-3 bg-slate-800 border-t border-slate-700">
          <p className="text-xs md:text-sm text-slate-400">{example.description}</p>
        </div>
      )}
    </div>
  )
}

function Zap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
