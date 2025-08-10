'use client';



export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">PropEase</h2>
          <p className="mt-2 text-sm">
            Find your dream property with ease and confidence.
          </p>
        </div>

      
        {/* Social or contact */}
        <div>
          <h3 className="text-md font-semibold mb-2">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:rimshaali9999@gmail.com" className="hover:underline">rimshaali9999@gmail.com</a></li>
            <li>GitHub: <a href="https://github.com/Rimsha123dev" target="_blank" className="hover:underline">Rimsha123dev</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/rimsha-ali-73872730b" target="_blank" className="hover:underline">Rimsha Ali</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center py-4 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} PropEase. All rights reserved.
      </div>
    </footer>
  );
}
