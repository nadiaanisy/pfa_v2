"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import { Panel } from "react-resizable-panels";

import { cn } from "./utils";

// Container replaces PanelGroup
function ResizablePanelGroup({
  children,
  direction = "horizontal",
  className,
  ...props
}: {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <div
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full",
        direction === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Simple wrapper around Panel
function ResizablePanel({
  children,
  ...props
}: React.ComponentProps<typeof Panel>) {
  return <Panel {...props}>{children}</Panel>;
}

// Optional handle for visual indicator (v4 handles resizing automatically)
function ResizableHandle({
  withHandle,
  className,
}: {
  withHandle?: boolean;
  className?: string;
}) {
  return (
    <div
      data-slot="resizable-handle"
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </div>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
