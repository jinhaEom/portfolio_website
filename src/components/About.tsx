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
                Kotlin과 React Native,
                <br />
                <span className="text-subtle">
                  둘 다 실무로 다룹니다. ☝️
                </span>
              </p>

              <p className="text-subtle leading-relaxed">
                새 플랫폼으로 서비스를 넓히는 일과, 운영 중인 앱을 안정적으로 지키는 일을 함께 해왔습니다.
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
