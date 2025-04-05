import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { JobApplication } from "../../../types/PropsJobApplication";
import { api } from "../../../api/baseRequest";
import useAuth from "../../../hooks/useAuth";

export default function useDashboard() {
  const navigate = useNavigate();
  const {
    loggedUserInfo: { id },
  } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isApplicationDetailsModalOpen, setIsApplicationDetailsModalOpen] =
    useState(false);
  const [isNewInterviewOpen, setIsNewInterviewOpen] = useState(false);
  const [isUserSentiment, setIsUserSentiment] = useState(false);
  const [isFeedbackCompanyOpen, setIsFeedbackCompany] = useState(false);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication>({} as JobApplication);
  const userName = localStorage.getItem("userName");

  function handleOpenApplicationDetailsModal(
    application: JobApplication
  ): void {
    setSelectedApplication(application);
    setIsApplicationDetailsModalOpen(true);
  }

  function handleCloseApplicationDetailsModal(): void {
    setIsApplicationDetailsModalOpen(false);
  }

  function handleOpenProfileModal() {
    setIsProfileModalOpen(true);
  }

  function handleCloseProfileModal() {
    setIsProfileModalOpen(false);
  }

  function handleOpenNewInterview() {
    setIsNewInterviewOpen(true);
  }

  function handleCloseNewInterview() {
    setIsNewInterviewOpen(false);
  }

  function handleOpenUserSentiment() {
    setIsUserSentiment(true);
  }

  function handleCloseUserSentiment() {
    setIsUserSentiment(false);
  }

  function handleOpenFeedbackCompany() {
    setIsFeedbackCompany(true);
  }

  function handleCloseFeedbackComapny() {
    setIsFeedbackCompany(false);
  }

  async function handleGetApplications(): Promise<void> {
    const userId = id;
    const token = localStorage.getItem("token");
    try {
      const response = await api.get(`job-applications/?${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobApplications(response.data.data.applicationJobs);
    } catch (error) {
      toast.error("Erro ao carregar candidaturas");
      console.error(error);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return {
    handleOpenApplicationDetailsModal,
    handleCloseApplicationDetailsModal,
    isApplicationDetailsModalOpen,
    handleOpenProfileModal,
    handleCloseProfileModal,
    isProfileModalOpen,
    handleOpenNewInterview,
    isNewInterviewOpen,
    handleCloseNewInterview,
    handleOpenUserSentiment,
    isUserSentiment,
    handleCloseUserSentiment,
    handleOpenFeedbackCompany,
    isFeedbackCompanyOpen,
    handleCloseFeedbackComapny,
    handleGetApplications,
    jobApplications,
    selectedApplication,
    handleLogout,
    userName,
  };
}
