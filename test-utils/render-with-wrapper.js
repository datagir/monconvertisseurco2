/* eslint-disable no-import-assign */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { useState } from 'react'
import { ParamProvider } from 'src/providers/ParamProvider'
import TranslationProvider from 'src/providers/TranslationProvider'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))
jest.mock('@incubateur-ademe/publicodes-acv-numerique', () => ({}))

export function renderWithWrapper(component, options) {
  nextRouter.useRouter = jest.fn()
  nextRouter.useRouter.mockImplementation(() => ({ route: '/', asPath: '/', query: {} }))

  console.error = () => {}
  const Wrapper = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
      <QueryClientProvider client={queryClient}>
        <ParamProvider>
          <TranslationProvider>{children}</TranslationProvider>
        </ParamProvider>
      </QueryClientProvider>
    )
  }

  return render(component, { wrapper: Wrapper, ...options })
}
