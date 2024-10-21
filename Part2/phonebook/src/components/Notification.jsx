export const Notification = ({ success, isError }) => {
  const className = isError ? "note" : "error";
  return <div className={className}>{success}</div>;
};
