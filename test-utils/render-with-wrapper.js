import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { useState } from 'react'
import { DataProvider } from 'components/providers/DataProvider'
import { ModalProvider } from 'components/providers/ModalProvider'
import { StyleProvider } from 'components/providers/StyleProvider'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'

export function renderWithWrapper(component, options) {
  const Wrapper = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
      <QueryClientProvider client={queryClient}>
        <RulesProviderLivraison>
          <DataProvider>
            <StyleProvider>
              <ModalProvider>{children}</ModalProvider>
            </StyleProvider>
          </DataProvider>
        </RulesProviderLivraison>
      </QueryClientProvider>
    )
  }

  return render(component, { wrapper: Wrapper, ...options })
}
