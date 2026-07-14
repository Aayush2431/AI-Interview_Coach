import { useAuth } from "../../context/AuthContext";

const WelcomeCard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-slate-800 rounded-3xl p-8 shadow-lg">

      <h2 className="text-4xl font-bold text-white mb-3">
        Welcome back, {user?.name} 👋
      </h2>

      <p className="text-gray-400 text-lg">
        Ready to improve your interview skills today?
      </p>

    </div>
  );
};

export default WelcomeCard;