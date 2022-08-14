import {useEffect, useState} from 'react'

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  //useEffect Hook 2 values in dependency array which are value and delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value) //setDebouncedValue to value
    }, delay) //setTimeout to delay

    //return function
    //will clear timeout if value changes
    //when we get to end of the delay and if val not changed we will set value
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
