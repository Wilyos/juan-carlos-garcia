
import { useEffect, useState } from "react";

const Footer = () => {
  const [contador, setContador] = useState(null);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbw-gR3FCFoz-Qg-UBnI97h0o9RDO3fDSVPFta0RhMpBeQCHqcygo8hLpkWkyodDHaneeA/exec")
      .then(res => res.text())
      .then(num => setContador(num))
      .catch(() => setContador(null));
  }, []);

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-sm text-background/80">
            © 2025 Juan Carlos Zuleta — All rights reserved.
            {contador && (
              <span className="ml-2 text-xs opacity-40 select-none">| Formularios enviados: {contador}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;