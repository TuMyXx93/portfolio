import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '@/components/contact/ContactForm';
import { I18nProvider } from '@/lib/i18n/useTranslation';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock fetch
global.fetch = jest.fn();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <I18nProvider>
      <AccessibilityProvider>
        {component}
      </AccessibilityProvider>
    </I18nProvider>
  );
};

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('renders all form fields', () => {
    renderWithProviders(<ContactForm />);
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/asunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    renderWithProviders(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/este campo es requerido/i)).toHaveLength(4);
    });
  });

  test('shows email validation error for invalid email', async () => {
    renderWithProviders(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/correo electrónico inválido/i)).toBeInTheDocument();
    });
  });

  test('clears error when user starts typing', async () => {
    renderWithProviders(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/nombre/i);
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    
    // Trigger validation error
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/este campo es requerido/i)).toBeInTheDocument();
    });
    
    // Start typing to clear error
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    await waitFor(() => {
      expect(screen.queryByText(/este campo es requerido/i)).not.toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithProviders(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } });
    
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Subject',
          message: 'Test message',
        }),
      });
    });
  });

  test('shows success message after successful submission', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithProviders(<ContactForm />);
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } });
    
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/mensaje enviado correctamente/i)).toBeInTheDocument();
    });
  });

  test('shows error message after failed submission', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    renderWithProviders(<ContactForm />);
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } });
    
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error al enviar el mensaje/i)).toBeInTheDocument();
    });
  });

  test('disables form during submission', async () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

    renderWithProviders(<ContactForm />);
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } });
    
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/enviando/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });
});
