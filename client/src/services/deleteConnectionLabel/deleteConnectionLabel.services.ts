const handleDeleteConnectionLabel = (
    connectionName: string,
    setConnections: React.Dispatch<React.SetStateAction<number[]>>
): void => {
    setConnections((prev) =>
        prev.filter((key) => key !== Number(connectionName.split(": ")[1]))
    );
};

export default handleDeleteConnectionLabel;
