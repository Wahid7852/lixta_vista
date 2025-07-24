import { Shield, FileText, Users, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsConditionsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Terms & Policies</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transparent policies and terms that protect both your business and ours
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm mb-4">Clear terms governing the use of our platform and services</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Read Full Terms →</button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm mb-4">How we collect, use, and protect your personal information</p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">View Privacy Policy →</button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm mb-4">Fair refund and return policies for your peace of mind</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Check Refund Terms →
              </button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Supplier Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm mb-4">Terms and conditions for suppliers joining our network</p>
              <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                Supplier Guidelines →
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Highlights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-bold mb-2">100% Secure</h4>
              <p className="text-gray-600 text-sm">
                Your data and transactions are protected with enterprise-grade security
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-bold mb-2">Transparent Terms</h4>
              <p className="text-gray-600 text-sm">
                No hidden clauses - all terms are clearly stated and easy to understand
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-bold mb-2">Fair Practices</h4>
              <p className="text-gray-600 text-sm">
                Ethical business practices that benefit all parties in the ecosystem
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
