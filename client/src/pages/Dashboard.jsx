import { useState } from "react";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import UploadResumeCard from "../components/dashboard/UploadResumeCard";
import ATSReportCard from "../components/dashboard/ATSReportCard";
// import InterviewCard from "../components/dashboard/InterviewCard";

const Dashboard = () => {
  // Shared state across dashboard components
  const [resumeId, setResumeId] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 space-y-8">

        {/* Welcome Section */}
        <WelcomeCard />

        {/* Resume Upload */}
        <UploadResumeCard setResumeId={setResumeId} />

        {/* Uncomment after creating ATSReportCard */}

        
        <ATSReportCard resumeId={resumeId} />
        

        {/* Uncomment after creating InterviewCard */}

        {/*
        <InterviewCard
          resumeId={resumeId}
        />
        */}

      </div>

    </div>
  );
};

export default Dashboard;