import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'svc-1',
    title: 'Custom Project Development',
    description: 'End-to-end development of academic projects tailored to your requirements and specifications.',
    iconUrl: '/images/services/custom-dev.svg',
    benefits: [
      'Personalized solutions for your specific needs',
      'Expert guidance throughout the development process',
      'High-quality code with proper documentation',
      'Technical support for presentation and submissions'
    ]
  },
  {
    id: 'svc-2',
    title: 'Project Consultation',
    description: 'Expert guidance on project selection, planning, and implementation strategies.',
    iconUrl: '/images/services/consultation.svg',
    benefits: [
      'Identify the most suitable project based on your interests',
      'Technical feasibility assessment of your ideas',
      'Guidance on technology stack selection',
      'Timeline and resource planning assistance'
    ]
  },
  {
    id: 'svc-3',
    title: 'Technical Documentation',
    description: 'Comprehensive documentation for your projects including system design, user manuals and technical reports.',
    iconUrl: '/images/services/documentation.svg',
    benefits: [
      'Well-structured documentation following academic standards',
      'UML diagrams and system architecture documentation',
      'User guides and installation instructions',
      'Project presentation materials'
    ]
  },
  {
    id: 'svc-4',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications for Android and iOS with clean, intuitive interfaces.',
    iconUrl: '/images/services/mobile-dev.svg',
    benefits: [
      'Native and hybrid app development options',
      'User-centric design and smooth performance',
      'Integration with web services and APIs',
      'Play Store and App Store deployment assistance'
    ]
  },
  {
    id: 'svc-5',
    title: 'Web Application Development',
    description: 'Modern, responsive web applications with the latest frameworks and technologies.',
    iconUrl: '/images/services/web-dev.svg',
    benefits: [
      'Responsive designs that work on all devices',
      'SEO-friendly architecture and implementation',
      'Performance optimization for fast loading',
      'Integration with third-party services and APIs'
    ]
  },
  {
    id: 'svc-6',
    title: 'IoT & Hardware Projects',
    description: 'Smart systems combining hardware components with software solutions for real-world applications.',
    iconUrl: '/images/services/iot.svg',
    benefits: [
      'Sensor integration and data collection systems',
      'Real-time monitoring and control applications',
      'Edge computing and cloud integration',
      'Hardware selection and procurement guidance'
    ]
  }
];