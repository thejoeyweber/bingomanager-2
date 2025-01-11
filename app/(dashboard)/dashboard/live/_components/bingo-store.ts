"use client"

export const BingoStore = {
  calls: [] as string[],
  pendingClaim: false,
  setCalls(newCalls: string[]) {
    BingoStore.calls = newCalls
  },
  addCall(call: string) {
    BingoStore.calls = [call, ...BingoStore.calls]
  },
  setPendingClaim(val: boolean) {
    BingoStore.pendingClaim = val
  }
}
