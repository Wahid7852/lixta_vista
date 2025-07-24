"use client"

import { useState } from "react"
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Users,
  Palette,
  Package,
  Truck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DemoWalkthroughProps {
  darkMode?: boolean
}

const demoSteps = [
  {
    id: 1,
    title: "Share Your Requirements",
    description: "Tell us about your product needs, quantity, and timeline",
    icon: <Users className="h-6 w-6" />,
    duration: "2 minutes",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Get Custom Design & Quote",
    description: "Receive professional designs and transparent pricing within 24 hours",
    icon: <Palette className="h-6 w-6" />,
    duration: "24 hours",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Approve Sample",
    description: "Review physical samples and approve before bulk production",
    icon: <Package className="h-6 w-6" />,
    duration: "3-5 days",
    color: "from-green-500 to-teal-500",
  },
  {
    id: 4,
    title: "Production & Delivery",
    description: "Quality manufacturing and timely delivery to your location",
    icon: <Truck className="h-6 w-6" />,
    duration: "7-14 days",
    color: "from-orange-500 to-red-500",
  },
]

const platformFeatures = [
  {
    title: "Real-time Design Preview",
    description: "See your designs come to life with our 3D preview technology",
    completed: true,
  },
  {
    title: "Verified Supplier Network",
    description: "Access to 2000+ verified suppliers across India",
    completed: true,
  },
  {
    title: "Quality Assurance",
    description: "Rigorous quality checks and satisfaction guarantee",
    completed: true,
  },
  {
    title: "Bulk Order Management",
    description: "Streamlined process for large quantity orders",
    completed: true,
  },
  {
    title: "End-to-end Support",
    description: "Dedicated account managers for seamless execution",
    completed: true,
  },
]

export default function DemoWalkthrough({ darkMode = false }: DemoWalkthroughProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would control video playback
  }

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId)
    setProgress((stepId - 1) * 25)
  }

  return (
    <section className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-purple-50"}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            className={`${darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"} px-4 py-2 text-sm font-bold mb-4`}
          >
            Platform Demo
          </Badge>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : ""}`}>
            See How{" "}
            <span
              className={`bg-gradient-to-r ${darkMode ? "from-blue-400 to-purple-400" : "from-blue-600 to-purple-600"} bg-clip-text text-transparent`}
            >
              EaseGiv Works
            </span>
          </h2>
          <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto`}>
            Watch our interactive demo to understand how we make bulk customization simple and efficient for businesses
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Video Demo Section */}
          <div className="space-y-6">
            {/* Video Player Mockup */}
            <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-2xl overflow-hidden`}>
              <div className="relative">
                {/* Video Placeholder */}
                <div
                  className={`aspect-video ${darkMode ? "bg-gray-700" : "bg-gray-900"} flex items-center justify-center relative`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>

                  {/* Play Button */}
                  <Button
                    size="lg"
                    onClick={handlePlayPause}
                    className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/50"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white ml-1" />
                    )}
                  </Button>

                  {/* Video Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-2">EaseGiv Platform Walkthrough</h3>
                    <div className="flex items-center space-x-4 text-white/80 text-sm">
                      <span>Duration: 5:30</span>
                      <span>•</span>
                      <span>Step {currentStep} of 4</span>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="p-4">
                  <Progress value={progress} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0:00</span>
                    <span>5:30</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Platform Features */}
            <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-xl`}>
              <CardHeader>
                <CardTitle className={`text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Platform Features Showcase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {platformFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{feature.title}</h4>
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Process Steps */}
          <div className="space-y-6">
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Our Simple 4-Step Process
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-8`}>
                From requirement to delivery, we've streamlined every step to ensure a smooth experience for your bulk
                orders.
              </p>
            </div>

            {/* Interactive Steps */}
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <Card
                  key={step.id}
                  className={`${
                    currentStep === step.id
                      ? darkMode
                        ? "bg-gray-700 border-blue-500 shadow-lg"
                        : "bg-blue-50 border-blue-500 shadow-lg"
                      : darkMode
                        ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-50"
                  } cursor-pointer transition-all duration-300`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Step Number & Icon */}
                      <div className="flex flex-col items-center space-y-2">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold`}
                        >
                          {step.id}
                        </div>
                        <div
                          className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center text-white`}
                        >
                          {step.icon}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {step.title}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {step.duration}
                          </Badge>
                        </div>
                        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>{step.description}</p>

                        {/* Progress Indicator */}
                        {currentStep === step.id && (
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full animate-pulse`}></div>
                            <span className={`text-sm font-medium ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                              Currently viewing this step
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Arrow for active step */}
                      {currentStep === step.id && (
                        <ArrowRight className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      )}
                    </div>

                    {/* Connection Line */}
                    {index < demoSteps.length - 1 && (
                      <div className={`ml-6 mt-4 w-0.5 h-8 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}></div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <Card
              className={`${darkMode ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gradient-to-r from-blue-600 to-purple-600"} text-white shadow-xl`}
            >
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-4">Ready to Experience EaseGiv?</h4>
                <p className="mb-6 opacity-90">
                  Start your bulk customization journey today with our streamlined process
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold">
                    Start Your Project
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 font-bold bg-transparent"
                  >
                    Schedule Demo Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
