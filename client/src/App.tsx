import "./App.css";
import Navbar from "@/Components/Navbar/Navbar";
import ConnectionLabel from "@/Components/ConnectionLabel/ConnectionLabel";
import { handleDeleteConnectionLabel } from "./services/index.services";
import type { JSX } from "react";
import { useState } from "react";

function App(): JSX.Element {
    const [connections, setConnections] = useState<number[]>([1, 2, 3, 4]);

    return (
        <>
            <Navbar />
            {connections.map((key) => (
                <ConnectionLabel
                    key={key}
                    onDelete={(connectionName) =>
                        handleDeleteConnectionLabel(
                            connectionName,
                            setConnections
                        )
                    }
                />
            ))}
        </>
    );
}

export default App;
