type SettingHeaderProps = { title: string; description: string };

export default function SettingHeader({
  title,
  description,
}: SettingHeaderProps) {
  return (
    <div className="settings__header">
      <h1 className="settings__title">{title}</h1>
      {description && <p className="settings__description">{description}</p>}
    </div>
  );
}
