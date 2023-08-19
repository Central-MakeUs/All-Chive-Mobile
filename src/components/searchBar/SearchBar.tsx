import React from 'react'

import { defaultIcons } from '@/assets'

import {
  Container,
  RemoveImage,
  RemoveImageContainer,
  SearchImage,
  TextInput,
} from './SearchBar.style'

interface SearchBarProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  onSubmitEditing?: () => void
  onFocus?: () => void
  maxLength?: number
}
/**
 *
 */
export const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onFocus,
  maxLength,
}: SearchBarProps) => {
  return (
    <Container>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        maxLength={maxLength}
      />
      <SearchImage source={defaultIcons.search} />
      {value.length > 0 ? (
        <>
          <RemoveImageContainer onPress={() => onChangeText('')}>
            <RemoveImage source={defaultIcons.xMark} />
          </RemoveImageContainer>
        </>
      ) : (
        <></>
      )}
    </Container>
  )
}
