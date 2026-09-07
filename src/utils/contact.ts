export function stripProtocol(url: string): string {
    return url.replace(/^https?:\/\//, '')
}

export function mapsUrl(place: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`
}
