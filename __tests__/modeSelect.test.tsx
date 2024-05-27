import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { ModeSelect } from '@/app/components/modeSelect';

describe('ModeSelect', () => {
    it('header renders with 0 opacity and changes after timeout', () => {
        vi.useFakeTimers();
        render(<ModeSelect />);

        const modeElement = screen.getByText(/choose your gamemode:/i);
        expect(modeElement).toHaveClass('opacity-0');

        act(() => {
            vi.advanceTimersByTime(700);
        });
        expect(modeElement).toHaveClass('opacity-100');
        vi.useRealTimers();
    });

    it('four button renders, 0 opacity, ' + 
    'changes after timeout', () => {
        vi.useFakeTimers();
        render(<ModeSelect />);

        const fourButtonElement = screen.getByText(/four/i);
        expect(fourButtonElement.parentElement).toHaveClass('opacity-0');

        act(() => {
            vi.advanceTimersByTime(1400);
        });
        expect(fourButtonElement.parentElement).toHaveClass('opacity-100');
        vi.useRealTimers();
    });

    it('five button renders, 0 opacity, ' +
    'changes after timeout', () => {
        vi.useFakeTimers();
        render(<ModeSelect />);

        const fiveButtonElement = screen.getByText(/five/i);
        expect(fiveButtonElement.parentElement).toHaveClass('opacity-0');

        act(() => {
            vi.advanceTimersByTime(2100);
        });
        expect(fiveButtonElement.parentElement).toHaveClass('opacity-100');
        vi.useRealTimers();
    });

    it('six button renders, 0 opacity, changes ' +
    'after timeout', () => {
        vi.useFakeTimers();
        render(<ModeSelect />);

        const sixButtonElement = screen.getByText(/six/i);
        expect(sixButtonElement.parentElement).toHaveClass('opacity-0');

        act(() => {
            vi.advanceTimersByTime(2800);
        });
        expect(sixButtonElement.parentElement).toHaveClass('opacity-100');
        vi.useRealTimers();
    });

    it('dispatch modeSelect for four button', () => {
        vi.useFakeTimers();
        render(<ModeSelect />);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        const mockDispatchEvent = vi.spyOn(window, 'dispatchEvent');

        const fourButton = screen.getByText('four');
        fireEvent.click(fourButton);
        expect(mockDispatchEvent).toHaveBeenCalledWith(new CustomEvent('modeSelect', {
            detail: { length: 4, size: 3111, wordType: 'fourletter' }
        }));

        vi.useRealTimers();
        mockDispatchEvent.mockRestore();
    }); 

    it('dispatch modeSelect for five button', () => {
        vi.useFakeTimers();
        render(<ModeSelect />);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        const mockDispatchEvent = vi.spyOn(window, 'dispatchEvent');

        const fiveButton = screen.getByText('five');
        fireEvent.click(fiveButton);
        expect(mockDispatchEvent).toHaveBeenCalledWith(new CustomEvent('modeSelect', {
            detail: { length: 5, size: 5782, wordType: 'fiveletter' }
        }));

        vi.useRealTimers();
        mockDispatchEvent.mockRestore();
    }); 

    it('dispatch modeSelect for six button', () => {
        vi.useFakeTimers();
        render(<ModeSelect />);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        const mockDispatchEvent = vi.spyOn(window, 'dispatchEvent');

        const sixButton = screen.getByText('six');
        fireEvent.click(sixButton);
        expect(mockDispatchEvent).toHaveBeenCalledWith(new CustomEvent('modeSelect', {
            detail: { length: 6, size: 2487, wordType: 'sixletter' }
        }));

        vi.useRealTimers();
        mockDispatchEvent.mockRestore();
    }); 

});