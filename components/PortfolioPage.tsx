"use client";

import { useEffect, type MouseEvent } from "react";
import { initSiteTheme } from "@/lib/siteTheme";
import { FigmaFrame, DEFAULT_FRAME } from "@/components/svg-editor/FigmaFrame";
import { WordStickersLayer } from "@/components/word-stickers/WordStickersLayer";
import FolderFloat from "@/components/folder-float/FolderFloat";
import { PaperLetter } from "@/components/letter/PaperLetter";
import { ContactGooglyButton } from "@/components/contact/ContactGooglyButton";
import { DayNightToggle } from "@/components/theme/DayNightToggle";
import Gravity, { MatterBody } from "@/components/fancy/physics/gravity";

const FOOTER_H = 220;

const PILLS: {
  label: string;
  bg: string;
  x: string;
  y: string;
  angle?: number;
}[] = [
  { label: "estilo", bg: "#0015ff", x: "18%", y: "8%", angle: -12 },
  { label: "diseño web", bg: "#e794da", x: "48%", y: "4%", angle: 8 },
  { label: "identidad de marca", bg: "#1f464d", x: "72%", y: "10%", angle: -6 },
  { label: "ayuda a agencias", bg: "#ff5941", x: "30%", y: "16%", angle: 10 },
  { label: "ayuda a servicios", bg: "#f97316", x: "58%", y: "14%", angle: -4 },
  { label: "diseño de páginas", bg: "#ffd726", x: "82%", y: "18%", angle: 7 },
  { label: "funnels", bg: "#0d9488", x: "12%", y: "22%", angle: 5 },
  { label: "estrategia", bg: "#7c3aed", x: "42%", y: "20%", angle: -8 },
];

const PILL_BODY = {
  friction: 0.45,
  frictionAir: 0.016,
  restitution: 0.48,
  density: 0.0015,
  chamfer: { radius: 22 },
};

