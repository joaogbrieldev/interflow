import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../api/baseRequest";
import { JobApplication } from "../../../../types/PropsJobApplication";
import useAuth from "../../../../hooks/useAuth";

enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
}

export function useModalNewInterview() {
  const [isInterview, setIsInterview] = useState<String>("");
  const {
    loggedUserInfo: { id },
  } = useAuth();

  const roleRef = useRef<HTMLInputElement>(null);
  const salaryRef = useRef<HTMLInputElement>(null);
  const isInternationalRef = useRef<HTMLSelectElement>(null);
  const equityRef = useRef<HTMLInputElement>(null);
  const jobLinkRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const companySiteRef = useRef<HTMLInputElement>(null);
  const companyContactRef = useRef<HTMLInputElement>(null);
  const companyPhoneNumberRef = useRef<HTMLInputElement>(null);
  const applicationStatusRef = useRef<HTMLSelectElement>(null);
  const interviewDateRef = useRef<HTMLInputElement>(null);

  async function handleEditIInterview(application?: JobApplication) {
    try {
      await api.patch("/job-application", {
        body: application,
      });
      toast.success("Candidatura editada com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar candidatura!");
    }
  }

  async function handleNewInterview(
    callback: () => void,
    isEditMode?: boolean,
    applicationToEdit?: JobApplication
  ) {
    if (isEditMode) {
      handleEditIInterview(applicationToEdit);
      return;
    }
    const role = roleRef.current?.value;
    const salary = Number(salaryRef.current?.value) || 0;
    const isInternational = isInternationalRef.current?.value;
    const hasEquity = Number(equityRef.current?.value || 0) > 0;
    const jobLink = jobLinkRef.current?.value;
    const companyName = companyNameRef.current?.value;
    const applicationStatus = applicationStatusRef.current?.value;

    try {
      const response = await api.post("job-application", {
        name: role,
        link: jobLink,
        status: applicationStatus,
        isInternational: isInternational,
        isEquity: hasEquity,
        salary: salary,
        companyName: companyName,
        userId: id,
      });

      if (
        response.status === STATUS_CODE.OK ||
        response.status === STATUS_CODE.CREATED
      ) {
        alert("Candidatura cadastrada com sucesso!");
        callback();
        return;
      }

      alert("Erro ao cadastrar candidatura. Por favor, tente novamente");
    } catch (error) {
      toast.error("Erro ao cadastrar candidatura");
      console.error("Erro ao cadastrar candidatura: ", error);
    }
  }

  function handleChangeStatus(event: ChangeEvent<HTMLSelectElement>) {
    setIsInterview(event.target.value);
  }

  return {
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
  };
}
