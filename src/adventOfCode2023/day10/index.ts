export const parseInput = (input: string): string[][] =>
	input.split('\n').map((line) => line.trim().split(''))

type PipeChar = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S'

const removeNegativeCoords = (coords: number[]) =>
	coords.every((val) => val >= 0)
//in this implementation the concept of a negative coords is disallowed. our top leftmost coords (ie coord[0][0]) will
//be 0,0 and therefore we will have no negatives

export const returnConnections = (
	char: PipeChar,
	coords: [number, number]
): number[][] => {
	const [xCoord, yCoord] = coords
	switch (char) {
	case '-':
		return [
			[xCoord - 1, yCoord],
			[xCoord + 1, yCoord],
		].filter(removeNegativeCoords)
	case '.':
		return []
	case '|':
		return [
			[xCoord, yCoord - 1],
			[xCoord, yCoord + 1],
		].filter(removeNegativeCoords)
	case 'L':
		return [
			[xCoord, yCoord - 1],
			[xCoord + 1, yCoord],
		].filter(removeNegativeCoords)
	case 'J':
		return [
			[xCoord, yCoord - 1],
			[xCoord - 1, yCoord],
		].filter(removeNegativeCoords)
	case '7':
		return [
			[xCoord, yCoord + 1],
			[xCoord + 1, yCoord],
		].filter(removeNegativeCoords)
	case 'F':
		return [
			[xCoord, yCoord + 1],
			[xCoord - 1, yCoord],
		].filter(removeNegativeCoords)
	case 'S':
		return [
			[xCoord, yCoord - 1], //n
			[xCoord, yCoord + 1], //s
			[xCoord - 1, yCoord], //e
			[xCoord + 1, yCoord], //w
		].filter(removeNegativeCoords)
	default:
		throw new Error(`Invalid PipeChar: ${char}`)
	}
}


