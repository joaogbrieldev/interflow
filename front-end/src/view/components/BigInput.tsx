import PropsBigInput from "../../types/PropsBigInput"

export default function BigInput({ requiredInput = true }: PropsBigInput) {
    return (
        <textarea rows={6} 
                  autoFocus
                  required={requiredInput}
                  className="bg-bg-input w-full rounded-lg resize-none outline-none p-4">
        </textarea>
    )
}