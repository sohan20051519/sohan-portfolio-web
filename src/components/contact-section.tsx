import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sohan20051519@gmail.com",
    href: "mailto:sohan20051519@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(+91) 8050130969",
    href: "tel:+918050130969"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bengaluru, India",
    href: "#"
  }
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/sohan20051519",
    username: "@sohan20051519"
  },
  {
    icon: Linkedin,
    label: "LinkedIn", 
    href: "https://linkedin.com/in/sohan2005",
    username: "sohan2005"
  }
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Ready to collaborate on exciting projects or discuss opportunities. Let's build something amazing together!
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information */}
            <Card className="glass border-border-elevated hover:glow transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-text-primary">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((item) => {
                    const IconComponent = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-4">
                        <div className="p-3 glass rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-secondary">
                            {item.label}
                          </p>
                          {item.href !== "#" ? (
                            <a 
                              href={item.href}
                              className="text-text-primary hover:text-primary transition-colors duration-200"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-text-primary">{item.value}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            
            {/* Social Links & CTA */}
            <Card className="glass border-border-elevated hover:glow transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-text-primary">
                  Connect Online
                </h3>
                
                <div className="space-y-4 mb-8">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 glass rounded-lg hover:glow transition-all duration-300 group"
                      >
                        <IconComponent className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                        <div>
                          <p className="font-medium text-text-primary group-hover:gradient-text transition-all duration-200">
                            {social.label}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {social.username}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
                
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow"
                    asChild
                  >
                    <a href="mailto:sohan20051519@gmail.com">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Email
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full glass border-border-elevated hover:bg-surface-elevated"
                    asChild
                  >
                    <a href="https://sohan.app" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View Portfolio
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Card className="glass border-border-elevated">
              <CardContent className="p-6">
                <p className="text-text-secondary">
                  <span className="font-medium text-text-primary">Currently:</span> 
                  {" "}Available for freelance projects and full-time opportunities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}