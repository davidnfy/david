import { motion } from "motion/react"

export default function TechStack() {
  const stack = [
    { name: "HTML5", icon: "html5", color: "#E34F26" },
    {
      name: "CSS3",
      icon: "css3",
      color: "#1572B6",
      customUrl: "https://api.iconify.design/logos:css-3.svg"
    },
    { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
    { name: "PHP", icon: "php", color: "#777BB4" },
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "MySQL", icon: "mysql", color: "#4479A1" },
    { name: "Git", icon: "git", color: "#F05032" },
    { name: "GitHub", icon: "github", color: "#FFFFFF" },
    {
      name: "VS Code",
      icon: "visualstudiocode",
      color: "#007ACC",
      customUrl: "https://api.iconify.design/logos:visual-studio-code.svg"
    },
    { name: "Figma", icon: "figma", color: "#F24E1E" },
    { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
    { name: "Bootstrap", icon: "bootstrap", color: "#7952B3" },
    { name: "Postman", icon: "postman", color: "#FF6C37" },
    { name: "Vercel", icon: "vercel", color: "#000000" },
    { name: "Laravel", icon: "laravel", color: "#FF2D20" },
    { name: "Netlify", icon: "netlify", color: "#00C7B7" }
  ]

  return (
    <section id="stack" className="py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-30">
            Stack & Tools
          </h2>
          <div className="w-12 h-1 bg-black rounded-full transition-colors" />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-12">
          {stack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.03,
                type: "spring",
                damping: 20,
                stiffness: 120
              }}
              whileHover={{
                y: -10,
                scale: 1.1
              }}
              className="flex flex-col items-center gap-3 group px-2 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-white border border-black/5 shadow-sm group-hover:shadow-2xl group-hover:border-transparent transition-all duration-300 relative overflow-hidden active:scale-95"
              >
                {/* Background Glow on Hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none bg-[${tech.color}]`}
                />

                {/* Single Colored Icon */}
                <img
                  src={
                    tech.customUrl || `https://cdn.simpleicons.org/${tech.icon}`
                  }
                  alt={tech.name}
                  className="w-7 h-7 md:w-10 md:h-10 object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <span className="text-[9px] font-black uppercase tracking-widest text-black opacity-30 group-hover:opacity-100 group-hover:text-black transition-all duration-300 whitespace-nowrap">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
