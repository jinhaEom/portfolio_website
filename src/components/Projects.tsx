import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ImageCarousel = ({ images }: { images: string[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [moved, setMoved] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
        setMoved(false);
        containerRef.current.style.cursor = "grabbing";
        containerRef.current.style.userSelect = "none";
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (containerRef.current) {
            containerRef.current.style.cursor = "grab";
            containerRef.current.style.removeProperty("user-select");
        }
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            if (containerRef.current) {
                containerRef.current.style.cursor = "grab";
                containerRef.current.style.removeProperty("user-select");
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        if (Math.abs(walk) > 5) setMoved(true);
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (moved) return; // Don't snap-scroll if we were dragging
        e.currentTarget.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="flex bg-border/20 rounded-2xl py-8 px-10 md:px-14 overflow-x-auto gap-5 snap-x snap-mandatory hide-scrollbar border border-border/50 self-start cursor-grab active:cursor-grabbing w-full"
            style={{
                scrollSnapType: isDragging ? "none" : "x mandatory",
            }}
        >
            {images.map((imgSrc, imgIdx) => (
                <div
                    key={imgIdx}
                    onClick={(e) => handleImageClick(e)}
                    className="snap-center shrink-0 w-60 md:w-64 h-[480px] md:h-[520px] rounded-2xl bg-surface border border-border overflow-hidden flex flex-col relative shadow-md cursor-pointer hover:border-accent/40 transition-all hover:scale-[1.02]"
                >
                    {/* Phone Mockup Top Bar */}
                    <div className="h-6 bg-border/30 w-full shrink-0 flex justify-center items-center">
                        <div className="w-12 h-1 bg-border rounded-full"></div>
                    </div>

                    {/* Image Area */}
                    <div className="flex-1 bg-border/5 relative overflow-hidden group pointer-events-none">
                        <img
                            src={imgSrc}
                            alt={`Screenshot ${imgIdx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.parentElement?.classList.add("flex", "items-center", "justify-center");
                                e.currentTarget.style.display = "none";
                                const p = document.createElement("p");
                                p.className = "text-muted text-[10px] break-all font-mono p-4 text-center";
                                p.innerText = imgSrc;
                                e.currentTarget.parentElement?.appendChild(p);
                            }}
                        />
                    </div>
                </div>
            ))}
            {/* End spacing for better peeking */}
            <div className="shrink-0 w-1 md:w-4 h-1"></div>
        </div>
    );
};

interface Project {
    title: string;
    company: string;
    employer: string;
    period: string;
    description: string;
    topics: string[];
    solutions: { title: string; desc: string }[];
    results: string[];
    images: string[];
    migrations?: { label: string; before: string; after: string }[];
}

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const projects: Project[] = [
        {
            title: "Kotlin -> React Native 마이그레이션 및 앱 리뉴얼 작업",
            company: "투게더 공급사",
            employer: "(주)투게더스",
            period: "2025.04 - 2025.10 (마이그레이션) / 2026.04 - 2026.07 (UI 리뉴얼)",
            description:
                "가맹점 공급사들이 실시간으로 매출현황을 확인하고 정산을 관리할 수 있는 솔루션입니다. 기존 안드로이드(Kotlin) 전용 서비스를 React Native 크로스플랫폼으로 마이그레이션하여 양대 마켓에 출시하였고, 이후 전사 차원의 디자인 시스템 통합 방침에 따라 UI 전면 리뉴얼을 진행했습니다.",
            topics: [
                "React Native",
                "TypeScript",
                "Tailwind CSS",
                "Tanstack Query",
                "Zustand",
            ],
            migrations: [
                { label: "언어", before: "Kotlin + Java", after: "TypeScript" },
                { label: "프레임워크", before: "Android Native", after: "React Native" },
                { label: "상태관리", before: "ViewModel + Hilt", after: "CustomHook + Zustand" },
                { label: "HTTP 통신", before: "Retrofit2", after: "Axios + Tanstack Query" },
            ],
            solutions: [
                {
                    title: "크로스 플랫폼 전환을 통한 서비스 확장",
                    desc: "기존 Android(kotlin) 전용 서비스의 시장점유 확대를 위해 React Native 기반의 크로스 플랫폼 환경 구축 및 양대마켓 출시.",
                },
                {
                    title: "As-is / To-be 구조 분석 기반 아키텍처 매핑",
                    desc: "기존 Kotlin 프로젝트의 MVVM 구조와 비즈니스 로직을 파악해 React Native의 상태 관리(Zustand, TanStack Query) 생태계로 1:1 매핑하는 전환 계획표 설계.",
                },
                {
                    title: "디자인 시스템 통합 기반 UI/UX 전면 리뉴얼",
                    desc: "전사 차원의 디자인 시스템 통합 방침에 따라 디자이너와 UI/UX 방향을 협의하며 의견을 제시하고, 통합된 디자인 시스템을 앱 전반에 적용.",
                },
            ],
            results: [
                "단일 코드베이스 구축을 통해 서비스 접근성을 증대시키고 유지보수 리소스를 획기적으로 절감.",
                "기존 Native 대비 전체 코드량 약 80% 단축.",
                "iOS 플랫폼 확장으로 서비스 월간 이용자수 기존대비 20% 이상 성장.",
                "전사 디자인 시스템 도입에 따라 앱 UI를 통합해 서비스 전반 브랜드 일관성 확보.",
            ],
            images: [
                "assets/images/mptr1.png",
                "assets/images/mptr2.png",
                "assets/images/mptr3.png",
                "assets/images/mptr4.png",
            ],
        },
        {
            title: "소규모 마트 전용 매출관리 앱 신규 개발 (1인 전담)",
            company: "투게더 MPOS Lite",
            employer: "(주)투게더스",
            period: "2026.02 - 2026.05",
            description:
                "장소에 구애받지 않고 언제 어디서든 매출 현황을 파악할 수 있는 환경을 구축하기 위해 React Native(iOS/Android)앱을 1인 전담하여 개발하였습니다.",
            topics: [
                "React Native",
                "TypeScript",
                "Tailwind CSS",
                "Tanstack Query",
                "Zustand",
            ],
            solutions: [
                {
                    title: "단일 코드베이스 기반 크로스 플랫폼 앱 개발",
                    desc: "장소 제약없이 매출현황을 파악할 수 있도록 iOS/Android앱 동시 기획 및 1인 전담 개발.",
                },
                {
                    title: "공통 UI 모듈화를 통한 개발 생산성 향상",
                    desc: "매출 현황, 재고 조회 등 데이터 밀집도가 높은 앱 특성에 맞춰 공통 UI 컴포넌트를 모듈화하여 수십 개의 통계/관리 화면 레이아웃 구현 시간을 대폭 단축하고 일관된 사용성을 제공.",
                },
                {
                    title: "기획 변경에 유연한 아키텍처 설계",
                    desc: "UI 렌더링과 데이터 Fetching 로직을 Custom Hook으로 완전 분리하여 복잡한 비즈니스 로직이 변경될 때 UI 코드 수정 없이 안전하게 대응 가능한 아키텍처 구축.",
                },
                {
                    title: "도메인별 상태관리 분리 (Zustand)",
                    desc: "단일 스토어 사용 시 발생할 수 있는 불필요한 리렌더링을 방지하기 위해, 사용자·매출·상품 도메인별로 Zustand 스토어를 분리하여 앱 렌더링 성능 최적화.",
                },
            ],
            results: [
                "3개월간, 20개 화면 규모의 프론트엔드를 iOS/Android 동시 대응으로 단독 설계·구현.",
                "백엔드 API 완성 전 실제 스펙과 동일한 구조로 Mock Data를 설계해 병행 개발을 가능하게 함으로써 목표 일정 내 전체 기능 구현 완료."
            ],
            images: [
                "assets/images/smpos1.png",
                "assets/images/smpos2.png",
                "assets/images/smpos4.png",
                "assets/images/smpos3.png",
            ],
        },

        {
            title: "PDA 전용 앱 레거시 코드 마이그레이션 및 앱 안정성 증대",
            company: "투게더 PDA",
            employer: "(주)투게더스",
            period: "2025.06 - 2025.11",
            description:
                "Deprecated된 Kotlin-android-extensions로 인한 크래시 및 유지보수 비용을 예방하고 Android SDK 신규 버전 대응을 위해 DataBinding으로 전면 전환하는 마이그레이션을 진행했습니다.",
            topics: [
                "Kotlin",
                "MVVM",
                "DataBinding",
                "Realm",
                "Android Jetpack",
            ],
            migrations: [
                { label: "뷰 바인딩 방식", before: "Kotlin-Android-Extensions (Deprecated)", after: "DataBinding" },
                { label: "적용 범위", before: "산발적 처리", after: "BaseActivity/BaseFragment 표준화, 549개 파일 전체 적용" },
                { label: "NPE 발생률", before: "8%", after: "1% 미만" },
            ],
            solutions: [
                {
                    title: "공통 Base 클래스 설계를 통한 마이그레이션 표준화",
                    desc: "반복되는 뷰 바인딩 초기화 및 생명주기 관리 로직을 통합한 BaseActivity, BaseFragment 환경을 설계해 549개 파일 전체에 표준화된 마이그레이션 적용.",
                },
                {
                    title: "PDA 물리버튼 환경 대응 포커스 네비게이션 구현",
                    desc: "PDA 물리버튼 환경을 고려한 KeyEvent 기반 포커스 네비게이션 구현.",
                },
            ],
            results: [
                "NPE 발생률을 기존 8%에서 1% 미만으로 개선.",
                "마이그레이션 작업을 통해 구글 정책 대응 완료.",
            ],
            images: [],
        },
        {
            title: "매장 재고관리·상품조회·발주검수 시스템 모바일화 및 QR 도입",
            company: "투게더 PDA",
            employer: "(주)투게더스",
            period: "2024.09 - 2025.06",
            description:
                "기존 포스기 화면에서만 존재하던 재고 관리, 상품 조회, 발주 검수 기능을 모바일 PDA 단말기로 이식하여 오프라인 매장 효율을 극대화하고, 작업자를 위한 편리한 스캔 인증 시스템을 도입했습니다.",
            topics: [
                "Kotlin",
                "MVVM",
                "Coroutines",
                "Realm",
                "ZXing",
            ],
            solutions: [
                {
                    title: "Realm 기반 로컬 캐싱을 통한 조회 최적화",
                    desc: "지하 창고 등 네트워크 신호가 약한 열악한 대형 매장 내에서도 대용량 상품 정보가 지연 없이 실시간 조회되도록 캐싱 구조 설계.",
                },
                {
                    title: "하드웨어 스캐너 바코드 처리 최적화 및 QR 로그인",
                    desc: "물리 버튼 연동형 바코드 스캐너 스레드를 백그라운드로 제어하여 연속 스캔 시 딜레이 없이 실시간 발주 대조 기능 구현 및 ZXing QR 기반 간편 로그인 구축.",
                },
            ],
            results: [
                "현장 검수 및 매입 확정 처리 소요 시간을 기존 대비 50% 단축하여 실무 생산성 대폭 향상.",
                "사용자 계정 비밀번호 분실관련 CS 문의를 기존 대비 90% 이상 대폭 감소.",
            ],
            images: [
                "assets/images/together_pda_1.png",
                "assets/images/together_pda_2.png",
                "assets/images/together_pda_3.png",
                "assets/images/together_pda_4.png",
            ],
        },
        {
            title: "배달 프로세스 재설계 및 결제 로직 안정화",
            company: "투게더 PDA",
            employer: "(주)투게더스",
            period: "2024.01 - 2024.06",
            description:
                "배달 기사님들이 별도 장비 없이 PDA 단말기 앱 하나로 배송 상태 업데이트부터 카드 결제까지 일괄적으로 처리할 수 있는 워크플로우를 구축하기 위해, 레거시 코드를 이관 및 안정적으로 전면 재설계했습니다.",
            topics: [
                "Kotlin",
                "MVVM",
                "DataBinding",
                "Coroutines",
                "Realm",
            ],
            solutions: [
                {
                    title: "단말기 하드웨어 환경 맞춤형 All-in-one 배달 워크플로우 구축",
                    desc: "타 서비스에서 베타로 운영 중이던 소스코드를 이관받아 PDA 단말기 환경과 앱 아키텍처에 맞게 전면 재설계. 배달 기사들이 별도의 장비 없이 앱 하나로 배송 상태 관리부터 결제까지 완료할 수 있는 환경 제공.",
                },
                {
                    title: "결제 및 상태 동기화 로직 안정화",
                    desc: "레거시 코드 이관 과정에서 발생한 치명적인 '결제 중복 현상' 및 '배송 상태 동기화 누락' 오류의 원인을 식별하고 로직을 수정하여 결제 시스템의 신뢰성 확보.",
                },
            ],
            results: [
                "안정화된 결제 및 배달 연동 프로세스 확장을 통해 도입 이후 3개월간 월간 활성 사용자(MAU) 50% 증가 기여.",
            ],
            images: [
                "assets/images/together_pda_5.png",
                "assets/images/together_pda_6.png",
                "assets/images/together_pda_7.png",
            ],
        },
        {
            title: "비대면 진료 프로세스 구축",
            company: "굿팜",
            employer: "(주)헬스포트",
            period: "2023.05 - 2023.08",
            description:
                "유선 진료 예약부터 진료비 결제, 약 제조 완료 알림까지 진료의 전 과정을 앱 내에서 끊김없이 처리할 수 있는 진료 시스템을 구축했습니다.",
            topics: [
                "Kotlin",
                "MVVM",
                "DataBinding",
                "FCM",
            ],
            solutions: [
                {
                    title: "상태 기반 진료 워크플로우 아키텍처 설계",
                    desc: "진료의 각 단계(요청, 승인, 결제, 처방)를 명확한 상태 값으로 분리하여 관리하고, 데이터 변화 흐름에 따라 화면 렌더링과 FCM 알림이 유기적으로 반응하도록 아키텍처 설계.",
                },
            ],
            results: [
                "정부의 비대면 진료 가이드라인에 맞춰 필수 기능을 신속하고 안정적으로 구현하여 변화하는 시장에 선제적으로 대응, 서비스 경쟁력 확보에 기여.",
            ],
            images: [
                "assets/images/goodpharm_5.png",
                "assets/images/goodpharm_1.png",
                "assets/images/goodpharm_4.png",

            ],
        },
        {
            title: "복약 알림 기능 서비스 안정화",
            company: "굿팜",
            employer: "(주)헬스포트",
            period: "2023.03 - 2023.05",
            description:
                "헬스케어 앱의 '복약 알림' 누락 및 비정상 종료 현상의 원인을 분석하고 해결했습니다.",
            topics: [
                "Kotlin",
                "MVVM",
                "DataBinding",
                "FCM",
                "Firebase Crashlytics",
            ],
            solutions: [
                {
                    title: "FCM 알림 누락 방어 로직 보강",
                    desc: "다양한 기기 환경에서 간헐적으로 발생하는 FCM 알림 누락 케이스를 방어하기 위해 수신부 예외 처리 로직 보강.",
                },
                {
                    title: "'복약 순응도' 추적 기능 구현",
                    desc: "사용자의 복약 알림 화면 활성화를 유도하기 위한 '복약 순응도' 추적 기능 구현.",
                },
            ],
            results: [
                "Firebase Crashlytics 기반의 문제 원인 파악 및 수정을 통해 알림 관련 비정상 종료율 40% 감소.",
            ],
            images: [
                "assets/images/goodpharm_2.png",
                "assets/images/goodpharm_3.png",
            ],
        },
    ];

    return (
        <section id="projects" className="section-padding bg-bg" ref={ref}>
            <div className="container-max">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Title */}
                    <div className="flex items-center gap-4 mb-16">
                        <span className="text-accent font-mono text-base">02</span>
                        <h2 className="text-3xl font-semibold">Projects</h2>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="space-y-24">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="relative border border-border rounded-2xl p-6 md:p-10 bg-surface overflow-hidden hover:border-accent/40 transition-colors"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                {/* Header */}
                                <div className="mb-8">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                                        <h3 className="text-3xl lg:text-4xl font-semibold text-text leading-snug">
                                            {project.title}
                                        </h3>
                                        <div className="text-right shrink-0">
                                            <p className="text-accent font-medium text-xl">{project.company}</p>
                                            <p className="text-subtle text-base mt-0.5">{project.employer}</p>
                                            <p className="text-muted text-base font-mono mt-1 whitespace-nowrap">{project.period}</p>
                                        </div>
                                    </div>
                                    <p className="text-subtle text-lg md:text-xl leading-relaxed max-w-4xl">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Topics */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {project.topics.map((topic, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-border/50 text-text text-base rounded-full border border-border"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                <div className={`grid gap-12 ${project.images.length > 0 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
                                    {/* Left Column (Details) */}
                                    <div className="space-y-10">
                                        {/* Migration Table (only if exists) */}
                                        {project.migrations && (
                                            <div>
                                                <h4 className="text-xl font-medium mb-4 flex items-center gap-2">
                                                    <span className="text-accent">•</span> 시스템 개편 내역
                                                </h4>
                                                <div className="overflow-x-auto border border-border rounded-lg">
                                                    <table className="w-full text-base text-left">
                                                        <thead className="bg-border/30 text-text">
                                                            <tr>
                                                                <th className="px-4 py-3 border-b border-border font-medium">
                                                                    항목
                                                                </th>
                                                                <th className="px-4 py-3 border-b border-border font-medium text-muted">
                                                                    기존 (Legacy)
                                                                </th>
                                                                <th className="px-4 py-3 border-b border-border font-medium text-accent">
                                                                    신규 (Renewal)
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-border">
                                                            {project.migrations.map((mig, i) => (
                                                                <tr
                                                                    key={i}
                                                                    className="hover:bg-border/10 transition-colors"
                                                                >
                                                                    <td className="px-4 py-3 font-medium text-text">
                                                                        {mig.label}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-muted/80 line-through decoration-muted">
                                                                        {mig.before}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-text">
                                                                        {mig.after}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}

                                        {/* Solutions */}
                                        <div>
                                            <h4 className="text-xl font-medium mb-4 flex items-center gap-2">
                                                <span className="text-accent">•</span> 핵심 구현 및 문제 해결
                                            </h4>
                                            <ul className="space-y-5">
                                                {project.solutions.map((sol, i) => (
                                                    <li key={i} className="flex gap-3">
                                                        <span className="text-accent mt-1">-</span>
                                                        <div>
                                                            <strong className="block text-text font-medium mb-1">
                                                                {sol.title}
                                                            </strong>
                                                            <p className="text-subtle text-base leading-relaxed whitespace-pre-line">
                                                                {sol.desc}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Results */}
                                        <div>
                                            <h4 className="text-xl font-medium mb-4 flex items-center gap-2">
                                                <span className="text-accent">•</span> 서비스 개선 성과
                                            </h4>
                                            <div className="bg-border/20 p-5 rounded-lg border border-border/50">
                                                <ul className="space-y-3">
                                                    {project.results.map((res, i) => (
                                                        <li key={i} className="flex gap-3 text-base text-text">
                                                            <span className="text-accent">-</span>
                                                            <span className="leading-relaxed">{res}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column (Screenshots Gallery) */}
                                    {project.images.length > 0 && (
                                        <ImageCarousel images={project.images} />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
