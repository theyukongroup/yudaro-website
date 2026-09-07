'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Calculator,
  Check,
  Compass,
  FileSearch,
  LockKeyhole,
  Save,
  UserRound,
} from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { memberCopy } from '@/lib/member-copy';
import {
  assessmentQuestions,
  buildOpportunities,
  buildRoadmap,
  calculateROI,
  opportunityOptions,
  scoreAssessment,
  type AssessmentAnswers,
  type ROIInputs,
  type Scores,
} from '@/lib/member-tools';

const questionTranslations: Record<Locale, string[]> = {
  en: assessmentQuestions.map((q) => q.label),
  'zh-cn': [
    '行业',
    '员工人数',
    '运营地点数量',
    '当前业务系统的连接程度如何？',
    '关键流程对电子表格的依赖程度如何？',
    '客户、产品和供应商记录的一致性如何？',
    '员工查找批准流程有多容易？',
    '员工培训的文档化和可重复程度如何？',
    '管理者获得当前报表的速度如何？',
    '信息在不同系统间重复录入的频率如何？',
    '客户跟进的一致性如何？',
    '采购与补货的结构化程度如何？',
    '团队负责任使用 AI 的准备程度如何？',
    '控制企业 AI 数据访问有多重要？',
    '可检索企业文档能带来多大价值？',
    '连接实时运营数据能带来多大价值？',
  ],
  'zh-tw': [
    '行業',
    '員工人數',
    '營運地點數量',
    '目前業務系統的連接程度如何？',
    '關鍵流程對試算表的依賴程度如何？',
    '客戶、產品和供應商記錄的一致性如何？',
    '員工查找核准流程有多容易？',
    '員工培訓的文件化和可重複程度如何？',
    '管理者取得目前報表的速度如何？',
    '資訊在不同系統間重複輸入的頻率如何？',
    '客戶跟進的一致性如何？',
    '採購與補貨的結構化程度如何？',
    '團隊負責任使用 AI 的準備程度如何？',
    '控制企業 AI 資料存取有多重要？',
    '可檢索企業文件能帶來多大價值？',
    '連接即時營運資料能帶來多大價值？',
  ],
  es: [
    'Industria',
    'Número de empleados',
    'Número de ubicaciones',
    '¿Qué tan conectados están sus sistemas actuales?',
    '¿Cuánto dependen los procesos críticos de hojas de cálculo?',
    '¿Qué tan consistentes son los registros de clientes, productos y proveedores?',
    '¿Qué tan fácil es encontrar procedimientos aprobados?',
    '¿Qué tan documentada y repetible es la capacitación?',
    '¿Qué tan rápido obtienen informes actuales los gerentes?',
    '¿Con qué frecuencia se repite información entre sistemas?',
    '¿Qué tan consistente es el seguimiento de clientes?',
    '¿Qué tan estructuradas están compras y reposición?',
    '¿Qué tan preparado está el equipo para usar IA responsablemente?',
    '¿Qué tan importante es controlar el acceso a datos de IA?',
    '¿Qué valor tendría buscar documentos empresariales?',
    '¿Qué valor tendría conectar datos operativos actuales?',
  ],
};
const emit = (event: string, context: Record<string, string | number> = {}) => {
  void fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, context }),
  }).catch(() => undefined);
};
const langSuffix = (locale: Locale) =>
  locale === 'en' ? '' : `?lang=${locale}`;

