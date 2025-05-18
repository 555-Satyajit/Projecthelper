// Define types for feature items
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string; // SVG path or icon name
  color: string; // Tailwind color class
}

// Features/services data
export const features: Feature[] = [
  {
    id: 1,
    title: "Custom Project Development",
    description: "Get tailor-made projects designed to meet your specific academic requirements and learning objectives.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    color: "indigo"
  },
  {
    id: 2,
    title: "Technical Documentation",
    description: "Comprehensive documentation including flowcharts, algorithms, and technical specifications for your project.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "blue"
  },
  {
    id: 3,
    title: "Code Review & Optimization",
    description: "Expert review and optimization of your existing code to improve performance and efficiency.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    color: "cyan"
  },
  {
    id: 4,
    title: "Project Guidance",
    description: "One-on-one guidance sessions to help you understand project concepts and implementation details.",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    color: "purple"
  },
  {
    id: 5,
    title: "Plagiarism-Free Work",
    description: "All projects are 100% original and pass through plagiarism checks to ensure academic integrity.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "green"
  },
  {
    id: 6,
    title: "24/7 Support",
    description: "Round-the-clock technical support and assistance for all your project-related queries.",
    icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
    color: "rose"
  }
];