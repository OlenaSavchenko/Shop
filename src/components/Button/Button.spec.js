import { render, screen, fireEvent } from '@testing-library/react';
import Button from "./Button";

describe("Button component", () => {
    it("should render", () => {
        const { getByRole } = render(<Button type="button" />)
        getByRole('button')
    })

    it('should be clicked', () => {
        const handleClick = jest.fn()
        render(<Button type="button" onClick={handleClick} />)
        const el = screen.getByRole('button')
        fireEvent.click(el)
        expect(handleClick).toHaveBeenCalled()
    })

    it('should matches snapshot', () => {
        const { getByRole } = render(<Button type="button" />)
        const el = getByRole('button')
        expect(el).toMatchSnapshot()
    })
})

