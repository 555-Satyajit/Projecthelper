// Define types for pricing plans
export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
  color: string; // Tailwind color class
}

// Pricing data with Indian Rupees
export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Basic",
    price: 1999,
    description: "Perfect for small academic projects",
    features: [
      "Basic project development",
      "Standard documentation",
      "Email support",
      "7-day delivery",
      "1 revision"
    ],
    popular: false,
    color: "blue"
  },
  {
    id: 2,
    name: "Standard",
    price: 4999,
    description: "Ideal for most college projects",
    features: [
      "Advanced project development",
      "Comprehensive documentation",
      "Code explanation session",
      "Priority email & phone support",
      "5-day delivery",
      "3 revisions"
    ],
    popular: true,
    color: "indigo"
  },
  {
    id: 3,
    name: "Premium",
    price: 9999,
    description: "For complex final year projects",
    features: [
      "Complex project implementation",
      "Detailed technical documentation",
      "Multiple code explanation sessions",
      "24/7 priority support",
      "3-day delivery",
      "Unlimited revisions",
      "Presentation preparation"
    ],
    popular: false,
    color: "purple"
  }
];