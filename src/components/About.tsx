import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { value: "+20%", label: "React Native iOS 확장 후 MAU", source: "투게더 공급사 앱" },
    { value: "1% 미만", label: "NPE 발생률 (기존 8%)", source: "투게더 PDA 앱" },
    { value: "-90%", label: "비밀번호 분실 CS 문의", source: "투게더 PDA 앱" },
    { value: "+50%", label: "배달 재설계 후 3개월간 MAU", source: "투게더 PDA 앱" },
    { value: "-40%", label: "알림 관련 비정상 종료율", source: "굿팜 앱" },
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
                Kotlin과 React Native,
                <br />
                <span className="text-subtle">
                  둘 다 실무로 다룹니다. ☝️
                </span>
              </p>

              <p className="text-subtle leading-relaxed">
                기존 Kotlin 앱을 React Native로 마이그레이션해 iOS까지 출시했고, 지금은 React Native 앱과 Kotlin 앱의 개발·출시·운영을 맡고 있습니다.
                <br />
                서비스를 넓히는 일과 안정적으로 지키는 일을 함께 책임지는 개발자가 되고 싶습니다.
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
                  <div className="text-xs text-muted mt-1">{item.source}</div>
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
