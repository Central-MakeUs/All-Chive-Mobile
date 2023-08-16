import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View``

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  height: 120px;
  padding: 0px 25px;
`

export const BackButton = styled.TouchableOpacity`
  margin-right: 15px;
`

export const LatestContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 11px;
  padding: 0px 25px;
`

export const RelationContainer = styled.View`
  flex-direction: row;
  padding: 0px 60px;
  margin-bottom: 16px;
`

export const SmallImage = styled.Image`
  width: 9px;
  height: 9px;
`

export const LatestSearch = styled.Text`
  ${fonts.body2}
  color: ${colors.gray600};
  margin-bottom: 5px;
`

export const AllRemoveText = styled.Text`
  ${fonts.body2}
  color: ${colors.gray300};
`

export const ItemText = styled.Text`
  ${fonts.body1}
  color: ${colors.gray400};
`

export const TabContainer = styled.View`
  height: 100%;
`
