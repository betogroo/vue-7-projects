export interface AppParam {
  title: string
  description: string
  name: { name: string; params?: { id: number | string } }
}