function NotionNote() {
  return (
    <article
      className="w-full px-6 py-10 sm:px-10 sm:py-12"
      style={{
        background: "var(--note-bg)",
        color: "var(--note-ink)",
        boxShadow: "0 1px 0 rgba(0,0,0,0.03), 0 18px 50px rgba(40,30,20,0.08)",
        border: "1px solid rgba(0,0,0,0.04)",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 12,
        lineHeight: 1.65,
      }}
    >
      <p
        style={{
          margin: "0 0 1.85em",
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        Hola, soy{" "}
        <FigmaFrame
          style={{
            ...DEFAULT_FRAME,
            handleSize: 6,
            borderWidth: 1.5,
            showBadge: true,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "0 2px",
              fontSize: 18,
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--note-ink)",
              verticalAlign: "baseline",
            }}
          >
            Anto
          </span>
        </FigmaFrame>
      </p>
      <p style={{ margin: "0 0 1.1em", color: "var(--note-muted)" }}>
        Soy un diseñador y además ayudo a infoproductores, servicios y agencias a
        escalar su marca
      </p>
      <p style={{ margin: "0 0 1.1em" }}>
        Llevo diseñando desde que tenía 12 años, tengo pasión por el diseño de lo
        que se ve, y no se ve
      </p>
      <p style={{ margin: "0 0 1.1em" }}>
        Mis redes sociales son:{" "}
        <a
          href="https://x.com/antongzx"
          target="_blank"
          rel="noopener noreferrer"
        >
          x.com/antongzx
        </a>
      </p>
      <p style={{ margin: "0 0 0.4em", fontWeight: 600 }}>Trabajos recientes:</p>
      <p style={{ margin: 0 }}>Kairo (2026)</p>

      <div id="contact" className="mt-8 flex flex-wrap items-center gap-4">
        <ContactGooglyButton />
      </div>
    </article>
  );
}

function FooterLinks() {
  const scrollToContact = (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <ul
      className="pointer-events-auto space-y-1 text-right text-sm sm:text-base"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <li>
        <a
          href="#contact"
          onClick={scrollToContact}
          className="cursor-pointer hover:underline"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Get in touch
        </a>
      </li>
      <li>
        <a
          href="https://x.com/antongzx"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          X
        </a>
      </li>
    </ul>
  );
}

export default function PortfolioPage() {
  useEffect(() => {
    initSiteTheme();
  }, []);

  // How much of the folder dips under the fixed footer (label stays above)
  const folderDip = 52;

  return (
    <div className="relative w-full" style={{ background: "var(--background)" }}>
      <div className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6">
        <DayNightToggle />
      </div>

      <div
        className="relative z-10 w-full"
        style={{
          background: "var(--background)",
          overflow: "visible",
          // Keep note + paper fully above the fixed footer
          paddingBottom: FOOTER_H + 24,
          minHeight: "100vh",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20"
          style={{ height: 220, overflow: "visible" }}
        >
          <div
            className="pointer-events-auto mx-auto h-full w-full max-w-[1000px]"
            style={{ overflow: "visible" }}
          >
            <WordStickersLayer overflowVisible />
          </div>
        </div>

        <div
          className="relative z-10 mx-auto w-full max-w-[600px] px-4 sm:px-6"
          style={{ paddingTop: 160, overflow: "visible" }}
        >
          <NotionNote />
        </div>

        <div
          className="relative z-10 mx-auto mt-14 flex w-full max-w-[980px] items-end justify-between gap-8 px-6 sm:mt-16 sm:px-10"
          style={{ overflow: "visible" }}
        >
          <PaperLetter />
        </div>
      </div>

      {/* Folder under footer in z-order; dipped so ~half is clipped, label visible */}
      <div
        className="pointer-events-auto absolute right-0 left-0 z-[5] mx-auto flex w-full max-w-[980px] justify-end px-6 sm:px-10"
        style={{
          bottom: FOOTER_H - folderDip,
        }}
      >
        <FolderFloat
          label="¿Qué obtengo con tu servicio?"
          items={[
            "webs MUY guapas",
            "diseños adaptados a TI",
            "acompañamiento 1a1",
          ]}
          trigger="hover"
          physics
          closeOnSelect={false}
          width={210}
          height={156}
          spread={180}
          lift={32}
          folderColor="#1F8AE8"
          frontColor="#5AC8FA"
          paperColor="#E8F6FF"
          itemColor="#FFFFFF"
          itemTextColor="#003A66"
          labelColor="#FFFFFF"
        />
      </div>

      <footer
        className="fixed bottom-0 left-0 right-0 z-20 w-full"
        style={{
          height: FOOTER_H,
          background: "var(--note-bg)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <h2
            className="pointer-events-none absolute bottom-2 left-4 z-[1] select-none whitespace-nowrap sm:bottom-3 sm:left-8"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(64px, 14vw, 140px)",
              lineHeight: 0.9,
              color: "var(--note-ink)",
              margin: 0,
              opacity: 0.94,
              letterSpacing: "-0.04em",
            }}
          >
            anto
          </h2>

          <div className="absolute top-0 right-0 h-full w-[52%] sm:w-[48%]">
            <Gravity
              gravity={{ x: 0, y: 1 }}
              autoStart
              className="absolute inset-0 h-full w-full"
            >
              {PILLS.map((p) => (
                <MatterBody
                  key={p.label}
                  matterBodyOptions={PILL_BODY}
                  x={p.x}
                  y={p.y}
                  angle={p.angle ?? 0}
                >
                  <div
                    className="rounded-full px-4 py-2 text-sm whitespace-nowrap text-white sm:px-5 sm:py-2.5 sm:text-base"
                    style={{
                      background: p.bg,
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontWeight: 600,
                      cursor: "grab",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                    }}
                  >
                    {p.label}
                  </div>
                </MatterBody>
              ))}
            </Gravity>
          </div>

          <div
            className="pointer-events-none absolute top-0 right-0 z-10 px-6 py-5 sm:px-10 sm:py-6"
            style={{ color: "var(--note-ink)" }}
          >
            <FooterLinks />
          </div>
        </div>
      </footer>
    </div>
  );
}
