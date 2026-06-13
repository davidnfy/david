import { motion } from "motion/react"

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40 px-1"
        >
          <span className="whitespace-nowrap">David Nafisy</span>
          <span className="w-1 h-1 bg-black rounded-full" />
          <span className="whitespace-nowrap">Malang, Indonesia</span>
          <span className="w-1 h-1 bg-black rounded-full" />
          <span className="whitespace-nowrap">Digital Innovator</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] font-extrabold leading-[1.1] md:leading-[0.9] lg:leading-[1.0 ] tracking-tighter">
            Crafting <br />
            <span className="text-empathetic">empathetic</span> <br />
            digital <br />
            experiences<span className="opacity-20">.</span>
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pt-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-md text-lg md:text-xl font-medium leading-relaxed opacity-60"
          >
            I'm David — Technology is not just about being advanced, but about
            how it feels to the user.
          </motion.p>

          <motion.div
            drag
            dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.1, rotate: 5, cursor: "grabbing" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05, cursor: "grab" }}
            className="w-40 h-40 md:w-56 md:h-56 aspect-square relative group shrink-0 self-center md:self-auto z-20"
          >
            <img
              src="img/david.png"
              alt="Work"
              className="w-full h-full object-cover rounded-full shadow-2xl border border-black/5 pointer-events-none select-none"
            />
            {/* Playful hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 2, duration: 3, repeat: Infinity }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/5 backdrop-blur-sm px-3 py-1 rounded-full border border-black/5 pointer-events-none"
            >
              <span className="text-[9px] font-black uppercase tracking-widest opacity-40">
                Drag me
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-[20%] right-[-5%] w-[40%] h-[60%] bg-linear-to-br from-indigo-500/10 via-transparent to-purple-500/10 blur-[150px] -z-10 opacity-30" />
    </section>
  )
}
