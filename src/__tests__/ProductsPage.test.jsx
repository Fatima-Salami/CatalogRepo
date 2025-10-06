import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductsPage from '../components/ProductsPage'
import { useRequests } from '../providers/RequestsContext'
import { vi } from 'vitest'

// Mock MUI DataGrid
vi.mock('@mui/x-data-grid', () => ({
  DataGrid: (props) => <div data-testid="datagrid">{props.rows?.map(r => <div key={r.id}>{r.name}</div>)}</div>
}))

// Mock Data
const mockProducts = [
  { id: 1, name: 'Apple', category: 'Fruit', price: 1, rating: 4, description: 'Fresh apple' },
  { id: 2, name: 'Banana', category: 'Fruit', price: 2, rating: 5, description: 'Ripe banana' },
  { id: 3, name: 'Carrot', category: 'Vegetable', price: 1.5, rating: 3, description: 'Orange carrot' },
]

// Mock RequestsContext API
vi.mock('../providers/RequestsContext', () => ({
  useRequests: vi.fn(),
}))



describe('ProductsPage', () => {
  beforeEach(() => {
    useRequests.mockReturnValue({
      api: vi.fn(() => Promise.resolve({ data: mockProducts })),
    })
  })

  test('renders title', () => {
    render(<ProductsPage />)
    expect(screen.getByText(/Products Catalog/i)).toBeInTheDocument()
  })

 test('renders all products', async () => {
    render(<ProductsPage />)
    for (const product of mockProducts) {
      expect(await screen.findByText(product.name)).toBeInTheDocument()
    }
  })


  test('filters products by search term', async () => {
    render(<ProductsPage />)
    const input = screen.getByLabelText(/Search/i)

    await userEvent.type(input, 'Banana')

    expect(await screen.findByText('Banana')).toBeInTheDocument()
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
  })

})
