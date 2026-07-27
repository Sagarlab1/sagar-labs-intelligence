"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Atom, Bot, Building2, Check, ChevronRight, CircleDot,
  Database, Droplets, Menu, Mountain, Network,
  Power, Search, Send, ShieldCheck, Sparkles, X, Zap,
} from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";

const Globe = lazy(() => import("./Globe").then(module => ({ default: module.Globe })));

type Product = {
  slug: string; name: string; label: string; description: string;
  icon: typeof Database; capabilities: string[]; outcome: string;
};

const products: Product[] = [
  { slug: "sagar-intelligence", name: "Sagar Intelligence", label: "Core platform", icon: Network, description: "Evidence-backed project, capital and institutional intelligence for complex infrastructure decisions.", capabilities: ["Project and institution graph", "Evidence ledger", "Decision workflows"], outcome: "Turn fragmented public and institutional information into governed decisions." },
  { slug: "data-center-intelligence", name: "Data Center Intelligence", label: "Infrastructure", icon: Database, description: "Site, power, water, interconnection and delivery intelligence for AI infrastructure.", capabilities: ["Site readiness", "Grid and water constraints", "Project risk signals"], outcome: "Reduce uncertainty before site selection, investment and development." },
  { slug: "project-capital-intelligence", name: "Project & Capital Intelligence", label: "Capital projects", icon: Building2, description: "A traceable operating picture across projects, institutions, capital and commercial pathways.", capabilities: ["Opportunity discovery", "Capital matching", "Decision rooms"], outcome: "Move from scattered diligence to a reusable evidence system." },
  { slug: "lithium-intelligence", name: "Lithium Intelligence", label: "Strategic materials", icon: Mountain, description: "Process and research intelligence for lithium and critical-mineral decisions.", capabilities: ["Synthetic simulation", "Process observability", "Scientific validation records"], outcome: "Improve technical decisions while keeping simulated and verified evidence separate." },
  { slug: "water-intelligence", name: "Water Intelligence", label: "Resource systems", icon: Droplets, description: "Decision intelligence for water availability, infrastructure constraints and project exposure.", capabilities: ["Capacity evidence", "Constraint mapping", "Scenario review"], outcome: "Surface water risk early enough to change a project decision." },
  { slug: "energy-intelligence", name: "Energy Intelligence", label: "Power systems", icon: Power, description: "Grid, generation and infrastructure evidence connected to project and capital decisions.", capabilities: ["Grid readiness", "Interconnection signals", "Energy project graph"], outcome: "Make energy dependencies visible before they become schedule or capital risk." },
  { slug: "ai-agents", name: "AI Agents", label: "Governed execution", icon: Bot, description: "Domain agents with memory, tools, approvals and audit trails for high-consequence workflows.", capabilities: ["Human approval gates", "Traceable memory", "Tool and workflow governance"], outcome: "Increase safe automation without creating an unaccountable decision-maker." },
  { slug: "research-labs", name: "Research Labs", label: "Long horizon", icon: Atom, description: "An evidence-bounded pipeline connecting scientific inquiry, technologies and future ventures.", capabilities: ["Research intake", "Evidence verification", "Finding and learning loops"], outcome: "Convert operating knowledge into disciplined, reusable research." },
];

const nodes = ["Companies", "Projects", "Documents", "People", "Technologies", "Locations", "Investors", "Events"];
const phases = [
  ["01", "Foundation", "Canonical evidence, first paid wedge and governed workflows."],
  ["02", "Scale", "Multi-tenant intelligence, embedded customer workflows and compounding data."],
  ["03", "Venture Studio", "New companies created only after buyer and evidence gates are met."],
  ["04", "Research Labs", "Operating profits support validated scientific research."],
  ["05", "Monterrico Institute", "Long-term institutional research for humanity’s infrastructure challenges."],
];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>;
}

