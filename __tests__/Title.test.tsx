import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Title from '@/app/components/title';

describe('Title', () => {
    jest.useFakeTimers();

    test('title renders with 0 opacity and changes after timeout', () => {
        render(<Title />);

        const titleElement = screen.getByText(/multi-wordle/i); 
        expect(titleElement).toHaveClass('opacity-0');

        act(() => {
            jest.advanceTimersByTime(700);
        });
        expect(titleElement).toHaveClass('opacity-100');
    });

    test('button renders with 0 opacity and changes after timeout', () => {
        render(<Title />);

        const buttonElement = screen.getByText(/play/i);
        expect(buttonElement.parentElement).toHaveClass('opacity-0');

        act(() => {
            jest.advanceTimersByTime(1400);
        });
        expect(buttonElement.parentElement).toHaveClass('opacity-100');
    });

    test('dispatch custom event when button is clicked', () => {
        render(<Title />);

        const buttonElement = screen.getByText(/play/i);
        const mockDispatchEvent = jest.spyOn(window, 'dispatchEvent');

        fireEvent.click(buttonElement);
        expect(mockDispatchEvent).toHaveBeenCalledWith(new CustomEvent('titleToggle'));
    });
});



