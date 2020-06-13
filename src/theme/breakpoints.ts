const breakpoints = ['30rem', '48rem', '64rem', '80rem', '90rem']

export const breakpointAliases = ['sm', 'md', 'lg', 'xl', '2xl'] as const
export type BreakpointAliases = typeof breakpointAliases[number]

export default breakpoints
