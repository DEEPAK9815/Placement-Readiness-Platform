

export const DashboardHome = () => (
    <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Problems Solved</h3>
                <p className="text-4xl font-bold text-indigo-600">24</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Current Streak</h3>
                <p className="text-4xl font-bold text-indigo-600">5 Days</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Mock Rating</h3>
                <p className="text-4xl font-bold text-indigo-600">8.5</p>
            </div>
        </div>
    </div>
);

export const Practice = () => (
    <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Practice Problems</h1>
        <div className="p-12 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
            Practice content pending...
        </div>
    </div>
);

export const Assessments = () => (
    <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Assessments</h1>
        <div className="p-12 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
            Assessments content pending...
        </div>
    </div>
);

export const Resources = () => (
    <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Learning Resources</h1>
        <div className="p-12 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
            Resources content pending...
        </div>
    </div>
);

export const Profile = () => (
    <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">User Profile</h1>
        <div className="p-12 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
            Profile content pending...
        </div>
    </div>
);
