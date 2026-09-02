"use client";

import {
  ArrowRight,
  Check,
  CircleAlert,
  ExternalLink,
  FileSearch,
  Gauge,
  Landmark,
  LockKeyhole,
  Map,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

type Lang = "en" | "es";

function tr(lang: Lang, en: string, es: string) {
  return lang === "es" ? es : en;
}

type SignalHeroProps = {
  lang?: Lang;
  compact?: boolean;
  withCta?: boolean;
};

export function SignalHero({ lang = "en", compact = false, withCta = false }: SignalHeroProps) {
  return (
    <div className={`signal-hero ${compact ? "signal-hero-compact" : ""}`}>
      <div className="signal-hero-copy">
        <span className="kicker"><i>00</i>{tr(lang, "Sagar Infrastructure Signal", "Sagar Infrastructure Signal")}</span>
        <h1>{tr(lang, "Public signals are not the same as", "Las señales públicas no son lo mismo que")} <em>{tr(lang, "readiness.", "la preparación.")}</em></h1>
        <p>{tr(lang, "We turn public project announcements, regulatory records and technical documents into a decision boundary: what the record supports, what it cannot support and what evidence should come next.", "Convertimos anuncios públicos, registros regulatorios y documentos técnicos en un límite de decisión: qué respalda el expediente, qué no puede respaldar y qué evidencia debe seguir.")}</p>
        {!compact && <div className="signal-hero-proof"><ShieldCheck size={15} /><span>{tr(lang, "CYCLE_013 · read-only public screening", "CYCLE_013 · screening público de solo lectura")}</span><span className="signal-proof-divider" /> <span>{tr(lang, "Human approval required", "Requiere aprobación humana")}</span></div>}
        {withCta && <div className="signal-inline-cta"><Link className="button primary" href="/contact">{tr(lang, "Bring us a decision", "Tráenos una decisión")} <ArrowRight size={15} /></Link><Link className="button ghost" href="#signal-brief">{tr(lang, "See the brief format", "Ver el formato del brief")} <ArrowRight size={15} /></Link></div>}
      </div>
      <SignalHeroGraphic lang={lang} />
    </div>
  );
}

export function SignalHeroGraphic({ lang }: { lang: Lang }) {
  return (
    <div className="signal-hero-graphic" aria-label={tr(lang, "Evidence boundary diagram", "Diagrama del límite de evidencia")}>
      <svg className="signal-connectors" viewBox="0 0 720 430" aria-hidden="true" preserveAspectRatio="none">
        <path d="M170 210 C245 210 254 210 318 210" />
        <path d="M402 210 C466 210 488 210 552 210" />
        <path d="M360 93 C360 126 360 144 360 172" />
        <path d="M360 250 C360 294 360 314 360 351" />
      </svg>
      <div className="signal-node signal-node-source">
        <div className="signal-node-icon"><Landmark size={16} /></div>
        <span className="mono-label">PUBLIC RECORD</span>
        <b>{tr(lang, "Published signal", "Señal publicada")}</b>
        <small>{tr(lang, "NRC · issuer announcement · FERC context", "NRC · anuncio del emisor · contexto FERC")}</small>
      </div>
      <div className="signal-node signal-node-gate">
        <span className="signal-node-index">01</span>
        <div className="signal-node-icon"><FileSearch size={16} /></div>
        <span className="mono-label">EVIDENCE GATE</span>
        <b>{tr(lang, "Scope before score", "Alcance antes que score")}</b>
        <small>{tr(lang, "9 sources · 0 gates satisfied", "9 fuentes · 0 gates satisfechos")}</small>
      </div>
      <div className="signal-node signal-node-decision">
        <div className="signal-status-pill"><CircleAlert size={12} /> SUPPORT LIMITED</div>
        <span className="mono-label">DECISION POSTURE</span>
        <b>{tr(lang, "Request the data room", "Pedir el data room")}</b>
        <small>{tr(lang, "Advance eligible: NO", "Elegible para avanzar: NO")}</small>
      </div>
      <div className="signal-callout signal-callout-top"><Gauge size={14} /><span>{tr(lang, "No false certainty", "Sin falsa certeza")}</span></div>
      <div className="signal-callout signal-callout-bottom"><Zap size={14} /><span>{tr(lang, "Next best evidence", "Siguiente evidencia útil")}</span></div>
    </div>
  );
}

const gateRows = [
  ["INTERCONNECTION", "NO_SUPPORT", "Agreement, approved study, point of connection and delivery conditions."],
  ["UTILITY_CAPACITY", "NO_SUPPORT", "Firm deliverable MW record, conditions, period and authority."],
  ["GRID_IMPLEMENTATION", "NO_SUPPORT", "Approved works scope, responsibilities and dependencies."],
  ["SCHEDULE", "SUPPORT_LIMITED", "Process chronology only; 2028 remains a corporate expectation."],
  ["WATER", "NO_SUPPORT", "Binding allocation, permit or contract for the site and phase."],
] as const;

const gateNextEs: Record<string, string> = {
  "Agreement, approved study, point of connection and delivery conditions.": "Acuerdo, estudio aprobado, punto de conexión y condiciones de entrega.",
  "Firm deliverable MW record, conditions, period and authority.": "Registro de MW firmes entregables, condiciones, periodo y autoridad.",
  "Approved works scope, responsibilities and dependencies.": "Alcance aprobado de obras, responsables y dependencias.",
  "Process chronology only; 2028 remains a corporate expectation.": "Sólo cronología de proceso; 2028 sigue siendo una expectativa corporativa.",
  "Binding allocation, permit or contract for the site and phase.": "Asignación, permiso o contrato vinculante para sitio y fase.",
};

export function InfrastructureSignalPage({ lang = "en" }: { lang?: Lang }) {
  return (
    <main className="signal-page">
      <section className="signal-page-hero">
        <SignalHero lang={lang} withCta />
        <div className="signal-page-cta-row">
          <Link className="button primary" href="/contact">{tr(lang, "Bring us a decision", "Tráenos una decisión")} <ArrowRight size={15} /></Link>
          <a className="button ghost" href="#signal-brief">{tr(lang, "See the brief format", "Ver el formato del brief")} <ArrowRight size={15} /></a>
        </div>
      </section>

      <section className="signal-proof-strip" aria-label="CYCLE_013 verified facts">
        <div><span className="signal-proof-label">[VERIFIED]</span><b>9</b><p>{tr(lang, "public sources indexed", "fuentes públicas indexadas")}</p></div>
        <div><span className="signal-proof-label">[VERIFIED]</span><b>0</b><p>{tr(lang, "gates satisfied", "gates satisfechos")}</p></div>
        <div><span className="signal-proof-label">[VERIFIED]</span><b>25/25</b><p>{tr(lang, "SIA contract regression", "regresión del contrato SIA")}</p></div>
        <div><span className="signal-proof-label">[VERIFIED]</span><b>NO</b><p>{tr(lang, "advance eligible", "elegible para avanzar")}</p></div>
      </section>

      <section className="signal-context-section">
        <div className="signal-section-intro">
          <span className="kicker"><i>01</i>{tr(lang, "The signal", "La señal")}</span>
          <h2>{tr(lang, "The public record can justify the next question.", "El expediente público puede justificar la siguiente pregunta.")}</h2>
          <p>{tr(lang, "CYCLE_013 screened public primary sources around the Christopher M. Crane Clean Energy Center. The result is commercially useful because it does not pretend the record says more than it does.", "CYCLE_013 revisó fuentes públicas primarias sobre el Christopher M. Crane Clean Energy Center. El resultado es útil comercialmente porque no pretende que el expediente diga más de lo que dice.")}</p>
        </div>
        <div className="signal-context-grid">
          <article className="signal-context-card signal-context-card-main"><span className="mono-label">[VERIFIED] DECISION</span><h3>{tr(lang, "Ask for a bounded technical and regulatory data room.", "Pedir un data room técnico y regulatorio acotado.")}</h3><p>{tr(lang, "Public sources support a limited request for additional evidence. They do not support approval, firm MW, energization or electrical viability.", "Las fuentes públicas respaldan una solicitud limitada de evidencia adicional. No respaldan aprobación, MW firmes, energización ni viabilidad eléctrica.")}</p></article>
          <article className="signal-context-card"><span className="mono-label">[PUBLIC SIGNAL]</span><h3>{tr(lang, "A proposed restart is a process, not an operating fact.", "Un reinicio propuesto es un proceso, no un hecho operativo.")}</h3><p>{tr(lang, "The NRC records licensing, inspection and environmental-review steps. The corporate announcement records a PPA and an expected date.", "El NRC registra pasos de licenciamiento, inspección y revisión ambiental. El anuncio corporativo registra un PPA y una fecha esperada.")}</p></article>
          <article className="signal-context-card"><span className="mono-label">[UNKNOWN]</span><h3>{tr(lang, "The decision-changing documents are still missing.", "Aún faltan los documentos que cambian la decisión.")}</h3><p>{tr(lang, "Interconnection, firm delivery, energization, network works and binding water evidence remain open.", "La interconexión, la entrega firme, la energización, las obras de red y la evidencia hídrica vinculante siguen abiertas.")}</p></article>
        </div>
      </section>

      <section className="signal-gates-section">
        <div className="signal-section-intro signal-section-intro-wide"><span className="kicker"><i>02</i>{tr(lang, "Gate ledger", "Libro de gates")}</span><h2>{tr(lang, "No gate is allowed to hide behind a headline.", "Ningún gate puede esconderse detrás de un titular.")}</h2><p>{tr(lang, "Every public claim is kept at its source boundary. If a document does not prove the gate, the gate stays open.", "Cada claim público se conserva en el límite de su fuente. Si un documento no prueba el gate, el gate permanece abierto.")}</p></div>
        <div className="signal-gate-table" role="table" aria-label={tr(lang, "CYCLE_013 gate status table", "Tabla de estado de gates CYCLE_013")}>
          <div className="signal-gate-head" role="row"><span>GATE</span><span>STATUS</span><span>{tr(lang, "NEXT PROOF", "PRUEBA SIGUIENTE")}</span></div>
          {gateRows.map(([gate, status, next]) => <div className="signal-gate-row" role="row" key={gate}><span>{gate.replaceAll("_", " ")}</span><strong className={status === "SUPPORT_LIMITED" ? "limited" : "no-support"}>{status.replaceAll("_", " ")}</strong><span>{tr(lang, next, gateNextEs[next] ?? next)}</span></div>)}
        </div>
      </section>

      <section className="signal-method-section">
        <div className="signal-section-intro"><span className="kicker"><i>03</i>{tr(lang, "The method", "El método")}</span><h2>{tr(lang, "Signals become useful when their limits stay visible.", "Las señales se vuelven útiles cuando sus límites permanecen visibles.")}</h2><p>{tr(lang, "This is the reusable communication system: signals → evidence → evaluation → decision → action.", "Este es el sistema de comunicación reutilizable: señales → evidencia → evaluación → decisión → acción.")}</p></div>
        <div className="signal-method-flow">
          {[{ icon: Map, title: tr(lang, "Signals", "Señales"), text: tr(lang, "Public announcements, filings, agency records and project documents.", "Anuncios públicos, filings, registros de agencias y documentos de proyecto.") }, { icon: FileSearch, title: tr(lang, "Evidence", "Evidencia"), text: tr(lang, "Source, date, scope, authority, limitation and evidence state.", "Fuente, fecha, alcance, autoridad, limitación y estado de evidencia.") }, { icon: Gauge, title: tr(lang, "Evaluation", "Evaluación"), text: tr(lang, "Gates, contradictions, missing proof and confidence boundary.", "Gates, contradicciones, pruebas faltantes y límite de confianza.") }, { icon: Landmark, title: tr(lang, "Decision", "Decisión"), text: tr(lang, "Advance, condition, pause, redesign or do not advance.", "Avanzar, condicionar, pausar, rediseñar o no avanzar.") }, { icon: Zap, title: tr(lang, "Action", "Acción"), text: tr(lang, "The next evidence request with a human owner.", "La siguiente solicitud de evidencia con responsable humano.") }].map(({ icon: Icon, title, text }, i) => <div className="signal-method-step" key={title}><span>0{i + 1}</span><Icon size={18} /><h3>{title}</h3><p>{text}</p>{i < 4 && <ArrowRight className="signal-method-arrow" size={15} />}</div>)}
        </div>
      </section>

      <section id="signal-brief" className="signal-brief-section">
        <div className="signal-section-intro"><span className="kicker"><i>04</i>{tr(lang, "Intelligence Brief", "Intelligence Brief")}</span><h2>{tr(lang, "A weekly signal should end in a decision question.", "Una señal semanal debe terminar en una pregunta de decisión.")}</h2><p>{tr(lang, "This editorial template is ready to reuse across AI infrastructure, power, water, land, permitting, capital and economic development.", "Esta plantilla editorial está lista para reutilizarse en infraestructura de IA, energía, agua, terrenos, permisos, capital y desarrollo económico.")}</p></div>
        <article className="signal-brief-card">
          <header><div><span className="mono-label">SAGAR INFRASTRUCTURE SIGNAL / CYCLE_013</span><h3>{tr(lang, "Public evidence can open diligence. It cannot close the gate.", "La evidencia pública puede abrir la diligencia. No puede cerrar el gate.")}</h3></div><div className="brief-status"><span>{tr(lang, "Confidence", "Confianza")}</span><b>{tr(lang, "SUPPORT LIMITED", "SOPORTE LIMITADO")}</b></div></header>
          <div className="signal-brief-grid">
            <div><span className="brief-field-label">01 / {tr(lang, "SIGNAL", "SEÑAL")}</span><p>{tr(lang, "NRC restart process and a corporate announcement with a PPA and expected 2028 date.", "Proceso de reinicio del NRC y un anuncio corporativo con PPA y fecha esperada para 2028.")}</p></div>
            <div><span className="brief-field-label">02 / {tr(lang, "WHY IT MATTERS", "POR QUÉ IMPORTA")}</span><p>{tr(lang, "A public narrative can look investable before the delivery evidence exists.", "Una narrativa pública puede parecer invertible antes de que exista la evidencia de entrega.")}</p></div>
            <div><span className="brief-field-label">03 / {tr(lang, "DECISION AFFECTED", "DECISIÓN AFECTADA")}</span><p>{tr(lang, "Whether to request a technical and regulatory data room.", "Si debe pedirse un data room técnico y regulatorio.")}</p></div>
            <div><span className="brief-field-label">04 / {tr(lang, "UNKNOWN", "DESCONOCIDO")}</span><p>{tr(lang, "Interconnection, firm MW, energization, network works and binding water evidence.", "Interconexión, MW firmes, energización, obras de red y evidencia hídrica vinculante.")}</p></div>
          </div>
          <div className="signal-brief-actions"><span><Check size={14} /> {tr(lang, "3 actions: request · verify · hold", "3 acciones: pedir · verificar · mantener")}</span><Link href="/contact">{tr(lang, "Request this format", "Solicitar este formato")} <ArrowRight size={14} /></Link></div>
        </article>
      </section>

      <section className="signal-kit-section">
        <div className="signal-section-intro"><span className="kicker"><i>05</i>{tr(lang, "Visual kit", "Kit visual")}</span><h2>{tr(lang, "One evidence posture. Five useful surfaces.", "Una postura de evidencia. Cinco superficies útiles.")}</h2><p>{tr(lang, "The same signal can become a buyer-facing brief, a LinkedIn card, an email, a web article or a lead magnet without changing its truth boundary.", "La misma señal puede convertirse en brief, tarjeta de LinkedIn, email, artículo web o lead magnet sin cambiar su límite de verdad.")}</p></div>
        <div className="signal-kit-grid">
          <div className="linkedin-card"><span className="linkedin-card-brand">SAGAR / INFRASTRUCTURE SIGNAL</span><div><span className="linkedin-card-kicker">PUBLIC SCREENING</span><h3>{tr(lang, "A headline is not a gate.", "Un titular no es un gate.")}</h3><p>{tr(lang, "Public evidence supported a bounded data-room request. Advance eligibility stayed: NO.", "La evidencia pública respaldó un pedido de data room acotado. La elegibilidad para avanzar quedó: NO.")}</p></div><footer><span>CYCLE_013 · [VERIFIED]</span><span>sagar-intelligence.com</span></footer></div>
          <div className="newsletter-card"><header><span className="newsletter-mark">S</span><div><b>Sagar Infrastructure Signal</b><span>{tr(lang, "A decision brief for the physical world", "Un brief de decisión para el mundo físico")}</span></div><span className="newsletter-date">09.01.26</span></header><div className="newsletter-rule" /><span className="mono-label">THIS WEEK / PUBLIC EVIDENCE</span><h3>{tr(lang, "What the public record supports — and what it does not.", "Lo que respalda el expediente público — y lo que no.")}</h3><p>{tr(lang, "One signal. One decision. The next evidence request.", "Una señal. Una decisión. La siguiente solicitud de evidencia.")}</p><Link href="/infrastructure-signal">{tr(lang, "Read the signal", "Leer la señal")} <ArrowRight size={14} /></Link></div>
          <div className="lead-magnet-card"><div className="lead-magnet-icon"><LockKeyhole size={18} /></div><span className="mono-label">FREE DECISION AID</span><h3>{tr(lang, "Powered-Site Readiness Checklist", "Powered-Site Readiness Checklist")}</h3><p>{tr(lang, "A practical gate list for power, land use, water/cooling, wastewater, fiber, environment and schedule.", "Una lista práctica de gates para energía, uso de suelo, agua/enfriamiento, aguas residuales, fibra, ambiente y calendario.")}</p><div className="lead-magnet-meta"><span>{tr(lang, "Public template", "Plantilla pública")}</span><span>{tr(lang, "No score", "Sin score")}</span><span>{tr(lang, "Human review", "Revisión humana")}</span></div><Link className="button ghost" href="/contact">{tr(lang, "Request the checklist", "Solicitar la checklist")} <ArrowRight size={14} /></Link></div>
        </div>
      </section>

      <section className="signal-source-section">
        <div><span className="kicker"><i>06</i>{tr(lang, "Evidence & boundary", "Evidencia y límite")}</span><h2>{tr(lang, "The source trail is part of the product.", "La trazabilidad de la fuente es parte del producto.")}</h2></div>
        <div className="signal-source-list"><a href="https://www.nrc.gov/info-finder/reactors/ccec" target="_blank" rel="noreferrer"><span><Landmark size={16} /> U.S. Nuclear Regulatory Commission</span><ExternalLink size={14} /></a><a href="https://www.constellationenergy.com/news/2024/Constellation-to-Launch-Crane-Clean-Energy-Center-Restoring-Jobs-and-Carbon-Free-Power-to-The-Grid.html" target="_blank" rel="noreferrer"><span><Zap size={16} /> Constellation public announcement</span><ExternalLink size={14} /></a><a href="https://ferc.gov/rm26-4" target="_blank" rel="noreferrer"><span><ShieldCheck size={16} /> FERC large-load context</span><ExternalLink size={14} /></a><p><ShieldCheck size={14} /> {tr(lang, "Source index accessed 2026-09-01. Public-source screening only; no external contacts or submissions.", "Índice de fuentes consultado 2026-09-01. Sólo screening público; sin contactos ni envíos externos.")}</p></div>
      </section>
    </main>
  );
}
