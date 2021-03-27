import React from "react";

export interface SwipeableRowHiddenContentProps {
  children: React.ReactNode;
  side: "left" | "right";
}

export default function SwipeableRowHiddenContent({
  children,
}: SwipeableRowHiddenContentProps) {
  return <>{children}</>;
}
