import solutions from "../../data/solutions";
import SolutionCard from "../SolutionCard";

function SolutionSection() {
    return (
        <section className="bg-slate-900 py-20">
            <div className="mx-auto max-w-6xl px-6">
                <h2 className="mb-12 text-center text-3xl font-bold text-white">
                    Solusi dari SIPERAK
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                    {solutions.map((solution, index) => (
                        <SolutionCard
                            key={index}
                            title={solution.title}
                            description={solution.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SolutionSection;
