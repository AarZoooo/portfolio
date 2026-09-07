// Astro returns image metadata `{ src, ... }` for processed assets;
// raw Vite returns URL strings. Normalize either shape to the URL.
type AssetValue = string | { src: string }

const companyLogoModules = import.meta.glob('./logos/companies/*.{svg,png}', {
    eager: true,
    import: 'default',
}) as Record<string, AssetValue>

const schoolLogoModules = import.meta.glob('./logos/schools/*.{svg,png}', {
    eager: true,
    import: 'default',
}) as Record<string, AssetValue>

const techLogoModules = import.meta.glob('./logos/tech/*.{svg,png}', {
    eager: true,
    import: 'default',
}) as Record<string, AssetValue>

const heroModules = import.meta.glob('./hero/*.{svg,png,jpg,jpeg,gif,webp}', {
    eager: true,
    import: 'default',
}) as Record<string, AssetValue>

const toUrl = (value: AssetValue): string =>
    typeof value === 'string' ? value : value.src

const byBasename = (mods: Record<string, AssetValue>): Record<string, string> => {
    const out: Record<string, string> = {}
    for (const [path, value] of Object.entries(mods)) {
        const file = path.slice(path.lastIndexOf('/') + 1)
        const base = file.replace(/\.[^.]+$/, '')
        out[base] = toUrl(value)
    }
    return out
}

const companyLogos = byBasename(companyLogoModules)
const schoolLogos = byBasename(schoolLogoModules)
const techLogos = byBasename(techLogoModules)
const heroImages = byBasename(heroModules)
export const assets = {
    companyLogo: (key: string): string | undefined => companyLogos[key],
    schoolLogo: (key: string): string | undefined => schoolLogos[key],
    techLogo: (key: string): string | undefined => techLogos[key],
    heroImage: (key: string): string | undefined => heroImages[key],
}
