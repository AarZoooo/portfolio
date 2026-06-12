import type { APIRoute } from 'astro'
import fs from 'node:fs'
import path from 'node:path'

export const GET: APIRoute = () => {
    const filePath = path.resolve('src/assets/resume/resume.pdf')
    const buffer = fs.readFileSync(filePath)
    return new Response(buffer, {
        headers: {
            'Content-Type': 'application/pdf',
        },
    })
}
