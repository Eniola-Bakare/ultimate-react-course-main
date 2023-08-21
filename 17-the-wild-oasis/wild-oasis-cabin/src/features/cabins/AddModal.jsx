import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
        Show
      </Button>
      {isOpenModal && (
        <Modal
          onCloseModal={() => setIsOpenModal((isOpenModal) => !isOpenModal)}
        >
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddModal;