function Header({ menu, setMenu }: { menu: boolean; setMenu: (v: boolean) => void }) {
  const links = [["Intelligence", "/#products"], ["Ecosystem", "/#ecosystem"], ["Company", "/about"], ["Investors", "/investors"]];
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Sagar Intelligence home"><BrandMark /><span>SAGAR <b>INTELLIGENCE</b></span></a>
      <nav className="desktop-nav" aria-label="Primary">
        {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
      <a className="header-cta" href="/contact">Request demo <ArrowRight size={15} /></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Open navigation" aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
      <AnimatePresence>
        {menu && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)}>{label}<ChevronRight /></a>)}
          <a href="/contact">Request demo<ArrowRight /></a>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div><a className="brand" href="/"><BrandMark /><span>SAGAR <b>INTELLIGENCE</b></span></a><p>Decision intelligence for critical infrastructure and strategic technologies.</p></div>
      <div><span>Explore</span><a href="/#products">Products</a><a href="/investors">Investors</a><a href="/about">Company</a></div>
      <div><span>Connect</span><a href="/contact">Request demo</a><a href="mailto:sagarlabsss@gmail.com">Email</a><a href="/privacy">Privacy</a></div>
      <small>© 2026 Sagar Intelligence. Human-governed AI.</small>
    </footer>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Home() {
  return <main>
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-copy">
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}><Sparkles size={14} /> Intelligence for the physical world</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
          Building Intelligence for Humanity’s Greatest <em>Infrastructure Challenges</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>Sagar Intelligence transforms complex documents, projects and data into strategic decisions through specialized, evidence-governed artificial intelligence.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>
          <a className="button primary" href="#products">Explore intelligence <ArrowRight /></a>
          <a className="button secondary" href="/contact">Request demo</a>
        </motion.div>
        <div className="trust-line"><ShieldCheck /> Evidence-backed <span /> Human-governed <span /> Built for consequential decisions</div>
      </div>
      <div className="hero-visual"><Suspense fallback={<div className="globe globe-loading" aria-hidden="true" />}><Globe /></Suspense><div className="signal-card signal-card-a"><CircleDot /> Live evidence graph<small>Entities · sources · decisions</small></div><div className="signal-card signal-card-b"><Zap /> Intelligence compounds<small>Every governed workflow</small></div></div>
      <div className="scroll-cue">Scroll to enter <i /></div>
    </section>

    <section className="manifesto">
      <Reveal><span className="section-index">01 / THE THESIS</span><h2>Infrastructure runs the world.<br /><strong>Intelligence should run with it.</strong></h2><p>Critical decisions still live across disconnected documents, opaque relationships and untraceable assumptions. We are building the intelligence layer that makes those systems legible, evidence-backed and actionable.</p></Reveal>
    </section>

    <section className="products-section" id="products">
      <Reveal className="section-heading"><div><span className="section-index">02 / INTELLIGENCE SYSTEMS</span><h2>One intelligence core.<br />Multiple critical domains.</h2></div><p>Each system shares governed evidence, memory and workflows. Knowledge compounds across the platform without collapsing domain boundaries.</p></Reveal>
      <div className="product-grid">
        {products.map((product, i) => {
          const Icon = product.icon;
          return <Reveal key={product.slug} className={`product-card pc-${i % 4}`}>
            <a href={`/intelligence/${product.slug}`}>
              <div className="product-top"><span>{String(i + 1).padStart(2, "0")}</span><Icon /></div>
              <small>{product.label}</small><h3>{product.name}</h3><p>{product.description}</p>
              <div className="card-link">Enter system <ArrowRight /></div>
            </a>
          </Reveal>;
        })}
      </div>
    </section>

    <section className="graph-section" id="ecosystem">
      <Reveal className="graph-copy"><span className="section-index">03 / COMPOUNDING KNOWLEDGE</span><h2>The system gets smarter with every governed connection.</h2><p>Projects connect to companies. Companies connect to people. Documents connect to evidence. Evidence connects to decisions. The result is an institutional memory that can be inspected, challenged and reused.</p><a href="/intelligence/sagar-intelligence">Explore the core platform <ArrowRight /></a></Reveal>
      <Reveal className="knowledge-graph">
        <div className="graph-core"><BrandMark /><b>SAGAR</b><small>KNOWLEDGE CORE</small></div>
        {nodes.map((node, i) => <div key={node} className={`graph-node node-${i}`}><span>{node}</span><i /></div>)}
        <div className="graph-ring ring-a" /><div className="graph-ring ring-b" />
      </Reveal>
    </section>

    <section className="agents-section">
      <Reveal className="section-heading"><div><span className="section-index">04 / AI AGENTS</span><h2>Agents that reason.<br />Governance that remains.</h2></div><p>Domain agents retrieve evidence, analyze uncertainty and prepare action—while approvals, source boundaries and auditability remain explicit.</p></Reveal>
      <div className="agent-flow">
        {[
          [Search, "Observe", "Retrieve sources and detect decision signals."],
          [Network, "Connect", "Resolve entities and relationships."],
          [Bot, "Reason", "Compare evidence, gaps and consequences."],
          [ShieldCheck, "Govern", "Apply permissions and human approval gates."],
          [Sparkles, "Learn", "Store reusable outcomes and provenance."],
        ].map(([Icon, title, text], i) => {
          const AgentIcon = Icon as typeof Search;
          return <Reveal className="agent-step" key={title as string}><span>{i + 1}</span><AgentIcon /><h3>{title as string}</h3><p>{text as string}</p>{i < 4 && <ArrowRight className="flow-arrow" />}</Reveal>;
        })}
      </div>
    </section>

    <section className="roadmap-section">
      <Reveal><span className="section-index">05 / LONG HORIZON</span><h2>A company designed to compound for decades.</h2></Reveal>
      <div className="timeline">{phases.map(([n, title, text], i) => <Reveal className="phase" key={n}><span>{n}</span><div><small>Phase {i + 1}</small><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div>
    </section>

    <section className="research-cycle">
      <Reveal className="cycle-copy"><span className="section-index">06 / RESEARCH FLYWHEEL</span><h2>Intelligence today.<br />Scientific capacity tomorrow.</h2><p>Our long-term thesis is a disciplined loop: operating profits support research; validated research creates technologies; technologies may create new ventures; successful ventures expand the capacity to research.</p><small>[HYPOTHESIS] This is a long-term strategic model, not a current financial claim.</small></Reveal>
      <Reveal className="tree">
        <div className="tree-item roots"><b>ROOTS</b><span>Knowledge</span></div>
        <div className="tree-line" />
        <div className="tree-item trunk"><b>TRUNK</b><span>Sagar Intelligence</span></div>
        <div className="branches">
          <div><b>VENTURES</b><span>New companies</span></div><div><b>TECHNOLOGIES</b><span>Validated systems</span></div><div><b>RESEARCH</b><span>New questions</span></div>
        </div>
      </Reveal>
    </section>

    <section className="venture-section">
      <Reveal><span className="section-index">07 / VENTURE STUDIO</span><h2>Future intelligence companies,<br />created from validated knowledge.</h2><p>New verticals advance only after a painful decision, credible buyer and evidence gate are established.</p></Reveal>
      <div className="venture-marquee"><div>{["Lithium", "Energy", "Water", "Healthcare", "Industrial", "Climate"].map(v => <span key={v}>{v} <i>Intelligence</i><CircleDot /></span>)}</div></div>
    </section>

    <section className="final-cta"><Reveal><BrandMark /><span>THE NEXT INTELLIGENCE LAYER</span><h2>The physical world is becoming more complex.<br /><em>Its decisions can become more intelligent.</em></h2><a className="button primary" href="/contact">Start a conversation <ArrowRight /></a></Reveal></section>
  </main>;
}

function ProductPage({ product }: { product: Product }) {
  const Icon = product.icon;
  return <main>
    <section className="sub-hero">
      <div className="breadcrumb"><a href="/">Home</a><ChevronRight />Intelligence<ChevronRight />{product.name}</div>
      <div className="sub-icon"><Icon /></div><span className="eyebrow">{product.label}</span><h1>{product.name}</h1><p>{product.description}</p>
      <div className="hero-actions"><a className="button primary" href="/contact">Request a briefing <ArrowRight /></a><a className="button secondary" href="/#products">View all systems</a></div>
    </section>
    <section className="detail-grid">
      <Reveal><span className="section-index">THE DECISION</span><h2>{product.outcome}</h2></Reveal>
      <div className="capabilities">{product.capabilities.map((c, i) => <Reveal className="capability" key={c}><span>0{i + 1}</span><Check /><h3>{c}</h3><p>Designed around traceable sources, explicit uncertainty and reusable institutional knowledge.</p></Reveal>)}</div>
    </section>
    <section className="system-flow"><Reveal><span className="section-index">HOW IT WORKS</span><h2>Evidence enters. Decisions improve. Knowledge remains.</h2></Reveal><div>{["Ingest", "Verify", "Connect", "Analyze", "Decide", "Learn"].map((s, i) => <span key={s}><b>{String(i + 1).padStart(2, "0")}</b>{s}{i < 5 && <ArrowRight />}</span>)}</div></section>
    <section className="final-cta compact"><Reveal><h2>Bring your hardest {product.label.toLowerCase()} decision.</h2><p>We’ll identify the missing evidence, cost of being wrong and the smallest useful intelligence workflow.</p><a className="button primary" href="/contact">Request demo <ArrowRight /></a></Reveal></section>
  </main>;
}

function Investors() {
  const blocks = [
    ["Market", "Critical infrastructure teams face growing complexity across capital, energy, water, permitting and delivery."],
    ["Business model", "Enterprise software, intelligence subscriptions, paid decision briefs and service-assisted workflows."],
    ["Competitive advantage", "Evidence history, embedded workflows, domain knowledge and governed institutional memory."],
    ["Use of capital", "Product hardening, verified data, enterprise delivery, security and focused customer acquisition."],
    ["Intellectual property", "[UNKNOWN] No public patent portfolio is claimed. Defensibility currently rests on systems, data and workflow knowledge."],
    ["20-year vision", "A global, auditable network of domain agents and proprietary knowledge graphs for high-consequence decisions."],
  ];
  return <main><section className="sub-hero investor-hero"><span className="eyebrow">Investor intelligence</span><h1>Building a compounding intelligence company for the physical world.</h1><p>Sagar Intelligence is designed to become trusted decision infrastructure: proprietary evidence, embedded workflows and governed AI for critical projects.</p><a className="button primary" href="/contact?type=investor">Request investor briefing <ArrowRight /></a></section>
    <section className="market-model"><Reveal><span className="section-index">MARKET MODEL</span><h2>Market sizing is a diligence workflow—not a decorative number.</h2><p>We do not publish unsupported TAM, SAM or SOM figures. The investor data room will show sources, assumptions, inclusion rules and scenario sensitivity.</p></Reveal><div className="market-circles"><div><b>TAM</b><span>[UNKNOWN]</span><small>Global decision intelligence opportunity</small></div><div><b>SAM</b><span>[UNKNOWN]</span><small>Reachable infrastructure segments</small></div><div><b>SOM</b><span>[UNKNOWN]</span><small>Validated near-term wedge</small></div></div></section>
    <section className="investor-grid">{blocks.map(([title, text]) => <Reveal className="investor-card" key={title}><small>INVESTOR LENS</small><h2>{title}</h2><p>{text}</p></Reveal>)}</section>
    <section className="final-cta compact"><Reveal><h2>Request the evidence-backed investment narrative.</h2><a className="button primary" href="/contact?type=investor">Open investor conversation <ArrowRight /></a></Reveal></section>
  </main>;
}

function About() {
  return <main><section className="sub-hero about-hero"><span className="eyebrow">Company</span><h1>Intelligence in service of consequential human decisions.</h1><p>Sagar Intelligence is the core commercial intelligence product of Sagar Labs, a Decision Intelligence company focused on critical infrastructure and strategic technologies.</p></section>
    <section className="values"><Reveal><span className="section-index">MISSION</span><h2>Convert fragmented, difficult-to-verify information into evidence-backed decisions, workflows and measurable outcomes.</h2></Reveal>
    <div>{[["Evidence before confidence", "Material claims require provenance. Inference is never presented as fact."],["Human governance", "AI prepares and supports action; consequential external effects retain approval."],["Compounding knowledge", "Every governed workflow should leave the institution more capable."],["Narrow before broad", "We earn expansion through customer outcomes, retention and validated economics."]].map(([t,p])=><Reveal className="value-card" key={t}><CircleDot /><h3>{t}</h3><p>{p}</p></Reveal>)}</div></section>
    <section className="about-vision"><Reveal><span className="section-index">THE FUTURE</span><h2>From project intelligence to institutional decision infrastructure.</h2><p>Our horizon extends from a focused paid wedge today to governed global intelligence systems—and, over time, scientific research through Monterrico Institute.</p></Reveal></section>
  </main>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Sagar Intelligence — ${data.get("interest")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\n\nDecision:\n${data.get("decision")}`);
    setSent(true);
    window.location.href = `mailto:sagarlabsss@gmail.com?subject=${subject}&body=${body}`;
  }
  return <main><section className="contact-page"><div className="contact-copy"><span className="eyebrow">Start a conversation</span><h1>Bring us a decision that matters.</h1><p>Tell us what must be decided, the cost of being wrong and what evidence is missing. We’ll respond with the smallest useful next step.</p><div className="direct-contact"><span>Email</span><a href="mailto:sagarlabsss@gmail.com">sagarlabsss@gmail.com</a><small>For demos, partnerships and investor conversations.</small></div></div>
    <form onSubmit={submit}><label>Name<input name="name" required autoComplete="name" /></label><label>Work email<input name="email" type="email" required autoComplete="email" /></label><label>Company<input name="company" required autoComplete="organization" /></label><label>Area of interest<select name="interest"><option>Infrastructure intelligence</option><option>Data center intelligence</option><option>Project & capital intelligence</option><option>Lithium intelligence</option><option>AI agents</option><option>Investor briefing</option><option>Research partnership</option></select></label><label>What decision are you trying to make?<textarea name="decision" required rows={5} /></label><button className="button primary" type="submit">Send request <Send /></button>{sent && <p className="form-note">Your email application is opening with the completed request. If it does not open, email us directly.</p>}<small>By sending this request, you agree that Sagar Intelligence may use the information to respond. Do not include confidential data.</small></form></section></main>;
}

function Legal({ privacy = false }: { privacy?: boolean }) {
  return <main><section className="legal"><span className="eyebrow">{privacy ? "Privacy" : "Terms"}</span><h1>{privacy ? "Privacy principles" : "Terms of use"}</h1><p>Last updated: July 2026</p><h2>{privacy ? "Information you provide" : "Informational purpose"}</h2><p>{privacy ? "Contact requests are transmitted through your email application to Sagar Intelligence. Do not submit confidential, regulated or sensitive personal information through this public form." : "This website describes Sagar Intelligence’s products, direction and long-term vision. It is not legal, financial, engineering or investment advice."}</p><h2>Evidence and uncertainty</h2><p>Forward-looking statements are strategic hypotheses, not guarantees. Unknown or unverified claims are labeled where material.</p><h2>Contact</h2><p><a href="mailto:sagarlabsss@gmail.com">sagarlabsss@gmail.com</a></p></section></main>;
}

export function Experience({ initialPath = "/" }: { initialPath?: string }) {
  const [menu, setMenu] = useState(false);
  const path = initialPath.replace(/\/$/, "") || "/";
  const page = useMemo(() => {
    if (path.startsWith("/intelligence/")) {
      const slug = path.split("/").pop();
      const product = products.find(p => p.slug === slug);
      return product ? <ProductPage product={product} /> : <Home />;
    }
    if (path === "/investors") return <Investors />;
    if (path === "/about") return <About />;
    if (path === "/contact") return <Contact />;
    if (path === "/privacy") return <Legal privacy />;
    if (path === "/terms") return <Legal />;
    return <Home />;
  }, [path]);
  useEffect(() => { window.scrollTo(0, 0); }, [path]);
  return <><Header menu={menu} setMenu={setMenu} />{page}<Footer /></>;
}
