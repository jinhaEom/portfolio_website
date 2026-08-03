import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { label: "앱 월간 사용자 수(MAU)", value: "+50% 상승" },
    { label: "활성 사용자 수", value: "2,000+" },
    { label: "Kotlin -> React Native", value: "마이그레이션 경험" },
    { label: "앱 안정성 강화", value: "NPE 1% 미만 달성" },
  ];

  return (
    <section id="about" className="section-padding bg-surface" ref={ref}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-accent font-mono text-sm">01</span>
            <h2 className="text-2xl font-semibold">About</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left */}
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl font-medium leading-relaxed">
                조직과 함께
                <br />
                <span className="text-subtle">
                  성장하고자 합니다. ☝️
                </span>
              </p>

              <p className="text-subtle leading-relaxed">
                Kotlin 안드로이드 개발자로 시작해, React Native까지 영역을 넓혀왔습니다.
                <br /><br />
                그 사이 마이그레이션, 신규 기능개발, 레거시 구조 개선까지 다양한 성격의 작업을 거쳐왔습니다.
                <br /><br />
                각기 해결하는 방식은 다른 문제들이였지만, 접근 방식은 항상 같았습니다. 구조를 먼저 이해하고, 그다음 손보는것.
                <br /><br />
                전과정을 혼자 설계하고 완성해본 경험은 저에게 확실한 오너십을 심어주었습니다.
                <br /><br />
                이제 이 오너십을 통해 새로운 환경에서 동료들과 함꼐 더 큰 서비스를 만들어 나가고 싶습니다.
              </p>
            </div>

            {/* Right - Highlights */}
            <div className="grid grid-cols-2 gap-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="border-l-2 border-accent/30 pl-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-semibold text-accent mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm text-subtle">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
