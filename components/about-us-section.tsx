import { Users, Award, Globe, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutUsSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About EaseGiv</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're India's leading B2B customization platform, connecting businesses with verified suppliers to create
            exceptional custom products that make lasting impressions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Founded in 2020, EaseGiv emerged from a simple observation: businesses struggled to find reliable
              suppliers for custom products. We set out to bridge this gap by creating a platform that connects
              businesses with verified, quality suppliers across India.
            </p>
            <p className="text-gray-600 mb-4">
              Today, we're proud to serve over 10,000 businesses, from startups to Fortune 500 companies, helping them
              create memorable brand experiences through premium customization.
            </p>
            <p className="text-gray-600">
              Our mission is simple: make B2B customization easy, reliable, and accessible for every business in India.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900">10,000+</h4>
                <p className="text-gray-600">Happy Businesses</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900">500+</h4>
                <p className="text-gray-600">Verified Suppliers</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900">50M+</h4>
                <p className="text-gray-600">Products Delivered</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900">4.9★</h4>
                <p className="text-gray-600">Customer Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-lg mb-2">Quality First</h4>
                <p className="text-gray-600 text-sm">
                  We never compromise on quality. Every supplier is verified and every product is quality-checked.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-bold text-lg mb-2">Customer Success</h4>
                <p className="text-gray-600 text-sm">
                  Your success is our success. We're committed to helping your business grow through great products.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-lg mb-2">Innovation</h4>
                <p className="text-gray-600 text-sm">
                  We continuously innovate to make B2B customization easier and more accessible for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
