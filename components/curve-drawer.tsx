"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

import {
  CurveDrawer,
  CurveDrawerClose,
  CurveDrawerContent,
  CurveDrawerDescription,
  CurveDrawerHeader,
  CurveDrawerTitle,
  CurveDrawerTrigger,
} from "./curve-drawer-primitives";

export type CurveDrawerImage = {
  src: string;
  alt: string;
};

type ProjectCurveDrawerProps = {
  title: string;
  description?: string;
  images: CurveDrawerImage[];
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/** Right-side curve drawer that shows project images in full (object-contain). */
export function ProjectCurveDrawer({
  title,
  description,
  images,
  children,
  open,
  onOpenChange,
}: ProjectCurveDrawerProps) {
  return (
    <CurveDrawer
      direction="right"
      handleOnly
      open={open}
      onOpenChange={onOpenChange}
    >
      <CurveDrawerTrigger asChild>{children}</CurveDrawerTrigger>
      <CurveDrawerContent curveSide="right" className="w-[min(100vw,42rem)] sm:max-w-[42rem]">
        <CurveDrawerHeader className="flex-row items-start justify-between gap-4 border-b border-border">
          <div className="min-w-0">
            <CurveDrawerTitle>{title}</CurveDrawerTitle>
            {description ? (
              <CurveDrawerDescription>{description}</CurveDrawerDescription>
            ) : (
              <CurveDrawerDescription>
                Imágenes del proyecto
              </CurveDrawerDescription>
            )}
          </div>
          <CurveDrawerClose asChild>
            <button
              aria-label={`Cerrar ${title}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "shrink-0",
              )}
              type="button"
            >
              <X aria-hidden="true" />
            </button>
          </CurveDrawerClose>
        </CurveDrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
          <ul className="flex flex-col gap-3">
            {images.map((image) => (
              <li
                key={image.src}
                className="overflow-hidden rounded-xl bg-muted/40 ring-1 ring-border"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1600}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, 42rem"
                  className="h-auto w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </CurveDrawerContent>
    </CurveDrawer>
  );
}

export {
  CurveDrawer,
  CurveDrawerClose,
  CurveDrawerContent,
  CurveDrawerDescription,
  CurveDrawerHeader,
  CurveDrawerTitle,
  CurveDrawerTrigger,
} from "./curve-drawer-primitives";

export { ProjectCurveDrawer as default };
