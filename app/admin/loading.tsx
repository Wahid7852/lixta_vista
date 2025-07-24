import { RefreshCw } from "lucide-react"

export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <RefreshCw className="mx-auto h-12 w-12 animate-spin text-blue-600" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading Admin Panel</h2>
        <p className="mt-2 text-gray-600">Please wait while we fetch your data...</p>
        <div className="mt-4 flex justify-center space-x-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
        </div>
      </div>
    </div>
  )
}
