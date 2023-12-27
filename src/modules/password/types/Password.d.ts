export type colors = 'error' | 'warning' | 'success'
export type messages = 'fraca' | 'razoável' | 'forte'

export interface SecurityLevel {
  color: colors
  message: messages
  strong?: boolean
}
