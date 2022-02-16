import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

const BorderlessInput = styled.input`
  border: 0;
  size: 5ch;
  width: 55px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 4px;
  &:hover  {
    background-color: rgba(32,33,36,0.039);
  }
  &.error {
    border-bottom-color: #f44336;
    border-bottom: 2px solid #1976d2;
    pointer-events: none;
  }
`
const Container = styled.div`
  width: 60px;
  display: flex;
  flex-direction: row;
`

const TimeInput = ({ onChange, onFocus, error = false, defaultValue }) => {
  const inputRef = useRef(null)
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    if (defaultValue !== undefined) {
      validate(defaultValue)
    }
  }, [defaultValue])

  const validate = newValue => {
    const [hour, minutes] = newValue.split(':').map(n => Number.parseInt(n, 10))
    if (newValue.length <= 5 &&
        Number.isInteger(hour) &&
        Number.isInteger(minutes) && hour <= 23 && hour >= 0 && minutes >= 0 && minutes <= 59) {
      setValue(newValue)
    }
  }

  const handleOnChange = event => {
    if (!event.target.value.includes(':')) {
      inputRef.current.value = ':'
    }
    const newValue = inputRef.current.value
    onChange(newValue)
    validate(newValue)
  }

  return (
    <BorderlessInput
      className="error"
      type="text"
      pattern="\d{2}:\d{2}"
      ref={inputRef}
      value={value}
      onChange={handleOnChange}
      onFocus={onFocus}
    />
  )
}

export default TimeInput
