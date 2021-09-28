/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders the search type selectioon', () => {
    render(<Home />)

    const combobox = screen.getByRole('combobox', {
      name: /Specify the type of search being performed/i
    })

    expect(combobox).toBeInTheDocument()
  })

  it('renders the search box', () => {
    render(<Home />)

    const textbox = screen.getByRole('textbox', {
      name: /Enter text to search for using the selected type/i
    })

    expect(textbox).toBeInTheDocument()
  })

  it('renders the a search button', () => {
    render(<Home />)

    const button = screen.getByRole('button', {
      name: /Submit the search/i
    })

    expect(button).toBeInTheDocument()
  })

  it('renders the a reset button', () => {
    render(<Home />)

    const button = screen.getByRole('button', {
      name: /Clear search results and reset to default search type/i
    })

    expect(button).toBeInTheDocument()
  })
})
