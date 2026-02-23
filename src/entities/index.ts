/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: clienttestimonials
 * Interface for ClientTestimonials
 */
export interface ClientTestimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  testimonialText?: string;
  /** @wixFieldType text */
  clientRoleCompany?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  clientPhoto?: string;
  /** @wixFieldType url */
  clientWebsiteUrl?: string;
}


/**
 * Collection ID: portfolioprojects
 * Interface for PortfolioProjects
 */
export interface PortfolioProjects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  caseStudyDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  projectImages?: string;
  /** @wixFieldType text */
  keyMetrics?: string;
  /** @wixFieldType text */
  technologiesUsed?: string;
  /** @wixFieldType url */
  projectUrl?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  serviceImage?: string;
  /** @wixFieldType text */
  features?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: workprocess
 * Interface for WorkProcess
 */
export interface WorkProcess {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  stepName?: string;
  /** @wixFieldType text */
  shortSummary?: string;
  /** @wixFieldType text */
  stepDescription?: string;
  /** @wixFieldType number */
  stepOrder?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  visualRepresentation?: string;
}
