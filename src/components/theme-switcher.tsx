import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ThemeSwitcherProps {
  onThemeChange: (theme: string) => void;
  currentTheme: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange, currentTheme }) => {
  const themes = [
    { key: "default", name: "Azul (Predeterminado)", icon: "lucide:palette" },
    { key: "warm", name: "Cálido", icon: "lucide:flame" },
    { key: "earth", name: "Tierra", icon: "lucide:leaf" }
  ];

  const currentThemeObj = themes.find(theme => theme.key === currentTheme) || themes[0];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          startContent={<Icon icon={currentThemeObj.icon} width={16} />}
          size="sm"
        >
          Tema: {currentThemeObj.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Seleccionar tema"
        onAction={(key) => onThemeChange(key as string)}
        selectedKeys={[currentTheme]}
        selectionMode="single"
      >
        {themes.map((theme) => (
          <DropdownItem 
            key={theme.key} 
            startContent={<Icon icon={theme.icon} width={16} />}
          >
            {theme.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};