import useShortcuts from '@hooks/useShortcuts'

/** Pure behavior island — mounts the global keyboard shortcuts. Hydrate `client:idle`. */
export default function Shortcuts() {
    useShortcuts()
    return null
}
