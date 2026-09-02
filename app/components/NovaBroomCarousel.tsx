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
    scroller.current?.children[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
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
            <button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label="Lámina anterior"><ArrowLeft size={16} /></button>
            <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => move(1)} disabled={active === slides.length - 1} aria-label="Siguiente lámina"><ArrowRight size={16} /></button>
          </div>
        </div>

        <div className="story-carousel" ref={scroller} onScroll={updateActive} tabIndex={0} aria-label="Desliza horizontalmente para ver las siete láminas">
          {slides.map((slide) => (
            <figure className="story-slide" key={slide.number}>
              <img src={`/story/cycle-013-carousel-nova-broom/slide-${slide.number}.png`} alt={slide.alt} />
              <figcaption><span>{slide.number} / {slide.title}</span><span>SAGAR LABS · ES</span></figcaption>
            </figure>
          ))}
        </div>

        <div className="story-dots" aria-label="Seleccionar lámina">
          {slides.map((slide, index) => (
            <button type="button" key={slide.number} className={index === active ? "active" : ""} onClick={() => { setActive(index); scroller.current?.children[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" }); }} aria-label={`Ir a lámina ${slide.number}`} aria-current={index === active ? "true" : undefined} />
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
