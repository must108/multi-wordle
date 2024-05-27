import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Board, { NUM_BOXES, NUM_GUESSES } from '@/app/components/gameBoard';


describe('Board', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('render initial game board', () => {
        render(<Board />);


        const rows = document.getElementsByClassName('row-render');
        let test = Array.from(rows);
        expect(test.length).toBe(NUM_GUESSES);
        test.forEach(row => {
            const boxes = document.getElementsByClassName('letter-box');
            let boxesTest = Array.from(boxes);
            expect(boxesTest.length).toBe(6);
        })
    });

    it('handles backspace correctly', () => {
        render(<Board />);

        fireEvent(window, new CustomEvent('letterSent', { detail: { letter: 'A' }}));
        fireEvent(window, new KeyboardEvent('keydown', { key: 'Backspace ' }));
        const firstBox = document.getElementsByClassName('row-render')[0].querySelector('.letter-box');
        expect(firstBox).toBeEmptyDOMElement();
    });

    it('submits word on enter press', () => {
        render(<Board />);
        const mockDispatch = vi.spyOn(window, "dispatchEvent");
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        letters.forEach(letter => {
            fireEvent(window, new CustomEvent('letterSent', { detail: { letter } }));
        });
        fireEvent(window, new KeyboardEvent('keydown', { key: 'Enter '}));
        expect(mockDispatch).toHaveBeenCalledWith(new CustomEvent('wordCheck'));
    });
});