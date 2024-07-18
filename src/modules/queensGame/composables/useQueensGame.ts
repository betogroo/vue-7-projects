import { ref } from 'vue'
import type { Board, CellColors, Queen } from '../types/QueensGame'

const useQueensGame = () => {
  const isPending = ref(false)
  const error = ref(null)
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
  }

  const resetValidations = () => {
    queens.value.forEach((queen) => (queen.valid = true))
  }
  const validateBoard = () => {
    resetValidations()
    for (const queen of queens.value) {
      const { row, col } = queen
      const cell = board.value[row][col]
      const rowValid = validateRow(row)
      const colValid = validateCol(col)
      const sectionValid = validateSection(cell.section!)
      queen.valid = rowValid && colValid && sectionValid
    }
  }

  function validateSection(section: number) {
    const queensInSection = queens.value.filter((queen) => {
      const { row, col } = queen
      return board.value[row][col].section === section
    })

    if (queensInSection.length > 1) {
      queensInSection.forEach((queen) => (queen.valid = false))
      return false
    }
    return true
  }

  const validateRow = (rowIndex: number) => {
    const queensInRow = queens.value.filter((queen) => queen.row === rowIndex)
    if (queensInRow.length > 1) {
      console.log('Rainha Inválida - Colocar agora a lógica')
      queensInRow.forEach((queen) => (queen.valid = false))
      return false
    } else {
      console.log('Pode ser uma rainha válida - Colocar agora a lógica')
      return true
    }
  }
  const validateCol = (colIndex: number) => {
    const queensInCol = queens.value.filter((queen) => queen.col === colIndex)
    if (queensInCol.length > 1) {
      console.log('Rainha Inválida - Colocar agora a lógica')
      queensInCol.forEach((queen) => (queen.valid = false))
      return false
    } else {
      console.log('Pode ser uma rainha válida - Colocar agora a lógica')
      return true
    }
  }

  const onGridClick = (rowIndex: number, cellIndex: number) => {
    const cell = board.value[rowIndex][cellIndex]
    if (cell.content === '') board.value[rowIndex][cellIndex].content = 'marked'
    else if (cell.content === 'marked') {
      {
        board.value[rowIndex][cellIndex].content = 'queen'
        queens.value.push({ row: rowIndex, col: cellIndex, valid: true })
      }
    } else if (cell.content === 'queen') {
      board.value[rowIndex][cellIndex].content = ''
      queens.value = queens.value.filter(
        (queen) => queen.row !== rowIndex || queen.col !== cellIndex,
      )
    }

    validateBoard()

    // console.log(cell, rowIndex, cellIndex)
  }
  return {
    isPending,
    error,
    resetBoard,
    onGridClick,
    createBoard,
    createGame,
    board,
    queens,
    hard,
    easy,
    medium,
  }
}

export default useQueensGame
