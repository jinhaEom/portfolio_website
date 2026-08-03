import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Career = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const careers = [
    {
      company: "투게더스",
      period: "2023.10 — 현재",
      role: "App Developer",
      works: [
        "React Native + TypeScript 기반 B2B 매출관리 앱을 단독으로 설계·개발 및 운영",
        "레거시 Kotlin 앱 리팩토링으로 NPE 충돌률 8% → 1% 감소",
        "컴포넌트 아키텍처 도입으로 레거시 소스코드 80% 축소, 유지보수성 개선",
        "서비스 운영 3개월간 MAU 50% 성장 기여",
      ],
    },
    {
      company: "헬스포트",
      period: "2023.03 — 2023.08",
      role: "App Developer",
      works: [
        "비대면 진료 프로세스 70% 개발 주도",
        "복약 알림 기능 오류 발생률 40% 감소",
        "Sendbird Sdk 활용한 채팅 기능 구현",
      ],
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

          <div className="space-y-16">
            {careers.map((career, index) => (
              <motion.div
                key={index}
                className="grid md:grid-cols-12 gap-8"
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
                  <p className="text-muted text-sm">{career.period}</p>
                </div>

                {/* Right */}
                <div className="md:col-span-8">
                  <ul className="space-y-4">
                    {career.works.map((work, i) => (
                      <li
                        key={i}
                        className="text-subtle leading-relaxed flex gap-4"
                      >
                        <span className="text-accent mt-1.5">•</span>
                        <span>{work}</span>
                      </li>
                    ))}
                  </ul>
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
