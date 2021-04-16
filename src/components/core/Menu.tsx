import React from "react";
import {
  Menu as ReachMenu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@reach/menu-button";

export interface MenuProps {
  children: React.ReactNode;
  items: { id: string; label: React.ReactNode; onSelect: () => void }[];
}
export default function Menu({ children, items }: MenuProps) {
  return (
    <ReachMenu>
      <MenuButton>{children}</MenuButton>
      <MenuList className="py-2 px-4 bg-gray-700 text-white text-lg border border-gray-400 rounded">
        {items.map(({ id, label, onSelect }) => (
          <MenuItem
            key={id}
            className="p-0 py-1 border border-t-0 border-l-0 border-r-0 border-gray-500 last:border-0 hover:bg-transparent"
            onSelect={onSelect}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </ReachMenu>
  );
}
