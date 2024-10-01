import { render, screen } from '@testing-library/react';
import CustomerService from './customerService';

test('renders learn react link', () => {
  render(<CustomerService />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
