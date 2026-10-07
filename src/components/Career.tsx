import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Career = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // 이력서 Career와 동일한 구성
  const careers = [
    {
      company: "(주)투게더스",
      period: "2023.10 ~ current",
      role: "React Native, Kotlin(Android) 앱 개발자",
      works: [
        "모바일 앱 1인 개발 - React Native 앱, Kotlin 앱의 개발·출시·운영 전담",
        "투게더 공급사 앱 · MPOS 라이트 앱 · 투게더 PDA 앱",
      ],
    },
    {
      company: "(주)헬스포트",
      period: "2023.03 ~ 2023.08",
      role: "Kotlin(Android) 앱 개발자",
      works: ["Android 앱 개발 출시 · 운영 담당 - 굿팜 앱"],
    },
  ];

  return (
    <section id="career" className="section-padding" ref={ref}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-accent font-mono text-sm">02</span>
            <h2 className="text-2xl font-semibold">Career</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-4">
            {careers.map((career, index) => (
              <motion.div
                key={index}
                className="grid md:grid-cols-12 gap-4 md:gap-8 rounded-xl border border-border bg-surface p-5 md:p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Left */}
                <div className="md:col-span-4">
                  <h3 className="text-xl font-semibold mb-1">
                    {career.company}
                  </h3>
                  <p className="text-accent text-sm mb-1">{career.role}</p>
                  <p className="text-muted text-sm font-mono">{career.period}</p>
                </div>

                {/* Right */}
                <div className="md:col-span-8">
                  <div className="space-y-2">
                    {career.works.map((work, i) => (
                      <p key={i} className="text-subtle leading-relaxed">
                        {work}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Career;
