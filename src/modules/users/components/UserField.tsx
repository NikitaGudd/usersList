const UserField = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-3 gap-2 mb-2">
    <span className="font-medium">{label}:</span>
    <span className="col-span-2">{value}</span>
  </div>
);

export default UserField;
