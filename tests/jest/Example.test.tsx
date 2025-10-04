import { render, screen } from '@testing-library/react';
import Example from '@/pages/Home';

describe('Example Component', () => {
  it('renders the title', () => {
    render(<Example />);
    const title = screen.getByText('Composant Example');
    expect(title).toBeInTheDocument();
  });

  it('renders the text content', () => {
    render(<Example />);
    const text = screen.getByText(/Exemple de composant avec SASS/);
    expect(text).toBeInTheDocument();
  });

  it('renders the button', () => {
    render(<Example />);
    const button = screen.getByText('Cliquez-moi');
    expect(button).toBeInTheDocument();
  });
});
