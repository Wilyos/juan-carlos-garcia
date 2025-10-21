import { Globe, Linkedin, Mail, Instagram } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    { icon: Globe, href: "https://ipropanel.com.co", label: "Sitio Web", username: "ipropanel.com.co" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/iprocom-s-a/?originalSubdomain=co", label: "LinkedIn", username: "IPROCOM S.A." },
    { icon: Instagram, href: "https://www.instagram.com/ipropanel", label: "Instagram", username: "@ipropanel" },
    { icon: Mail, href: "mailto:Jzuleta@iprocom.co", label: "Email", username: "Jzuleta@iprocom.co" }
  ];

  // Función para enviar mensaje por WhatsApp
  const handleWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nombre = (form.nombre as HTMLInputElement).value;
    const telefono = (form.telefono as HTMLInputElement).value;
    const correo = (form.correo as HTMLInputElement).value;
    const mensaje = (form.mensaje as HTMLInputElement).value;
    const numeroWhatsApp = "3176381655";
  const texto = `Mi nombre es ${nombre}, ${mensaje} y estos son mis datos: ${correo} y ${telefono}`;
  const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(texto.replace(/\n/g, ' '))}`;
  // Contador en localStorage
  let count = Number(localStorage.getItem('contactFormCount') || '0');
  count++;
  localStorage.setItem('contactFormCount', count.toString());
  console.log(`Formularios enviados: ${count}`);
  // Descargar vCard
  const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:Juan Carlos Zuleta\nN:Zuleta;Juan Carlos;;;\nORG:IPROCOM S.A.\nTITLE:Gerente General\nTEL:+573176381655\nEMAIL:Jzuleta@iprocom.co\nURL:https://ipropanel.com.co\nEND:VCARD`;
  const blob = new Blob([vCardData.replace(/\\n/g, '\n')], { type: 'text/vcard' });
  const vcfUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = vcfUrl;
  link.download = 'Juan_Carlos_Zuleta_IPROCOM.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(vcfUrl);
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
            {/* Enlaces de redes */}
            <div>
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
            {/* Formulario de contacto */}
            <div>
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
                  <label htmlFor="mensaje" className="block text-sm font-medium text-foreground mb-2">Mensaje</label>
                  <textarea id="mensaje" name="mensaje" rows={4} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary" required></textarea>
                </div>
                <button type="submit" className="w-full py-3 rounded-lg bg-primary text-background font-bold hover:bg-primary/90 transition-colors">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;