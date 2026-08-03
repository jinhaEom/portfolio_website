import { motion } from "framer-motion";
import { FaGithub, FaBlog, FaArrowDown } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 relative"
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="w-64 h-80 md:w-92 md:h-92 rounded-2xl overflow-hidden border border-border">
                <img
                  src={"assets/images/profile_image.jpeg"}
                  alt="엄진하"
                  className="w-full h- justify-center object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-subtle">Available for work</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
              엄진하
            </h1>

            {/* Title */}
            <p className="text-xl md:text-2xl text-accent mb-8">
              React Native & Android Developer
            </p>

            {/* Description */}
            <p className="text-subtle max-w-xl text-lg leading-relaxed mb-12">
              사용자의 입장에서 개발하는 개발자입니다. 💻
              <br />
              끊임없는 고민과 개선으로 앱 안정성과 사용자 경험 향상에 집중합니다.
            </p>

            {/* Links */}
            <div className="flex items-center gap-6">
              <a
                href="mailto:umjin98@naver.com"
                className="flex items-center gap-2 text-subtle hover:text-accent transition-colors"
              >
                <HiMail className="text-lg" />
                <span className="text-sm">umjin98@naver.com</span>
              </a>
              <a
                href="https://github.com/jinhaEom"
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtle hover:text-accent transition-colors"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://velog.io/@umjin98/posts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtle hover:text-accent transition-colors"
              >
                <FaBlog className="text-xl" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-muted"
        >
          <FaArrowDown />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
