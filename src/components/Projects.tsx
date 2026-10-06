import {
    MposDetail,
    PdaDetail,
    SupplierDetail,
} from "./projects/details";
import { ProjectCard, ProjectItem } from "./projects/ProjectCard";

const img = (name: string) => `assets/images/${name}.png`;

const mainProjects: ProjectItem[] = [
    {
        meta: "투게더 공급사 · 2025.04 - 2025.10 · 2026.04 - 2026.07",
        title: "iOS 앱 신규 출시(RN 마이그레이션) 및 UI 전면 리뉴얼",
        desc: "마트 공급사용 B2B 매출·정산 관리 앱",
        stats: [
            { value: "+20%", label: "iOS 확장 후 월 이용자" },
            { value: "2개 마켓", label: "단일 코드베이스 출시" },
            { value: "1인", label: "개발·출시·운영 전담" },
        ],
        works: [
            "기존 Kotlin MVVM 구조·비즈니스 로직을 분석해 React Native로 전환",
            "단일 코드베이스로 App Store · Google Play 출시",
            "전사 디자인 시스템 기반 앱 전체 UI 리뉴얼 (디자이너와 UI/UX 협의)",
        ],
        tags: ["React Native", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS"],
        images: [img("mptr1"), img("mptr2"), img("mptr4")],
        detail: <SupplierDetail />,
    },
    {
        meta: "MPOS 라이트 · 2026.02 - 2026.05",
        title: "소규모 마트 전용 매출관리 앱 MVP 개발",
        desc: "장소 제약 없이 매출을 확인하는 iOS · Android 앱",
        stats: [
            { value: "20개 화면", label: "iOS · Android MVP" },
            { value: "약 3개월", label: "목표 일정 내 구현 완료" },
            { value: "1인", label: "기획·개발 전담" },
        ],
        works: [
            "데이터가 많은 매출·재고 화면에 맞춘 공통 UI 컴포넌트 모듈화",
            "데이터 Fetching 로직을 Custom Hook으로 분리해 잦은 정산 로직 변경에 대응",
            "사용자·매출·상품 도메인별 Zustand 스토어 분리로 불필요한 리렌더링 방지",
        ],
        tags: ["React Native", "TypeScript", "Tailwind CSS", "TanStack Query", "Zustand"],
        images: [img("smpos1"), img("smpos2"), img("smpos4")],
        detail: <MposDetail />,
    },
        {
        meta: "투게더 PDA · 2025.06 - 2025.11 · 2026.08 - 2026.10",
        title: "레거시 구조 정비(DataBinding 전환) 및 UI 리뉴얼",
        desc: "마트 현장 작업자가 쓰는 PDA 앱",
        stats: [
            { value: "1% 미만", label: "NPE 발생률 (기존 8%)" },
            { value: "549개", label: "DataBinding 전환 파일" },
            { value: "API 36", label: "구글 정책 대응" },
        ],
        works: [
            "deprecated된 kotlin-android-extensions를 DataBinding으로 전면 전환",
            "안내 박스 · 팝업 · 날짜 선택 뷰 공통 컴포넌트화 및 전체 UI 리뉴얼",
            "화면 폭 대응 레이아웃 · PDA 물리 키(KeyEvent) 포커스 이동방식 구현",
        ],
        tags: ["Kotlin", "MVVM", "DataBinding", "Realm", "Android Jetpack"],
        images: [img("pda_new_stock_disposal"), img("pda_new_delivery_summary"), img("pda_new_common_popup")],
        detail: <PdaDetail />,
    },
];

const otherProjects: ProjectItem[] = [
    {
        meta: "투게더 PDA · 2024.09 - 2025.06 · QR 2024.05 - 06",
        title: "매장 재고관리 · 상품조회 · 발주검수 모바일화 및 QR 로그인",
        desc: "PC에서만 가능하던 핵심 매장 업무를 PDA 모바일로 전환해 현장 즉시 처리를 지원하고, 작업자를 위한 QR 간편 로그인을 도입했습니다.",
        stats: [
            { value: "-90%", label: "비밀번호 분실 CS 문의 (QR 도입)" },
            { value: "즉시 처리", label: "PC 이동 없는 현장 실시간 처리" },
        ],
        works: [
            "바코드 스캔으로 상품 정보·가격 비교·매입/판매 이력을 탭으로 분리 조회",
            "PC로 이동하지 않고 현장에서 실시간 발주검수 및 매입확정 처리",
            "ZXing 기반 QR 코드 스캔으로 매장·사용자가 자동 매칭되는 간편 로그인 구현",
        ],
        tags: ["Kotlin", "MVVM", "DataBinding", "Realm", "ZXing"],
        images: [img("together_pda_1"), img("together_pda_3"), img("together_pda_4")],
    },
    {
        meta: "투게더 PDA · 2024.01 - 2024.06",
        title: "배달 프로세스 재설계 및 결제 연동 오류 정상화",
        desc: "타 서비스에서 이관된 배달 코드를 PDA 환경에 맞게 화면을 재설계하고 결제 연동 및 상태 동기화 오류를 해결했습니다.",
        stats: [
            { value: "+50%", label: "도입 후 3개월간 MAU" },
            { value: "0건", label: "결제 승인 결과 누락 오류" },
        ],
        works: [
            "배달 탭·집계 화면 레이아웃을 PDA 단말기 해상도에 맞춰 재설계",
            "외부 결제 앱(URL 스킴) 연동 시 승인 결과 콜백 경로 및 할부 개월 수 매핑 오류 해결",
            "화면 복귀 시점 자동 재조회 라이프사이클 적용으로 배달상태 즉시 갱신",
        ],
        tags: ["Kotlin", "MVVM", "DataBinding", "Realm"],
        images: [img("together_pda_5"), img("together_pda_7")],
    },
    {
        meta: "굿팜 · (주)헬스포트 · 2023.03 - 2023.08",
        title: "비대면 진료 MVP 개발 및 복약 알림 안정화",
        desc: "환자와 병원·약국을 연결하는 헬스케어 앱에서 비대면 진료 MVP를 개발하고 복약 알림 크래시를 안정화했습니다.",
        stats: [
            { value: "-40%", label: "알림 비정상 종료율 (Crashlytics)" },
            { value: "제휴처 시연", label: "유선 예약부터 조제 알림까지 MVP 완결" },
        ],
        works: [
            "진료 단계(요청·승인·결제·처방) 상태값 분리 → 화면 및 FCM 푸시 알림 실시간 연동",
            "Crashlytics 로그 추적으로 제조사별 백그라운드 FCM 수신부 예외 처리 보강",
            "복약 순응도 추적 기능 및 BroadcastReceiver 기반 정시 알림 구현",
        ],
        tags: ["Kotlin", "MVVM", "Coroutines", "Room", "FCM", "Crashlytics"],
        images: [img("goodpharm_1"), img("goodpharm_2")],
    },
];

const Projects = () => (
    <section id="projects" className="section-padding bg-bg">
        <div className="container-max">
            {/* Section Title */}
            <div className="flex items-center gap-4 mb-12">
                <span className="text-accent font-mono text-sm">03</span>
                <h2 className="text-2xl font-semibold">Projects</h2>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* 대표 프로젝트 */}
            <div className="space-y-8">
                {mainProjects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} reverse={index % 2 === 1} />
                ))}
            </div>

            {/* 그 외 프로젝트 */}
            <div className="mt-16 mb-6 flex items-center gap-4">
            </div>
            <div className="space-y-6">
                {otherProjects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} reverse={index % 2 === 1} compact />
                ))}
            </div>
        </div>
    </section>
);

export default Projects;

