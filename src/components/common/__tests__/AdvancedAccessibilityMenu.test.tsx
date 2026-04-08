import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdvancedAccessibilityMenu } from '@/components/common/AdvancedAccessibilityMenu';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  __esModule: true,
  motion: {
    button: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      exit,
      transition,
      variants,
      ...props
    }: any) => <button {...props}>{children}</button>,
    div: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      exit,
      transition,
      variants,
      ...props
    }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<AccessibilityProvider>{component}</AccessibilityProvider>);
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

    expect(
      await screen.findByRole('dialog', {
        name: /menú de configuración de accesibilidad/i,
      })
    ).toBeInTheDocument();
  });

  test('displays all accessibility tabs', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);

    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    const tabs = await screen.findAllByRole('tab');
    expect(tabs).toHaveLength(4);
  });

  test('switches between tabs correctly', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);

    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    const tabs = await screen.findAllByRole('tab');
    fireEvent.click(tabs[1]);

    expect(
      await screen.findByText(/configuración motora/i)
    ).toBeInTheDocument();
  });

  test('toggles high contrast setting', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);

    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    const highContrastToggle = (await screen.findAllByRole('switch'))[0];
    fireEvent.click(highContrastToggle);
    expect(highContrastToggle).toHaveAttribute('aria-checked', 'true');
  });

  test('resets all settings when reset button is clicked', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);

    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    const highContrastToggle = (await screen.findAllByRole('switch'))[0];
    fireEvent.click(highContrastToggle);
    expect(highContrastToggle).toHaveAttribute('aria-checked', 'true');

    const resetButton = screen.getByRole('button', {
      name: /restablecer todo/i,
    });
    fireEvent.click(resetButton);
    expect(highContrastToggle).toHaveAttribute('aria-checked', 'false');
  });

  test('closes menu when close button is clicked', async () => {
    renderWithProvider(<AdvancedAccessibilityMenu />);

    const triggerButton = screen.getByLabelText(/abrir menú de accesibilidad/i);
    fireEvent.click(triggerButton);

    const closeButton = await screen.findByLabelText(
      /cerrar menú de accesibilidad/i
    );
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', {
          name: /menú de configuración de accesibilidad/i,
        })
      ).not.toBeInTheDocument();
    });
  });
});
