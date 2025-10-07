import ModalLayout from "../../layouts/ModalLayout";

interface ButtonPostModalProps {
  onClose: () => void;
}

export default function ButtonPostModal({ onClose }: ButtonPostModalProps) {
  return (
    <ModalLayout onClose={onClose} className="max-w-[400px]">

      <div className="p-2 border-gray-200 mt-4">
        <div className="flex items-center space-x-2 min-w-0 border-gray-200 pb-4">
          <img
            src="https://avatars.githubusercontent.com/u/15079328?v=4"
            alt="Francisco Lucas"
            className="max-w-full h-auto w-12 rounded-full flex-shrink-0"
          />
          <textarea
            placeholder="O que está acontecendo?"
            className="w-full resize-none p-2 rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex justify-end pt-4">
          <button className="btn px-4 py-2">Postar</button>
        </div>
        </div>

    </ModalLayout>
  );
}