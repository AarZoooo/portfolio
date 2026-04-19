export interface Personal {
    name: string
    tagline: string
    email: string
    phone: string
    location: string
    github: string
    linkedin: string
    resume: string
    avatar: string
    summary: string
}

export interface Experience {
    company: string
    role: string
    duration: string
    logo: string
    bullets: string[]
    tech: string[]
}

export interface Education {
    institution: string
    degree: string
    duration: string
    score: string
    logo: string
}

export interface Project {
    name: string
    context: string
    date: string
    logo: string
    github: string
    live: string
    bullets: string[]
    tech: string[]
}

export interface SkillItem {
    name: string
    logo: string
}

export interface Skills {
    languages: SkillItem[]
    frameworks: SkillItem[]
    databases: SkillItem[]
    tools: SkillItem[]
    concepts: string[]
}

export interface Hero {
    taglines: string[]
}

export interface PortfolioData {
    personal: Personal
    hero: Hero
    experience: Experience[]
    education: Education[]
    projects: Project[]
    skills: Skills
}
