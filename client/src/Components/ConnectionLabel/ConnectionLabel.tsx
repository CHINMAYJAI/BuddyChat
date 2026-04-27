import styles from "./connectionLabel.module.css";
import DeleteButton from "@/Components/Buttons/DeleteButton/DeleteButton";
import { useRef } from "react";

let incrementCounter: number = 0;

interface ConnectionLabelProps {
    onDelete: (connectionName: string) => void;
}

const ConnectionLabel: React.FC<ConnectionLabelProps> = ({ onDelete }) => {
    // ref hook to show the incremented number on the label
    const counterRef = useRef<number | null>(null);
    if (counterRef.current === null) {
        incrementCounter += 1;
        counterRef.current = incrementCounter;
    }
    const counter: number = counterRef.current;
    let connectionName: string = `ConnectionName: ${counter}`;

    return (
        <div className={styles.card}>
            <div className={styles.notification_indicator}>
                <div className={styles.notification_dot} />
                <p className={styles.notification_unread}>5 Unread</p>
            </div>
            <div className={styles.middle_row}>
                <div className={styles.avatar} />
                <p className={styles.text_content}>{connectionName}</p>
                <DeleteButton
                    connectionName={connectionName}
                    onDelete={onDelete}
                />
            </div>
            <div className={styles.button_wrap}>
                <button className={styles.primary_cta}>Visit</button>
            </div>
        </div>
    );
};

export default ConnectionLabel;
