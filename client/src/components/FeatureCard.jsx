function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 shadow-lg">
      <div className="text-5xl mb-5">{icon}</div>

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