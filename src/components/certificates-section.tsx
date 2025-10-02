import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, GitBranch, Cloud, Code, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImagePreviewModal } from "@/components/image-preview-modal"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useState, useRef } from "react"
import { useIsMobile } from "@/hooks/use-is-mobile"
import AutoScroll from "embla-carousel-auto-scroll"

// Certificate images
import googleCloudCert from "@/assets/certificates/google-cloud-agentic-ai.png"
import pythonDataScienceCert from "@/assets/certificates/python-data-science.png"
import gitTrainingCert from "@/assets/certificates/git-training.png"
import kaliLinuxCert from "@/assets/certificates/kali-linux-basics.png"
import ethicalHackingCert from "@/assets/certificates/ethical-hacking.png"

const certificates = [
  {
    title: "Ethical Hacking Workshop",
    issuer: "KLE Society Degree College",
    description: "2-day comprehensive workshop on ethical hacking principles, vulnerability assessment, and security testing methodologies.",
    icon: Shield,
    category: "Security",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Security Analysis"],
    image: ethicalHackingCert,
    date: "Oct 2024"
  },
  {
    title: "Introduction to Kali Linux Basics",
    issuer: "Simplilearn",
    description: "Mastery of Kali Linux distribution, penetration testing tools, and security-focused command line operations.",
    icon: Code,
    category: "Systems",
    skills: ["Kali Linux", "Security Tools", "System Administration"],
    image: kaliLinuxCert,
    date: "Aug 2025"
  },
  {
    title: "Git Training",
    issuer: "Simplilearn",
    description: "Advanced version control workflows, collaborative development practices, and Git repository management.",
    icon: GitBranch,
    category: "Development",
    skills: ["Version Control", "Git", "Repository Management"],
    image: gitTrainingCert,
    date: "Aug 2025"
  },
  {
    title: "Google Cloud - Agentic AI Day",
    issuer: "Google Cloud & Hack2skill",
    description: "Cutting-edge AI technologies and agent-based systems on Google Cloud Platform with hands-on implementation.",
    icon: Cloud,
    category: "AI/Cloud",
    skills: ["Google Cloud", "AI/ML", "Agent Systems"],
    image: googleCloudCert,
    date: "2025"
  },
  {
    title: "Python for Data Science",
    issuer: "Analogica & KLE Society",
    description: "54-hour comprehensive certification course covering Python fundamentals, data structures, and data science applications.",
    icon: Code,
    category: "Programming",
    skills: ["Python", "Data Science", "Data Analysis"],
    image: pythonDataScienceCert,
    date: "Sep 2023"
  }
]

const categoryColors = {
  "Security": "bg-red-500/10 text-red-400 border-red-500/20",
  "Systems": "bg-green-500/10 text-green-400 border-green-500/20",
  "Development": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "AI/Cloud": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Programming": "bg-orange-500/10 text-orange-400 border-orange-500/20"
}

export function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<{
    image: string;
    title: string;
  } | null>(null)
  const isMobile = useIsMobile()

  const plugins = useRef([
    AutoScroll({
      speed: isMobile ? 0.5 : 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ])

  const handleViewCertificate = (cert: typeof certificates[0]) => {
    setSelectedCertificate({
      image: cert.image,
      title: cert.title
    })
  }

  return (
    <section id="certificates" className="pt-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Professional certifications demonstrating expertise across multiple domains
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            <Carousel
              plugins={plugins.current}
              className="w-full overflow-hidden"
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {certificates.map((cert, index) => {
                  const IconComponent = cert.icon
                  return (
                    <CarouselItem
                      key={cert.title}
                      className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <Card
                        className="glass border-border-elevated hover:glow transition-all duration-300 animate-fade-in-up group h-full"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <div className="p-3 glass rounded-lg group-hover:glow transition-all duration-300">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg font-semibold text-text-primary mb-2">
                                {cert.title}
                              </CardTitle>
                              <div className="flex items-center justify-between">
                                <Badge 
                                  variant="secondary"
                                  className={categoryColors[cert.category as keyof typeof categoryColors]}
                                >
                                  {cert.category}
                                </Badge>
                                <span className="text-xs text-text-secondary">{cert.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <img
                              src={cert.image}
                              alt={`${cert.title} Certificate Preview`}
                              className="w-full h-32 object-cover rounded-lg border border-border-elevated cursor-pointer hover:scale-105 transition-transform duration-200"
                              onClick={() => handleViewCertificate(cert)}
                            />
                          </div>
                        </CardHeader>

                        <CardContent>
                          <CardDescription className="text-text-secondary mb-4 leading-relaxed">
                            {cert.description}
                          </CardDescription>

                          <div className="space-y-3 mb-4">
                            <div>
                              <p className="text-sm font-medium text-text-secondary mb-1">Issuer:</p>
                              <p className="text-sm text-text-primary">{cert.issuer}</p>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-text-secondary mb-2">Key Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {cert.skills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="outline"
                                    className="text-xs border-border-elevated hover:scale-105 transition-transform duration-200"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <Button
                            onClick={() => handleViewCertificate(cert)}
                            variant="outline"
                            size="sm"
                            className="w-full border-border-elevated hover:glow transition-all duration-300"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Certificate
                          </Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="glass border-border-elevated hover:bg-surface-elevated hidden md:flex" />
              <CarouselNext className="glass border-border-elevated hover:bg-surface-elevated hidden md:flex" />
            </Carousel>
          </div>
          
          <div className="mt-16 text-center">
            <Card className="glass border-border-elevated max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="mb-4">
                  <Award className="h-8 w-8 text-primary mr-3 inline-block align-middle" />
                  <h3 className="text-2xl font-semibold gradient-text inline-block align-middle">
                    Continuous Learning
                  </h3>
                </div>
                <p className="text-text-secondary leading-relaxed text-left sm:text-center">
                  Committed to staying current with industry trends and emerging technologies. 
                  These certifications represent a foundation of continuous professional development 
                  and hands-on experience across multiple technology domains.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ImagePreviewModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        imageSrc={selectedCertificate?.image || ""}
        imageAlt={selectedCertificate?.title || ""}
        title={selectedCertificate?.title}
      />
    </section>
  )
}