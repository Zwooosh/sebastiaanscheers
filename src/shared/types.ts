import { IconType } from 'react-icons/lib'

export const themeVariants = ['dark', 'light'] as const
export type ThemeVariants = typeof themeVariants[number]

export interface ISkill {
  icon: IconType
  iconColor: string
  title: string
  description: string
}
