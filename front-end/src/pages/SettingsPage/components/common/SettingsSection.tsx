import { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  children: ReactNode;
  variant?: "default" | "danger";
  disabled?: boolean;
};

export default function SettingsSection({
  title,
  children,
  variant,
  disabled,
}: SettingsSectionProps) {
  const sectionClassName = [
    "settings__section",
    variant === "danger" ? "settings__section--danger" : "",
    disabled ? "settings__section--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={sectionClassName}>
      <div className="settings__section-header">
        <div className="settings__section-title">{title}</div>
      </div>
      {children}
    </div>
  );
}
