import useShortcuts from '@hooks/useShortcuts'

const SECTION_IDS = ['hero', 'experience', 'skills', 'projects', 'education', 'contact']

/** Pure behavior island — mounts the global keyboard shortcuts. Hydrate `client:idle`. */
export default function Shortcuts() {
    useShortcuts(SECTION_IDS)
    return null
}
