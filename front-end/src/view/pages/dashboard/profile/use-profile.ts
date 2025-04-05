import { useState } from "react";

export default function useProfile() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

	function closeModal(): void {
		setIsModalOpen(false);
	}

	// TODO: Delete this after back end integration
	const mockUserInfo = {
		name: "John Doe",
		email: "johndoe@gmail.com",
	};

	return {
		isModalOpen,
		closeModal,
		mockUserInfo,
	};
}
