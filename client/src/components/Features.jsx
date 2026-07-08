import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="bg-slate-950 text-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Why Choose AI Interview Coach?
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Everything you need to prepare for technical and HR interviews
            in one AI-powered platform.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <FeatureCard
            icon="📄"
            title="Resume Analyzer"
            description="Receive AI-powered feedback and ATS score for your resume."
          />

          <FeatureCard
            icon="🎤"
            title="Mock Interviews"
            description="Practice technical and HR interviews with real-time AI evaluation."
          />

          <FeatureCard
            icon="📊"
            title="Performance Analytics"
            description="Track your interview scores and monitor your improvement."
          />

        </div>

      </div>

    </section>
  );
}

export default Features;