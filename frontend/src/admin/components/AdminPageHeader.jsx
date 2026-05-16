const AdminPageHeader = ({ title, subtitle, action }) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default AdminPageHeader;
