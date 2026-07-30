import { useState } from "react";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import UploadResumeCard from "../components/dashboard/UploadResumeCard";
import ATSReportCard from "../components/dashboard/ATSReportCard";
import InterviewCard from "../components/dashboard/InterviewCard";

const Dashboard = () => {
  const [resumeId, setResumeId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">

      <DashboardNavbar />

      <div className="max-w-6xl mx-auto p-6">

        <WelcomeCard />

        <div className="grid gap-6">

          <UploadResumeCard
            setResumeId={setResumeId}
          />

          <ATSReportCard
            resumeId={resumeId}
          />

          <InterviewCard
            resumeId={resumeId}
          />

          {/* <button
            onClick={() => {
              console.log("TEST BUTTON CLICKED");
              alert("Working");
            }}
            className="bg-red-500 text-white p-4 rounded"
          >
            Test Button
          </button> */}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;