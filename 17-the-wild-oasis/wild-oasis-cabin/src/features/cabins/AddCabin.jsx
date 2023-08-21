import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddModal() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add a new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddModal() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal
//           onCloseModal={() => setIsOpenModal((isOpenModal) => !isOpenModal)}
//         >
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddModal;
