import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import { ImagePreviewModal } from "@/components/image-preview-modal"
import { useState } from "react"
import ScrollStack, { ScrollStackItem } from "./ui/scroll-stack"

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
    title: "AI Resume Builder",
    description: "Intelligent resume creation platform powered by AI that helps users build professional resumes with automated formatting, content suggestions, and industry-specific templates.",
    technologies: ["AI/ML", "React", "TypeScript", "Natural Language Processing", "PDF Generation"],
    liveUrl: "https://resumecv-test.vercel.app/",
    githubUrl: "https://github.com/sohan20051519/resume",
    featured: true,
    image: "https://iili.io/KG1KP6B.md.png"
  },
  {
    title: "Fake Debit & Credit Card Generator",
    description: "Secure testing tool for developers that generates realistic-looking fake debit and credit card numbers for testing payment systems and e-commerce applications.",
    technologies: ["JavaScript", "Card Validation", "Testing Tools", "Security", "Payment Systems"],
    liveUrl: "https://generatecards.vercel.app/",
    githubUrl: "https://github.com/sohan20051519/card-generator",
    featured: true,
    image: "https://iili.io/KG1qP71.md.png"
  },
  {
    title: "sohan.app",
    description: "Personal portfolio website showcasing technical skills and certifications with modern design and responsive layout.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Responsive Design"],
    liveUrl: "https://sohan.app",
    githubUrl: "https://github.com/sohan20051519/sohan-ui.ux",
    featured: true,
    image: projectSohanUIUX
  },
  {
    title: "OneOps DevOps Platform",
    description: "AI-powered DevOps automation platform featuring zero-config CI/CD, smart automation, and seamless cloud integrations.",
    technologies: ["DevOps", "CI/CD", "Cloud Integration", "Automation", "AI"],
    liveUrl: "https://oneops-18.vercel.app",
    githubUrl: "https://github.com/sohan20051519/OneOps-Landing",
    featured: true,
    image: projectOneOps
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
    <section id="projects" className="pt-24 lg:pt-32 pb-40 relative overflow-visible scroll-mt-24 md:scroll-mt-32">
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

          <div className="-mt-[8vh] relative z-10">
            <ScrollStack
              useWindowScroll
              itemDistance={70}
              itemScale={0.02}
              itemStackDistance={35}
              baseScale={0.92}
              rotationAmount={0}
              blurAmount={0.4}
              stackPosition="15%"
              scaleEndPosition="8%"
              className="-mx-4"
            >
            {projects.map((project, index) => (
              <ScrollStackItem key={index} itemClassName="scroll-stack-card">
                <Card className="glass border-border-elevated group cursor-pointer overflow-hidden transform-gpu [will-change:transform] motion-reduce:transform-none pointer-events-none">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="relative z-10 group/image md:w-1/2 pointer-events-none">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none cursor-pointer transition-all duration-300 group-hover/image:scale-105 transform-gpu pointer-events-none"
                      onClick={() => openPreview(project.image, `${project.title} preview`, project.title)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-all duration-300 rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover/image:opacity-100 transition-all duration-300 text-white hover:text-white glass pointer-events-auto"
                        onClick={() => openPreview(project.image, `${project.title} preview`, project.title)}
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex flex-col h-full p-4 md:p-6 relative z-30 pointer-events-auto">
                    <CardHeader className="p-0">
                      <CardTitle className="text-base font-semibold text-text-primary group-hover:gradient-text transition-all duration-300 md:text-xl">
                        {project.title}
                        {project.featured && (
                          <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary text-xs">
                            Featured
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-xs text-text-secondary mt-1 md:text-sm md:mt-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0 flex flex-col flex-grow mt-4">
                      <div className="flex flex-wrap gap-1 mb-3 md:gap-2 md:mb-4">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-border-elevated hover:scale-105 transition-transform duration-200 text-xs px-1.5 py-0.5"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Live Demo
                          </a>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="glass border-border-elevated hover:bg-surface-elevated text-xs h-8"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-1 h-3 w-3" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
                </Card>
              </ScrollStackItem>
            ))}
            </ScrollStack>
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
