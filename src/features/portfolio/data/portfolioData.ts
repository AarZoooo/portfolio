// Validated once at build time so every consumer gets a typed, schema-checked object.
import data from './data.json'
import { portfolioSchema } from './schema'

export const portfolioData = portfolioSchema.parse(data)
