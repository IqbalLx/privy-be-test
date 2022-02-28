export enum CardType {
    debit = "debit",
    kredit = "kredit"
}

export interface IUserBalanceHistory {
    id?: number,
    userBalanceId: number,
    balanceBefore: number,
    balanceAfter: number,
    activity: string,
    type: CardType,
    ip: string,
    userAgent: string,
    location: string,
    author: string
}