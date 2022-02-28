export interface IDatabaseConnection {
    databaseHost: string,
    databasePort: number,
    databaseUsername: string,
    databasePassword: string,
    databaseSchema: string,
}

export interface IDatabase {
    buildConnection(config: IDatabaseConnection): void
    buildModel(): void
    getModels(): any
}