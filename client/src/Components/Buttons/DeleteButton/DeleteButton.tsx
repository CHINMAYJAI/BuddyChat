import styles from "./deleteButton.module.css";
import { DeleteButtonIcon } from "@/assets/icons/buttons/index.assets.icons.buttons";

interface DeleteButtonProps {
    connectionName: string;
    onDelete: (connectionName: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    connectionName,
    onDelete,
}) => {
    return (
        <button
            className={styles.bin_button}
            onClick={() => {
                onDelete(connectionName);
            }}
        >
            <img
                className={styles.delete_icon}
                src={DeleteButtonIcon}
                alt="delete"
            />
        </button>
    );
};

export default DeleteButton;
