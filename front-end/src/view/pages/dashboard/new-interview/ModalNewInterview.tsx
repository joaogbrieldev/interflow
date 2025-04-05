import { ChangeEvent, useState } from "react";
import { JobApplication } from "../../../../types/PropsJobApplication";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Select from "../../../components/Select";
import ModalFeedbackCompany from "../feedback-company/ModalFeedbackCompany";
import useDashboard from "../use-dashboard";
import { useModalNewInterview } from "./useModalNewInterview";

interface ModalNewInterviewProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode?: boolean;
  applicationToEdit?: JobApplication;
}

export default function ModalNewInterview({
  isOpen,
  onClose,
  isEditMode,
  applicationToEdit,
}: ModalNewInterviewProps) {
  const {
    handleOpenFeedbackCompany,
    isFeedbackCompanyOpen,
    handleCloseFeedbackComapny,
  } = useDashboard();
  const {
    roleRef,
    salaryRef,
    isInternationalRef,
    equityRef,
    jobLinkRef,
    companyNameRef,
    companySiteRef,
    companyContactRef,
    companyPhoneNumberRef,
    applicationStatusRef,
    interviewDateRef,
    handleNewInterview,
    handleChangeStatus,
    isInterview,
  } = useModalNewInterview();
  const [updatedApplication, setUpdatedApplication] = useState(
    {} as JobApplication
  );

  return (
    <Modal isOpen={isOpen}>
      <section className="flex flex-col gap-2 text-color-font">
        <Input
          defaultValue={applicationToEdit?.name}
          ref={roleRef}
          placeholder="Cargo"
          type="text"
          onChange={(e) =>
            setUpdatedApplication({
              ...updatedApplication,
              name: e.target.value,
            })
          }
        />
        <Input
          defaultValue={applicationToEdit?.salary}
          ref={salaryRef}
          placeholder="Salário"
          type="text"
          onChange={(e) =>
            setUpdatedApplication({
              ...updatedApplication,
              salary: e.target.value,
            })
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Select
            value={applicationToEdit?.isInternational ? "Sim" : "Não"}
            ref={isInternationalRef}
            label="É internacional?"
            options={["Sim", "Não"]}
          />
          <Input
            defaultValue={
              applicationToEdit?.isEquity ? "Com equity" : "Sem equity"
            }
            ref={equityRef}
            placeholder="Equity"
            type="text"
            onChange={(e) =>
              setUpdatedApplication({
                ...updatedApplication,
                isEquity: e.target.value === "Sim",
              })
            }
          />
        </div>

        <Input
          defaultValue={applicationToEdit?.link}
          ref={jobLinkRef}
          placeholder="Link da vaga"
          type="text"
          onChange={(e) =>
            setUpdatedApplication({
              ...updatedApplication,
              link: e.target.value,
            })
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input
            ref={companyNameRef}
            placeholder="Nome da empresa"
            type="text"
          />
          <Input
            ref={companySiteRef}
            placeholder="Site da empresa"
            type="text"
          />
        </div>

        <Input
          ref={companyContactRef}
          placeholder="Contato direto na empresa"
          type="text"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input
            ref={companyPhoneNumberRef}
            placeholder="Telefone da empresa"
            type="tel"
          />
          <Select
            ref={applicationStatusRef}
            label="Status"
            options={[
              "applied",
              "screening",
              "interview",
              "technical_interview",
              "offer",
              "accepted",
              "rejected",
              "withdrawn",
            ]}
            changeSelect={handleChangeStatus}
          />
        </div>

        {isInterview === "interview" ||
        isInterview === "technical_interview" ? (
          <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-3">
            <a
              onClick={handleOpenFeedbackCompany}
              href="#"
              className="underline flex items-center justify-center hover:text-place-color duration-150 ease-linear font-semibold"
            >
              Feedback da empresa
            </a>
            <Input
              ref={interviewDateRef}
              placeholder="Data da entrevista"
              type="date"
              className="scheme-dark"
            />
          </div>
        ) : (
          <div className="py-1">
            <a
              onClick={handleOpenFeedbackCompany}
              href="#"
              className="underline flex items-center justify-center hover:text-place-color duration-150 ease-linear font-semibold"
            >
              Feedback da empresa
            </a>
          </div>
        )}

        <footer className="flex flex-col-reverse sm:grid grid-cols-2 mt-4 gap-2">
          <a
            onClick={onClose}
            href="#"
            className="p-3 text-center hover:text-place-color transition-colors duration-150 ease-linear  font-semibold"
          >
            Fechar
          </a>
          <Button
            onClick={() =>
              handleNewInterview(onClose, isEditMode, updatedApplication)
            }
            name="Salvar"
          />
        </footer>
        <ModalFeedbackCompany
          isOpen={isFeedbackCompanyOpen}
          onClose={handleCloseFeedbackComapny}
        />
      </section>
    </Modal>
  );
}
