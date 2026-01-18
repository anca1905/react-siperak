function SolutionCard({ title, description }) {
    return (
        <div className="rounded-xl bg-slate-900 p-6 text-white shadow-md">
            <h3 className="mb-2 text-lg font-semibold">
                {title}
            </h3>
            <p className="text-slate-300 text-sm">
                {description}
            </p>
        </div>
    );
}

export default SolutionCard;
