import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { I18nProvider } from '@/lib/i18n/useTranslation';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<I18nProvider initialLocale="es">{component}</I18nProvider>);
};

describe('LanguageSelector', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(key => (key === 'locale' ? 'es' : null)),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    Object.defineProperty(navigator, 'language', {
      writable: true,
      value: 'es-ES',
    });
  });

  test('renders language selector button', () => {
    renderWithProvider(<LanguageSelector />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
  });

  test('shows only current language reference code without full language names', () => {
    renderWithProvider(<LanguageSelector />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('ES');
    expect(button).not.toHaveTextContent('Español');
    expect(button).not.toHaveTextContent('English');
  });

  test('opens dropdown when clicked with compact code options', () => {
    renderWithProvider(<LanguageSelector />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.queryByText('Español')).not.toBeInTheDocument();
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });

  test('shows all available language codes in dropdown', () => {
    renderWithProvider(<LanguageSelector />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(screen.getAllByText('ES')).toHaveLength(2);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  test('changes language when option is selected', () => {
    renderWithProvider(<LanguageSelector />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const englishOption = screen.getByRole('option', { name: /english/i });
    fireEvent.click(englishOption);

    expect(button).toHaveTextContent('EN');
  });

  test('closes dropdown after selecting language', () => {
    renderWithProvider(<LanguageSelector />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const englishOption = screen.getByRole('option', { name: /english/i });
    fireEvent.click(englishOption);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('marks current language option as selected', () => {
    renderWithProvider(<LanguageSelector />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const spanishOption = screen.getByRole('option', { name: /español/i });
    expect(spanishOption).toHaveAttribute('aria-selected', 'true');

    const englishOption = screen.getByRole('option', { name: /english/i });
    expect(englishOption).toHaveAttribute('aria-selected', 'false');
  });

  test('supports upward dropdown placement', () => {
    renderWithProvider(<LanguageSelector direction="up" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const listbox = screen.getByRole('listbox');
    expect(listbox.className).toContain('bottom-full');
  });

  test('closes dropdown when mobile backdrop is clicked', () => {
    const { container } = renderWithProvider(<LanguageSelector />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const backdrop = container.querySelector('.fixed.inset-0.z-10');
    expect(backdrop).toBeInTheDocument();
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
