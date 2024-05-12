import React from 'react'
import CodePush from 'react-native-code-push'

import { NavigationContainer } from '@react-navigation/native'
import { Platform, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import { RootStack } from '@/navigations/RootStack'

const queryClient = new QueryClient()

/**
 * App
 */
function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle={`${Platform.OS === 'android' ? 'light-content' : 'dark-content'}`} />
        <RecoilRoot>
          <MenuProvider>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </MenuProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

const codePushOptions = {
  updateDialog: {
    mandatoryUpdateMessage: '필수 업데이트가 존재합니다.',
    mandatoryContinueButtonLabel: '계속',
    title: '업데이트',
    optionalUpdateMessage: '업데이트 하시겠습니까?',
    optionalInstallButtonLabel: '업데이트',
    optionalIgnoreButtonLabel: '취소',
  },
}

export default CodePush(codePushOptions)(App)
