import { Zap, Award, Users, Palette, Shield, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Creative Conceptualization",
    description: "Connect with expert designers and creative professionals to bring your unique product ideas to life",
    color: "from-purple-500 to-pink-500",
    stats: "500+ Designers",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Verified Supplier Network",
    description: "Access our curated network of verified suppliers and manufacturers across multiple industries",
    color: "from-blue-500 to-teal-500",
    stats: "2000+ Suppliers",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Fast Turnaround",
    description: "Streamlined processes and efficient supplier matching ensure quick project completion",
    color: "from-yellow-500 to-orange-500",
    stats: "48-72 Hours Response",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Quality Assurance",
    description: "Rigorous supplier vetting and quality control processes ensure premium results every time",
    color: "from-green-500 to-blue-500",
    stats: "99.8% Quality Rating",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure Transactions",
    description: "Protected payments and secure communication channels for safe B2B transactions",
    color: "from-indigo-500 to-purple-500",
    stats: "100% Payment Security",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "24/7 Platform Support",
    description: "Round-the-clock platform support to help you navigate and resolve any issues quickly",
    color: "from-red-500 to-pink-500",
    stats: "24/7 Availability",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-bold mb-4">Platform Benefits</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">EaseGiv?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're the leading B2B platform connecting businesses with verified suppliers for custom product needs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
            >
              <CardContent className="p-8 relative">
                {/* Background Decoration */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-10 rounded-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500`}
                ></div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 mb-6 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

                {/* Stats */}
                <div
                  className={`inline-block px-3 py-1 bg-gradient-to-r ${feature.color} text-white text-xs font-bold rounded-full`}
                >
                  {feature.stats}
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-4">Join the EaseGiv Platform</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Connect with thousands of verified suppliers and bring your custom product ideas to life with confidence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all">
                Start Customizing
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
                Browse Suppliers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
