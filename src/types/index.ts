// Type definitions for ProjectHelper

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  technologies: string[];
  completionDate: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  benefits: string[];
}

export interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'primary' | 'secondary';
}

export interface NavItem {
  label: string;
  href: string;
}