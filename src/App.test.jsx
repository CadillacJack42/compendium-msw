const characterData = require('./mockData/characterApi');
const pageTwo = require('./mockData/pageTwo');
import { render, screen, waitFor } from '@testing-library/react';
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

  it('Should navigate through pages by clicking provided buttons', async () => {
    server.use(
      rest.get(
        'https://rickandmortyapi.com/api/characters/2',
        (req, res, ctx) => {
          return res(ctx.json(pageTwo));
        }
      )
    );

    render(
      <MemoryRouter initialEntries={['/characters/2']}>
        <App />
      </MemoryRouter>
    );

    await screen.findByText(/cadillac jack/i);

    const nextPage = await screen.findByText('>');
    userEvent.click(nextPage);
    waitFor(() => {
      screen.getByText(/aqua morty/i);
      screen.getByText(/Beth's Mytholog/i);
    });
  });

  it('Should filter characters by dropdown selection', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    screen.findByText(/loding/i);

    const rick = await screen.findByText(/rick sanchez/i);

    const dropdown = screen.getByLabelText('Sort Characters by:');
    const dropdownOptions = screen.getAllByRole('option');
    userEvent.selectOptions(dropdown, 'Alien');
    waitFor(() => {
      expect(screen.getByText(/rick sanchez/i)).not.toBeInTheDocument();
    });
  });
});
