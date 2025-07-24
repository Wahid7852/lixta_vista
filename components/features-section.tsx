import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: "/icons/design.svg",
    title: "Easy Design Tools",
    description: "Create professional designs with our intuitive online design tools",
  },
  {
    icon: "/icons/print.svg",
    title: "High-Quality Printing",
    description: "Premium materials and state-of-the-art printing technology",
  },
  {
    icon: "/icons/shipping.svg",
    title: "Fast Shipping",
    description: "Quick turnaround times with reliable delivery options",
  },
  {
    icon: "/icons/quality.svg",
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee on all our products",
  },
]

export default function FeaturesSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide everything you need to create professional marketing materials for your business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Image
                  src={feature.icon || "/placeholder.svg"}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="text-blue-600"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
