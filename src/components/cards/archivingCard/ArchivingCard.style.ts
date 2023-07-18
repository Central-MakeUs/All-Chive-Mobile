import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  margin-bottom: 12px;
`

export const Card = styled.View`
  width: 325px;
  height: 107px;
  border-radius: 8px;
  background-color: ${colors.white};
  flex-direction: row;
`

export const Image = styled.Image`
  width: 97px;
  height: 90px;
  top: 9px;
  left: 7px;
`

export const Title = styled.Text`
  ${fonts.subtitle1};
  color: ${colors.gray600};
  top: 13px;
  left: 10px;
  width: 152px;
`

export const Day = styled.Text`
  ${fonts.body4};
  position: absolute;
  bottom: 10px;
  left: 108px;
`

export const CountContainer = styled.View`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  bottom: 10px;
  right: 12px;
  padding: 2px 7px;
  background-color: ${colors.gray200};
  border-radius: 4px;
`

export const CountText = styled.Text`
  ${fonts.body4};
  color: ${colors.white};
`

export const PopupContainer = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
`

export const Styles = {
  shadow: css`
    border-radius: 8px;
  `,
}