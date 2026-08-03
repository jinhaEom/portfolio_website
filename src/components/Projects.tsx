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
            title: "소규모 마트 전용 매출관리 앱 신규 개발 (1인 전담)",
            company: "투게더 MPOS Lite",
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
                "메인 POS 시스템 개발 지연 리스크를 Mock Data 활용으로 극복하여 프론트엔드 전체 기능 구현을 목표 일정 내 선제 완료.",
                "공통 컴포넌트화와 아키텍처 관심사 분리를 통해 전체 프로젝트의 일정 지연 리스크 원천 차단.",
            ],
            images: [
                "assets/images/smpos1.png",
                "assets/images/smpos2.png",
                "assets/images/smpos4.png",
                "assets/images/smpos3.png",
            ],
        },
        {
            title: "iOS/Android 앱 신규 출시 및 마이그레이션 (1인 전담)",
            company: "투게더 공급사",
            period: "2025.02 - 2025.08",
            description:
                "가맹점 공급사들이 실시간으로 매출현황을 확인하고 정산을 관리할 수 있는 솔루션입니다. 기존 안드로이드(Kotlin) 전용 서비스를 React Native 크로스플랫폼으로 마이그레이션하여 양대 마켓에 출시하였습니다.",
            topics: [
                "React Native",
                "TypeScript",
                "Zustand",
                "Tanstack Query",
                "NativeWind",
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
            ],
            results: [
                "단일 코드베이스 구축을 통해 서비스 접근성을 증대시키고 유지보수 리소스를 획기적으로 절감.",
                "기존 Native 대비 전체 코드량 약 80% 단축.",
                "iOS 플랫폼 확장으로 서비스 월간 이용자수 기존대비 20% 이상 성장.",
            ],
            images: [
                "assets/images/mptr1.png",
                "assets/images/mptr2.png",
                "assets/images/mptr3.png",
                "assets/images/mptr4.png",
            ],
        },
        {
            title: "배달 프로세스 재설계 및 결제 로직 안정화",
            company: "투게더 PDA",
            period: "2024.06 - 2024.11",
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
            title: "매장 재고관리·상품조회·발주검수 시스템 모바일화 및 QR 도입",
            company: "투게더 PDA",
            period: "2024.02 - 2024.08",
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
                    title: "컴파일 타임 안정성 확보 및 DataBinding 교체",
                    desc: "Deprecated된 Kotlin-android-extensions를 전면 제거하고 DataBinding으로 교체하여 549개 파일 마이그레이션 및 공통 Base 클래스 설계를 통한 마이그레이션 표준화.",
                },
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
                "NPE 발생률을 기존 8%에서 1% 미만으로 개선하고 최신 구글 정책(API 35 대응) 완수.",
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
            title: "비대면 진료 및 복약 알림 기능 서비스 안정화",
            company: "굿팜",
            period: "2023.03 - 2023.08",
            description:
                "비대면으로 예약부터 결제, 제조 완료 수신까지 환자와 약국을 연결하는 통합 의료 솔루션을 개발 및 유지보수하였으며, 정확한 복약 지도를 위해 누락 없는 고정밀 알람 엔진을 구축했습니다.",
            topics: [
                "Kotlin",
                "MVVM",
                "Coroutines",
                "RoomDB",
                "BroadcastReceiver",
            ],
            solutions: [
                {
                    title: "All-in-one 비대면 진료 워크플로우 구축 및 상태 기반 설계",
                    desc: "유선 진료 예약부터 진료비 결제, 약 제조 완료 알림까지 진료의 전 과정을 앱 내에서 한 번에 처리하고, 각 단계를 명확한 상태 값으로 분리하여 반응형 아키텍처 설계.",
                },
                {
                    title: "Android Lifecycle 기반 방어 코드 설계 및 알림 누락 보정",
                    desc: "다양한 기기 환경에서 발생하는 FCM 알림 누락을 방어하기 위해 수신부 예외 처리 로직 보강 및 알림 도달 신뢰성 확보.",
                },
                {
                    title: "UX 개선 및 '복약 순응도' 추적 구현",
                    desc: "사용자가 직관적으로 복약 여부를 기록 및 확인할 수 있도록 복약 순응도 기능을 신규 개발하여 투약 성공률 향상 유도.",
                },
            ],
            results: [
                "비대면 진료 필수 핵심 기능 개발 및 긴밀한 시장 트렌드 선점 기여.",
                "Firebase Crashlytics 지표 분석 기준 알림/크래시 관련 비정상 앱 종료 발생 비율을 이전 대비 40% 큰 폭으로 감소 안정화.",
            ],
            images: [
                "assets/images/goodpharm_1.png",
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
                        <span className="text-accent font-mono text-sm">02</span>
                        <h2 className="text-2xl font-semibold">Projects</h2>
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
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <h3 className="text-2xl md:text-3xl font-semibold text-text">
                                            {project.title}
                                        </h3>
                                        <div className="text-right">
                                            <p className="text-accent font-medium text-lg">{project.company}</p>
                                            <p className="text-muted text-sm font-mono mt-1">{project.period}</p>
                                        </div>
                                    </div>
                                    <p className="text-subtle text-base md:text-lg leading-relaxed max-w-4xl">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Topics */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {project.topics.map((topic, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-border/50 text-text text-sm rounded-full border border-border"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid lg:grid-cols-2 gap-12">
                                    {/* Left Column (Details) */}
                                    <div className="space-y-10">
                                        {/* Migration Table (only if exists) */}
                                        {project.migrations && (
                                            <div>
                                                <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                                                    <span className="text-accent">•</span> 시스템 개편 내역
                                                </h4>
                                                <div className="overflow-x-auto border border-border rounded-lg">
                                                    <table className="w-full text-sm text-left">
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
                                            <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
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
                                                            <p className="text-subtle text-sm leading-relaxed whitespace-pre-line">
                                                                {sol.desc}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Results */}
                                        <div>
                                            <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                                                <span className="text-accent">•</span> 서비스 개선 성과
                                            </h4>
                                            <div className="bg-border/20 p-5 rounded-lg border border-border/50">
                                                <ul className="space-y-3">
                                                    {project.results.map((res, i) => (
                                                        <li key={i} className="flex gap-3 text-sm text-text">
                                                            <span className="text-accent">-</span>
                                                            <span className="leading-relaxed">{res}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column (Screenshots Gallery) */}
                                    <ImageCarousel images={project.images} />
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
