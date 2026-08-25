import { useState } from "react";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import UploadResumeCard from "../components/dashboard/UploadResumeCard";
import ATSReportCard from "../components/dashboard/ATSReportCard";
import InterviewCard from "../components/dashboard/InterviewCard";

const Dashboard = () => {
  const [resumeId, setResumeId] = useState(null);

  const handleGenerateInterview = () => {
    document
      .getElementById("interview-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <DashboardNavbar />

      <div className="max-w-6xl mx-auto p-6">

        <WelcomeCard />

        <div className="grid gap-6">

          {/* Resume Upload */}
          <UploadResumeCard
            setResumeId={setResumeId}
          />

          {/* ATS Analysis */}
          <ATSReportCard
            resumeId={resumeId}
            onGenerateInterview={handleGenerateInterview}
          />

          {/* Interview */}
          <div id="interview-section">
            <InterviewCard
              resumeId={resumeId}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;