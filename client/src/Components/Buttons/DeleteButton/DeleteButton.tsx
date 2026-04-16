import "./deleteButton.css";
import { DeleteButtonIcon } from "@/assets/icons/buttons/index.assets.icons.buttons";

const DeleteButton = () => {
    return (
        <button className="bin-button">
            <img className="delete-icon" src={DeleteButtonIcon} alt="delete" />
        </button>
    );
};

export default DeleteButton;
