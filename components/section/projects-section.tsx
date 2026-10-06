import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={BLUR_FADE_DELAY * 9}>
        <h2 className="text-base font-bold">Trabajo reciente</h2>
      </BlurFade>
      <div className="flex flex-col gap-5">
        {DATA.projects.map((project, index) => {
          const isExternal = project.href.startsWith("http");

          const content = (
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-sm font-semibold leading-none">
                {project.title}
                {isExternal ? (
                  <ArrowUpRight
                    className="h-3 w-3 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="font-sans text-xs text-muted-foreground">
                {project.technologies.join(" · ")}
              </div>
            </div>
          );

          return (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 10 + index * 0.05}
            >
              {isExternal ? (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-x-3"
                >
                  {content}
                </Link>
              ) : (
                <div className="flex items-center justify-between gap-x-3">
                  {content}
                </div>
              )}
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
