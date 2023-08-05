import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar'; // Replace './sidebar' with the correct path to your Sidebar component

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe('Sidebar', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockClear();
    (useRouter as jest.Mock).mockClear();
  });

  test('renders sidebar links correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    const { getByText } = render(<Sidebar />);

    const homeLink = getByText('Home');
    const createLink = getByText('Create');
    const settingsLink = getByText('Settings');

    expect(homeLink).toBeInTheDocument();
    expect(createLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });

  test('navigates to correct URL when link is clicked', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const { getByText } = render(<Sidebar />);

    const createLink = getByText('Create');
    fireEvent.click(createLink);

    expect(pushMock).toHaveBeenCalledWith('/aura/new');
  });

  // Add more tests as needed for other scenarios
});
