import { parseInput, returnConnections } from './index'

describe('parseInput', () => {
	it('returns a 2d array ftom input text', () => {
		expect(
			parseInput(`.....
        .F-7.
        .|.|.
        .L-J.
        .....`)
		).toStrictEqual([
			['.', '.', '.', '.', '.'],
			['.', 'F', '-', '7', '.'],
			['.', '|', '.', '|', '.'],
			['.', 'L', '-', 'J', '.'],
			['.', '.', '.', '.', '.'],
		])
	})
})

describe('returnConnections', () => {
	it('- character connects east west from current location', () => {
		expect(returnConnections('-', [1, 1])).toStrictEqual([
			[0, 1],
			[2, 1],
		])
	})

	it('does not return negative coords ', () => {
		expect(returnConnections('-', [0, 0])).toStrictEqual([[1, 0]])
	})

	it('. character connects nothing', () => {
		expect(returnConnections('.', [1, 1])).toStrictEqual([])
	})

	it('| character connects north south', () => {
		expect(returnConnections('|', [1, 1])).toStrictEqual([
			[1, 0],
			[1, 2],
		])
	})

	it('L character connects north east', () => {
		expect(returnConnections('L', [1, 1])).toStrictEqual([
			[1, 0],
			[2, 1],
		])
	})

	it('7 character connects south west', () => {
		expect(returnConnections('7', [1, 1])).toStrictEqual([
			[1, 2],
			[2, 1],
		])
	})

	it('F character connects south east', () => {
		expect(returnConnections('F', [1, 1])).toStrictEqual([
			[1, 2],
			[0, 1],
		])
	})

	it('S character connects to all possible directions', () => {
		expect(returnConnections('S', [1, 1])).toStrictEqual([ //n s e w
			[1, 0],
			[1, 2],
			[0, 1],
			[2, 1],
		])
	})
})

/*
traverse(coords:[x,y], map:string[][], steps = 0 ):number

*/