export function ScoreCards({
  scores,
  locale,
}: {
  scores: Scores;
  locale: Locale;
}) {
  const t = memberCopy[locale];
  return (
    <div className="score-grid">
      {(
        [
          ['overall', scores.overall],
          ['ai', scores.ai],
          ['erp', scores.erp],
          ['automation', scores.automation],
          ['data', scores.data],
        ] as const
      ).map(([key, value]) => (
        <article className={key === 'overall' ? 'overall' : ''} key={key}>
          <span>{t[key]}</span>
          <strong>
            {value}
            <small>/100</small>
          </strong>
          <div>
            <i style={{ width: `${value}%` }} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function AssessmentTool({
  locale,
  member = false,
  onSaved,
}: {
  locale: Locale;
  member?: boolean;
  onSaved?: (answers: AssessmentAnswers, scores: Scores) => void;
}) {
  const t = memberCopy[locale];
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [scores, setScores] = useState<Scores | null>(null);
  useEffect(() => {
    if (!member) {
      const raw = localStorage.getItem('nexavoris-assessment-draft');
      if (raw)
        try {
          queueMicrotask(() => setAnswers(JSON.parse(raw)));
        } catch {}
    }
  }, [member]);
  const set = (id: string, value: string | number) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    if (!member)
      localStorage.setItem('nexavoris-assessment-draft', JSON.stringify(next));
  };
  const finish = () => {
    const result = scoreAssessment(answers);
    setScores(result);
    emit('assessment_completed', {
      industry: String(answers.industry ?? ''),
      scoreRange: `${Math.floor(result.overall / 10) * 10}-${Math.floor(result.overall / 10) * 10 + 10}`,
    });
    onSaved?.(answers, result);
  };
  if (scores)
    return (
      <section className="tool-result">
        <span className="member-kicker">{t.ready}</span>
        <h2>{t.assessment}</h2>
        <p>{t.estimated}</p>
        <ScoreCards scores={scores} locale={locale} />
        {!member && (
          <div className="unlock-card">
            <LockKeyhole />
            <div>
              <h3>{t.unlock}</h3>
              <p>{t.nocard}</p>
            </div>
            <a
              className="button primary"
              href={`/signin-with-chatgpt?return_to=${encodeURIComponent('/account?import=assessment' + (locale === 'en' ? '' : `&lang=${locale}`))}`}
              target="_top"
              onClick={() => emit('signup_started', { source: 'assessment' })}
            >
              {t.create}
              <ArrowRight size={16} />
            </a>
          </div>
        )}
      </section>
    );
  if (step < 0)
    return (
      <section className="tool-intro">
        <FileSearch size={36} />
        <h1>{t.assessment}</h1>
        <p>{t.assessmentIntro}</p>
        <button
          className="button primary"
          onClick={() => {
            setStep(0);
            emit('assessment_started', {
              source: member ? 'account' : 'public',
            });
          }}
        >
          {t.start}
          <ArrowRight size={16} />
        </button>
        <small>{t.nocard}</small>
      </section>
    );
  const q = assessmentQuestions[step],
    label = questionTranslations[locale][step];
  const answered = answers[q.id] !== undefined;
  return (
    <section className="question-card">
      <div className="question-progress">
        <span>
          {step + 1} / {assessmentQuestions.length}
        </span>
        <i
          style={{
            width: `${((step + 1) / assessmentQuestions.length) * 100}%`,
          }}
        />
      </div>
      <h2>{label}</h2>
      {q.kind === 'select' ? (
        <select
          value={String(answers[q.id] ?? '')}
          onChange={(e) => set(q.id, e.target.value)}
        >
          <option value="">{t.select}</option>
          {q.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <div className="scale-options">
          {[t.low, t.medium, t.good, t.high].map((x, i) => (
            <button
              className={answers[q.id] === i ? 'selected' : ''}
              key={x}
              onClick={() => set(q.id, i)}
            >
              {i}
              <span>{x}</span>
            </button>
          ))}
        </div>
      )}
      <div className="question-actions">
        <button disabled={step === 0} onClick={() => setStep(step - 1)}>
          {t.back}
        </button>
        {step < assessmentQuestions.length - 1 ? (
          <button
            className="button primary"
            disabled={!answered}
            onClick={() => setStep(step + 1)}
          >
            {t.next}
          </button>
        ) : (
          <button
            className="button primary"
            disabled={!answered}
            onClick={finish}
          >
            {t.finish}
          </button>
        )}
      </div>
    </section>
  );
}

type MemberData = {
  user: { email: string; name?: string };
  profile: Record<string, string>;
  assessment: { responses: AssessmentAnswers; scores: Scores } | null;
  opportunity: {
    selections: string[];
    results: ReturnType<typeof buildOpportunities>;
  } | null;
  roi: { inputs: ROIInputs; results: ReturnType<typeof calculateROI> } | null;
  roadmap: ReturnType<typeof buildRoadmap> | null;
};
export function MemberDashboard({
  locale,
  email,
  name,
}: {
  locale: Locale;
  email: string;
  name?: string;
}) {
  const t = memberCopy[locale];
  const [data, setData] = useState<MemberData | null>(null);
  const [tab, setTab] = useState('dashboard');
  const [message, setMessage] = useState('');
  const load = async (): Promise<void> => {
    const loaded = (await (await fetch('/api/member')).json()) as MemberData;
    const draft = localStorage.getItem('nexavoris-assessment-draft');
    if (draft && !loaded.assessment) {
      try {
        const responses = JSON.parse(draft);
        const scores = scoreAssessment(responses);
        await fetch('/api/member', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'assessment', responses, scores }),
        });
        localStorage.removeItem('nexavoris-assessment-draft');
        emit('signup_completed', { source: 'assessment' });
        await load();
        return;
      } catch {
        /* Ignore malformed device-local drafts. */
      }
    }
    setData(loaded);
  };
  useEffect(() => {
    void load();
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const save = async (payload: Record<string, unknown>) => {
    setMessage('');
    const r = await fetch('/api/member', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (r.ok) {
      setMessage(t.savedOk);
      await load();
    } else setMessage('Error');
  };
  const completed = [
    true,
    !!data?.assessment,
    !!data?.opportunity,
    !!data?.roi,
    !!data?.roadmap,
  ];
  const progress = Math.round(
    (completed.filter(Boolean).length / completed.length) * 100,
  );
  if (!data) return <div className="member-loading">Loading…</div>;
  const tools = [
    ['assessment', t.assessment, BarChart3],
    ['opportunity', t.opportunity, Compass],
    ['roi', t.roi, Calculator],
    ['roadmap', t.roadmap, FileSearch],
  ] as const;
  const industry = String(
    data.assessment?.responses.industry ?? data.profile.industry ?? '',
  );
  const recommendations = industry.includes('Wholesale')
    ? [
        '/resources/industries/wholesale-distribution',
        '/resources/odoo-erp',
        '/resources/private-ai',
      ]
    : industry.includes('HVAC')
      ? [
          '/resources/industries/hvac-field-service',
          '/resources/ai-erp',
          '/resources/business-automation',
        ]
      : [
          '/resources/private-ai',
          '/resources/odoo-erp',
          '/resources/comparisons',
        ];
  return (
    <main className="member-shell">
      <aside className="member-sidebar">
        <h2>Nexavoris</h2>
        <span>{name || email}</span>
        <nav>
          {(
            [
              ['dashboard', t.dashboard, UserRound],
              ['profile', t.profile, UserRound],
              ...tools,
            ] as Array<[string, string, typeof UserRound]>
          ).map(([id, label, Icon]) => (
            <button
              className={tab === id ? 'active' : ''}
              key={id}
              onClick={() => setTab(id)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <a
          href={`/signout-with-chatgpt?return_to=${encodeURIComponent('/' + langSuffix(locale))}`}
          target="_top"
        >
          {t.signout}
        </a>
      </aside>
      <section className="member-main">
        {message && <div className="save-toast">{message}</div>}
        {tab === 'dashboard' && (
          <>
            <span className="member-kicker">{t.welcome}</span>
            <h1>{t.dashboard}</h1>
            {data.assessment ? (
              <ScoreCards scores={data.assessment.scores} locale={locale} />
            ) : (
              <div className="empty-card">
                <h2>{t.assessment}</h2>
                <p>{t.assessmentIntro}</p>
                <button
                  className="button primary"
                  onClick={() => setTab('assessment')}
                >
                  {t.start}
                </button>
              </div>
            )}
            <section className="member-progress">
              <div>
                <h2>{t.progress}</h2>
                <strong>{progress}%</strong>
              </div>
              <div>
                <i style={{ width: `${progress}%` }} />
              </div>
              {[t.create, t.assessment, t.opportunity, t.roi, t.roadmap].map(
                (x, i) => (
                  <span key={x}>
                    {completed[i] ? <Check size={16} /> : <i />}
                    {x}
                  </span>
                ),
              )}
            </section>
            <section>
              <h2>{t.tools}</h2>
              <div className="member-tool-grid">
                {tools.map(([id, label, Icon]) => (
                  <button key={id} onClick={() => setTab(id)}>
                    <Icon />
                    <strong>{label}</strong>
                    <ArrowRight />
                  </button>
                ))}
              </div>
            </section>
            <section className="member-recommendations">
              <h2>{t.recommend}</h2>
              {recommendations.map((url) => (
                <a key={url} href={url}>
                  {url.split('/').pop()?.replaceAll('-', ' ')}
                  <ArrowRight size={16} />
                </a>
              ))}
            </section>
            <a
              className="button primary"
              href={`/contact?service=member-review&score=${data.assessment?.scores.overall ?? ''}&industry=${encodeURIComponent(industry)}`}
              onClick={() =>
                emit('consultation_clicked', { source: 'account' })
              }
            >
              {t.consult}
              <ArrowRight size={16} />
            </a>
          </>
        )}
        {tab === 'profile' && (
          <ProfileTool
            locale={locale}
            initial={data.profile}
            onSave={(profile) => save({ type: 'profile', profile })}
          />
        )}
        {tab === 'assessment' && (
          <AssessmentTool
            locale={locale}
            member
            onSaved={(responses, scores) =>
              void save({ type: 'assessment', responses, scores })
            }
          />
        )}{' '}
        {tab === 'opportunity' && (
          <OpportunityTool
            locale={locale}
            initial={data.opportunity?.selections ?? []}
            onSave={(selections, results) =>
              save({ type: 'opportunity', selections, results })
            }
          />
        )}{' '}
        {tab === 'roi' && (
          <ROITool
            locale={locale}
            onSave={(inputs, results) => save({ type: 'roi', inputs, results })}
          />
        )}{' '}
        {tab === 'roadmap' && (
          <RoadmapTool
            locale={locale}
            data={data}
            onSave={(roadmap) => save({ type: 'roadmap', roadmap })}
          />
        )}
      </section>
    </main>
  );
}

function ProfileTool({
  locale,
  initial,
  onSave,
}: {
  locale: Locale;
  initial: Record<string, string>;
  onSave: (profile: Record<string, string>) => void;
}) {
  const t = memberCopy[locale];
  const [profile, setProfile] = useState(initial);
  const field = (key: string, label: string, type = 'text') => (
    <label>
      {label}
      <input
        type={type}
        value={profile[key] ?? ''}
        onChange={(event) =>
          setProfile({ ...profile, [key]: event.target.value })
        }
      />
    </label>
  );
  return (
    <section>
      <span className="member-kicker">{t.dashboard}</span>
      <h1>{t.profile}</h1>
      <p>
        Optional details make recommendations more relevant. Do not enter
        confidential system credentials or sensitive personal information.
      </p>
      <div className="profile-grid">
        {field('firstName', 'First name')}
        {field('lastName', 'Last name')}
        {field('company', t.company)}
        {field('role', t.role)}
        {field('industry', 'Industry')}
        {field('employees', 'Number of employees')}
        {field('locations', 'Number of locations')}
        {field('erp', 'Current ERP')}
        {field('phone', t.phone, 'tel')}
        {field('challenge', t.challenge)}
      </div>
      <button className="button primary" onClick={() => onSave(profile)}>
        {t.update}
      </button>
    </section>
  );
}

function OpportunityTool({
  locale,
  initial,
  onSave,
}: {
  locale: Locale;
  initial: string[];
  onSave: (s: string[], r: ReturnType<typeof buildOpportunities>) => void;
}) {
  const t = memberCopy[locale];
  const [selected, setSelected] = useState(initial);
  const results = useMemo(() => buildOpportunities(selected), [selected]);
  return (
    <section>
      <span className="member-kicker">{t.tools}</span>
      <h1>{t.opportunity}</h1>
      <p>
        Select the operational problems that apply. Results are deterministic
        and based only on your selections.
      </p>
      <div className="opportunity-list">
        {opportunityOptions.map(([id, problem]) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={selected.includes(id)}
              onChange={() =>
                setSelected(
                  selected.includes(id)
                    ? selected.filter((x) => x !== id)
                    : [...selected, id],
                )
              }
            />
            <span>{problem}</span>
          </label>
        ))}
      </div>
      {results.length > 0 && (
        <div className="opportunity-results">
          <h2>Opportunities Found: {results.length}</h2>
          {results.map((x) => (
            <article key={x.id}>
              <b>{x.priority}</b>
              <h3>{x.solution}</h3>
              <p>{x.problem}</p>
              <small>{x.implementation}</small>
            </article>
          ))}
          <button
            className="button primary"
            onClick={() => {
              onSave(selected, results);
              emit('opportunity_finder_completed', { tool: 'opportunity' });
            }}
          >
            <Save size={16} />
            {t.save}
          </button>
        </div>
      )}
    </section>
  );
}

function ROITool({
  locale,
  onSave,
}: {
  locale: Locale;
  onSave: (i: ROIInputs, r: ReturnType<typeof calculateROI>) => void;
}) {
  const t = memberCopy[locale];
  const categories = [
    'Finding information',
    'Preparing reports',
    'Re-entering information',
    'Training employees',
    'Checking inventory',
    'Customer follow-up',
    'Manual purchasing',
    'Administrative processes',
  ];
  const [inputs, setInputs] = useState<ROIInputs>({
    employees: 10,
    hourlyCost: 30,
    hours: Object.fromEntries(categories.map((x) => [x, 0])),
  });
  const result = calculateROI(inputs);
  return (
    <section>
      <span className="member-kicker">{t.tools}</span>
      <h1>{t.roi}</h1>
      <div className="roi-basics">
        <label>
          Employees
          <input
            type="number"
            min="1"
            value={inputs.employees}
            onChange={(e) =>
              setInputs({ ...inputs, employees: Number(e.target.value) })
            }
          />
        </label>
        <label>
          Average hourly labor cost
          <input
            type="number"
            min="0"
            value={inputs.hourlyCost}
            onChange={(e) =>
              setInputs({ ...inputs, hourlyCost: Number(e.target.value) })
            }
          />
        </label>
      </div>
      <h2>Estimated weekly team hours</h2>
      <div className="roi-hours">
        {categories.map((c) => (
          <label key={c}>
            {c}
            <input
              type="number"
              min="0"
              step=".5"
              value={inputs.hours[c]}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  hours: { ...inputs.hours, [c]: Number(e.target.value) },
                })
              }
            />
          </label>
        ))}
      </div>
      <div className="roi-result">
        <strong>{result.weeklyHours} hours/week</strong>
        <span>
          ${result.annualLaborCost.toLocaleString()} estimated annual repetitive
          labor cost
        </span>
        <div>
          {result.scenarios.map((x) => (
            <article key={x.rate}>
              <b>{x.rate}%</b>
              <span>${x.value.toLocaleString()}</span>
              <small>{x.hours} hours/year</small>
            </article>
          ))}
        </div>
        <p>{t.illustrative}</p>
        <button
          className="button primary"
          onClick={() => {
            onSave(inputs, result);
            emit('roi_calculator_completed', { tool: 'roi' });
          }}
        >
          {t.save}
        </button>
      </div>
    </section>
  );
}

function RoadmapTool({
  locale,
  data,
  onSave,
}: {
  locale: Locale;
  data: MemberData;
  onSave: (r: ReturnType<typeof buildRoadmap>) => void;
}) {
  const t = memberCopy[locale];
  const roadmap = buildRoadmap(
    data.assessment?.scores ?? null,
    data.opportunity?.results ?? [],
    String(data.assessment?.responses.industry ?? 'Your business'),
  );
  return (
    <section>
      <span className="member-kicker">{t.recommend}</span>
      <h1>{t.roadmap}</h1>
      <p>{roadmap.disclaimer}</p>
      <div className="roadmap-phases">
        {roadmap.phases.map((phase) => (
          <article key={phase.title}>
            <h2>{phase.title}</h2>
            <ul>
              {phase.items.map((x: string) => (
                <li key={x}>
                  <Check size={16} />
                  {x}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <button
        className="button primary"
        onClick={() => {
          onSave(roadmap);
          emit('roadmap_generated', { tool: 'roadmap' });
        }}
      >
        {t.generate}
      </button>
    </section>
  );
}
