import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Smart Attendance System',
    description: 'Facial recognition based attendance system with mobile app integration for educational institutions.',
    category: 'Mobile & IoT',
    imageUrl: '/images/projects/attendance-system.jpg',
    price: 12999,
    technologies: ['React Native', 'TensorFlow', 'Node.js', 'MongoDB'],
    completionDate: '2024-03-15'
  },
  {
    id: 'proj-2',
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce solution with payment gateway integration and inventory management.',
    category: 'Web Development',
    imageUrl: '/images/projects/ecommerce.jpg',
    price: 15999,
    technologies: ['Next.js', 'Stripe', 'Firebase', 'Tailwind CSS'],
    completionDate: '2024-02-22'
  },
  {
    id: 'proj-3',
    title: 'Hospital Management System',
    description: 'Comprehensive solution for hospital operations including patient records, appointment scheduling and billing.',
    category: 'Enterprise Solutions',
    imageUrl: '/images/projects/hospital-management.jpg',
    price: 24999,
    technologies: ['React', 'Express.js', 'MySQL', 'Docker'],
    completionDate: '2024-04-10'
  },
  {
    id: 'proj-4',
    title: 'Student Portfolio App',
    description: 'Mobile application for students to showcase their projects, skills and achievements to potential employers.',
    category: 'Mobile App',
    imageUrl: '/images/projects/portfolio-app.jpg',
    price: 9999,
    technologies: ['Flutter', 'Firebase', 'Cloud Functions'],
    completionDate: '2024-01-30'
  },
  {
    id: 'proj-5',
    title: 'Agricultural Monitoring System',
    description: 'IoT-based solution for monitoring soil conditions, weather patterns and crop health for optimized farming.',
    category: 'IoT & Hardware',
    imageUrl: '/images/projects/agri-monitoring.jpg',
    price: 18999,
    technologies: ['Arduino', 'Raspberry Pi', 'Python', 'MQTT'],
    completionDate: '2024-05-05'
  },
  {
    id: 'proj-6',
    title: 'Online Learning Platform',
    description: 'Custom LMS with live classes, assignments, and progress tracking for educational institutions.',
    category: 'Educational Technology',
    imageUrl: '/images/projects/learning-platform.jpg',
    price: 19999,
    technologies: ['React', 'Django', 'PostgreSQL', 'WebRTC'],
    completionDate: '2024-03-28'
  }
];