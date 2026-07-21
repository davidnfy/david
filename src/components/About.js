import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Typewriter = () => {
  const words = ["Full Stack Developer", "Game Developer", "Tech Enthusiast"];
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    let timer;

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
  }, [displayText, isDeleting, index, speed, words]);

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
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger for left column
    gsap.fromTo(leftColRef.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // GSAP ScrollTrigger for right column
    gsap.fromTo(rightColRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section
      id="about"
      className="py-32 px-8 md:px-24 transition-colors duration-500 relative z-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
        <div
          ref={leftColRef}
          className="space-y-8 md:space-y-12"
          style={{ opacity: 0 }}
        >
          <div className="text-sm font-black uppercase tracking-[0.4em] opacity-30 px-1 text-black">
            About
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight text-black">
            I am a <br />
            <Typewriter />
          </h2>
          <div className="w-16 h-1 bg-black rounded-full" />
        </div>

        <div
          ref={rightColRef}
          className="space-y-12"
          style={{ opacity: 0 }}
        >
          <div className="space-y-8">
            <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-60 text-black">
              A vocational high school student with a strong drive toward full-stack development and game engineering.
              I have a natural curiosity for how digital products are built—from databases and APIs to frontend interfaces and gameplay mechanics.
              Every project I take on is an opportunity to sharpen my skills and move closer to my dream career.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}