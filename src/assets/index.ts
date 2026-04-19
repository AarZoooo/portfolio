import avatarUrl from './avatar/avatar.png'
import resumeUrl from './resume/resume.pdf'

const companyLogos = import.meta.glob('./logos/companies/*.{svg,png}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const schoolLogos = import.meta.glob('./logos/schools/*.{svg,png}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const techLogos = import.meta.glob('./logos/tech/*.{svg,png}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const toMap = (entries: Record<string, string>, dir: string): Record<string, string> => {
    const out: Record<string, string> = {}
    for (const [path, url] of Object.entries(entries)) {
        const file = path.slice(path.lastIndexOf('/') + 1)
        out[file] = url
    }
    void dir
    return out
}

export const assets = {
    avatar: avatarUrl,
    resume: resumeUrl,
    companyLogo: (file: string): string | undefined => toMap(companyLogos, 'companies')[file],
    schoolLogo: (file: string): string | undefined => toMap(schoolLogos, 'schools')[file],
    techLogo: (file: string): string | undefined => toMap(techLogos, 'tech')[file],
}
