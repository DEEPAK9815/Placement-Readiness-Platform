import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { analyzeJobDescription } from '../../lib/analysis';

interface AnalysisFormProps {
    onAnalyze: (result: any) => void;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({ onAnalyze }) => {
    const [jdText, setJdText] = useState('');
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAnalyzing(true);

        // Simulating a brief delay for UX
        setTimeout(() => {
            const result = analyzeJobDescription(jdText, role, company);
            onAnalyze(result);
            setIsAnalyzing(false);
        }, 800);
    };

    return (
        <Card title="Analyze Job Description" className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Role / Job Title</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Senior React Developer"
                            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Company (Optional)</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. Google"
                            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Paste Job Description *</label>
                    <textarea
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        placeholder="Paste the full JD here..."
                        rows={8}
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-y"
                        required
                    />
                    <p className="text-xs text-gray-500 text-right">{jdText.length} characters</p>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" isLoading={isAnalyzing} disabled={jdText.length < 50}>
                        Analyze JD
                    </Button>
                </div>
            </form>
        </Card>
    );
};
