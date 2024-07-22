import { ref } from 'vue'
import type { Board, CellColors, Queen } from '../types/QueensGame'

const useQueensGame = () => {
  const isPending = ref(false)
  const error = ref('')
  const board = ref<Board>([])
  const queens = ref<Queen[]>([])

  const cellColors: CellColors = {
    1: '#007B6C',
    2: '#D18B00',
    3: '#C75D00',
    4: '#0044CC',
    5: '#CC0000',
    6: '#CCCC00',
    7: '#008B8B',
    8: '#8B008B',
  }

  const easy = [
    [1, 1, 1, 1, 1, 3, 3, 3],
    [2, 2, 2, 1, 1, 1, 3, 3],
    [2, 4, 2, 1, 3, 3, 3, 3],
    [5, 4, 2, 1, 3, 3, 3, 3],
    [5, 6, 6, 6, 6, 3, 3, 3],
    [5, 6, 8, 8, 8, 3, 3, 8],
    [7, 6, 6, 7, 8, 8, 8, 8],
    [7, 7, 7, 7, 7, 7, 8, 8],
  ]
  const hard = [
    [1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 2, 2, 2, 3, 3, 3],
    [4, 1, 2, 2, 2, 3, 3, 3],
    [4, 1, 5, 5, 5, 5, 3, 3],
    [4, 1, 5, 5, 5, 5, 6, 6],
    [4, 5, 5, 7, 7, 6, 6, 6],
    [4, 8, 7, 7, 7, 6, 6, 6],
    [8, 8, 8, 7, 7, 6, 6, 6],
  ]

  const medium = [
    [1, 2, 2, 2, 3, 3, 3, 3],
    [1, 2, 2, 2, 2, 2, 2, 3],
    [1, 1, 2, 4, 2, 4, 2, 3],
    [1, 5, 2, 4, 4, 4, 4, 3],
    [1, 5, 5, 6, 7, 7, 4, 3],
    [1, 6, 6, 6, 7, 7, 7, 3],
    [6, 6, 6, 6, 7, 8, 8, 3],
    [6, 6, 6, 6, 7, 7, 8, 3],
  ]

  const createBoard = () => {
    board.value = hard.map((row) =>
      row.map((section) => ({
        content: '',
        section,
        color: cellColors[section],
      })),
    )
  }

  const createGame = () => {
    createBoard()
    console.log(board.value)
    queens.value = []
  }

  const resetBoard = () => {
    createBoard()
    queens.value = []
    error.value = ''
  }

  const resetValidations = () => {
    queens.value.forEach((queen) => (queen.valid = true))
    error.value = ''
  }
  const validateBoard = () => {
    resetValidations()
    for (const queen of queens.value) {
      const { row, col } = queen
      const cell = board.value[row][col]
      const rowValid = validateRow(row)
      const colValid = validateCol(col)
      const diagonalValid = validateDiagonal(queen)
      const sectionValid = validateSection(cell.section!)
      queen.valid = rowValid && colValid && sectionValid && diagonalValid
    }
  }

  const validateDiagonal = (queen: Queen) => {
    const directions = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ]
    let conflicts = false

    const { row: rowIndex, col: colIndex } = queen

    for (const [dx, dy] of directions) {
      const newRow = rowIndex + dx
      const newCol = colIndex + dy
      if (
        newRow >= 0 &&
        newRow < board.value.length &&
        newCol >= 0 &&
        newCol < board.value[0].length
      ) {
        const adjacentQueen = queens.value.find(
          (q) => q.row === newRow && q.col === newCol,
        )
        if (adjacentQueen) {
          queen.valid = false
          adjacentQueen.valid = false
          conflicts = true
          error.value = 'Erro Diagonal'
        }
      }
    }
    return !conflicts
  }

  function validateSection(section: number) {
    const queensInSection = queens.value.filter((queen) => {
      const { row, col } = queen
      return board.value[row][col].section === section
    })

    if (queensInSection.length > 1) {
      queensInSection.forEach((queen) => (queen.valid = false))
      error.value = 'Rainha na mesma seção'
      return false
    }
    return true
  }

  const validateRow = (rowIndex: number) => {
    const queensInRow = queens.value.filter((queen) => queen.row === rowIndex)
    if (queensInRow.length > 1) {
      error.value = 'Rainha na mesma linha'
      queensInRow.forEach((queen) => (queen.valid = false))
      return false
    } else {
      return true
    }
  }
  const validateCol = (colIndex: number) => {
    const queensInCol = queens.value.filter((queen) => queen.col === colIndex)
    if (queensInCol.length > 1) {
      error.value = 'Rainha na mesma coluna'
      queensInCol.forEach((queen) => (queen.valid = false))
      return false
    } else {
      return true
    }
  }

  const onGridClick = (rowIndex: number, colIndex: number) => {
    const cell = board.value[rowIndex][colIndex]
    if (cell.content === '') board.value[rowIndex][colIndex].content = 'marked'
    else if (cell.content === 'marked') {
      {
        board.value[rowIndex][colIndex].content = 'queen'
        queens.value.push({ row: rowIndex, col: colIndex, valid: true })
      }
    } else if (cell.content === 'queen') {
      board.value[rowIndex][colIndex].content = ''
      queens.value = queens.value.filter(
        (queen) => queen.row !== rowIndex || queen.col !== colIndex,
      )
    }

    validateBoard()

    // console.log(cell, rowIndex, colIndex)
  }
  return {
    isPending,
    error,
    resetBoard,
    onGridClick,
    createBoard,
    createGame,
    validateDiagonal,
    board,
    queens,
    hard,
    easy,
    medium,
  }
}

export default useQueensGame
