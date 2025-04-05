import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import useProfile from "./use-profile";

interface PropsProfile {
	isOpen: boolean
	onClose: () => void
}

export default function Profile({ isOpen, onClose }: PropsProfile) {
	const { mockUserInfo } = useProfile();

	return (
		<Modal isOpen={isOpen}>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-3">
					<Input
						id="inputName"
						placeholder="Seu nome"
						type="text"
						value={mockUserInfo.name}
						requiredInput
					/>
					<label
						htmlFor="inputName"
						className="text-sm text-place-color font-medium px-4 sm:text-base"
					>
						Nome
					</label>
				</div>
				<div className="flex flex-col gap-3">
					<Input
						id="inputEmail"
						placeholder="Seu endereço de e-mail"
						type="e-mail"
						value={mockUserInfo.email}
						requiredInput
					/>
					<label
						htmlFor="inputEmail"
						className="text-sm text-place-color font-medium px-4 sm:text-base"
					>
						E-mail
					</label>
				</div>
				<div className="flex flex-col gap-6 sm:flex-row">
					<div className="flex flex-col gap-3">
						<Input
							id="inputPassword"
							placeholder="Insira uma nova senha"
							type="password"
							requiredInput
						/>
						<label
							htmlFor="inputPassword"
							className="text-sm text-place-color font-medium px-4 sm:text-base"
						>
							Nova senha
						</label>
					</div>
					<div className="flex flex-col gap-3">
						<Input
							id="inputConfirmPassword"
							placeholder="Repita a nova senha"
							type="password"
							requiredInput
						/>
						<label
							htmlFor="inputConfirmPassword"
							className="text-sm text-place-color font-medium px-4 sm:text-base"
						>
							Confirmar nova senha
						</label>
					</div>
				</div>

				<div className="flex flex-col gap-10 mt-4 sm:flex-row-reverse">
					<Button name="Salvar" className="flex-1" />
					<button onClick={onClose} className="flex-2 hover:cursor-pointer">
						<span  className="text-color-font font-semibold hover:text-place-color transition-colors duration-100">
							Fechar
						</span>
					</button>
				</div>
			</div>
		</Modal>
	);
}
