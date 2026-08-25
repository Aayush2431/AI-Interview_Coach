import { useNavigate } from "react-router-dom";
import FeatureCard from "./FeatureCard";

function Features() {
  const navigate = useNavigate();

  return (
    <section 
    id="features"
    className="bg-slate-950 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Why Choose AI Interview Coach?
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Everything you need to prepare for technical and HR interviews
            in one AI-powered platform.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {/* Resume Analyzer */}
          <FeatureCard
            icon="📄"
            title="Resume Analyzer"
            description="Receive AI-powered feedback and ATS score for your resume."
            onClick={() => navigate("/dashboard")}
          />

          {/* Mock Interviews */}
          <FeatureCard
            icon="🎤"
            title="Mock Interviews"
            description="Practice technical and HR interviews with real-time AI evaluation."
            onClick={() => navigate("/dashboard")}
          />

          {/* Performance Analytics */}
          <FeatureCard
            icon="📊"
            title="Performance Analytics"
            description="Track your interview scores and monitor your improvement."
            onClick={() => navigate("/dashboard")}
          />

        </div>
      </div>
    </section>
  );
}

export default Features;