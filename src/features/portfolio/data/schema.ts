import { z } from 'zod'

const personalSchema = z.object({
    name: z.string(),
    tagline: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    github: z.string(),
    linkedin: z.string(),
    avatar: z.string(),
    summary: z.string(),
    resumeSummary: z.string(),
})

const experienceSchema = z.object({
    company: z.string(),
    role: z.string(),
    duration: z.string(),
    location: z.string().optional(),
    logo: z.string(),
    summary: z.array(z.string()),
    detail: z.array(z.string()).optional(),
    tech: z.array(z.string()),
})

const educationSchema = z.object({
    institution: z.string(),
    degree: z.string(),
    duration: z.string(),
    location: z.string().optional(),
    logo: z.string(),
    score: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    visible: z.boolean(),
})

const projectSchema = z.object({
    name: z.string(),
    context: z.string(),
    date: z.string(),
    logo: z.string(),
    github: z.string(),
    live: z.string(),
    summary: z.array(z.string()),
    detail: z.array(z.string()).optional(),
    tech: z.array(z.string()),
})

const skillItemSchema = z.object({
    name: z.string(),
    logo: z.string(),
})

const skillsSchema = z.object({
    languages: z.array(skillItemSchema),
    frameworks: z.array(skillItemSchema),
    databases: z.array(skillItemSchema),
    tools: z.array(skillItemSchema),
    concepts: z.array(z.string()),
})

const heroSchema = z.object({
    taglines: z.array(z.string()),
    scrollHints: z.array(z.string()),
})

const footerSchema = z.object({
    taglines: z.array(z.string()),
    meta: z.array(z.string()),
    source: z.object({
        label: z.string(),
        href: z.string(),
    }),
    links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
})

const sectionHeadingsSchema = z.object({
    experience: z.string(),
    skills: z.string(),
    projects: z.string(),
    education: z.string(),
    contact: z.string(),
})

const resumeSchema = z.object({
    skillCategories: z.array(
        z.object({
            label: z.string(),
            items: z.array(z.string()),
        }),
    ),
})

export const portfolioSchema = z.object({
    personal: personalSchema,
    sections: sectionHeadingsSchema,
    footer: footerSchema,
    hero: heroSchema,
    experience: z.array(experienceSchema),
    education: z.array(educationSchema),
    projects: z.array(projectSchema),
    skills: skillsSchema,
    resume: resumeSchema,
})

export type Personal = z.infer<typeof personalSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Education = z.infer<typeof educationSchema>
export type Project = z.infer<typeof projectSchema>
export type SkillItem = z.infer<typeof skillItemSchema>
export type Skills = z.infer<typeof skillsSchema>
export type Hero = z.infer<typeof heroSchema>
export type Footer = z.infer<typeof footerSchema>
export type SectionHeadings = z.infer<typeof sectionHeadingsSchema>
export type PortfolioData = z.infer<typeof portfolioSchema>
