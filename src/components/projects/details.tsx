import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { BeforeAfter, Block, LineBox, Steps } from "./parts";

const img = (name: string) => `assets/images/${name}.png`;

// 공급사 기술 스택 전환 내역
const migrations = [
    { label: "언어", before: "Kotlin + Java", after: "TypeScript" },
    { label: "프레임워크", before: "Android Native", after: "React Native" },
    { label: "상태관리", before: "ViewModel + Hilt", after: "Custom Hook + Zustand" },
    { label: "통신", before: "Retrofit2", after: "Axios + TanStack Query" },
];

/* 01 공급사 상세 */
export const SupplierDetail = () => (
    <>
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                <Block title="배경">
                    <LineBox>Kotlin(Android) 전용 서비스의 시장 확대를 위해 iOS 앱이 필요한 상황</LineBox>
                </Block>
                <Block title="ViewModel 상태 분리 (기존 동작 유지)">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg border border-border bg-bg/60 px-4 py-3 text-sm text-subtle shrink-0">
                            ViewModel 상태
                        </span>
                        <FaArrowRight className="text-accent shrink-0" />
                        <div className="space-y-2 flex-1">
                            <p className="rounded-lg border border-accent/40 bg-accent/5 px-4 py-2 text-sm text-text">
                                서버 상태 <span className="text-accent ml-1">TanStack Query</span>
                            </p>
                            <p className="rounded-lg border border-accent/40 bg-accent/5 px-4 py-2 text-sm text-text">
                                클라이언트 상태 <span className="text-accent ml-1">Zustand</span>
                            </p>
                        </div>
                    </div>
                </Block>
            </div>
            <Block title="기술 스택 전환">
                {migrations.map((mig) => (
                    <div
                        key={mig.label}
                        className="grid grid-cols-[4.5rem_1fr_auto_1fr] items-center gap-3 text-sm py-2 border-b border-border/60"
                    >
                        <span className="text-muted">{mig.label}</span>
                        <span className="text-subtle line-through decoration-muted">{mig.before}</span>
                        <FaArrowRight className="text-accent" />
                        <span className="text-text">{mig.after}</span>
                    </div>
                ))}
            </Block>
        </div>
        <Block title="UI 리뉴얼 이전 / 이후">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
                <BeforeAfter before={img("mptr_old_products")} after={img("mptr2")} />
                <BeforeAfter before={img("mptr_old_daily_sales")} after={img("mptr4")} />
            </div>
        </Block>
    </>
);

/* 02 PDA 리뉴얼 상세 */
export const PdaDetail = () => (
    <>
        <div className="grid lg:grid-cols-2 gap-8">
            <Block title="배경">
                <div className="space-y-2">
                    <LineBox>deprecated된 kotlin-android-extensions로 NPE 크래시 반복</LineBox>
                    <LineBox>SDK 신규 버전 대응이 막힌 구조</LineBox>
                    <LineBox>UI 요소가 화면마다 흩어져 수정 비용이 큼</LineBox>
                </div>
            </Block>
            <Block title="진행 단계">
                <div className="space-y-5">
                    <div>
                        <p className="text-sm text-text mb-2">
                            <span className="text-accent font-mono mr-2">1차</span>
                            DataBinding 전환 · 2025.06 - 2025.11
                        </p>
                        <Steps items={["변환 표준 정의", "AI 일괄 변환", "전수 빌드 검증"]} />
                        <p className="text-subtle text-sm mt-2">
                            XML 구조 · Base 바인딩 표준 규칙을 수립해 AI 변환 정확도를 높이고, 전수 검수로 549개 파일 전환
                        </p>
                        <p className="text-subtle text-sm mt-2">
                            뷰 바인딩 초기화·해제 로직을 BaseActivity / BaseFragment로 통합
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-text mb-2">
                            <span className="text-accent font-mono mr-2">2차</span>
                            UI 리뉴얼 · 2026.08 - 2026.10
                        </p>
                        <p className="text-subtle text-sm">
                            전사 디자인 통일 정책에 맞춰 공통 컴포넌트를 통합하고 전체 화면 리뉴얼
                        </p>
                    </div>
                </div>
            </Block>
        </div>
        <Block title="UI 리뉴얼 이전 / 이후">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
                <BeforeAfter before={img("together_pda_2")} after={img("pda_new_stock_disposal")} />
                <BeforeAfter before={img("together_pda_6")} after={img("pda_new_delivery_summary")} />
            </div>
        </Block>
    </>
);

// MPOS 설계 단계 (화면 → 데이터)
const layers = [
    { name: "화면", title: "공통 UI 컴포넌트", desc: "매출·재고 화면의 레이아웃과 사용성 통일" },
    { name: "로직", title: "Custom Hook", desc: "데이터 Fetching 로직 분리로 정산 로직 변경에 대응" },
    { name: "데이터", title: "API · Mock Data", desc: "백엔드가 제공한 Mock Data로 API 완성 전부터 개발" },
    { name: "상태관리", title: "Zustand 스토어", desc: "사용자·매출·상품 도메인별 Zustand 스토어 분리로 불필요한 리렌더링 방지" },
];
/* 03 MPOS 라이트 상세 */
export const MposDetail = () => (
    <div className="grid lg:grid-cols-2 gap-8">
        <Block title="상황">
            <div className="space-y-2">
                <LineBox>마트 대상 앱 시연이 필요한 상황</LineBox>
                <LineBox>약 3개월 안에 iOS · Android 동시 개발 (1인)</LineBox>
                <LineBox>정산 로직이 자주 바뀌고, 백엔드 API도 개발 중</LineBox>
            </div>
        </Block>
        <Block title="구조">
            <div className="space-y-1">
                {layers.map((layer, i) => (
                    <div key={layer.name}>
                        <div className="grid grid-cols-[3.5rem_1fr] items-center gap-3 rounded-lg border border-border bg-bg/60 px-4 py-3">
                            <span className="text-accent font-mono text-xs">{layer.name}</span>
                            <div>
                                <p className="text-text text-sm font-medium">{layer.title}</p>
                                <p className="text-subtle text-xs mt-0.5">{layer.desc}</p>
                            </div>
                        </div>
                        {i < layers.length - 1 && <FaArrowDown className="text-muted text-xs mx-auto my-1" />}
                    </div>
                ))}
            </div>
        </Block>
    </div>
);


