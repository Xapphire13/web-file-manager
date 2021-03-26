import React from "react";

export interface SwipableRowHiddenContentProps {
  children: React.ReactNode;
  side: "left" | "right";
}

export default function SwipableRowHiddenContent({
  children,
}: SwipableRowHiddenContentProps) {
  return <>{children}</>;
}
