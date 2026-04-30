import useShortcuts from '@hooks/useShortcuts'

const SECTION_IDS = ['hero', 'experience', 'skills', 'projects', 'education', 'contact']

/**
 * Mounts the global keyboard-shortcuts hook. Renders nothing — pure
 * behavior island. Hydrate with `client:idle`; shortcuts can wait until
 * the browser is otherwise quiet.
 */
export default function Shortcuts() {
    useShortcuts(SECTION_IDS)
    return null
}
