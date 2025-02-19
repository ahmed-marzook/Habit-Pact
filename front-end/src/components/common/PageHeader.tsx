type PageHeaderProps = { title: string; description?: string };

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="page-header__header">
      <h1 className="page-header__title">{title}</h1>
      {description && <p className="page-header__description">{description}</p>}
    </div>
  );
}
