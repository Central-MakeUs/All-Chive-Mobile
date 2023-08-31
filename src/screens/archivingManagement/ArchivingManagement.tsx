import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'
import { useQuery, useQueryClient } from 'react-query'

import { getArchivingList } from '@/apis/archiving/ArchivingList'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
import { CreateArchivingModal } from '@/components/modal/archivingModal/createArchivingModal/CreateArchivingModal'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Bottom, PlusButton, PlusButtonText, ScrollContainer } from './ArchivingManagement.style'
import { ArchivingList } from './components/ArchivingList'

/**
 * 아카이빙 관리
 */
export const ArchivingManagement = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [errorDialogVisible, setErrorDialogVisible] = useState(false)

  const { data: archivingListData, isLoading } = useQuery(
    'archivingList',
    () => getArchivingList(),
    {
      /**
       *
       */
      onError: () => {
        setErrorDialogVisible(true)
      },
    }
  )

  /**
   * 생성 모달을 종료합니다.
   */
  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false)
  }

  return (
    <>
      {isLoading && <Loading />}
      <InformationErrorDialog
        isVisible={errorDialogVisible}
        onRetry={() => {
          setErrorDialogVisible(false)
          queryClient.invalidateQueries(['archivingList'])
        }}
        onClick={() => {
          setErrorDialogVisible(false)
        }}
      />
      <DefaultContainer>
        <LeftButtonHeader title={i18n.t('archivingManagement')} />
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={(e) => {
            if (e.nativeEvent.state === State.ACTIVE) {
              navigation.goBack()
            }
          }}
        >
          <ScrollContainer
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {archivingListData &&
              Object.keys(archivingListData).map(
                (category) =>
                  archivingListData[category].length > 0 && (
                    <ArchivingList
                      key={category}
                      category={category}
                      archivingListData={archivingListData[category]}
                    />
                  )
              )}
            <PlusButton onPress={() => setIsCreateModalVisible(true)}>
              <PlusButtonText>{`+ ${i18n.t('addArchiving')}`}</PlusButtonText>
            </PlusButton>
            <Bottom />
          </ScrollContainer>
        </FlingGestureHandler>

        <CreateArchivingModal
          onClose={handleCloseCreateModal}
          isVisible={isCreateModalVisible}
        />
      </DefaultContainer>
    </>
  )
}
