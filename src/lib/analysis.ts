import { v4 as uuidv4 } from 'uuid';

export type SkillCategory = 'Core CS' | 'Languages' | 'Web' | 'Data' | 'Cloud/DevOps' | 'Testing';

export interface AnalysisResult {
    id: string;
    createdAt: string; // ISO string
    role: string;
    company: string;
    jdText: string;
    extractedSkills: Record<SkillCategory, string[]>;
    readinessScore: number;
    baseScore?: number; // Store original calculated score
    skillConfidenceMap?: Record<string, 'know' | 'practice'>; // User self-assessment
    plan: { day: number; focus: string; activities: string[] }[];
    checklist: { round: string; items: string[] }[];
    questions: string[];
}

export function updateAnalysis(updatedResult: AnalysisResult) {
    const history = getHistory();
    const index = history.findIndex(item => item.id === updatedResult.id);

    if (index !== -1) {
        history[index] = updatedResult;
        localStorage.setItem('job_history', JSON.stringify(history));

        // If this is the most recent one, update the latest score
        if (index === 0) {
            localStorage.setItem('latest_readiness_score', updatedResult.readinessScore.toString());
        }
    }
}

const KEYWORDS: Record<SkillCategory, string[]> = {
    'Core CS': ['DSA', 'Data Structures', 'Algorithms', 'OOP', 'Object Oriented', 'DBMS', 'Database Management', 'OS', 'Operating Systems', 'Networks', 'Computer Networks'],
    'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C\\+\\+', 'C#', 'Golang', 'Go', 'Rust', 'Ruby', 'Swift', 'Kotlin'], // C\\+\\+ for regex safety if needed, though simple includes check is usually better for simple matching, but we'll use regex for word boundaries
    'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'HTML', 'CSS', 'Tailwind', 'Redux', 'Vue', 'Angular'],
    'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'NoSQL', 'Cassandra', 'Elasticsearch'],
    'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Jenkins', 'Terraform'],
    'Testing': ['Selenium', 'Cypress', 'Playwright', 'Jest', 'JUnit', 'PyTest', 'Mocha', 'Chai']
};

// Helper to escape special regex characters
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractSkills(text: string): Record<SkillCategory, string[]> {
    const extracted: Record<SkillCategory, string[]> = {
        'Core CS': [],
        'Languages': [],
        'Web': [],
        'Data': [],
        'Cloud/DevOps': [],
        'Testing': []
    };

    const lowerText = text.toLowerCase();

    Object.entries(KEYWORDS).forEach(([category, skills]) => {
        skills.forEach(skill => {
            // Special handling for C++ and C# to avoid partial matches on 'C'
            let regexPattern = '';
            if (skill === 'C++') regexPattern = 'c\\+\\+';
            else if (skill === 'C#') regexPattern = 'c#';
            else if (skill === 'C') regexPattern = '\\bc\\b'; // Word boundary for C
            else if (skill === 'Go') regexPattern = '\\bgo\\b';
            else regexPattern = escapeRegExp(skill);

            const regex = new RegExp(regexPattern, 'i');
            if (regex.test(lowerText)) {
                // Store the canonical casing from KEYWORDS
                extracted[category as SkillCategory].push(skill.replace(/\\/g, ''));
            }
        });
    });

    return extracted;
}

export function calculateScore(
    text: string,
    role: string,
    company: string,
    skills: Record<SkillCategory, string[]>
): number {
    let score = 35; // Base score

    // +5 per detected category present
    const categoriesPresent = Object.values(skills).filter(list => list.length > 0).length;
    score += Math.min(categoriesPresent * 5, 30);

    // +10 if company provided
    if (company.trim().length > 0) score += 10;

    // +10 if role provided
    if (role.trim().length > 0) score += 10;

    // +10 if JD length > 800 chars
    if (text.length > 800) score += 10;

    return Math.min(score, 100);
}

export function generatePlan(skills: Record<SkillCategory, string[]>): { day: number; focus: string; activities: string[] }[] {
    const hasWeb = skills['Web'].length > 0;
    const hasData = skills['Data'].length > 0;
    const hasCloud = skills['Cloud/DevOps'].length > 0;

    const plan = [
        { day: 1, focus: "Foundations & Core CS", activities: ["Review OOP concepts", "Revise OS scheduling & memory management", "Network protocols (HTTP, TCP/IP)"] },
        { day: 2, focus: "Language Mastery", activities: ["Deep dive into primary language syntax", "Standard Library / Collections framework", "Memory management in your language"] },
        { day: 3, focus: "Data Structures & Algorithms", activities: ["Arrays, Linked Lists, Stacks, Queues", "Practice 3 Easy + 2 Medium problems", "Time Complexity Analysis"] },
        { day: 4, focus: "Advanced DSA", activities: ["Trees, Graphs, DP", "Practice 2 Medium + 1 Hard problem", "System Design basics"] },
        { day: 5, focus: "Project & Tech Stack", activities: ["Review your resume projects", "Prepare 'Challenges Faced' stories"] },
        { day: 6, focus: "Mock Interviews", activities: ["Peer mock interview", "Behavioral questions (STAR method)", "Whiteboard practice"] },
        { day: 7, focus: "Final Revision", activities: ["Review weak areas", "Formula sheets", "Cheatsheets", "Rest & Mindset"] }
    ];

    // Customize based on skills
    if (hasWeb) {
        plan[4].activities.push("Revise React/Node.js lifecycle & patterns");
        plan[4].focus += " (Web)";
    }
    if (hasData) {
        plan[1].activities.push("SQL Queries & Normalization");
    }
    if (hasCloud) {
        plan[4].activities.push("Docker & CI/CD basics");
    }

    return plan;
}

