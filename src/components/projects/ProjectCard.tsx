import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Chips, LineBox, PhoneStack, Stat } from "./parts";

export type ProjectItem = {
    meta: string;
    title: string;
    desc: string;
    stats: { value: string; label: string }[];
    works: string[];
    tags: string[];
    images: string[];
    detail?: React.ReactNode;
};

export type MainProject = ProjectItem;
export type OtherProject = ProjectItem;

/* 프로젝트 카드 (reverse: 이미지 오른쪽 배치, compact: 서브 프로젝트용 살짝 컴팩트한 크기) */
export const ProjectCard = ({
    project,
    reverse,
    compact,
}: {
    project: ProjectItem;
    reverse?: boolean;
    compact?: boolean;
}) => {
    const [open, setOpen] = useState(false); // 상세 펼침 여부

    return (
        <motion.article
            className="rounded-2xl border border-border bg-surface overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`grid ${compact ? "lg:grid-cols-[0.95fr_1.15fr]" : "lg:grid-cols-[1fr_1.15fr]"}`}>
                {/* 앱 화면 */}
                <div
                    className={`bg-bg/50 flex items-center justify-center ${compact ? "p-5 lg:p-6" : "p-6"} ${reverse ? "lg:order-2" : ""}`}
                    style={{ backgroundImage: "radial-gradient(circle at 50% 55%, rgba(96,165,250,0.12), transparent 65%)" }}
                >
                    <PhoneStack
                        srcs={project.images}
                        className={compact ? "h-[220px] lg:h-[340px]" : "h-[260px] lg:h-[420px]"}
                        overlap={compact ? "-ml-10 lg:-ml-20" : "-ml-14 lg:-ml-28"}
                    />
                </div>

                {/* 요약 */}
                <div className={compact ? "p-5 md:p-6 lg:p-7" : "p-6 md:p-8"}>
                    <p className="font-mono text-xs text-muted">{project.meta}</p>
                    <h3
                        className={`${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"} font-semibold ${compact ? "mt-2" : "mt-3"} leading-snug`}
                    >
                        {project.title}
                    </h3>
                    <p className={`text-subtle ${compact ? "text-sm mt-1.5" : "mt-2"}`}>{project.desc}</p>

                    <div
                        className={`grid ${project.stats.length === 2 ? "grid-cols-2" : "grid-cols-3"} gap-2 md:gap-3 ${compact ? "mt-4" : "mt-6"}`}
                    >
                        {project.stats.map((stat) => (
                            <Stat key={stat.label} value={stat.value} label={stat.label} />
                        ))}
                    </div>

                    <div className={`space-y-2 ${compact ? "mt-4" : "mt-6"}`}>
                        {project.works.map((work) => (
                            <LineBox key={work}>{work}</LineBox>
                        ))}
                    </div>

                    <div className={`flex flex-wrap items-center justify-between gap-4 ${compact ? "mt-5" : "mt-6"}`}>
                        <Chips items={project.tags} />
                        {project.detail && (
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                aria-expanded={open}
                                className="text-accent text-sm flex items-center gap-2 hover:opacity-80 transition-opacity"
                            >
                                {open ? "접기" : "상세 보기"}
                                <FaChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 상세 (펼쳤을 때만) */}
            <AnimatePresence initial={false}>
                {open && project.detail && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                    >
                        <div className={`border-t border-border bg-bg/30 ${compact ? "p-5 md:p-6 space-y-8" : "p-6 md:p-8 space-y-10"}`}>
                            {project.detail}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
};

/* 그 외 프로젝트 카드 */
export const OtherProjectCard = ({ project }: { project: ProjectItem }) => (
    <ProjectCard project={project} compact />
);
