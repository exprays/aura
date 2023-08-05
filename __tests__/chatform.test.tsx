import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ChatForm } from '@/components/chatform'; // Replace './ChatForm' with the correct path to your ChatForm component

describe('ChatForm', () => {
  test('renders input field and button', () => {
    const { getByPlaceholderText, getByRole } = render(
      <ChatForm
        input=""
        handleInputChange={() => {}}
        onSubmit={() => {}}
        isLoading={false}
      />
    );

    const inputElement = getByPlaceholderText('Type a message');
    const buttonElement = getByRole('button', { name: 'Send' }); // Replace 'Send' with the button text if needed

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    let inputValue = '';
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      inputValue = e.target.value;
    };

    const { getByPlaceholderText } = render(
      <ChatForm
        input={inputValue}
        handleInputChange={handleInputChange}
        onSubmit={() => {}}
        isLoading={false}
      />
    );

    const inputElement = getByPlaceholderText('Type a message');
    const testInputValue = 'Hello, this is a test message';

    fireEvent.change(inputElement, { target: { value: testInputValue } });

    expect(inputValue).toBe(testInputValue);
  });

  test('calls onSubmit when the form is submitted', () => {
    let formSubmitted = false;
    const onSubmit = () => {
      formSubmitted = true;
    };

    const { getByRole } = render(
      <ChatForm
        input=""
        handleInputChange={() => {}}
        onSubmit={onSubmit}
        isLoading={false}
      />
    );

    const buttonElement = getByRole('button', { name: 'Send' }); // Replace 'Send' with the button text if needed

    fireEvent.click(buttonElement);

    expect(formSubmitted).toBe(true);
  });

  test('disables input and button when isLoading is true', () => {
    const { getByPlaceholderText, getByRole } = render(
      <ChatForm
        input=""
        handleInputChange={() => {}}
        onSubmit={() => {}}
        isLoading={true}
      />
    );

    const inputElement = getByPlaceholderText('Type a message');
    const buttonElement = getByRole('button', { name: 'Send' }); // Replace 'Send' with the button text if needed

    expect(inputElement).toBeDisabled();
    expect(buttonElement).toBeDisabled();
  });

  // Add more tests as needed for other scenarios
});
