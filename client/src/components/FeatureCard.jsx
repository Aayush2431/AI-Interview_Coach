function FeatureCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          onClick();
        }
      }}
      className={`bg-slate-800 rounded-2xl p-8 border border-slate-700
        hover:border-blue-500 hover:-translate-y-2
        transition-all duration-300 shadow-lg
        ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="text-5xl mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-white mb-3">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;