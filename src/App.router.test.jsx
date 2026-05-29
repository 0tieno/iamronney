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
      const workLinks = screen.getAllByRole('link', { name: /work/i })
      expect(workLinks.some((link) => link.getAttribute('aria-current') === 'page')).toBe(true)
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
