import ProblemCard from "../ProblemCard";
import problems from "../../data/problems";

function ProblemSection() {
    return (
        <section className="bg-slate-50 py-20 overflow-hidden">
            <div className="mx-auto max-w-6xl px-6">
                <h2
                    data-aos="fade-up"
                    className="mb-12 text-center text-3xl font-bold text-slate-900"
                >
                    Masalah yang Sering Dialami Owner
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100} // Delay bertahap: 0ms, 100ms, 200ms...
                        >
                            <ProblemCard
                                icon={problem.icon}
                                title={problem.title}
                                description={problem.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProblemSection;