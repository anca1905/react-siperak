// src/components/sections/PricingSection.jsx
import { pricingPlans } from "../../data/pricing";

export default function PricingSection() {
    return (
        <section id="harga" className="py-20 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div
                    data-aos="fade-up"
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Pilih Paket yang Sesuai
                    </h2>
                    <p className="text-lg text-slate-600">
                        Investasi terbaik untuk meningkatkan produktivitas dan transparansi tim Anda.
                        Mulai dari yang gratis hingga skala enterprise.
                    </p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={plan.id}
                            // Logika animasi: Kartu populer pakai "zoom-in", sisanya "fade-up"
                            data-aos={plan.isPopular ? "zoom-in" : "fade-up"}
                            data-aos-delay={index * 150}
                            className={`relative rounded-2xl p-8 flex flex-col h-full border transition-all duration-300 hover:-translate-y-2
                                ${plan.isPopular
                                    ? "bg-white border-red-200 shadow-xl ring-2 ring-red-600 shadow-red-900/10"
                                    : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                                }
                            `}
                        >
                            {/* Badge Popular */}
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Paling Laris
                                </div>
                            )}

                            {/* Card Header */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                                <div className="mt-4 flex items-baseline text-slate-900">
                                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                                    <span className="ml-1 text-lg font-medium text-slate-500">{plan.period}</span>
                                </div>
                                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        {/* Check Icon */}
                                        <svg className="h-5 w-5 text-red-600 shrink-0 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-slate-600 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Action Button */}
                            <button
                                className={`w-full py-3 px-4 rounded-lg text-sm font-bold transition-colors
                  ${plan.isPopular
                                        ? "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20"
                                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                    }
                `}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}