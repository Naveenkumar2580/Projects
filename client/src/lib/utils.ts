import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "A modern e-commerce platform with seamless payment integration and responsive design.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 19.99,
    label: 'premium'
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Showcase your work with our beautiful and interactive portfolio websites.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 15.99,
    label: 'best-sell'
  },
  {
    id: 3,
    title: "Corporate Website",
    description: "Professional and polished websites for businesses looking to establish online credibility.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 18.95
  },
  {
    id: 4,
    title: "App Landing Page",
    description: "Convert visitors into users with our high-converting app landing pages.",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 12.95
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Share your content with the world through our optimized blogging platforms.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 14.75
  },
  {
    id: 6,
    title: "Educational Platform",
    description: "Interactive learning management systems for schools, universities or online courses.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 19.50
  },
  {
    id: 7,
    title: "Real Estate Website",
    description: "Property listing platforms with advanced search and filtering capabilities.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 17.99
  },
  {
    id: 8,
    title: "Restaurant Website",
    description: "Showcase your menu, location, and allow online reservations with our restaurant websites.",
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 13.25
  },
  {
    id: 9,
    title: "Membership Platform",
    description: "Subscription-based websites with member areas, content restrictions, and payment integration.",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 18.75
  },
  {
    id: 10,
    title: "Event Management System",
    description: "Organize and promote events with ticketing, RSVPs, and attendee management.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    priceUSD: 16.50
  }
];

export const contentCreationServices = [
  {
    title: "Copywriting",
    description: "Compelling website copy that converts visitors into customers."
  },
  {
    title: "Blog Articles",
    description: "SEO-optimized blog posts that engage your audience and boost rankings."
  },
  {
    title: "Visual Content",
    description: "Eye-catching graphics and images that enhance your brand messaging."
  },
  {
    title: "Social Media Content",
    description: "Engaging posts designed for maximum reach and interaction."
  }
];

export const websiteDevelopmentServices = [
  {
    title: "Responsive Design",
    description: "Websites that look and function perfectly on all devices."
  },
  {
    title: "E-commerce Solutions",
    description: "Custom online stores with secure payment processing and inventory management."
  },
  {
    title: "Website Optimization",
    description: "Speed optimization and SEO implementation for better performance."
  },
  {
    title: "Maintenance & Support",
    description: "Ongoing updates, security, and technical support for your website."
  }
];

export const socialLinks = [
  { icon: "bxl-instagram", url: "#" },
  { icon: "bxl-facebook", url: "#" },
  { icon: "bxl-twitter", url: "#" },
  { icon: "bxl-youtube", url: "#" },
  { icon: "bxl-whatsapp", url: "#" }
];
