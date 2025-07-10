import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: "/images/testimonials/person1.jpg",
    rating: 5,
    text: "The quality of business cards exceeded my expectations. The design process was so easy!",
  },
  {
    name: "Mike Chen",
    role: "Marketing Manager",
    image: "/images/testimonials/person2.jpg",
    rating: 5,
    text: "Fast delivery and excellent customer service. Our branded t-shirts look amazing!",
  },
  {
    name: "Emily Davis",
    role: "Event Coordinator",
    image: "/images/testimonials/person3.jpg",
    rating: 5,
    text: "Perfect for all our event materials. The online design tool made everything simple.",
  },
]

export default function TestimonialsSection() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-gray-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
