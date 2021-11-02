import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Modal from "./Modal";

const mockStore = configureStore()

describe("Modal component", () => {
    it("should render", () => {
        const store = mockStore({})
        render(<Provider store={store}><Modal /></Provider>)
    })
    it('should render with header', () => {
        const text = 'Some header';
        const store = mockStore({})
        const { getByText } = render(<Provider store={store}><Modal />{text}</Provider>);
        getByText(text)
    })

    it("should contains class modal-box", () => {
        const store = mockStore({})
        render(<Provider store={store}><Modal /></Provider>)
        const el = screen.getByTestId('modal-backdrop')
        expect(el.classList).toContain('modal-box')
    })
})