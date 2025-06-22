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
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Custom T-Shirts</h2>
              <p className="text-lg font-medium">Premium Quality • Multiple Logo Placements</p>
              <p className="text-sm text-gray-600 mt-2">MOQ: 100 pieces</p>
            </div>
            <Button asChild className="self-start mt-4 bg-black hover:bg-gray-800 text-white">
              <Link href="/customize">Design Now</Link>
            </Button>
          </div>
          <Image
            src="/images/hero-tshirts.jpg"
            alt="Custom T-shirts with logos"
            width={600}
            height={400}
            className="absolute top-0 right-0 h-full w-1/2 object-cover object-left"
          />
        </div>

        {/* Right Hero Panel */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="relative z-10 p-6 md:p-10 flex flex-col h-full">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Upload & Preview</h2>
              <p className="text-lg font-medium">See your logo in 3D before ordering</p>
              <p className="text-sm text-gray-600 mt-2">Multiple placement options available</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/customize">Try 3D Preview</Link>
              </Button>
            </div>
          </div>
          <Image
            src="/images/logo-customization-preview.jpg"
            alt="3D T-shirt preview with logo"
            width={600}
            height={400}
            className="absolute top-0 right-0 h-full w-1/2 object-cover object-left"
          />
        </div>
      </div>
    </div>
  )
}
