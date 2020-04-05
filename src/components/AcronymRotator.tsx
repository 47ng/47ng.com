import React from 'react'
import acronyms from './acronyms'
import { PseudoBox, PseudoBoxProps } from '@chakra-ui/core'

const AcronymRotator: React.FC<PseudoBoxProps> = ({ ...props }) => {
  // Use a fixed initial value for SSR hydration consistency:
  const [acronym, setAcronym] = React.useState(null)

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

  if (acronym === null) {
    // Skeleton
    return <PseudoBox w="10em" h="1.25em" bg="gray.300" borderRadius={2} />
  }
  return (
    <PseudoBox onClick={update} cursor="pointer" userSelect="none" {...props}>
      {acronym}
    </PseudoBox>
  )
}

export default AcronymRotator
