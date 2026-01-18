import solutions from "../../data/solutions";
import SolutionCard from "../SolutionCard";

function SolutionSection() {
    return (
        <section className="bg-slate-900 py-20 overflow-hidden">
            <div className="mx-auto max-w-6xl px-6">
                <h2 
                    data-aos="fade-up"
                    className="mb-12 text-center text-3xl font-bold text-white"
                >
                    Solusi dari SIPERAK
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                    {solutions.map((solution, index) => (
                        <div 
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <SolutionCard
                                title={solution.title}
                                description={solution.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SolutionSection;