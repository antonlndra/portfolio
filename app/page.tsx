import TechText from "@/components/TechText";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-10 text-sm">
      <section id="hero">
        <div className="mx-auto w-full space-y-5">
          <BlurFade delay={BLUR_FADE_DELAY} className="w-full">
            <div className="relative h-[120px] w-full sm:h-[140px]">
              <TechText
                text="Hola, soy Anto"
                fontWeight={600}
                fontSize={72}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                color="#ffffff"
                accentColor="#ffffff"
              />
            </div>
          </BlurFade>
          <div className="flex flex-col gap-1.5">
            <BlurFadeText
              className="max-w-[28rem] text-[13px] leading-relaxed text-muted-foreground sm:text-sm"
              delay={BLUR_FADE_DELAY}
              text={DATA.description}
            />
          </div>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-base font-bold">Sobre mí</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose prose-sm max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-base font-bold">Educación</h2>
          </BlurFade>
          <div className="flex flex-col gap-5">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 6 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-x-3"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-sm font-semibold leading-none">
                      {education.school}
                      <ArrowUpRight
                        className="h-3 w-3 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                    <div className="font-sans text-xs text-muted-foreground">
                      {education.degree}
                    </div>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-base font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1.5">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                <div className="flex h-7 w-fit items-center rounded-lg border border-border bg-background px-2.5 ring-2 ring-border/20">
                  <span className="text-xs font-medium text-foreground">
                    {skill.name}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
