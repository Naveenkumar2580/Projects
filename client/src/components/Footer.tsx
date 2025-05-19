import LogoText from './LogoText';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <LogoText />
            </h3>
            <p className="text-gray-300 mb-4">
              Transforming ideas into exceptional digital experiences that drive results.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  onClick={() => scrollToSection('home')} 
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('portfolio')} 
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('services')} 
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('contact')} 
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} IN5NITE YIELDS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
