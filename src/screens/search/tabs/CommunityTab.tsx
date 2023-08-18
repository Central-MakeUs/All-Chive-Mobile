import React, { useState } from 'react'

import { useInfiniteQuery, useQueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'

import { getSearch } from '@/apis/search'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { Loading } from '@/components/loading/Loading'
import i18n from '@/locales'
import { SearchResponse } from '@/models/Search'
import { SearchType } from '@/models/enums/SearchType'
import { isCloseToBottom } from '@/services/InfiniteService'
import { SearchTextState } from '@/state/SearchTextState'

import {
  TabArchivingCardContainer,
  TabItemContainer,
  SearchDataText,
  Title,
  ScrollContainer,
  TabHeader,
  Bottom,
} from './Tab.style'

/**
 * 커뮤니티 모두 보여주는 탭
 */
export const CommunityTab = ({ data }: SearchResponse) => {
  const searchText = useRecoilValue(SearchTextState)
  const queryClient = useQueryClient()

  const [endReached, setEndReached] = useState(false)

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(
    ['getSearchInfiniteCommunity', searchText],
    ({ pageParam = 1 }) => getSearch(SearchType.Community, searchText, pageParam, 10),
    {
      enabled: endReached,
      /**
       *
       */
      getNextPageParam: (lastPage) =>
        lastPage.archivings.hasNextPage ? lastPage.archivings.page + 1 : undefined,
      /**
       * 무한스크롤 요청 성공 시 endReached를 false로 변경합니다.
       */
      onSuccess: () => {
        setEndReached(false)
      },
    }
  )

  /**
   * 무한스크롤을 요청합니다.
   */
  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <ErrorDialog
        isVisible={isError}
        onClick={() => queryClient.invalidateQueries(['getSearchInfiniteCommunity', searchText])}
      />

      <ScrollContainer
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setEndReached(true)
            onEndReached()
          }
        }}
      >
        {data.community.content.length === 0 ? (
          <EmptyItem textKey={i18n.t('emptySearch')} />
        ) : (
          <>
            <TabItemContainer>
              <TabHeader>
                <SearchDataText>
                  {i18n.t('numberOfsearchResult', { number: data.community.totalElements })}
                </SearchDataText>
                <Title>{i18n.t('community')}</Title>
              </TabHeader>
              <TabArchivingCardContainer>
                {data !== undefined &&
                  data.community.content.map((item) => (
                    <ArchivingCard
                      key={item.archivingId}
                      item={item}
                      isSearch={true}
                    />
                  ))}
                {infiniteData?.pages &&
                  infiniteData?.pages.map((page, index) => (
                    <React.Fragment key={index}>
                      {page.community.content.map((item) => (
                        <ArchivingCard
                          key={item.archivingId}
                          item={item}
                          isSearch={true}
                        />
                      ))}
                    </React.Fragment>
                  ))}
              </TabArchivingCardContainer>
            </TabItemContainer>
            <Bottom />
          </>
        )}
      </ScrollContainer>
    </>
  )
}
