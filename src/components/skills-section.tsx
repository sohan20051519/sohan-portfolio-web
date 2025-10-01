import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import DecryptedText from "./DecryptedText"

const skillCategories = [
  {
    title: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "UI/UX"],
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  {
    title: "Backend Development", 
    skills: ["Node.js", "Python", "API Integration", "Database Management", "RESTful APIs"],
    color: "bg-green-500/10 text-green-400 border-green-500/20"
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "Terraform", "CI/CD", "AWS", "Azure", "GCP", "Vercel", "Netlify"],
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  {
    title: "Tools & Technologies",
    skills: ["Git", "GitHub", "VS Code", "Linux", "Command Line", "AI-assisted Coding"],
    color: "bg-orange-500/10 text-orange-400 border-orange-500/20"
  },
  {
    title: "Security & Others",
    skills: ["Ethical Hacking", "Debugging", "Problem Solving", "Self-directed Learning"],
    color: "bg-red-500/10 text-red-400 border-red-500/20"
  }
]

export function SkillsSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">Skills & Expertise</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>
          
          {/* First row - 2 cards */}
          <div className="grid gap-8 md:grid-cols-2 mb-8">
            {skillCategories.slice(0, 2).map((category, index) => (
              <Card 
                key={category.title}
                className="glass border-border-elevated hover:glow transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-text-primary">
                    {category.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge 
                        key={skill}
                        variant="secondary"
                        className={`${category.color} hover:scale-105 transition-transform duration-200`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Second row - 3 cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.slice(2).map((category, index) => (
              <Card 
                key={category.title}
                className="glass border-border-elevated hover:glow transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-text-primary">
                    {category.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge 
                        key={skill}
                        variant="secondary"
                        className={`${category.color} hover:scale-105 transition-transform duration-200`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Card className="glass border-border-elevated max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 gradient-text">
                  Professional Summary
                </h3>
                <DecryptedText
                  text="Currently pursuing BCA in Computer Applications at KLE Society's Degree College, Bengaluru. Experienced in building responsive web applications using AI-assisted coding workflows (Vibe Coding) with modern technologies. Skilled at database management, API integration, and version control. Familiar with DevOps practices including CI/CD pipelines, cloud deployment, and automation. Strong problem-solving, debugging, and collaboration skills with a passion for continuous learning."
                  animateOn="view"
                  speed={40}
                  maxIterations={12}
                  revealDirection="center"
                  className="text-text-secondary leading-relaxed text-left sm:text-center"
                  encryptedClassName="text-text-secondary/50"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}