import { Palette, Users, Truck, Shield, Headphones, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesSection() {
  const services = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Custom Design Services",
      description: "Professional designers create stunning visuals tailored to your brand identity and requirements.",
      features: ["Logo Design", "Brand Guidelines", "Product Mockups", "3D Visualization"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Supplier Network",
      description: "Access to 500+ verified suppliers across India for all your customization needs.",
      features: ["Quality Verified", "Competitive Pricing", "Bulk Specialists", "Pan-India Coverage"],
      color: "from-blue-500 to-teal-500",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Logistics & Delivery",
      description: "End-to-end logistics management with real-time tracking and timely delivery.",
      features: ["Express Shipping", "Real-time Tracking", "Bulk Handling", "Secure Packaging"],
      color: "from-green-500 to-blue-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "Rigorous quality control processes ensure every product meets your expectations.",
      features: ["Pre-production Samples", "Quality Inspections", "Satisfaction Guarantee", "Return Policy"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Dedicated Support",
      description: "24/7 customer support with dedicated account managers for enterprise clients.",
      features: ["24/7 Support", "Account Managers", "Live Chat", "Phone Support"],
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Technology Platform",
      description: "Advanced technology platform with AI-powered recommendations and automation.",
      features: ["3D Customization", "AI Recommendations", "Order Automation", "Analytics Dashboard"],
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive B2B customization services designed to help your business create memorable brand experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-xl mb-8 opacity-90">
              Our team can create tailored solutions for your specific business requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Contact Our Team
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors bg-transparent">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
