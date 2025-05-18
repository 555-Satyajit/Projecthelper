import Image from 'next/image';
import { Project } from '../types';
import { formatIndianCurrency, formatDate } from '../data/formatters';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative h-48">
        <Image 
          src={project.imageUrl} 
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white py-1 px-3 rounded-bl-lg text-sm font-medium">
          {project.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-600 font-bold">
            {formatIndianCurrency(project.price)}
          </span>
          <span className="text-gray-500 text-sm">
            {formatDate(project.completionDate)}
          </span>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500 mb-2">Technologies Used:</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;