import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="relative rounded-xl border p-6">
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-lg border bg-primary px-3 py-0.5">
        <span className="text-xs font-medium text-background">Contacto</span>
      </div>
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-xl">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-2.5 text-center">
        <h2 className="text-xl font-bold tracking-tighter sm:text-2xl">
          ¿Hablamos?
        </h2>
        <p className="mx-auto max-w-sm text-balance text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Escríbeme por{" "}
          <Link
            href={DATA.contact.social.X.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-blue-500 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            X (@antongzx)
          </Link>{" "}
          y te respondo cuando pueda.
        </p>
      </div>
    </div>
  );
}
