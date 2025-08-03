import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { I18nProvider } from '@/lib/i18n/useTranslation';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <I18nProvider>
      {component}
    </I18nProvider>
  );
};

describe('LanguageSelector', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // Mock navigator.language
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

  test('shows current language with flag and name by default', () => {
    renderWithProvider(<LanguageSelector />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🇪🇸');
    expect(button).toHaveTextContent('Español');
  });

  test('opens dropdown when clicked', () => {
    renderWithProvider(<LanguageSelector />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  test('shows all available languages in dropdown', () => {
    renderWithProvider(<LanguageSelector />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  test('changes language when option is selected', () => {
    renderWithProvider(<LanguageSelector />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const englishOption = screen.getByRole('option', { name: /english/i });
    fireEvent.click(englishOption);
    
    // Check that button now shows English
    expect(button).toHaveTextContent('🇺🇸');
    expect(button).toHaveTextContent('English');
  });

  test('closes dropdown after selecting language', () => {
    renderWithProvider(<LanguageSelector />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const englishOption = screen.getByRole('option', { name: /english/i });
    fireEvent.click(englishOption);
    
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('marks current language as selected', () => {
    renderWithProvider(<LanguageSelector />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const spanishOption = screen.getByRole('option', { name: /español/i });
    expect(spanishOption).toHaveAttribute('aria-selected', 'true');
    
    const englishOption = screen.getByRole('option', { name: /english/i });
    expect(englishOption).toHaveAttribute('aria-selected', 'false');
  });

  test('can hide flag when showFlag is false', () => {
    renderWithProvider(<LanguageSelector showFlag={false} />);
    
    const button = screen.getByRole('button');
    expect(button).not.toHaveTextContent('🇪🇸');
    expect(button).toHaveTextContent('Español');
  });

  test('can hide name when showName is false', () => {
    renderWithProvider(<LanguageSelector showName={false} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🇪🇸');
    expect(button).not.toHaveTextContent('Español');
  });

  test('supports keyboard navigation', () => {
    renderWithProvider(<LanguageSelector />);
    
    const button = screen.getByRole('button');
    
    // Open with Enter key
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  test('closes dropdown with Escape key', () => {
    renderWithProvider(<LanguageSelector />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Close with Escape key
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
