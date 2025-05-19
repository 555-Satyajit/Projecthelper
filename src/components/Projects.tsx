'use client';
import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  
  // Extract unique categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  // Duplicate projects for seamless marquee loop
  const marqueeProjects = [...filteredProjects, ...filteredProjects];
  
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our portfolio of completed projects to see the quality and diversity of our work
          </p>
        </div>
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleFilterChange(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${
                activeFilter === category
                  ? 'bg-blue-600 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Enhanced Marquee View */}
        {filteredProjects.length > 0 && (
          <div className="relative overflow-hidden py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-gray-100 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-gray-100 after:to-transparent">
            <div className="flex animate-marquee hover:animate-pause">
              {marqueeProjects.map((project, index) => (
                <div key={`${project.id}-${index}`} className="flex-shrink-0 w-80 mx-4 transform transition-transform hover:scale-105 hover:z-10">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-lg text-gray-500">No projects found in this category.</p>
            <button 
              onClick={() => handleFilterChange('All')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View all projects
            </button>
          </div>
        )}
        
        {/* View All Projects Button */}
        {filteredProjects.length > 0 && (
          <div className="mt-12 text-center">
            <a href="/projects" className="inline-flex items-center bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        )}
      </div>
      
      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        
        .animate-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Projects;