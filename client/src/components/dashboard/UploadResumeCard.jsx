import { useState } from "react";
import resumeService from "../../services/resumeService";

const UploadResumeCard = ({ setResumeId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setMessage("");
    setIsError(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a PDF resume.");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await resumeService.uploadResume(selectedFile);

      setMessage(response.message || "Resume uploaded successfully!");
      setIsError(false);

      setResumeId(response.data._id);
      console.log(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Resume upload failed."
      );
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">

      <h2 className="text-2xl font-bold text-white mb-2">
        Upload Resume
      </h2>

      <p className="text-gray-400 mb-6">
        Upload your latest resume in PDF format.
      </p>

      <label
        htmlFor="resume"
        className="border-2 border-dashed border-blue-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
      >
        <div className="text-5xl mb-4">📄</div>

        <p className="text-white font-semibold">
          Click to choose your resume
        </p>

        <p className="text-sm text-gray-400 mt-2">
          PDF • Max 5 MB
        </p>

        <input
          id="resume"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {selectedFile && (
        <div className="mt-6 bg-slate-900 rounded-xl p-4">
          <p className="text-white font-semibold">
            {selectedFile.name}
          </p>

          <p className="text-gray-400 text-sm">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 text-white font-semibold disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {message && (
        <div
          className={`mt-6 rounded-xl p-4 ${
            isError
              ? "bg-red-500/20 text-red-300 border border-red-500"
              : "bg-green-500/20 text-green-300 border border-green-500"
          }`}
        >
          {message}
        </div>
      )}

    </div>
  );
};

export default UploadResumeCard;