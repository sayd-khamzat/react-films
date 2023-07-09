export interface ServerResponse<T> {
    docs: T[]
    total: number
    limit: number
    page: number
    pages: number
}

export interface IMovie {
    name: string
    alternativeName: string
    enName: string
    names: string[]
    type: string
    year: number
    genres: string[]
    countries: string[]
    releaseYears: any[]
    id: number
    description: string
    shortDescription: string
    logo?: string
    poster?: string
    backdrop?: string
    rating: number
    votes: number
    movieLength: number
}
