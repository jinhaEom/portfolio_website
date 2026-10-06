import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      period: "2020.11",
      title: "2020 IIBC Start-up Contest",
      desc: "한국인터넷방송통신학회 주관 · 교내 학생전용 게시판 어플 — 단체상",
    },
    {
      period: "2017 — 2023",
      title: "백석대학교",
      desc: "컴퓨터공학과 졸업 · 학점 3.6 / 전공 3.7",
    },
    {
      period: "2024 — 현재",
      title: "기술 블로그",
      desc: "개발 경험과 기술을 공유하는 Velog 블로그 운영 중",
      link: "https://velog.io/@umjin98/posts",
    },
  ];

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-accent font-mono text-sm">05</span>
            <h2 className="text-2xl font-semibold">Experience</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="grid md:grid-cols-12 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="md:col-span-3">
                  <p className="text-muted text-sm font-mono">{exp.period}</p>
                </div>
                <div className="md:col-span-9">
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                        {exp.title}
                        <span className="text-accent ml-2">↗</span>
                      </h3>
                      <p className="text-subtle">{exp.desc}</p>
                    </a>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium mb-2">{exp.title}</h3>
                      <p className="text-subtle">{exp.desc}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
