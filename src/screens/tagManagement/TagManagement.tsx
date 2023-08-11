import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { useMutation, useQuery } from 'react-query'

import { deleteTag, getTag, postTag } from '@/apis/tag'
import { InputDialog } from '@/components/dialogs/inputDialog/InputDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import {
  ButtonText,
  DeleteButton,
  GrayDivider,
  PlusButton,
  TagListContainer,
  Text,
} from './TagManagement.style'
import { TagList } from './components/TagList'

/**
 * 마이페이지 '태그 관리'
 */
export const TagManagement = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const [editMode, setEditMode] = useState(false)
  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false)
  const [text, setText] = useState('')

  const { data: tagData } = useQuery(['getTagData'], () => getTag(false))

  const { mutate: postTagMutate } = useMutation(postTag)

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => (
        <LeftButtonHeader
          title={i18n.t('tagManagement')}
          rightButtonText={editMode ? i18n.t('complete') : i18n.t('edit')}
          rightButtonClick={() => setEditMode(!editMode)}
        />
      ),
    })
  })

  /**
   * 새로운 태그를 생성합니다.
   */
  const handleCreate = () => {
    postTagMutate(text)
    // getTag 리패치 필요
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {tagData && editMode
          ? tagData?.map((tag) => (
              <>
                <TagList
                  id={tag.tagId}
                  name={tag.name}
                  editMode={true}
                />
              </>
            ))
          : tagData?.map((tag) => (
              <>
                <TagList
                  id={tag.tagId}
                  name={tag.name}
                  editMode={false}
                />
              </>
            ))}

        <PlusButton onPress={() => setIsCreateDialogVisible(true)}>
          <ButtonText>{`+ ${i18n.t('addTag')}`}</ButtonText>
        </PlusButton>
      </ScrollView>
      <InputDialog
        isVisible={isCreateDialogVisible}
        title="createNewTag"
        text={text}
        setText={setText}
        completeText="register"
        onCancel={() => {
          setIsCreateDialogVisible(false)
        }}
        onComplete={() => {
          setIsCreateDialogVisible(false)
          handleCreate()
        }}
        isDisabled={text.length === 0}
        placeholder={i18n.t('placeHolderTag')}
      />
    </>
  )
}
