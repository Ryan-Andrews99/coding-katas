import { canISurvive } from "./gameOfLife"

describe('game of life tests', () => {

    it('returns true if current cell has 2-3 neighbours', () => {
        const currentCell =  [0,0]
        const currentLivingCells = [[0,0], [0, 5], [1,3], [1,0], [1,1]]
        const willILive = canISurvive(currentCell, currentLivingCells)
        expect(willILive).toBe(true)
        
    })
})