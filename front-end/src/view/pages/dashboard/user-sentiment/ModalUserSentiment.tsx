import BigInput from "../../../components/BigInput";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

interface ModalUserSentimentProps {
    isOpen: boolean
    onClose: () => void
}

export default function ModalUserSentiment({ isOpen, onClose }: ModalUserSentimentProps) {
    return (
        <Modal isOpen={isOpen}>
            <section className="flex flex-col gap-3 text-color-font font-inter">
                <h2 className="mb-2 font-semibold text-center sm:text-left">Qual o seu sentimento sobre a entrevista?</h2>
                <BigInput requiredInput={false}/>

                <footer className="flex flex-col-reverse items-center sm:grid sm:grid-cols-2 mt-3 gap-3">
                    <a onClick={onClose} href="#" className="p-3 font-semibold text-center w-full hover:text-place-color transition-colors  duration-150 ease-linear">Pular</a>
                    <Button name="Salvar"/>
                </footer>
            </section>
        </Modal>
    );
}