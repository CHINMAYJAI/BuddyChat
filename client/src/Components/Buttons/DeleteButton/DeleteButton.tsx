import styles from "./deleteButton.module.css";
import { DeleteButtonIcon } from "@/assets/icons/buttons/index.assets.icons.buttons";

const DeleteButton: React.FC = () => {
    return (
        <button className={styles.bin_button}>
            <img
                className={styles.delete_icon}
                src={DeleteButtonIcon}
                alt="delete"
            />
        </button>
    );
};

export default DeleteButton;
