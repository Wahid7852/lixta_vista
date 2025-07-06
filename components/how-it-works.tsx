"use client"

import Link from "next/link"

import { useState } from "react"
import { Play, Search, Handshake, Truck, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const steps = [
  {
    id: 1,
    title: "Browse & Search",
    icon: <Search className="h-8 w-8" />,
    description: "Explore our vast catalog of customizable products and find exactly what you need",
    details: ["Product catalog browsing", "Advanced search filters", "Category exploration", "Supplier discovery"],
    color: "from-purple-500 to-blue-500",
  },
  {
    id: 2,
    title: "Connect & Customize",
    icon: <Handshake className="h-8 w-8" />,
    description: "Connect with verified suppliers and customize products to your exact specifications",
    details: ["Supplier verification", "Custom specifications", "Design collaboration", "Quote requests"],
    color: "from-blue-500 to-teal-500",
  },
  {
    id: 3,
    title: "Order & Track",
    icon: <CheckCircle className="h-8 w-8" />,
    description: "Place orders with confidence and track progress through our platform",
    details: ["Secure ordering", "Payment protection", "Progress tracking", "Quality assurance"],
    color: "from-teal-500 to-green-500",
  },
  {
    id: 4,
    title: "Receive & Review",
    icon: <Truck className="h-8 w-8" />,
    description: "Get your custom products delivered and share your experience with the community",
    details: ["Timely delivery", "Quality inspection", "Customer feedback", "Supplier ratings"],
    color: "from-green-500 to-orange-500",
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-bold mb-4">How EaseGiv Works</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Customization
            </span>{" "}
            Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From finding the right supplier to receiving your custom products, we make B2B customization simple and
            reliable
          </p>

          {/* Demo Video Button */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={() => setShowVideo(true)}
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Platform Demo
          </Button>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card
              key={step.id}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                activeStep === step.id ? "ring-2 ring-blue-500 shadow-xl" : "hover:shadow-lg"
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center text-sm font-bold`}
                  >
                    {step.id}
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>

                {/* Details (shown when active) */}
                {activeStep === step.id && (
                  <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                )}

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Infographic Placeholder */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Platform Flow Visualization</h3>
            <p className="text-gray-600">Interactive platform flow diagram coming soon</p>
          </div>

          {/* Placeholder Infographic */}
          <div className="relative">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center mb-4 shadow-lg`}
                  >
                    {step.icon}
                  </div>
                  <h4 className="font-semibold text-sm">{step.title}</h4>
                  {index < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-10 w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200"
                      style={{ left: `${(index + 1) * 25}%`, width: "25%" }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Customizing?</h3>
          <p className="text-gray-600 mb-6">Join thousands of businesses who trust EaseGiv for their custom products</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full">
              <Link href="/customize">Start Customizing</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 py-4 rounded-full bg-transparent">
              <Link href="/suppliers">Browse Suppliers</Link>
            </Button>
          </div>
        </div>

        {/* Video Modal Placeholder */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Platform Demo</h3>
                <Button variant="ghost" onClick={() => setShowVideo(false)}>
                  ✕
                </Button>
              </div>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Platform demo video will be embedded here</p>
                  <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
