import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, User, Code, Award, Mail } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Code },
  { name: "Certificates", href: "#certificates", icon: Award },
  { name: "Contact", href: "#contact", icon: Mail },
]

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsVisible(scrolled)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1))
      let current = "home"
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Better mobile detection for active section
          const threshold = window.innerWidth < 1024 ? 150 : 100
          if (rect.top <= threshold && rect.bottom >= threshold) {
            current = section
            break
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      // Check if we're on mobile
      const isMobile = window.innerWidth < 1024
      
      if (isMobile) {
        // Mobile: Use native smooth scroll with better positioning
        element.scrollIntoView({ 
          behavior: "smooth", 
          block: 'start',
          inline: 'nearest'
        })
      } else {
        // Desktop: Use Lenis for smooth scrolling if available
        const lenisInstance = (window as any).lenis
        if (lenisInstance) {
          lenisInstance.scrollTo(element, { 
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          })
        } else {
          // Fallback to native scrollIntoView
          element.scrollIntoView({ behavior: "smooth", block: 'start' })
        }
      }
    }
  }

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="glass rounded-full px-2 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 shadow-lg border-border-elevated touch-manipulation">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.href.substring(1)
          
          return (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(item.href)}
              className={`transition-all duration-300 rounded-full touch-manipulation ${
                isActive 
                  ? "bg-primary/20 text-primary" 
                  : "hover:bg-primary/10 text-text-secondary hover:text-primary"
              }`}
              style={{ 
                minHeight: '44px', // Better touch target for mobile
                minWidth: '44px'
              }}
            >
              <Icon className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">{item.name}</span>
            </Button>
          )
        })}
        
        <div className="w-px h-6 bg-border mx-2" />
        <ThemeToggle />
      </div>
    </nav>
  )
}