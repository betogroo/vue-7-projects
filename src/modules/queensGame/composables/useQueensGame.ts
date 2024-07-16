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
  /*  const hard = [
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
  ] */

  const createBoard = () => {
    board.value = easy.map((row) =>
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
  const validateBoard = () => {
    console.log('Validatind Board')
  }
  const onGridClick = (rowIndex: number, cellIndex: number) => {
    const cell = board.value[rowIndex][cellIndex]
    if (cell.content === '') board.value[rowIndex][cellIndex].content = 'marked'
    else if (cell.content === 'marked') {
      {
        board.value[rowIndex][cellIndex].content = 'queen'
        queens.value.push({ row: cellIndex, col: rowIndex, valid: true })
      }
    } else if (cell.content === 'queen') {
      board.value[rowIndex][cellIndex].content = ''
      queens.value = queens.value.filter(
        (queen) => queen.row !== cellIndex || queen.col !== rowIndex,
      )
    }

    validateBoard()
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
  }
}

export default useQueensGame
