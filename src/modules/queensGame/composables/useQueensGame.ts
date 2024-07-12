import { ref } from 'vue'
import { GridContent } from '../types/QueensGame'

const useQueensGame = () => {
  const isPending = ref(false)
  const error = ref(null)

  const boardState = ref<GridContent[]>(['', '', '', '', '', '', '', '', ''])

  const resetBoard = () => {
    boardState.value = ['', '', '', '', '', '', '', '', '']
  }
  const validateBoard = () => {
    console.log('Validatind Board')
  }
  const onGridClick = (i: number, n: GridContent) => {
    if (n === 'queen') boardState.value[i] = ''
    if (n === '') boardState.value[i] = 'marked'
    if (n === 'marked') boardState.value[i] = 'queen'
    validateBoard()
  }
  return { isPending, error, boardState, resetBoard, onGridClick }
}

export default useQueensGame
