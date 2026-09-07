import type { Experience } from '@type/portfolio'

export interface ExperienceGroup {
    company: string
    roles: Experience[]
}

/** Group consecutive same-employer roles into one entry. Chronological:
 *  non-adjacent stints at the same employer stay separate. */
export function groupByEmployer(experiences: Experience[]): ExperienceGroup[] {
    const groups: ExperienceGroup[] = []
    for (const exp of experiences) {
        const current = groups.at(-1)
        if (current?.company === exp.company) {
            current.roles.push(exp)
        } else {
            groups.push({ company: exp.company, roles: [exp] })
        }
    }
    return groups
}
