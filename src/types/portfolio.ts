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
    /** Short one-liners shown in the collapsed card. */
    summary: string[]
    /** Self-contained paragraphs shown in the expanded view; replaces
     *  the summary when open. Optional — absence = no expand toggle. */
    detail?: string[]
    tech: string[]
}

export interface Education {
    institution: string
    degree: string
    duration: string
    logo: string
    score?: string
    highlights?: string[]
}

export interface Project {
    name: string
    context: string
    date: string
    logo: string
    github: string
    live: string
    /** Short one-liners shown in the collapsed card. */
    summary: string[]
    /** Self-contained paragraphs shown when expanded; replaces summary. */
    detail?: string[]
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
    scrollHints: string[]
}

export interface Footer {
    taglines: string[]
    meta: string[]
    source: {
        label: string
        href: string
    }
    links?: { label: string; href: string }[]
}

export interface SectionHeadings {
    experience: string
    skills: string
    projects: string
    education: string
    contact: string
}

export interface PortfolioData {
    personal: Personal
    sections: SectionHeadings
    footer: Footer
    hero: Hero
    experience: Experience[]
    education: Education[]
    projects: Project[]
    skills: Skills
}
