import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { label: "앱 월간 사용자 수(MAU)", value: "+50% 상승" },
    { label: "활성 사용자 수", value: "2,000+" },
    { label: "React Native", value: "마이그레이션 경험" },
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
                단순한 기능 구현을 넘어, 비즈니스 성장을 이끄는 앱 개발자 엄진하입니다.
                <br /><br />
                프로덕트의 성공이 곧 저의 성장이라는 생각으로 개발에 임합니다. React Native 크로스 플랫폼 전환을 주도하여 회사의 개발 리소스를 크게 절감하고 신규 마켓을 확장했습니다.
                <br /><br />
                또한 500여 개의 레거시 코드를 개선해 치명적인 오류를 1% 미만으로 낮추고 결제를 안정화하여, 결과적으로 MAU 50% 성장이라는 비즈니스 목표 달성에 기여했습니다.
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
