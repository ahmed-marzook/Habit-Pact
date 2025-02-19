import { ReactNode } from "react";

type SettingItemProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function SettingItem({
  title,
  description,
  children,
}: SettingItemProps) {
  return (
    <div className="settings__item">
      <div className="settings__item-label">
        <h3 className="settings__item-title">{title}</h3>
        {description && (
          <p className="settings__item-description">{description}</p>
        )}
      </div>
      <div className="settings__form-control">{children}</div>
    </div>
  );
}
