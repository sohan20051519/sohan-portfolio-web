import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import { ImagePreviewModal } from "@/components/image-preview-modal"
import { useState } from "react"
// import ScrollStack, { ScrollStackItem } from "./ui/scroll-stack"
import MagicBento from './MagicBento'

// Import project images
import projectSohanUIUX from "@/assets/project-sohan-uiux.png"
import projectSohanWeb from "@/assets/project-sohan-web.png"
import projectMatrix from "@/assets/project-matrix.png"
import projectNammai from "@/assets/project-nammai.png"
import projectOneOps from "@/assets/project-oneops.png"

const projects = [
  {
    title: "MATRIX 2K25",
    description: "AI-driven event management platform featuring full-stack architecture, real-time updates, and interactive user experience.",
    technologies: ["Full-Stack", "AI Integration", "Real-time Updates", "Event Management"],
    liveUrl: "https://klematrix2k25.in",
    githubUrl: "https://github.com/sohan20051519/matrix-clone-test",
    featured: true,
    image: projectMatrix
  },
  {
    title: "Nammai Live",
    description: "Conversational AI chatbot website inspired by modern AI assistants with integrated backend APIs and natural language processing.",
    technologies: ["AI/ML", "Backend APIs", "Conversational AI", "NLP"],
    liveUrl: "https://nammai.live",
    githubUrl: "https://github.com/sohan20051519/NammAI",
    featured: true,
    image: projectNammai
  },
  {
    title: "VibeFresh - Build pure websites",
    description: "just by vibing.",
    technologies: ["AI/ML", "React", "TypeScript", "Natural Language Processing", "PDF Generation"],
    liveUrl: "https://vibe-fresh.vercel.app/",
    githubUrl: "https://github.com/sohan20051519/VibeFresh",
    featured: true,
    image: "https://i.postimg.cc/653W5ps8/image.png"
  },
  {
    title: "Devyntra — The End of Manual DevOps",
    description: "AI-powered DevOps automation platform featuring zero-config CI/CD, smart automation, and seamless cloud integrations.",
    technologies: ["DevOps", "CI/CD", "Cloud Integration", "Automation", "GCP"],
    liveUrl: "https://devyntra.vercel.app/",
    githubUrl: "https://github.com/sohan20051519/Devyntra-Google-Cloud-Run",
    featured: true,
    image: "https://i.postimg.cc/CLBKsxc7/image.png"
  },
  {
    title: "AI Resume Builder",
    description: "",
    technologies: [],
    liveUrl: "https://resumecv-test.vercel.app/",
    githubUrl: "https://github.com/sohan20051519/resume",
    featured: true,
    image: "https://iili.io/KG1KP6B.md.png"
  },
  {
    title: "Fake Debit & Credit Card Generator",
    description: "",
    technologies: [],
    liveUrl: "https://generatecards.vercel.app/",
    githubUrl: "https://github.com/sohan20051519/card-generator",
    featured: true,
    image: "https://iili.io/KG1qP71.md.png"
  },
  {
    title: "Sohan Web",
    description: "Modern web development project featuring responsive design, interactive components, and clean UI/UX with advanced frontend technologies and seamless user experience.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel", "Responsive Design"],
    liveUrl: "https://sohan-web.vercel.app",
    githubUrl: "https://github.com/sohan20051519/sohan-web",
    featured: true,
    image: "https://i.ibb.co/XZGrp4hw/sohan-web-vercel-app.png"
  },
  {
    title: "Portfolio Website",
    description: "Professional portfolio website showcasing projects, skills, and experience with modern design, responsive layout, and interactive components.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Responsive Design", "UI/UX"],
    liveUrl: "#",
    githubUrl: "https://github.com/sohan20051519/sohan-web-design",
    featured: true,
    image: "https://iili.io/KG1B1v1.md.png"
  }
]

export function ProjectsSection() {
  const [previewImage, setPreviewImage] = useState<{
    src: string
    alt: string
    title: string
  } | null>(null)

  const openPreview = (src: string, alt: string, title: string) => {
    setPreviewImage({ src, alt, title })
  }

  const closePreview = () => {
    setPreviewImage(null)
  }

  return (
    <section id="projects" className="pt-12 lg:pt-16 relative overflow-visible scroll-mt-24 md:scroll-mt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              A collection of projects showcasing full-stack development, AI integration, and modern web technologies
            </p>
          </div>

          <div className="relative z-10 mt-8 flex justify-center">
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="132, 0, 255"
              items={projects.map(p => ({
                title: '',
                description: p.description,
                liveUrl: p.liveUrl,
                githubUrl: p.githubUrl,
                image: typeof p.image === 'string' ? p.image : (p.image as any),
                label: p.title,
                color: '#060010'
              }))}
            />
          </div>

          <div className="text-center mt-12 relative z-40">
            <Button
              variant="outline"
              size="lg"
              className="glass border-border-elevated hover:bg-surface-elevated px-8"
              asChild
            >
              <a href="https://github.com/sohan20051519" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      <ImagePreviewModal
        isOpen={!!previewImage}
        onClose={closePreview}
        imageSrc={previewImage?.src || ""}
        imageAlt={previewImage?.alt || ""}
        title={previewImage?.title}
      />
    </section>
  )
}
