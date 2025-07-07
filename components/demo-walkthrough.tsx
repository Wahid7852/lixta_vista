"use client"

import { useState } from "react"
import { Play, X, Monitor, Smartphone, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const demoFeatures = [
  {
    icon: <Monitor className="h-8 w-8" />,
    title: "Easy Design Interface",
    description: "Intuitive drag-and-drop customization tools",
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Supplier Network",
    description: "Connect with 2000+ verified suppliers",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Real-time Preview",
    description: "See your designs come to life instantly",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Quick Quotes",
    description: "Get instant pricing for bulk orders",
    color: "from-purple-500 to-pink-500",
  },
]

export default function DemoWalkthrough() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-bold mb-4">
            <Play className="h-4 w-4 mr-2" />
            Platform Demo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See EaseGiv in{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Watch how businesses use our platform to connect with suppliers and create amazing custom products
          </p>

          {/* Demo Video Thumbnail */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div
              className="relative bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setShowVideo(true)}
            >
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <Play className="h-10 w-10 ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Platform Walkthrough</h3>
                  <p className="text-blue-200">See how easy it is to customize and order</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
                  variant="outline"
                >
                  <Play className="h-6 w-6 mr-2" />
                  Watch Demo (3:45)
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {demoFeatures.map((feature, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-gray-50 to-white"
            >
              <CardContent className="pt-6">
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Demo Steps */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-center mb-8">How It Works - Interactive Demo</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Browse Products", desc: "Explore our vast catalog", icon: "🔍" },
              { step: "2", title: "Customize Design", desc: "Use our design tools", icon: "🎨" },
              { step: "3", title: "Connect Suppliers", desc: "Get matched with verified suppliers", icon: "🤝" },
              { step: "4", title: "Place Order", desc: "Secure ordering and tracking", icon: "📦" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-2xl font-bold">EaseGiv Platform Demo</h3>
                <Button variant="ghost" onClick={() => setShowVideo(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Platform Demo Video</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Interactive walkthrough showing how to use EaseGiv platform
                    </p>
                    <p className="text-xs text-gray-400 mt-4">Video content will be embedded here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
