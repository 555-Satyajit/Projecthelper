'use client';
import Link from 'next/link';
import Image from 'next/image';

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Start Your Next <span className="text-yellow-300">Academic Project?</span>
            </h2>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Join thousands of students who have successfully completed their projects with our expert guidance. 
              Whether you need full project development or just want to use our app, we are here to help you succeed.
            </p>
            
            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>On-Time Delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Affordable Pricing</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="#contact" 
                className="btn-primary bg-yellow-400 text-gray-900 hover:bg-yellow-300 flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                <span>Get Started Today</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <button 
                className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-gray-900 flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-colors"
                onClick={() => {
                  // Add smooth scroll to contact section
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Learn More</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-white/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <svg className="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-sm">4.9/5 Rating</span>
                </div>
                <div className="text-sm opacity-80">
                  From 500+ Happy Students
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - App Download */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center space-y-6">
                <div className="inline-block p-4 bg-white/20 rounded-full">
                  <svg className="w-12 h-12 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">Download Our Mobile App</h3>
                  <p className="text-white/80">
                    Manage your projects on the go with our feature-rich mobile application
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                <a href="#" className="inline-block">
  <div className="bg-black rounded-lg px-4 py-3 flex items-center space-x-3 w-fit mx-auto">
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 512 512">
      <path d="M325.3 234.3L104.2 30.9c-2.9-2.6-6.2-4.6-9.8-5.9L308.6 245.8l16.7-11.5zm20.2 17.5l-41.3 28.6-202.6 145c3.4-1.3 6.6-3.2 9.3-5.6l221.4-203.9c4.8-4.4 4.8-11.9 0-16.3zM86.8 488c3.3-.9 6.3-2.5 9-4.7l203.2-145.6L86.4 131.3c-.5.4-.9.8-1.3 1.3-4.8 5.4-7.4 12.8-7.4 20.7v288c0 11.3 4.6 20.5 9.1 25.7zm338.6-208.1l-71.5-35.5-23.5 16.3 24.5 17-24.5 17 23.5 16.3 71.5-35.5c13.1-6.5 13.1-24.6 0-31.1z"/>
    </svg>
    <div className="text-left">
      <div className="text-xs text-gray-400">Get it on</div>
      <div className="text-base font-semibold text-white">Google Play</div>
    </div>
  </div>
</a>

                  <a href="#" className="inline-block">
                    <div className="bg-black rounded-lg px-4 py-3 flex items-center space-x-3 w-fit mx-auto">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-400">Download on the</div>
                        <div className="text-base font-semibold text-white">App Store</div>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-4 text-sm text-white/70">
                  <span>✓ Free Download</span>
                  <span>✓ Easy to Use</span>
                  <span>✓ Offline Mode</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300/20 rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
      </div>
    </section>
  );
};

export default CTA;