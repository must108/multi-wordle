import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ModeSelect } from '@/app/components/modeSelect';

describe('ModeSelect', () => {
    jest.useFakeTimers();

    test('header renders with 0 opacity and changes after timeout', () => {
        render(<ModeSelect />);

        const modeElement = screen.getByText(/choose your gamemode:/i);
        expect(modeElement).toHaveClass('opacity-0');

        act(() => {
            jest.advanceTimersByTime(700);
        });
        expect(modeElement).toHaveClass('opacity-100');
    });

    test('four button renders, 0 opacity, ' + 
    'changes after timeout', () => {
        render(<ModeSelect />);

        const fourButtonElement = screen.getByText(/four/i);
        expect(fourButtonElement.parentElement).toHaveClass('opacity-0');

        act(() => {
            jest.advanceTimersByTime(1400);
        });
        expect(fourButtonElement.parentElement).toHaveClass('opacity-100');

        act(() => {
            jest.advanceTimersByTime(3000);
        });
    });

    test('five button renders, 0 opacity, ' +
    'changes after timeout', () => {
        render(<ModeSelect />);

        const fiveButtonElement = screen.getByText(/five/i);
        expect(fiveButtonElement.parentElement).toHaveClass('opacity-0');

        act(() => {
            jest.advanceTimersByTime(2100);
        });
        expect(fiveButtonElement.parentElement).toHaveClass('opacity-100');
    });

    test('six button renders, 0 opacity, changes ' +
    'after timeout', () => {
        render(<ModeSelect />);

        const sixButtonElement = screen.getByText(/six/i);
        expect(sixButtonElement.parentElement).toHaveClass('opacity-0');

        act(() => {
            jest.advanceTimersByTime(1400);
        });
        expect(sixButtonElement.parentElement).toHaveClass('opacity-100');
    });

    test('dispatch modeSelect for four button', () => {
        render(<ModeSelect />);

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        const mockDispatchEvent = jest.spyOn(window, 'dispatchEvent');

        const fourButton = screen.getByText('four');
        fireEvent.click(fourButton);
        expect(mockDispatchEvent).toHaveBeenCalledWith(new CustomEvent('modeSelect', {
            detail: { length: 4, size: 3111, wordType: 'fourletter' }
        }));

        mockDispatchEvent.mockRestore();
    }); 

    test('dispatch modeSelect for five button', () => {
        render(<ModeSelect />);

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        const mockDispatchEvent = jest.spyOn(window, 'dispatchEvent');

        const fiveButton = screen.getByText('five');
        fireEvent.click(fiveButton);
        expect(mockDispatchEvent).toHaveBeenCalledWith(new CustomEvent('modeSelect', {
            detail: { length: 5, size: 5782, wordType: 'fiveletter' }
        }));

        mockDispatchEvent.mockRestore();
    }); 

    test('dispatch modeSelect for six button', () => {
        render(<ModeSelect />);

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        const mockDispatchEvent = jest.spyOn(window, 'dispatchEvent');

        const sixButton = screen.getByText('six');
        fireEvent.click(sixButton);
        expect(mockDispatchEvent).toHaveBeenCalledWith(new CustomEvent('modeSelect', {
            detail: { length: 6, size: 2487, wordType: 'sixletter' }
        }));

        mockDispatchEvent.mockRestore();
    }); 

});