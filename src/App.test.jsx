import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
const characterData = require('./mockData/characterApi');
import App from './App';

describe('Should fetch Character Data from Rick and Morty Api and use MSW to mock server requests', () => {
  it('Should display a list of characters', async () => {
    console.log(characterData);
  });
});
