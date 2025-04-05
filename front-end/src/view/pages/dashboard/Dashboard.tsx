import { useEffect } from "react";
import { Plus } from "phosphor-react";
import ModalDetailsApplication from "./application-details/ModalDetailsApplication";
import useDashboard from "./use-dashboard";
import Profile from "./profile/Profile";
import ModalNewInterview from "./new-interview/ModalNewInterview";
import ModalUserSentiment from "./user-sentiment/ModalUserSentiment";
import InterviewFlowLogo from "../../../assets/InterviewFlowLogo.png";
import { formatCurrency } from "../../utils/formatCurrency";

const mockScheduledInterview = {
  role: "Fullstack Engineer",
  company: "Google LLC",
  date: "March, 31st - 10AM",
};

export default function Dashboard() {
  const {
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
  } = useDashboard();

  useEffect(() => {
    handleGetApplications();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <header className="w-full flex justify-around sm:justify-between gap-15 py-8 px-8 sm:px-20 font-semibold">
        <div className="w-40 hidden sm:block cursor-pointer">
          <img src={InterviewFlowLogo} alt="InterviewFlow logo" />
        </div>
        <button
          onClick={handleOpenProfileModal}
          className="hover:cursor-pointer hover:text-place-color transition-colors duration-100"
        >
          Perfil
        </button>
        <button
          onClick={handleLogout}
          className="hover:cursor-pointer hover:text-place-color transition-colors duration-100"
        >
          Sair
        </button>
      </header>

      <div className="w-full max-w-5xl mt-24 px-6">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-4 w-full">
            <span className="font-semibold text-2xl sm:text-3xl">
              Olá, {userName}
            </span>
            <span className="text-place-color text-sm sm:text-base">
              Aqui estão os detalhes das suas candidaturas
            </span>
          </div>

          <div className="w-full flex flex-col gap-6 bg-bg-input rounded-lg p-8 sm:max-w-md">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-primary-color animate-pulse"></span>
              <span className="text-xs font-semibold sm:text-base">
                Próxima entrevista
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-base text-color-font font-semibold sm:text-2xl">
                {mockScheduledInterview.role} - {mockScheduledInterview.company}
              </span>
              <span className="text-xs font-medium text-place-color sm:text-base">
                {mockScheduledInterview.date}
              </span>
            </div>
            <div className="w-full flex justify-end">
              <button
                onClick={handleOpenUserSentiment}
                className="text-color-font font-semibold"
              >
                <span className="text-xs sm:text-base font-semibold hover:cursor-pointer hover:text-place-color transition-colors duration-100">
                  Encerrada?
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 sm:mt-14 mb-6">
          <span className="text-sm sm:text-text-color-font font-semibold sm:text-lg">
            Candidaturas e vagas de interesse
          </span>
          <button
            onClick={handleOpenNewInterview}
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <span className="hidden sm:block text-color-font text-lg font-semibold hover:text-place-color transition-colors duration-100">
              Adicionar
            </span>
            <Plus />
          </button>
        </div>

        <div className="flex flex-col gap-3 pb-8">
          {jobApplications?.length > 0 ? (
            jobApplications.map((application) => (
              <button
                onClick={() => handleOpenApplicationDetailsModal(application)}
                key={application.job_application_id}
                className="flex flex-col gap-6 sm:gap-0 bg-bg-input py-8 pl-10 rounded-lg sm:flex-row border border-bg-input hover:cursor-pointer hover:border-place-color transition-colors duration-100"
              >
                <div className="flex flex-col gap-3 min-w-48 flex-1 sm:flex-col-reverse">
                  <span className="font-medium text-place-color self-start">
                    Cargo
                  </span>
                  <span className="text-lg font-semibold self-start truncate">
                    {application.name}
                  </span>
                </div>
                <div className="flex flex-col gap-3 min-w-48 flex-1 sm:flex-col-reverse">
                  <span className="font-medium text-place-color self-start">
                    Empresa
                  </span>
                  <span className="text-lg font-semibold self-start truncate">
                    {application.name}
                  </span>
                </div>
                <div className="flex flex-col gap-3 min-w-48 flex-1 sm:flex-col-reverse">
                  <span className="font-medium text-place-color self-start">
                    Salário
                  </span>
                  <span className="text-lg font-semibold self-start truncate">
                    {formatCurrency(application.salary)}
                  </span>
                </div>
                <div className="flex flex-col gap-3 sm:border-place-color flex-1 sm:flex-col-reverse">
                  <span className="font-medium text-place-color self-start">
                    Tem Equity
                  </span>
                  <span className="text-lg font-semibold self-start truncate">
                    {application.isEquity ? "Sim" : "Não"}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="w-full flex justify-center items-center">
              <span className="text-lg font-semibold text-place-color">
                Nenhuma candidatura cadastrada.
              </span>
            </div>
          )}
        </div>
      </div>
      <ModalDetailsApplication
        isOpen={isApplicationDetailsModalOpen}
        onClose={handleCloseApplicationDetailsModal}
        application={selectedApplication}
        onEdit={handleOpenNewInterview}
      />
      <Profile isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} />
      <ModalNewInterview
        isOpen={isNewInterviewOpen}
        onClose={handleCloseNewInterview}
        isEditMode
        applicationToEdit={selectedApplication}
      />
      <ModalUserSentiment
        isOpen={isUserSentiment}
        onClose={handleCloseUserSentiment}
      />
    </div>
  );
}
