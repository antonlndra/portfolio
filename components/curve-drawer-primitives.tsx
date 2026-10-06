"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

type CurveSide = "left" | "right";

type CurveDrawerContextValue = {
  direction: CurveSide;
  open: boolean;
};

const CurveDrawerContext = React.createContext<CurveDrawerContextValue>({
  direction: "right",
  open: false,
});

function useCurveDrawer() {
  return React.useContext(CurveDrawerContext);
}

function CurveDrawer({
  direction = "right",
  open: openProp,
  onOpenChange,
  defaultOpen,
  handleOnly = true,
  shouldScaleBackground = true,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  direction?: CurveSide;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false,
  );
  const open = openProp ?? uncontrolledOpen;

  const handleOpenChange = (next: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <CurveDrawerContext.Provider value={{ direction, open }}>
      <DrawerPrimitive.Root
        direction={direction}
        open={open}
        onOpenChange={handleOpenChange}
        handleOnly={handleOnly}
        shouldScaleBackground={shouldScaleBackground}
        {...props}
      >
        {children}
      </DrawerPrimitive.Root>
    </CurveDrawerContext.Provider>
  );
}

function CurveDrawerTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return (
    <DrawerPrimitive.Trigger
      data-slot="curve-drawer-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

function CurveDrawerPortal(
  props: React.ComponentProps<typeof DrawerPrimitive.Portal>,
) {
  return <DrawerPrimitive.Portal data-slot="curve-drawer-portal" {...props} />;
}

function CurveDrawerClose({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return (
    <DrawerPrimitive.Close
      data-slot="curve-drawer-close"
      className={cn(className)}
      {...props}
    />
  );
}

function CurveDrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="curve-drawer-overlay"
      className={cn("fixed inset-0 z-50 bg-black/40", className)}
      {...props}
    />
  );
}

/* Inner edge: quadratic bulge that settles to a straight line (≈800ms). */
function CurveArm({ side, open }: { side: CurveSide; open: boolean }) {
  const bulge = open ? 0 : 28;
  const mid = 50;
  const d =
    side === "left"
      ? `M 40 0 Q ${40 - bulge} ${mid} 40 100 L 0 100 L 0 0 Z`
      : `M 0 0 Q ${bulge} ${mid} 0 100 L 40 100 L 40 0 Z`;

  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-0 z-20 h-full w-10 text-background",
        side === "left" ? "-left-px" : "-right-px",
      )}
      viewBox="0 0 40 100"
      preserveAspectRatio="none"
    >
      <path d={d} fill="currentColor" className="transition-[d] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
    </svg>
  );
}

function CurveDrawerContent({
  className,
  children,
  curveSide,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  curveSide?: CurveSide;
}) {
  const { direction, open } = useCurveDrawer();
  const side = curveSide ?? direction;

  return (
    <CurveDrawerPortal>
      <CurveDrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="curve-drawer-content"
        className={cn(
          "fixed z-50 flex h-dvh flex-col bg-background text-foreground outline-none",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-[min(100vw,28rem)] data-[vaul-drawer-direction=right]:border-l",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-[min(100vw,28rem)] data-[vaul-drawer-direction=left]:border-r",
          "border-border shadow-2xl",
          "[transition:transform_800ms_cubic-bezier(0.22,1,0.36,1)]",
          className,
        )}
        {...props}
      >
        <CurveArm side={side === "left" ? "right" : "left"} open={open} />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </DrawerPrimitive.Content>
    </CurveDrawerPortal>
  );
}

function CurveDrawerHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="curve-drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function CurveDrawerFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="curve-drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function CurveDrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="curve-drawer-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function CurveDrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="curve-drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  CurveDrawer,
  CurveDrawerPortal,
  CurveDrawerOverlay,
  CurveDrawerTrigger,
  CurveDrawerClose,
  CurveDrawerContent,
  CurveDrawerHeader,
  CurveDrawerFooter,
  CurveDrawerTitle,
  CurveDrawerDescription,
};
