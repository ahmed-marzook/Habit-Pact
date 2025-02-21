import { ReactNode } from "react";

type SettingItemProps = {
  title: string;
  description?: string;
  children: ReactNode;
  variant?: "success" | "error" | "default";
};

const getVariantClass = (variant?: string) => {
  const variants = {
    success: "settings__item-description--success",
    error: "settings__item-description--error",
    default: "",
  };
  return variants[variant as keyof typeof variants] || "";
};

export default function SettingItem({
  title,
  description,
  children,
  variant = "default",
}: SettingItemProps) {
  return (
    <div className="settings__item">
      <div className="settings__item-label">
        <h3 className="settings__item-title">{title}</h3>
        {description && (
          <p
            className={`settings__item-description ${getVariantClass(variant)}`}
          >
            {description}
          </p>
        )}
      </div>
      <div className="settings__form-control">{children}</div>
    </div>
  );
}
