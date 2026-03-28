import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { MainContent } from './components/MainContent'
import { TutorialContent } from './components/TutorialContent'
import { tutorialData, TutorialCategory } from './data/tutorials'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState<TutorialCategory>(tutorialData.categories[0])
  const [selectedTutorial, setSelectedTutorial] = useState<TutorialCategory['tutorials'][0] | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll to top when category or tutorial changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedCategory, selectedTutorial])

  // Close mobile menu when clicking outside or on tutorial select
  useEffect(() => {
    if (selectedTutorial) {
      setIsMobileMenuOpen(false)
    }
  }, [selectedTutorial])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex">
        <Sidebar
          categories={tutorialData.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category)
            setIsMobileMenuOpen(false)
          }}
          selectedTutorial={selectedTutorial}
          onSelectTutorial={(tutorial) => {
            setSelectedTutorial(tutorial)
            setIsMobileMenuOpen(false)
          }}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content - Responsive margins */}
        <main className="flex-1 mt-16 md:ml-64 min-h-[calc(100vh-4rem)]">
          {selectedTutorial ? (
            <TutorialContent
              tutorial={selectedTutorial}
              onBack={() => {
                setSelectedTutorial(null)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          ) : (
            <MainContent
              category={selectedCategory}
              onSelectTutorial={setSelectedTutorial}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
