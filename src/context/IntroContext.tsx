import { createContext, useRef, useContext, useState } from 'react'

interface IIntroState {
  isAfterIntro: boolean
  renderIntro: boolean
  disableIntro: () => void
  setIsAfterIntro: (value: boolean) => void
}

const IntroContext = createContext<IIntroState | undefined>(undefined)

export const IntroProvider = ({ children }) => {
  const isAfterIntro = useRef(true)
  const [renderIntro, setRenderIntro] = useState(
    process.env.NEXT_PUBLIC_RENDER_INTRODUCTION === 'true'
  )

  const setIsAfterIntro = (value: boolean) => {
    isAfterIntro.current = value
  }

  const disableIntro = () => {
    if (renderIntro) {
      setRenderIntro(false)
    }
  }

  return (
    <IntroContext.Provider
      value={{
        isAfterIntro: isAfterIntro.current,
        renderIntro,
        disableIntro,
        setIsAfterIntro,
      }}
    >
      {children}
    </IntroContext.Provider>
  )
}

export const useIntroContext = () => useContext(IntroContext)
