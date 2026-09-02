"use client";

import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";

const slides = [
  {
    number: "01",
    title: "Entrada",
    alt: "Nova y Broom revisan un expediente. Pregunta: ¿Una fecha significa que la energía ya está lista?",
  },
  {
    number: "02",
    title: "Expediente",
    alt: "CYCLE_013 revisa nueve fuentes públicas indexadas sobre Christopher M. Crane Clean Energy Center.",
  },
  {
    number: "03",
    title: "Revelación",
    alt: "La señal pública era real, pero la preparación no estaba demostrada.",
  },
  {
    number: "04",
    title: "Gates",
    alt: "Cinco gates: interconexión, capacidad eléctrica, implementación de red, calendario y agua; sólo el calendario tiene soporte limitado.",
  },
  {
    number: "05",
    title: "Confusión",
    alt: "Una PPA y una fecha esperada son una señal pública; entrega firme y energización siguen como UNKNOWN.",
  },
  {
    number: "06",
    title: "Decisión",
    alt: "La decisión es no avanzar todavía: pedir, verificar y mantener abierto el gate.",
  },
  {
    number: "07",
    title: "Acción",
    alt: "El siguiente documento es el producto. Nova pide el documento que cambiaría la decisión y Broom pide la prueba.",
  },
];

export function NovaBroomCarousel() {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const next = Math.min(slides.length - 1, Math.max(0, active + direction));
    setActive(next);
    const container = scroller.current;
    const first = container?.firstElementChild as HTMLElement | null;
    if (container && first) container.scrollTo({ left: next * (first.offsetWidth + 22), behavior: "smooth" });
  }

  function updateActive() {
    const container = scroller.current;
    const first = container?.firstElementChild as HTMLElement | null;
    if (!container || !first) return;
    const step = first.offsetWidth + 22;
    setActive(Math.min(slides.length - 1, Math.max(0, Math.round(container.scrollLeft / step))));
  }

  return (
    <main className="story-page">
      <section className="story-hero">
        <div>
          <span className="mono-label">SAGAR / SEÑAL DE INFRAESTRUCTURA</span>
          <h1>CYCLE_013: <em>Nova y Broom</em></h1>
          <p>Una historia de evidencia antes de preparación. Desliza para seguir el expediente y llegar a la decisión.</p>
          <div className="story-proof"><ShieldCheck size={15} /> CYCLE_013 · revisión humana obligatoria</div>
        </div>
        <div className="story-hero-aside">
          <span className="mono-label">THE DECISION QUESTION</span>
          <strong>¿Una fecha significa que la energía ya está lista?</strong>
          <span>El diálogo es recurso narrativo. El expediente conserva el control de la historia.</span>
        </div>
      </section>

      <section className="story-carousel-section" aria-label="Carrusel de la historia de Nova y Broom">
        <div className="story-carousel-head">
          <div>
            <span className="mono-label">HISTORIA VISUAL / 07 LÁMINAS</span>
            <h2>Una señal puede abrir la puerta.<br /><em>La evidencia decide si cruzarla.</em></h2>
          </div>
          <div className="story-controls" aria-label="Controles del carrusel">
            <a className={active === 0 ? "disabled" : ""} href={active === 0 ? "#story-carousel" : `#story-slide-${String(active).padStart(2, "0")}`} onClick={() => { if (active > 0) move(-1); }} aria-label="Lámina anterior" aria-disabled={active === 0}><ArrowLeft size={16} /></a>
            <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
            <a className={active === slides.length - 1 ? "disabled" : ""} href={active === slides.length - 1 ? "#story-carousel" : `#story-slide-${String(active + 2).padStart(2, "0")}`} onClick={() => { if (active < slides.length - 1) move(1); }} aria-label="Siguiente lámina" aria-disabled={active === slides.length - 1}><ArrowRight size={16} /></a>
          </div>
        </div>

        <div className="story-carousel" id="story-carousel" ref={scroller} onScroll={updateActive} tabIndex={0} aria-label="Desliza horizontalmente para ver las siete láminas">
          {slides.map((slide, index) => (
            <figure className="story-slide" id={`story-slide-${slide.number}`} key={slide.number}>
              <img src={`/story/cycle-013-carousel-nova-broom/slide-${slide.number}.png`} alt={slide.alt} />
              <figcaption><span>{slide.number} / {slide.title}</span><span>SAGAR LABS · ES</span></figcaption>
              <nav className="story-slide-actions" aria-label={`Navegar desde lámina ${slide.number}`}>
                {index > 0 ? <a href={`#story-slide-${String(index).padStart(2, "0")}`} onClick={() => setActive(index - 1)}><ArrowLeft size={13} /> Anterior</a> : <span />}
                {index < slides.length - 1 ? <a href={`#story-slide-${String(index + 2).padStart(2, "0")}`} onClick={() => setActive(index + 1)}>Siguiente <ArrowRight size={13} /></a> : <span />}
              </nav>
            </figure>
          ))}
        </div>

        <div className="story-dots" aria-label="Seleccionar lámina">
          {slides.map((slide, index) => (
            <a href={`#story-slide-${slide.number}`} key={slide.number} className={index === active ? "active" : ""} onClick={() => { setActive(index); const container = scroller.current; const first = container?.firstElementChild as HTMLElement | null; if (container && first) container.scrollTo({ left: index * (first.offsetWidth + 22), behavior: "smooth" }); }} aria-label={`Ir a lámina ${slide.number}`} aria-current={index === active ? "true" : undefined} />
          ))}
        </div>
      </section>

      <section className="story-note">
        <span className="mono-label">ESTADO DE PUBLICACIÓN</span>
        <p>Vista privada para revisión. No es una cita de NRC, Constellation, FERC ni de ninguna persona real. Los estados de evidencia permanecen etiquetados dentro de cada lámina.</p>
      </section>
    </main>
  );
}
