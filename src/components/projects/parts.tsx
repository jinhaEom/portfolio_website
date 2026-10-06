import { Fragment } from "react";
import { FaArrowRight } from "react-icons/fa";

/* 기술 태그 목록 */
export const Chips = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2">
        {items.map((item) => (
            <span key={item} className="px-3 py-1 bg-border/50 text-text text-xs rounded-full border border-border">
                {item}
            </span>
        ))}
    </div>
);

/* 핵심 숫자 박스 */
export const Stat = ({ value, label }: { value: string; label: string }) => (
    <div className="rounded-xl border border-border bg-bg/60 px-4 py-3">
        <p className="text-accent text-lg md:text-xl font-semibold whitespace-nowrap">{value}</p>
        <p className="text-subtle text-xs mt-1 leading-snug">{label}</p>
    </div>
);

/* 짧은 문장 한 줄 박스 */
export const LineBox = ({ children }: { children: React.ReactNode }) => (
    <p className="rounded-lg bg-bg/60 border border-border/60 px-4 py-2.5 text-sm text-text leading-relaxed">
        {children}
    </p>
);

/* 겹쳐 놓은 폰 화면들 (className: 전체 높이, overlap: 겹치는 정도, 뒤로 갈수록 조금씩 작게) */
export const PhoneStack = ({ srcs, className, overlap }: { srcs: string[]; className: string; overlap: string }) => (
    <div className={`flex items-end justify-center ${className}`}>
        {srcs.map((src, i) => (
            <img
                key={src}
                src={src}
                alt="앱 화면"
                className={`w-auto object-contain ${i > 0 ? overlap : ""}`}
                style={{ height: `${100 - i * 8}%`, zIndex: 10 - i }}
            />
        ))}
    </div>
);

/* 이전 → 이후 화면 비교 */
export const BeforeAfter = ({ before, after }: { before: string; after: string }) => (
    <div className="flex items-center gap-2 md:gap-3">
        {[before, after].map((src, i) => (
            <Fragment key={src}>
                {i === 1 && <FaArrowRight className="text-accent shrink-0" />}
                <div className="relative">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs bg-bg border border-accent/40 text-accent whitespace-nowrap">
                        {i === 0 ? "이전" : "이후"}
                    </span>
                    <img src={src} alt={i === 0 ? "이전 화면" : "이후 화면"} className="h-[260px] md:h-[300px] w-auto" />
                </div>
            </Fragment>
        ))}
    </div>
);

/* 상세 영역의 소제목 + 내용 묶음 */
export const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <p className="text-sm text-muted mb-3">{title}</p>
        {children}
    </div>
);

/* 단계 흐름 (A → B → C) */
export const Steps = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
            <Fragment key={item}>
                {i > 0 && <FaArrowRight className="text-muted text-xs" />}
                <span className="rounded-lg border border-accent/40 bg-accent/5 px-3 py-1.5 text-sm text-text">{item}</span>
            </Fragment>
        ))}
    </div>
);
