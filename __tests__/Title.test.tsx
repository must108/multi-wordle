import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Title from '@/app/components/title';

describe('Title', () => {
    it('title renders with 0 opacity and changes after timeout', () => {
        vi.useFakeTimers();
        render(<Title />);

        const titleElement = screen.getByText(/multi-wordle/i); 
        expect(titleElement).toHaveClass('opacity-0');

        act(() => {
            vi.advanceTimersByTime(700);
        });
        expect(titleElement).toHaveClass('opacity-100');

        vi.useRealTimers();
    });

    it('button renders with 0 opacity and changes after timeout', () => {
        vi.useFakeTimers();
        render(<Title />);

        const buttonElement = screen.getByText(/play/i);
        expect(buttonElement.parentElement).toHaveClass('opacity-0');

        act(() => {
            vi.advanceTimersByTime(1400);
        });
        expect(buttonElement.parentElement).toHaveClass('opacity-100');

        vi.useRealTimers();
    });

    it('dispatch custom event when button is clicked', () => {
        render(<Title />);

        const buttonElement = screen.getByText(/play/i);
        const mockDispatchEvent = vi.spyOn(window, 'dispatchEvent');

        fireEvent.click(buttonElement);
        expect(mockDispatchEvent).toHaveBeenCalledWith(new CustomEvent('titleToggle'));
    });
});



