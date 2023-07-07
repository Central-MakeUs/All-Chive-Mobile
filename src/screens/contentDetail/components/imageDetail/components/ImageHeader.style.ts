import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  background-color: ${colors.white};
  padding-top: 2%;
  height: 9%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  ${fonts.subtitle1}
`

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 5%;
`