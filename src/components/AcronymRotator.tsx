import React from 'react'
import acronyms from './acronyms'
import { PseudoBox, PseudoBoxProps } from '@chakra-ui/core'

const AcronymRotator: React.FC<PseudoBoxProps> = ({ ...props }) => {
  // Use a fixed initial value for SSR hydration consistency:
  const [acronym, setAcronym] = React.useState('')

  const update = React.useCallback(() => {
    setAcronym((acronym) => {
      const oldIndex = acronyms.indexOf(acronym)
      let newIndex = oldIndex
      while (newIndex === oldIndex) {
        newIndex = Math.round(Math.random() * (acronyms.length - 1))
      }
      return acronyms[newIndex]
    })
  }, [])

  // Update on mount
  React.useEffect(() => {
    update()
  }, [])

  return (
    <PseudoBox onClick={update} cursor="pointer" userSelect="none" {...props}>
      {acronym}
    </PseudoBox>
  )
}

export default AcronymRotator
