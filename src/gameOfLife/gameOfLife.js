const canISurvive = (currentCell, liveCells) => {
    const neighbours = livingNeighbours(currentCell, liveCells)
    return neighbours.length >= 2 && neighbours.length <= 3
};

const canILive  = (currentCell, liveCells) => {
    const neighbours = livingNeighbours(currentCell, liveCells)

    return neighbours.length == 3
}

const livingNeighbours = (cell, liveCells) => liveCells.filter(liveCell => {
    const [xOfLiveCell, yOfLiveCell] = liveCell
    const [xOfCurrentCell, yOfCurrentCell] = cell
    return isDifferentCell(xOfLiveCell, xOfCurrentCell, yOfLiveCell, yOfCurrentCell) && isNeighbour(xOfLiveCell, xOfCurrentCell, yOfLiveCell, yOfCurrentCell)})


const isDifferentCell = (x1, x2, y1, y2) => x1 !== x2 || y1 !== y2
const isNeighbour = (x1, x2, y1, y2) =>  Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1


const nextTick = (livingCells, gridMaximum) => {
    const grid = []
    for (let x = 0; x < gridMaximum; x++){
        for(let y = 0; y< gridMaximum; y++){
            grid.push([x,y])
        }
    }
    const newGrid = grid.filter(cell => {
        if(isCellInLivingCells(cell, livingCells)){
            return canISurvive(cell, livingCells)
        } else {
            return canILive(cell, livingCells)
        }
    })
    return newGrid
}

const isCellInLivingCells = (cell, livingCellCoords) => {
    const cellsString = JSON.stringify(cell)
    const livingCellsString = JSON.stringify(livingCellCoords)
    const exists = livingCellsString.indexOf(cellsString)
    return exists !== -1 
}

const makeGridString = (gridMaximum, livingCells) => {
    const indices = Array.from(Array(gridMaximum).keys())
    return indices.map(yIndex => 
        indices.map(xIndex => {
            if(isCellInLivingCells([xIndex, yIndex], livingCells)){
                return 'x'
            } else {
                return '-'
            }
        }
        ).join('')
    ).reverse().join('\n')
}



const main = async(livingCells, gridSize, generations) => {
    for (let i = 0; i<=generations; i++ ){
        const gridString = makeGridString(gridSize, livingCells)
        console.log(gridString +'\n\n')
        await new Promise(resolve => setTimeout(resolve, 500))
        const nextTickCells = nextTick(livingCells, gridSize)
        livingCells = nextTickCells
}
}
const gridSize = 40
let livingCells = [[5,1],[5,2],[6,1],[6,2],[5,11],[6,11],[7,11],[4,12],[3,13],[3,14],[8,12],[9,13],[9,14],[6,15],[4,16],[5,17],[6,17],[7,17],[6,18],[8,16],[3,21],[4,21],[5,21],[3,22],[4,22],[5,22],[2,23],[6,23],[1,25],[2,25],[6,25],[7,25],[3,35],[4,35],[3,36],[4,36]]
main(livingCells, gridSize, 50)

module.exports = { canISurvive, canILive, nextTick, makeGridString }