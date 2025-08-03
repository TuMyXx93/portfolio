import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdvancedAccessibilityMenu } from '@/components/common/AdvancedAccessibilityMenu';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

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
    <AccessibilityProvider>
      {component}
    </AccessibilityProvider>
  );
};

describe('AdvancedAccessibilityMenu', () => {
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

  test('renders accessibility menu trigger button', () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);
    
    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    expect(triggerButton).toBeInTheDocument();
  });

  test('opens menu when trigger button is clicked', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);
    
    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByText(/accesibilidad/i)).toBeInTheDocument();
    });
  });

  test('displays all accessibility tabs', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);
    
    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /visual/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /motor/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /cognitivo/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /audio/i })).toBeInTheDocument();
    });
  });

  test('switches between tabs correctly', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);
    
    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    await waitFor(() => {
      const motorTab = screen.getByRole('tab', { name: /motor/i });
      fireEvent.click(motorTab);
      expect(screen.getByText(/configuración motora/i)).toBeInTheDocument();
    });
  });

  test('toggles high contrast setting', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);
    
    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    await waitFor(() => {
      const highContrastToggle = screen.getByRole('switch', { name: /alto contraste/i });
      fireEvent.click(highContrastToggle);
      expect(highContrastToggle).toHaveAttribute('aria-checked', 'true');
    });
  });

  test('resets all settings when reset button is clicked', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);
    
    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    await waitFor(() => {
      const resetButton = screen.getByText(/restablecer todo/i);
      fireEvent.click(resetButton);
      
      // Check that high contrast toggle is reset
      const highContrastToggle = screen.getByRole('switch', { name: /alto contraste/i });
      expect(highContrastToggle).toHaveAttribute('aria-checked', 'false');
    });
  });

  test('closes menu when close button is clicked', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);
    
    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    await waitFor(() => {
      const closeButton = screen.getByLabelText(/cerrar menú de accesibilidad/i);
      fireEvent.click(closeButton);
    });

    // Menu should be closed
    expect(screen.queryByText(/configuración visual/i)).not.toBeInTheDocument();
  });
});
