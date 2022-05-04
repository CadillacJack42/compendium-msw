const characterData = require('./mockData/characterApi');
import { findByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from './App';

const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    return res(ctx.json(characterData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Should mock Character Data from Rick and Morty Api using msw', () => {
  it('Should display a list of characters', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await screen.findByText(/loading.../i);

    const rick = await screen.findByText(/rick sanchez/i);

    const names = await screen.findAllByRole('heading');
    expect(names.length).toEqual(21);

    userEvent.click(rick);
    await screen.findByAltText(/image of rick sanchez/i);
    await screen.findByText(/rick sanchez/i);
  });

  it('Should navigate through pages by clicking proved buttons', async () => {
    render(
      <MemoryRouter initialEntries={['characters/2']}>
        <App />
      </MemoryRouter>
    );
    await screen.findByText(/cadillac jack/i);
    screen.debug();

    const nextPage = await screen.findByText('<');
    userEvent.click(nextPage);

    // await screen.findByText(/loading.../i);

    await screen.findByText(/morty smith/i);
  });
});
