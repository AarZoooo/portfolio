const companyLogoModules = import.meta.glob('./logos/companies/*.{svg,png}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const schoolLogoModules = import.meta.glob('./logos/schools/*.{svg,png}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const techLogoModules = import.meta.glob('./logos/tech/*.{svg,png}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const avatarModules = import.meta.glob('./avatar/*.{svg,png,jpg,jpeg}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const resumeModules = import.meta.glob('./resume/*.pdf', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const byBasename = (mods: Record<string, string>): Record<string, string> => {
    const out: Record<string, string> = {}
    for (const [path, url] of Object.entries(mods)) {
        const file = path.slice(path.lastIndexOf('/') + 1)
        const base = file.replace(/\.[^.]+$/, '')
        out[base] = url
    }
    return out
}

const companyLogos = byBasename(companyLogoModules)
const schoolLogos = byBasename(schoolLogoModules)
const techLogos = byBasename(techLogoModules)
const avatars = byBasename(avatarModules)
const resumes = byBasename(resumeModules)

export const assets = {
    avatar: (key: string): string | undefined => avatars[key],
    resume: (key: string): string | undefined => resumes[key],
    companyLogo: (key: string): string | undefined => companyLogos[key],
    schoolLogo: (key: string): string | undefined => schoolLogos[key],
    techLogo: (key: string): string | undefined => techLogos[key],
}
