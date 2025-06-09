const stats = [
  {
    number: "2M+",
    label: "Happy Customers",
    description: "Businesses trust us worldwide",
  },
  {
    number: "50M+",
    label: "Products Printed",
    description: "High-quality items delivered",
  },
  {
    number: "99.9%",
    label: "Uptime",
    description: "Reliable service you can count on",
  },
  {
    number: "24/7",
    label: "Support",
    description: "Always here to help you",
  },
]

export default function StatsSection() {
  return (
    <div className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-gray-300">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
