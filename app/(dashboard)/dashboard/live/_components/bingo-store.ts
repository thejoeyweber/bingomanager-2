"use client"

export const BingoStore = {
  calls: [] as string[],
  pendingClaim: false,

  // Example of how you might store marked squares if needed across sessions:
  markedSquares: {} as Record<number, boolean>,

  setCalls(newCalls: string[]) {
    BingoStore.calls = newCalls
  },
  addCall(call: string) {
    BingoStore.calls = [call, ...BingoStore.calls]
  },

  setPendingClaim(val: boolean) {
    BingoStore.pendingClaim = val
  },

  toggleMarkSquare(index: number) {
    BingoStore.markedSquares[index] = !BingoStore.markedSquares[index]
  }
}
