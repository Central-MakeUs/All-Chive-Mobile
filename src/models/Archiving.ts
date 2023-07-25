export interface ArchivingListResponse {
  [category: string]: ArchivingItem[] | []
}

export interface ArchivingItem {
  title: string
  contentCnt: number
}

export interface ContentByArchivingResponse {
  contents: {
    content: [
      {
        contentId: number
        contentTitle: string
        contentType: string
        link: string
        imgUrl: string
        contentCreatedAt: string
        tag: string
        tagCount: number
      }
    ]
    page: number
    size: number
    hasNext: boolean
  }
  archivingTitle: string
  archivingId: number
  totalContentsCount: number
  isMine: boolean
}

export interface MainArchivingListResponse {
  content: ArchivingListContent[]
  page: number
  size: number
  hasNext: boolean
}

export interface ArchivingListContent {
  archivingId: number
  title: string
  imageUrl: string
  createdAt: string
  category: string
  imgCnt: number
  linkCnt: number
  scrapCnt: number
  markStatus: boolean
}