import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "Church Management Dashboard",
      category: "Management System",
      image: "/img/absen-gereja.png",
      githubUrl: "https://github.com/davidnfy/absen-gereja"
    },
    {
      title: "Animal Organizer Data",
      category: "Management System",
      image: "/img/animals.png",
      githubUrl: "https://github.com/davidnfy/animals-organizer-data"
    },
    {
      title: "Game Flappy Bird",
      category: "Game",
      image: "/img/flappy-bird.png",
      githubUrl: "https://github.com/davidnfy/Flappy-Bird"
    },
    {
      title: "Todo List App",
      category: "Productivity App",
      image: "/img/todolist.png",
      githubUrl: "https://github.com/davidnfy/Todo-List-App"
    },
    {
      title: "Student Report Management System",
      category: "Management System",
      image: "/img/rapot.png",
      githubUrl: "https://github.com/davidnfy/aplikasi-rapor-siswa"
    },
  ]

  const handleClick = (url, e) => {
    e.stopPropagation()
    window.open(url, "_blank")
  }
  return (
    <section
      id="projects"
      className="relative py-24 sm:py-[20vh] lg:py-[25vh] px-8 md:px-24 bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-4 text-left w-full">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-40">
              Selected Works
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter italic">
              My Projects.
            </h3>
          </div>
          <p className="max-w-xs text-sm opacity-50 text-right md:text-right text-left w-full md:w-auto">
            "Exploring the boundaries of digital interaction with a creative and
            purposeful approach."
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div
                className="md:col-span-7 relative overflow-hidden rounded-2xl aspect-video cursor-pointer"
                onClick={e => handleClick(project.githubUrl, e)}
              >
                <motion.img
                  src={
                    project.image.startsWith("/")
                      ? project.image
                      : `https://picsum.photos/seed/${project.image}/1200/675`
                  }
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="md:col-span-5 flex justify-between items-center">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
                      {project.category}
                    </span>
                    <h4 className="text-3xl md:text-5xl font-black tracking-tighter">
                      {project.title}
                    </h4>
                  </div>
                  <div className="flex gap-3"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
