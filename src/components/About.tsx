import { motion, AnimatePresence } from 'motion/react';
import { User, Heart, Music, Gamepad2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Typewriter = () => {
  const words = ["Full Stack Developer", "Game Developer", "Tech Enthusiast"];
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleTyping = () => {
      const currentWord = words[index];
      
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        setSpeed(50);
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && displayText === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        timer = setTimeout(handleTyping, speed);
      }
    };

    timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, speed]);

  return (
    <span className="text-empathetic min-h-[1.2em] inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-0.75 h-[0.9em] bg-empathetic ml-1 relative top-[0.1em]"
      />
    </span>
  );
};

export default function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-24 transition-colors duration-500 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 md:space-y-12"
        >
          <div className="text-sm font-black uppercase tracking-[0.4em] opacity-30 px-1">About</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight">
            I am a <br />
            <Typewriter />
          </h2>
          <div className="w-16 h-1 bg-black rounded-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-8">
            <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-60">
              Hi! I am a vocational high school student who is very interested in technology and the gaming world. My dream is to become a full-stack developer and a game developer. I enjoy learning how things work behind the scenes, and because of that, I continue to study and hone my skills.
            </p>
            <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-60">
              Besides coding, I also enjoy playing games like Valorant, GTA V, Minecraft, and PUBG Mobile. I’m also passionate about music — I love playing instruments like the piano and guitar in my free time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
