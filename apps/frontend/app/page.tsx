import React from 'react';
import { Pencil, Share2, Cloud, Layers, Github } from 'lucide-react';
import Link from 'next/link';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pencil className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">Excelidraw</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="https://github.com" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Try Now
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Create Beautiful Diagrams with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The open-source whiteboard for sketching hand-drawn like diagrams. Collaborate in real-time with your team.
            </p>
            <div className="flex space-x-4">
              <Link href={'/signin'}>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Signin
              </button>
              </Link>
              <Link href={'/signup'}>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 transition-colors">
                Signup
              </button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80"
              alt="Whiteboard Collaboration"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Excelidraw?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Pencil}
              title="Intuitive Drawing"
              description="Create hand-drawn like diagrams with our intuitive drawing tools and customizable elements."
            />
            <FeatureCard
              icon={Share2}
              title="Real-time Collaboration"
              description="Work together with your team in real-time, no matter where they are located."
            />
            <FeatureCard
              icon={Cloud}
              title="Cloud Storage"
              description="Your drawings are automatically saved and synced across all your devices."
            />
            <FeatureCard
              icon={Layers}
              title="Multiple Layers"
              description="Organize your diagrams with layers for better control and flexibility."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Creating?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating beautiful diagrams with Excelidraw.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Pencil className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Excelidraw</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © {new Date().getFullYear()} Excelidraw. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;