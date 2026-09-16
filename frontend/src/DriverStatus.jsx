import { useState } from "react";

function DriverStatus() {
    const [active, setActive] = useState(false);

    return (
        <div>
            <h2>Sofőr státusz</h2>

            <button onClick={() => setActive(!active)}>
                {active ? "Aktív" : "Inaktív"}
            </button>
        </div>
    );
}

export default DriverStatus;