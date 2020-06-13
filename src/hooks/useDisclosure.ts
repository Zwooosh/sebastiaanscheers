import { useState, useCallback } from 'react'

const useDisclosure = (defaultOpen = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onToggle = useCallback(() => {
    const action = isOpen ? onClose : onOpen
    action()
  }, [isOpen, onOpen, onClose])

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  }
}

export default useDisclosure
