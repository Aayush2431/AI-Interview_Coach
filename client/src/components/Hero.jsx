import Button from "./Button";
import { useNavigate } from "react-router-dom";


function Hero() {

  const navigate = useNavigate();

  return (
    <section className="min-h-[90vh] bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

        {/* Left Section */}

        <div className="flex-1">

            <p className="text-blue-400 font-semibold mb-3">
                AI Powered Interview Preparation
            </p>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                Ace Your Next
                <span className="text-blue-500"> Interview </span>
                With AI
            </h1>

            <p className="text-gray-400 text-lg mt-6 max-w-2xl">
                Practice real interview questions, analyze your resume,
                receive instant AI feedback, and improve your confidence
                before your dream job interview.
            </p>

            <div className="flex gap-4 mt-8">
                <Button 
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 text-white hover:bg-blue-700">
                    Get Started
                </Button>
                <Button className="border border-gray-500 hover:bg-gray-800">
                    Watch Demo
                </Button>
            </div>
      </div>


        {/* Right Section */}

      <div className="flex-1 flex justify-center">
        <div className="w-[450px] h-[450px] rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-1 shadow-2xl">
          <div className="w-full h-full rounded-3xl bg-slate-900 flex flex-col justify-center items-center">
            <div className="text-7xl">
              🤖
            </div>
            <h2 className="text-3xl font-bold mt-6">
              AI Interview Coach
            </h2>
            <p className="text-gray-400 mt-3 text-center px-8">
              Personalized mock interviews powered by AI.
            </p>
          </div>
        </div>
      </div>

      </div>
    </section>
  );
}

export default Hero;