import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react"
import DotGrid from "./DotGrid"
import ProfileCard from "./ProfileCard"
 

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      // Use Lenis for smooth scrolling if available
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

  return (
    <>
      {/* HERO with DotGrid background */}
      <section id="home" className="min-h-[100svh] flex items-center justify-center relative overflow-hidden bg-slate-900">
        {/* Dot Grid Background */}
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
          <DotGrid
            dotSize={8}
            gap={18}
            baseColor="#2b2640"
            activeColor="#4c3fff"
            proximity={220}
            shockRadius={260}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            style={{}}
          />
        </div>

        {/* Content with responsive layout */}
        <div className="container mx-auto px-0 sm:px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="max-w-3xl text-center lg:text-left">
            <Badge variant="secondary" className="mb-5 sm:mb-6 px-3 py-1 text-xs sm:text-sm font-medium">
              Available for Opportunities
            </Badge>

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold mb-5 sm:mb-6 animate-fade-in-up [animation-delay:0.1s] opacity-0">
              <span className="gradient-text">Sohan A</span>
            </h1>

            {/* Profile Card - Mobile only (between name and title) */}
            <div className="w-full grid place-items-center mb-6 sm:mb-8 lg:hidden px-4">
              <div className="w-[200px] sm:w-[350px] mx-auto">
                <ProfileCard
                  name="Sohan A"
                  title="Full-Stack Developer"
                  handle="sohan2005"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="https://iili.io/KGCHJdQ.png"
                  showUserInfo={true}
                  className="pc-muted"
                  showBehindGradient={false}
                  innerGradient="linear-gradient(145deg,#0f172a 0%, #1f2a44 100%)"
                  behindGradient={undefined}
                  miniAvatarUrl={undefined}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => window.open('https://linkedin.com/in/sohan2005', '_blank', 'noopener,noreferrer')}
                />
              </div>
            </div>

            <p className="text-sm sm:text-2xl text-text-secondary mb-5 sm:mb-8 animate-fade-in-up [animation-delay:0.2s] opacity-0">
              Full Stack Developer & DevOps Engineer
            </p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start items-center lg:items-start mb-4 sm:mb-12 animate-fade-in-up [animation-delay:0.3s] opacity-0">
              <Button 
                size="sm"
                className="bg-white text-black hover:bg-white/90 px-6 py-2"
                onClick={() => scrollToSection("#projects")}
              >
                View projects
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-border-elevated hover:bg-surface-elevated px-6 py-2"
                asChild
              >
                <a 
                  href="https://drive.google.com/file/d/1u8jp8DCLFu-IuYNEn67-ws9fwQdSfPA-/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start gap-3 animate-fade-in-up [animation-delay:0.4s] opacity-0">
              <a 
                href="https://github.com/sohan20051519" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 glass rounded-full hover:glow transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/sohan2005" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 glass rounded-full hover:glow transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:sohan20051519@gmail.com"
                className="p-2 glass rounded-full hover:glow transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            </div>

            {/* Profile Card - Desktop only (right side) */}
            <div className="w-full flex justify-center lg:justify-end hidden lg:flex">
              <div className="w-[360px] sm:w-[400px] md:w-[420px] lg:w-[440px]">
                <ProfileCard
                  name="Sohan A"
                  title="Full-Stack Developer"
                  handle="sohan2005"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="https://iili.io/KGCHJdQ.png"
                  showUserInfo={true}
                  className="pc-muted"
                  showBehindGradient={false}
                  innerGradient="linear-gradient(145deg,#0f172a 0%, #1f2a44 100%)"
                  behindGradient={undefined}
                  miniAvatarUrl={undefined}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => window.open('https://linkedin.com/in/sohan2005', '_blank', 'noopener,noreferrer')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lanyard removed per request */}
    </>
  )
}
