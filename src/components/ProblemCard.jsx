import { useState } from "react";

function ProblemCard({ title, description, icon }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`rounded-xl border p-6 transition-all ${hovered
                    ? "border-slate-900 shadow-lg"
                    : "border-slate-200"
                }`}
        >
            <div className="mb-4 text-2xl">{icon}</div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-slate-600 text-sm">{description}</p>
        </div>
    );
}

export default ProblemCard;
