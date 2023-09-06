import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { EventCards } from '@/components/EventCards'
import { Card } from '@/components/EventCards/Card'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'

describe('EventCards', () => {
  test('renders single event card correctly', async () => {
    const props = {
      boothNumber: '10',
      boothTime: 'Monday - 8:00 PM',
      btnText: 'Click Me',
      color: 'light',
      date: new Date().toLocaleDateString(),
      description: 'Your awesome description goes here',
      image:
        'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
      location: 'Memphis, TN',
      tag: 'Awesome Tag',
      title: 'Awesome Title',
    }

    act(() => {
      render(<Card {...props} />)
    })

    // Assert that the event card is rendered correctly
    await waitFor(() => {
      expect(
        screen.getByText('Your awesome description goes here')
      ).toBeInTheDocument()
      expect(screen.getByText('Memphis, TN')).toBeInTheDocument()
      expect(screen.getByText('Awesome Title')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('Monday - 8:00 PM')).toBeInTheDocument()
      expect(screen.getByText('Click Me')).toBeInTheDocument()
      expect(
        screen.getByText(new Date().toLocaleDateString())
      ).toBeInTheDocument()
      expect(screen.getByAltText('Event banner')).toBeInTheDocument()
    })
  })
})
