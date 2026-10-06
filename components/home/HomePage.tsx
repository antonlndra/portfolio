"use client";

import type { ReactNode } from "react";
import { FloatingPillNav } from "@/components/home/FloatingPillNav";
import { GlassSphereRing } from "@/components/home/GlassSphereRing";

function SectionHeading({
  number,
  children,
}: {
  number: number;
  children: ReactNode;
}) {
  return (
    <h2 className="relative mb-4 text-[15px] leading-6 font-medium text-[#111111]">
      <span
        aria-hidden
        className="absolute top-0 right-[calc(100%+4px)] w-4 text-right font-normal text-[#8a8a8a] tabular-nums"
      >
        {number}
      </span>
      {children}
    </h2>
  );
}

function WorkShot({
  label,
  gradient,
}: {
  label: string;
  gradient: string;
}) {
  return (
    <div className="relative aspect-[16/10] w-[min(var(--container-content),calc(100vw-48px))] shrink-0 snap-start overflow-hidden rounded-2xl">
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div className="absolute inset-[10%] flex items-center justify-center rounded-xl bg-white/90 shadow-[0_8px_14px_rgba(24,22,15,0.18)]">
        <span className="px-4 text-center text-[14px] font-medium text-[#111111]">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white text-[#555555]">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-[#111111]"
      >
        Saltar al contenido
      </a>

      <section
        id="hero"
        className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6"
      >
        <div className="absolute inset-0 hidden sm:block">
          <GlassSphereRing count={8} radius={220} />
        </div>
        <div className="absolute inset-0 sm:hidden">
          <GlassSphereRing count={6} radius={150} />
        </div>

        <div className="relative z-10 w-[min(340px,calc(100%-32px))] text-center">
          <h1 className="mb-4 font-[family-name:var(--font-signature)] text-[42px] leading-none text-[#111111] sm:text-[48px]">
            Anto
          </h1>
          <p className="text-balance text-[clamp(14px,1.6vw,16px)] leading-[1.55] text-[#555555]">
            Diseñador. Ayudo a negocios a mejorar su funnel,
            <br className="hidden sm:block" /> su web y el contenido que vende.
          </p>
        </div>
      </section>

      <div className="relative w-full pt-16 pb-36">
        <div className="mx-auto flex w-[min(var(--container-content),calc(100%-48px))] flex-col gap-28">
          <section id="about" aria-label="1 About">
            <SectionHeading number={1}>About</SectionHeading>
            <div className="grid gap-6 text-[#555555]">
              <p>
                Soy diseñador. Ayudo a infoproductores, servicios y agencias a
                escalar su marca: adquisición, webs y piezas que se notan en el
                negocio.
              </p>
              <p>
                Llevo diseñando desde los 12 años. Me importa lo que se ve y lo
                que no se ve: el recorrido, el mensaje y la forma en que alguien
                decide escribirte.
              </p>
            </div>
          </section>

          <section id="work" aria-label="2 Selected work">
            <SectionHeading number={2}>Selected work</SectionHeading>

            <div className="grid min-w-0 gap-20">
              <article>
                <a
                  href="https://getkairo.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block"
                >
                  <h3 className="text-[15px] leading-6 font-medium text-[#111111] group-hover:underline">
                    Kairo
                  </h3>
                  <p className="text-[15px] text-[#8a8a8a]">
                    Producto vivo · 2026
                  </p>
                </a>
                <p className="mt-3 text-[#555555]">
                  Lo más reciente que sigue publicado. Una web pensada para que
                  el producto se vea claro, preciso y a la altura de lo que
                  ofrece.
                </p>

                <div
                  className="mt-6 flex w-max max-w-none items-start gap-3.5 overflow-x-auto pb-2 pl-[calc(50vw-min(224px,calc(50%-24px)))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Kairo screenshots"
                >
                  <WorkShot
                    label="getkairo.es"
                    gradient="linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 50%, #6e6e73 100%)"
                  />
                  <WorkShot
                    label="Landing"
                    gradient="linear-gradient(140deg, #0b2b3f 0%, #39d0c4 55%, #eafff4 100%)"
                  />
                  <WorkShot
                    label="Detalle"
                    gradient="linear-gradient(145deg, #111111 0%, #5d47e2 45%, #89f8fe 100%)"
                  />
                  <span className="w-[calc(50vw-84px)] shrink-0" aria-hidden />
                </div>
              </article>

              <article>
                <h3 className="text-[15px] leading-6 font-medium text-[#111111]">
                  Diseño y webs
                </h3>
                <p className="text-[15px] text-[#8a8a8a]">
                  Práctica continua
                </p>
                <p className="mt-3 text-[#555555]">
                  Diseño funnels, sitios y contenido para que un proyecto se
                  perciba premium y consiga clientes. Sin ruido: tipografía,
                  ritmo y un recorrido que se puede poner a trabajar.
                </p>
              </article>
            </div>
          </section>

          <section id="elsewhere" aria-label="3 Elsewhere">
            <SectionHeading number={3}>Elsewhere</SectionHeading>
            <p className="mb-4 text-[#555555]">
              Otros sitios donde puedes encontrarme.
            </p>
            <ul className="grid gap-3">
              <li>
                <a
                  href="https://x.com/antongzx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-2 hover:underline"
                >
                  <span className="font-medium text-[#111111]">Posts on X</span>
                  <span className="text-[#8a8a8a]">@antongzx</span>
                </a>
              </li>
              <li>
                <a
                  href="https://getkairo.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-2 hover:underline"
                >
                  <span className="font-medium text-[#111111]">Kairo</span>
                  <span className="text-[#8a8a8a]">getkairo.es</span>
                </a>
              </li>
            </ul>
          </section>

          <section id="education" aria-label="4 Education">
            <SectionHeading number={4}>Education</SectionHeading>
            <div className="grid gap-1 text-[15px]">
              <p className="font-medium text-[#111111]">
                B2 Cambridge English
              </p>
              <p className="text-[#8a8a8a]">
                First Certificate · English level
              </p>
            </div>
          </section>
        </div>
      </div>

      <FloatingPillNav />
    </main>
  );
}
