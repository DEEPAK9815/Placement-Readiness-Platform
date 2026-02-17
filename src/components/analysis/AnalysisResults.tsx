import React from 'react';
import type { AnalysisResult } from '../../lib/analysis';
import { Card } from '../ui/Card';
import { Calendar, Target, HelpCircle, ArrowLeft } from 'lucide-react';

interface AnalysisResultsProps {
    result: AnalysisResult;
    onBack: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onBack }) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Analysis
            </button>

            {/* Header / Score */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-[var(--color-primary)] mb-2">
                        {result.role || "Job Role"} Analysis
                    </h2>
                    <p className="text-gray-500">{result.company ? `for ${result.company}` : 'Detailed Report'}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {Object.entries(result.extractedSkills).map(([category, skills]) => (
                            skills.length > 0 && (
                                <div key={category} className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-gray-400 uppercase">{category}</span>
                                    <div className="flex flex-wrap gap-1">
                                        {skills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="text-gray-200 stroke-current"
                                strokeWidth="8"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                            ></circle>
                            <circle
                                className="text-[var(--color-accent)] progress-ring__circle stroke-current"
                                strokeWidth="8"
                                strokeLinecap="round"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                strokeDasharray={`${2 * Math.PI * 40}`}
                                strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.readinessScore / 100)}`}
                                transform="rotate(-90 50 50)"
                            ></circle>
                        </svg>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <span className="text-3xl font-bold text-[var(--color-primary)]">{result.readinessScore}</span>
                        </div>
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-500">Readiness Score</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 7-Day Plan */}
                <Card title="7-Day Action Plan" className="h-full">
                    <div className="space-y-6">
                        {result.plan.map((day) => (
                            <div key={day.day} className="relative pl-6 border-l-2 border-indigo-100 last:border-0 hover:border-[var(--color-accent)] transition-colors">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[var(--color-accent)]"></div>
                                <h4 className="font-semibold text-[var(--color-primary)]">Day {day.day}: {day.focus}</h4>
                                <ul className="mt-2 space-y-1">
                                    {day.activities.map((activity, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                                            <Calendar className="w-3 h-3 mr-2 mt-1 text-[var(--color-accent)] flex-shrink-0" />
                                            {activity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Questions & Checklist */}
                <div className="space-y-8">
                    <Card title="Likely Interview Questions">
                        <div className="space-y-3">
                            {result.questions.map((q, i) => (
                                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex gap-3 items-start">
                                    <HelpCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-700 font-medium">{q}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card title="Preparation Checklist">
                        <div className="space-y-4">
                            {result.checklist.map((round, i) => (
                                <div key={i} className="border rounded-lg p-4">
                                    <h4 className="font-semibold text-[var(--color-primary)] mb-3 flex items-center">
                                        <Target className="w-4 h-4 mr-2" />
                                        {round.round}
                                    </h4>
                                    <ul className="space-y-2">
                                        {round.items.map((item, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-gray-600">
                                                <div className="w-4 h-4 rounded-full border border-gray-300 mr-3 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
