
import { Globe, Linkedin, Mail, Instagram } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const socialLinks = [
    { icon: Globe, href: "https://ipropanel.com.co", label: "Sitio Web", username: "ipropanel.com.co" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/iprocom-s-a/?originalSubdomain=co", label: "LinkedIn", username: "IPROCOM S.A." },
    { icon: Instagram, href: "https://www.instagram.com/ipropanel", label: "Instagram", username: "@ipropanel" },
    { icon: Mail, href: "mailto:Jzuleta@iprocom.co", label: "Email", username: "Jzuleta@iprocom.co" }
  ];

  // Estado para actualizar el contador en el footer
  const [contador, setContador] = useState<number | null>(null);

  // Función para enviar mensaje por WhatsApp y actualizar contador global
  const handleWhatsApp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nombre = (form.nombre as HTMLInputElement).value;
    const telefono = (form.telefono as HTMLInputElement).value;
    const correo = (form.correo as HTMLInputElement).value;
  const empresa = (form.empresa as HTMLInputElement).value;
  const numeroWhatsApp = "3176381655";
  const texto = `Mi nombre es ${nombre}, mi empresa es ${empresa} y estos son mis datos: ${correo} y ${telefono}`;
  const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(texto.replace(/\n/g, ' '))}`;

    // Incrementar contador global en Google Apps Script
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbw-gR3FCFoz-Qg-UBnI97h0o9RDO3fDSVPFta0RhMpBeQCHqcygo8hLpkWkyodDHaneeA/exec", { method: "POST" });
      const newCount = await res.text();
      setContador(Number(newCount));
      // También actualiza el contador en el footer si se usa contexto global o evento personalizado
      window.dispatchEvent(new CustomEvent('contador-actualizado', { detail: Number(newCount) }));
    } catch (err) {
      // Si falla, no actualiza el contador
    }


    // Redirigir a WhatsApp
    window.open(url, "_blank");
  };

  return (
    <section className="py-24 bg-secondary/30" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Contacto
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conéctate conmigo a través de estos medios para conversar sobre oportunidades de negocio y colaboración.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Formulario de contacto primero en móviles */}
            <div className="order-1 md:order-none">
              <form className="space-y-6 bg-card border border-border rounded-2xl p-8 shadow-lg" onSubmit={handleWhatsApp}>
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">Nombre</label>
                  <input type="text" id="nombre" name="nombre" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary" required />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-2">Teléfono</label>
                  <input type="tel" id="telefono" name="telefono" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary" required />
                </div>
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-foreground mb-2">Correo</label>
                  <input type="email" id="correo" name="correo" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary" required />
                </div>
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-foreground mb-2">Empresa</label>
                  <input type="text" id="empresa" name="empresa" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary" required />
                </div>
                <button type="submit" className="w-full py-3 rounded-lg bg-primary text-background font-bold hover:bg-primary/90 transition-colors">Enviar Mensaje</button>
              </form>
            </div>
            {/* Enlaces de redes después en móviles */}
            <div className="order-2 md:order-none">
              <div className="space-y-6">
                {socialLinks.map(({ icon: Icon, href, label, username }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-6 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-lg">{label}</div>
                      <div className="text-muted-foreground">{username}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;