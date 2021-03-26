import React from "react";

export interface SwipableRowContentProps {
  children: React.ReactNode;
}

export default function SwipableRowContent({
  children,
}: SwipableRowContentProps) {
  return <>{children}</>;
}
