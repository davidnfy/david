import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Instagram, Disc as Discord, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const socials = [
    { label: 'GitHub', href: 'https://github.com/davidnfy' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/davidnafisy/' },
    { label: 'Instagram', href: 'https://www.instagram.com/davidnfy/' },
    { label: 'Discord', href: 'https://discord.com/users/1272875106187608128' },
  ];

  return (
    <footer id="contact" className="py-48 px-8 md:px-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-end">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-30">Contact</h2>
            <h3 className="text-6xl md:text-[7vw] font-black tracking-tighter leading-[0.9] py-2">
              Ready to <br />
              <span className="text-empathetic italic inline-block pb-2 pr-6">innovate?</span>
            </h3>
          </motion.div>

          <a 
            href="mailto:davidnafisy3@gmail.com"
            className="text-2xl md:text-4xl font-extrabold hover:text-empathetic transition-all underline decoration-2 underline-offset-8"
          >
            davidnafisy3@gmail.com
          </a>
        </div>

        <div className="space-y-12 md:text-right">
          <div className="flex flex-col md:items-end gap-6 text-sm font-black tracking-widest uppercase">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ x: -10, opacity: 0.5 }}
                className="inline-flex items-center gap-2 group transition-all"
              >
                {social.label} <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
 
          <div className="pt-24 text-[10px] space-y-2 opacity-20 font-black tracking-[0.2em] uppercase">
            <p>© 2024 DNFY — DESIGNED BY DAVID</p>
            <p>BASED IN JAKARTA, ID</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
