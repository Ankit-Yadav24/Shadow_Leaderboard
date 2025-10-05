import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Checks,
  Atom,
  Flask,
  MathOperations,
} from "@phosphor-icons/react";

const iconColorMap = {
  "physics-icon": "var(--q3-base-embered)",
  "chemistry-icon": "var(--q3-base-orange)",
  "maths-icon": "var(--q3-base-blue)",
  checks: "var(--foreground)",
  target: "var(--q3-base-purple)",
};

const iconMap = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  target: Target,
  checks: Checks,
  "physics-icon": Atom,
  "chemistry-icon": Flask,
  "maths-icon": MathOperations,
};

const medalIcons = {
  "1st-place-medal": "/src/assets/icons/1st-place-medal.svg",
  "2nd-place-medal": "/src/assets/icons/2nd-place-medal.svg",
  "3rd-place-medal": "/src/assets/icons/3rd-place-medal.svg",
};

const Icon = ({
  name,
  size = 24,
  weight = "regular",
  color,
  className = "",
}) => {
  if (medalIcons[name]) {
    return (
      <img
        src={medalIcons[name]}
        alt={name}
        width={size}
        height={size}
        className={className}
      />
    );
  }

  const IconComponent = iconMap[name];

  if (IconComponent) {
    const iconColor = color || iconColorMap[name] || "currentColor";
    return (
      <IconComponent
        size={size}
        weight={weight}
        color={iconColor}
        className={className}
      />
    );
  }

  return null;
};

export default Icon;
