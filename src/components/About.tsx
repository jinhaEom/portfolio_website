import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { label: "MAU 상승 경험", value: "+20%" },
    { label: "MAU 유지 경험", value: "약 2,000명" },
    { label: "React Native", value: "마이그레이션 경험" },
    { label: "React Native · Kotlin", value: "1인 개발·운영경험" },

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
                Kotlin 네이티브와 React Native를 모두 실무에서 다루는 앱 개발자 엄진하입니다.
                <br /><br />
                현재 Kotlin 앱과 React Native 앱을 개발·출시·운영하고 있습니다. 기존 Kotlin 앱을 React Native로 마이그레이션하고 iOS 앱까지 출시해 월 이용자 수를 20% 이상 늘렸습니다. Kotlin으로 운영 중인 앱은 레거시 구조를 정리해 NPE 발생률을 8%에서 1% 미만으로 낮췄고, 꾸준한 성능 개선과 안정화 작업으로 MAU 약 2천 명을 유지하고 있습니다.
                <br /><br />
                서비스를 넓히는 일과 안정적으로 지키는 일을 모두 경험한 만큼, 어떤 서비스에서든 이 두 가지를 함께 책임지는 개발자가 되고 싶습니다.
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
