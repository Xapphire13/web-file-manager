import React from "react";

export interface SwipeableRowContentProps {
  children: React.ReactNode;
}

export default function SwipeableRowContent({
  children,
}: SwipeableRowContentProps) {
  return <>{children}</>;
}
