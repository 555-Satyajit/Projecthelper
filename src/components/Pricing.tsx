'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { pricingPlans } from '../data/pricing';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  // Formatter for Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscountedPrice = (price: number) => {
    // Apply 20% discount for annual billing
    return isAnnual ? price * 0.8 : price;
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Affordable <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Choose the perfect plan that suits your project requirements
          </motion.p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center items-center mb-12">
          <span className={`mr-3 text-sm font-medium ${!isAnnual ? 'text-indigo-700' : 'text-slate-500'}`}>Monthly</span>
          
          <motion.button 
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ease-in-out duration-200 focus:outline-none ${isAnnual ? 'bg-indigo-600' : 'bg-gray-200'}`}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Toggle billing period</span>
            <motion.span
              className="inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform"
              initial={false}
              animate={{ x: isAnnual ? 24 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
          
          <span className={`ml-3 text-sm font-medium ${isAnnual ? 'text-indigo-700' : 'text-slate-500'}`}>
            Annual <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded ml-1">Save 20%</span>
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => {
            const price = calculateDiscountedPrice(plan.price);
            
            return (
              <motion.div
                key={plan.id}
                className={`relative rounded-xl shadow-lg overflow-hidden transition-all ${
                  plan.popular ? 'border-2 border-indigo-500 shadow-xl' : 'border border-gray-100'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: plan.id * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  {/* Plan name */}
                  <h3 className={`text-xl font-bold mb-2 text-${plan.color}-600`}>{plan.name}</h3>
                  <p className="text-slate-600 text-sm mb-6">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold">{formatPrice(price)}</span>
                      <span className="ml-1 text-slate-500">/ project</span>
                    </div>
                    {isAnnual && (
                      <p className="text-xs text-green-600 mt-1">
                        <s>{formatPrice(plan.price)}</s> {formatPrice(price)} with annual billing
                      </p>
                    )}
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                      >
                        <svg className={`w-5 h-5 text-${plan.color}-500 mr-2 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <motion.button 
                    className={`w-full py-3 px-4 rounded-lg font-medium ${
                      plan.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                    } transition-colors`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Select Plan
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Money back guarantee */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-slate-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            100% satisfaction guaranteed or money back within 7 days
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;