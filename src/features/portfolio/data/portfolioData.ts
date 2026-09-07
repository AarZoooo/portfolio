// Validated once at build time so every consumer gets a typed, schema-checked object.
import { portfolioSchema } from '@type/portfolio'
import data from './data.json'

export const portfolioData = portfolioSchema.parse(data)
