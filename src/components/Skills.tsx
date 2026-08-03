import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillGroups = [
    {
      title: "Languages",
      items: ["Kotlin", "TypeScript", "JavaScript"],
    },
    {
      title: "Mobile",
      items: ["Android", "React Native"],
    },
    {
      title: "State & Data",
      items: ["Zustand", "Tanstack Query", "Realm", "Room"],
    },
    {
      title: "Tools",
      items: ["Git", "Figma", "Slack", "Notion"],
    },
  ];

  return (
    <section id="skills" className="section-padding bg-surface" ref={ref}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-accent font-mono text-sm">03</span>
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {skillGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-accent text-sm font-medium mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item, i) => (
                    <li key={i} className="text-text">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
