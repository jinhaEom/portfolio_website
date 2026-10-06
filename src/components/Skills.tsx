import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // 이력서 Skill 섹션과 동일한 구성
  const skillGroups = [
    { title: "React Native", items: ["TypeScript", "TanStack Query", "Zustand"] },
    { title: "Android", items: ["Kotlin", "Coroutines", "Jetpack"] },
    { title: "Tools", items: ["Firebase (FCM, Analytics, Crashlytics)", "Git"] },
    { title: "Collaboration", items: ["Figma", "Notion", "Slack"] },
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
            <span className="text-accent font-mono text-sm">04</span>
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* 2x2 박스 (분류 + 기술 태그) */}
          <div className="grid md:grid-cols-2 gap-4">
            {skillGroups.map((group, index) => (
              <motion.div
                key={index}
                className="rounded-xl border border-border bg-bg/50 p-5 md:p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-accent font-medium mb-4">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-border/50 text-text text-sm rounded-full border border-border"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
