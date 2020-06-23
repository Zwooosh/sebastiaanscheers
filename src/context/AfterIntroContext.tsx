import { createContext, useRef, useContext } from 'react'

interface IAfterIntroState {
  isAfterIntro: boolean
  setAfterIntro: (boolean) => void
}

const AfterIntroContext = createContext<IAfterIntroState | undefined>(undefined)

export const AfterIntroProvider = ({ children }) => {
  const afterIntro = useRef(true)

  const setAfterIntro = (value: boolean) => {
    afterIntro.current = value
  }

  return (
    <AfterIntroContext.Provider
      value={{
        isAfterIntro: afterIntro.current,
        setAfterIntro,
      }}
    >
      {children}
    </AfterIntroContext.Provider>
  )
}

export const useAfterIntroContext = () => useContext(AfterIntroContext)
