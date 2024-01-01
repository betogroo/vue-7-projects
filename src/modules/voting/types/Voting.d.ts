export interface BtnAction {
  value: string
  color: string
  text: string
  action?: () => void
  disabled?: boolean
}
