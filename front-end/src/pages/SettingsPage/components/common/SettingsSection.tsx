import { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  children: ReactNode;
  variant?: "default" | "danger";
};

export default function SettingsSection({
  title,
  children,
  variant,
}: SettingsSectionProps) {
  const sectionClassName =
    variant === "danger"
      ? "settings__section settings__section--danger"
      : "settings__section";

  return (
    <div className={sectionClassName}>
      <div className="settings__section-header">
        <div className="settings__section-title">{title}</div>
      </div>
      {children}
    </div>
  );
}