export function generateChecklist(skills: Record<SkillCategory, string[]>): { round: string; items: string[] }[] {
    // Basic templates
    const round1 = ["Quantitative Aptitude (Time & Work, Speed)", "Logical Reasoning", "Verbal Ability", "Basic Debugging"];
    const round2 = ["Array/String Manipulation", "HashMaps & Sets", "Object Oriented Design Patterns", "Basic SQL Queries"];
    const round3 = ["Project Architecture Deep Dive", "API Design", "Database Schema Design"];
    const round4 = ["Why this company?", "Strengths & Weaknesses", "Situation handling (Conflict)", "Salary expectations"];

    const allSkills = Object.values(skills).flat();

    // Inject specific skills
    if (allSkills.includes("React")) round3.push("React Component Lifecycle & Hooks");
    if (allSkills.includes("Node.js")) round3.push("Event Loop & Async/Await");
    if (allSkills.includes("SQL")) round2.push("Joins, Indexing, Transactions");
    if (allSkills.includes("AWS")) round3.push("Cloud Deployment & Scalability");

    return [
        { round: "Round 1: Aptitude / Basics", items: round1 },
        { round: "Round 2: DSA + Core CS", items: round2 },
        { round: "Round 3: Tech Interview", items: round3 },
        { round: "Round 4: Managerial / HR", items: round4 }
    ];
}

export function generateQuestions(skills: Record<SkillCategory, string[]>): string[] {
    const questions: string[] = [];
    const flatSkills = Object.values(skills).flat();

    // Default questions
    if (questions.length === 0) {
        questions.push("Tell me about yourself.");
        questions.push("Explain one challenging project you worked on.");
        questions.push("What are ACID properties in databases?");
        questions.push("Explain the difference between Process and Thread.");
    }

    if (flatSkills.includes("React")) {
        questions.push("Explain Virtual DOM and how it works.");
        questions.push("What is the difference between useMemo and useCallback?");
    }
    if (flatSkills.includes("Node.js")) {
        questions.push("How does Node.js handle concurrency?");
        questions.push("Explain Middleware in Express.");
    }
    if (flatSkills.includes("Java")) {
        questions.push("Explain the difference between Interface and Abstract Class.");
        questions.push("How does Garbage Collection work in Java?");
    }
    if (flatSkills.includes("Python")) {
        questions.push("Explain Python decorators.");
        questions.push("What is the GIL (Global Interpreter Lock)?");
    }
    if (flatSkills.includes("SQL")) {
        questions.push("Explain Indexing and when to use it.");
        questions.push("What is the difference between INNER and OUTER JOIN?");
    }
    if (flatSkills.includes("DSA")) {
        questions.push("How would you optimize search in a sorted dataset?");
        questions.push("Detect a cycle in a linked list.");
    }

    // Ensure we have at least 10, fill with generic if needed
    const generic = [
        "Explain the CAP theorem.",
        "What happens when you type a URL in the browser?",
        "Explain Polymorphism with a real-world example.",
        "How do you handle API security?",
        "Explain SOLID principles.",
        "What is Dependency Injection?"
    ];

    let i = 0;
    while (questions.length < 10 && i < generic.length) {
        if (!questions.includes(generic[i])) {
            questions.push(generic[i]);
        }
        i++;
    }

    return questions.slice(0, 10);
}

export function analyzeJobDescription(text: string, role: string, company: string): AnalysisResult {
    const extractedSkills = extractSkills(text);
    const score = calculateScore(text, role, company, extractedSkills);
    const plan = generatePlan(extractedSkills);
    const checklist = generateChecklist(extractedSkills);
    const questions = generateQuestions(extractedSkills);

    const result: AnalysisResult = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        role,
        company,
        jdText: text,
        extractedSkills,
        readinessScore: score,
        baseScore: score, // Initialize baseScore
        plan,
        checklist,
        questions
    };

    saveAnalysis(result);
    return result;
}

export function saveAnalysis(result: AnalysisResult) {
    const history = getHistory();
    history.unshift(result);
    // Keep last 50 items
    if (history.length > 50) history.pop();
    localStorage.setItem('job_history', JSON.stringify(history));

    // Also update a 'latest_score' for the dashboard to consume if needed
    localStorage.setItem('latest_readiness_score', result.readinessScore.toString());
}

export function getHistory(): AnalysisResult[] {
    try {
        const stored = localStorage.getItem('job_history');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to parse history", e);
        return [];
    }
}
