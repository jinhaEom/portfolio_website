import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaBlog } from "react-icons/fa";
import { HiMail, HiPhone } from "react-icons/hi";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contacts = [
    {
      icon: <HiMail className="text-xl" />,
      label: "Email",
      value: "umjin98@naver.com",
      href: "mailto:umjin98@naver.com",
    },
    {
      icon: <HiPhone className="text-xl" />,
      label: "Phone",
      value: "010-5118-4110",
      href: "tel:010-5118-4110",
    },
    {
      icon: <FaGithub className="text-xl" />,
      label: "GitHub",
      value: "github.com/jinhaEom",
      href: "https://github.com/jinhaEom",
    },
    {
      icon: <FaBlog className="text-xl" />,
      label: "Blog",
      value: "velog.io/@umjin98",
      href: "https://velog.io/@umjin98/posts",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-surface" ref={ref}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-accent font-mono text-sm">05</span>
            <h2 className="text-2xl font-semibold">Contact</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left */}
            <div>
              <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-6">
                새로운 기회와 협업에
                <br />
                <span className="text-subtle">항상 열려있습니다.</span>
              </p>
            </div>

            {/* Right */}
            <div className="grid grid-cols-2 gap-6">
              {contacts.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  target={
                    contact.label === "Email" || contact.label === "Phone"
                      ? undefined
                      : "_blank"
                  }
                  rel="noopener noreferrer"
                  className="group p-6 border border-border rounded-lg hover:border-accent/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-muted group-hover:text-accent transition-colors mb-3">
                    {contact.icon}
                  </div>
                  <div className="text-xs text-muted mb-1">{contact.label}</div>
                  <div className="text-sm text-text group-hover:text-accent transition-colors">
                    {contact.value}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Outro */}
          <div className="mt-24 text-center max-w-3xl mx-auto space-y-6">
            <h3 className="text-xl md:text-2xl font-medium leading-relaxed">
              현재 상황에 안주하면, 그 사람은 도태된다고 생각합니다.<br />
              <span className="text-accent underline underline-offset-4">"도태되지 말자"</span>라는 제 좌우명으로 매일매일 어제보다 더 나은 개발자가 되려고 노력합니다.
            </h3>
            <p className="text-subtle text-lg">
              이 포트폴리오를 통해 저의 성장에 대한 열망과 제 가치를 보여드리고 싶었습니다.
            </p>
            <p className="text-muted text-sm pt-8">읽어주셔서 감사합니다.</p>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <p className="text-muted text-sm">App Developer 엄진하</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
