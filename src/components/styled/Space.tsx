import { FC, Children, cloneElement } from 'react'
import { space, SpaceProps } from 'styled-system'
import styled from '@emotion/styled'

const classnames = (...args: any[]) => args.join(' ')
const getClassName = (el: any) => (el.props && el.props.className) || ''

export const StyledChildren: FC<{ className?: string } & SpaceProps> = ({
  className,
  children,
}) => {
  const styledChildren = Children.toArray(children).map((child: any) =>
    cloneElement(child, {
      className: classnames(getClassName(child), className),
    })
  )
  return <div>{styledChildren}</div>
}

export const Space = styled(StyledChildren)(space)
Space.displayName = 'Space'
