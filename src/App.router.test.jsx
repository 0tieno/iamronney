import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App routing', () => {
  it('redirects the root route to /work', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /work/i })).toHaveAttribute('aria-current', 'page')
    })
  })

  it('renders 404 route on unknown paths', async () => {
    render(
      <MemoryRouter initialEntries={['/ghost']}>
        <App />
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: /404: route not found/i })).toBeInTheDocument()
  })
})
