import { motion } from 'motion/react';
import { GraduationCap, Milestone } from 'lucide-react';

export default function Education() {
  const education = [
    {
      school: 'Vocational High School',
      period: '2024 - Present',
      description: 'SMK NEGERI 5 MALANG',
    },
    {
      school: 'Junior High School',
      period: '2021 - 2024',
      description: 'SMP NEGERI 2 DAMPIT',
    },
  ];

  return (
    <section id="education" className="py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-30">Education</h2>
          <div className="w-12 h-1 bg-black rounded-full transition-colors" />
        </div>

        <div className="space-y-24">
          {education.map((item, index) => (
            <motion.div
              key={item.school}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline"
            >
              <div className="md:col-span-3 text-4xl md:text-5xl font-black opacity-10 tracking-tighter transition-opacity">
                {item.period.split(' - ')[0]}
              </div>
              <div className="md:col-span-9 space-y-4">
                <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  {item.description}
                </h3>
                <p className="text-xl md:text-2xl font-medium opacity-50 max-w-3xl leading-relaxed">
                  {item.school}
                </p>
                {item.period.split(' - ')[1] !== 'Present' && (
                  <div className="text-[10px] font-black tracking-[0.2em] uppercase opacity-20 pt-4">
                    Graduated {item.period.split(' - ')[1]}
                  </div>
                )}
                {item.period.split(' - ')[1] === 'Present' && (
                  <div className="text-[10px] font-black tracking-[0.2em] uppercase opacity-20 pt-4">
                    Present
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
