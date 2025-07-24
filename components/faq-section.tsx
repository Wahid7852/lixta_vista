"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "Our minimum order quantity is 100 pieces for all products. This ensures we can provide you with the best bulk pricing and maintain quality standards across all orders.",
  },
  {
    question: "How long does customization and delivery take?",
    answer:
      "Customization typically takes 3-5 business days, and delivery takes an additional 5-7 business days depending on your location. Rush orders can be accommodated with additional charges.",
  },
  {
    question: "Can I get samples before placing a bulk order?",
    answer:
      "Yes! We offer paid samples for ₹299-₹999 depending on the product. Sample costs are adjusted against your final bulk order if you proceed with us.",
  },
  {
    question: "What file formats do you accept for custom designs?",
    answer:
      "We accept AI, EPS, PDF, PNG (high resolution), and JPG files. For best results, please provide vector files (AI, EPS) with fonts converted to outlines.",
  },
  {
    question: "Do you provide design services?",
    answer:
      "Yes! Our creative team can help conceptualize and design your products. Design charges start from ₹500 and vary based on complexity.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We require 50% advance payment to start production and 50% before dispatch. We accept bank transfers, UPI, and corporate cheques.",
  },
  {
    question: "Can you ship pan-India?",
    answer:
      "Yes, we ship across India. Shipping is free for orders above ₹5000. For orders below this amount, shipping charges apply based on location and weight.",
  },
  {
    question: "What if I'm not satisfied with the quality?",
    answer:
      "We have a quality guarantee policy. If you're not satisfied with the quality, we'll remake the order at no additional cost or provide a full refund.",
  },
  {
    question: "Do you offer corporate billing and GST invoices?",
    answer:
      "Yes, we provide proper GST invoices for all orders. We can also set up corporate accounts with credit terms for regular customers.",
  },
  {
    question: "Can I track my order status?",
    answer:
      "Once your order is confirmed, you'll receive regular updates via email and SMS. You can also track your order status through our website.",
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers! Find everything you need to know about our B2B customization services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-left p-0 h-auto font-semibold text-lg"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-gray-900">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    )}
                  </Button>
                </CardHeader>
                {openIndex === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Still have questions?</CardTitle>
                <CardDescription className="text-blue-700">
                  Our customer support team is here to help you with any additional queries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">Contact Support</Button>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                    Schedule a Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
