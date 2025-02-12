"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Code, Zap, Shield, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Home() {
  const features = [
    { icon: Code, text: "Multi-language support" },
    { icon: Zap, text: "Real-time code analysis" },
    { icon: Shield, text: "Security vulnerability detection" },
    { icon: Sparkles, text: "Performance optimization tips" },
  ]

  const faqs = [
    {
      question: "How does AI Code Review work?",
      answer:
        "AI Code Review uses advanced machine learning algorithms to analyze your code, identify potential issues, and provide suggestions for improvement.",
    },
    {
      question: "What programming languages are supported?",
      answer:
        "We support a wide range of popular programming languages, including JavaScript, Python, Java, C++, and many more. You can also specify custom languages.",
    },
    {
      question: "Is my code safe and secure?",
      answer:
        "Yes, we take security seriously. Your code is encrypted in transit and at rest, and we do not store it after the review process is complete.",
    },
    {
      question: "How accurate are the AI-generated reviews?",
      answer:
        "Our AI model is constantly improving and has been trained on millions of code samples. While it's very accurate, we always recommend using it in conjunction with human review for critical systems.",
    },
  ]

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <main className="flex-grow">
        <section className="py-20 px-8 relative overflow-hidden" ref={containerRef}>
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 pointer-events-none"
            style={{
              maskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 50%)`,
              WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 50%)`,
            }}
          />
          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <motion.h1
              className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI-Powered Code Review
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Enhance your coding skills with instant, intelligent feedback from our advanced AI code reviewer.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                >
                  <Card className="h-full transition-all duration-200 hover:scale-105 hover:shadow-lg overflow-hidden group">
                    <CardContent className="flex items-center space-x-4 p-6 relative">
                      <feature.icon className="text-primary h-8 w-8 relative z-10" />
                      <span className="text-lg relative z-10">{feature.text}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}>
              <Link href="/review">
                <Button
                  size="lg"
                  className="text-lg transition-all duration-200 hover:bg-white/70 text-gray-800 bg-white hover:scale-105 relative overflow-hidden group"
                >
                  <span className="relative z-10">Start Your Free Review</span>
                  <ArrowRight className="ml-2 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-8 relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.h2
              className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Paste Your Code",
                  description: "Simply paste your code into our editor or upload your file.",
                },
                {
                  title: "Select Language",
                  description: "Choose from a wide range of supported programming languages.",
                },
                {
                  title: "Get Instant Feedback",
                  description: "Receive detailed analysis and suggestions to improve your code.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <Card className="h-full transition-all duration-200 hover:scale-105 hover:shadow-lg overflow-hidden group">
                    <CardContent className="p-6 relative">
                      <h3 className="text-2xl font-semibold mb-4 relative z-10">{step.title}</h3>
                      <p className="text-muted-foreground relative z-10">{step.description}</p>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-8 relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.h2
              className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  )
}

