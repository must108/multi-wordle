import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Keyboard from '@/app/components/keyBoard';
import keys from '@/app/keys';

describe('Keyboard', () => {
    it('test first row buttons', () => {
        render(<Keyboard keys={keys}/>);

        for (let i = 0; i < keys[0].length; i++) {
            const letterElement = screen.getByText(keys[0][i]);
            const mockDispatch = vi.spyOn(window, 'dispatchEvent');

            let letter = keys[0][i];
            fireEvent.click(letterElement);
            expect(mockDispatch).toHaveBeenCalledWith(
                new CustomEvent('letterSent', {
                detail: { letter }
            }));
        }
    }); 

    it('test second row buttons', () => {
        render(<Keyboard keys={keys}/>);

        for (let i = 0; i < keys[1].length; i++) {
            const letterElement = screen.getByText(keys[1][i]);
            const mockDispatch = vi.spyOn(window, 'dispatchEvent');

            let letter = keys[1][i];
            fireEvent.click(letterElement);
            expect(mockDispatch).toHaveBeenCalledWith(
                new CustomEvent('letterSent', {
                detail: { letter }
            }));
        }
    }); 

    it('test third row buttons', () => {
        render(<Keyboard keys={keys}/>);

        for (let i = 0; i < keys[2].length; i++) {
            const letterElement = screen.getByText(keys[2][i]);
            const mockDispatch = vi.spyOn(window, 'dispatchEvent');

            let letter = keys[2][i];
            fireEvent.click(letterElement);
            expect(mockDispatch).toHaveBeenCalledWith(
                new CustomEvent('letterSent', {
                detail: { letter }
            }));
        }
    }); 

    it('test enter button', () => {
        render(<Keyboard keys={keys}/>);

        const enterElement = screen.getByText(/enter/i);
        const mockDispatch = vi.spyOn(window, 'dispatchEvent');

        fireEvent.click(enterElement);
        expect(mockDispatch).toHaveBeenCalledWith(
            new CustomEvent('enterPressed')
        )
    });

    it('test delete button', () => {
        render(<Keyboard keys={keys} />);

        const deleteElement = screen.getByText(/del/i);
        const mockDispatch = vi.spyOn(window, 'dispatchEvent');
        
        fireEvent.click(deleteElement);
        expect(mockDispatch).toHaveBeenCalledWith(
            new CustomEvent('deleteLetter')
        )
    });
})