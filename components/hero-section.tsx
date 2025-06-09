import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Hero Panel */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-100 to-gray-200">
          <div className="relative z-10 p-6 md:p-10 flex flex-col h-full">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">My Name, My Pride</h2>
              <p className="text-lg font-medium">100 Visiting Cards at Rs 200</p>
            </div>
            <Button asChild className="self-start mt-4 bg-black hover:bg-gray-800 text-white">
              <Link href="/visiting-cards">Shop Now</Link>
            </Button>
          </div>
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Person holding a business card"
            width={600}
            height={400}
            className="absolute top-0 right-0 h-full w-1/2 object-cover object-left"
          />
        </div>

        {/* Right Hero Panel */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-100 to-gray-200">
          <div className="relative z-10 p-6 md:p-10 flex flex-col h-full">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Wear your brand with pride</h2>
              <p className="text-lg font-medium">1 Starting at Rs. 550</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button asChild className="bg-black hover:bg-gray-800 text-white">
                <Link href="/polo-tshirts">Custom Polo T-shirts</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/tshirts">Custom T-shirts</Link>
              </Button>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="People wearing branded t-shirts"
            width={600}
            height={400}
            className="absolute top-0 right-0 h-full w-1/2 object-cover object-left"
          />
        </div>
      </div>
    </div>
  )
}
