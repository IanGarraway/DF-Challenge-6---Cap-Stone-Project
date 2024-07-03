import {  render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe } from "vitest";
import { queryByDisplayValue } from "@testing-library/react";
import PowerManagement from "../../components/GameScreen/PowerManagement.jsx";
import { click } from "@testing-library/user-event/dist/cjs/convenience/click.js";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock('axios');


describe("Tests on the power management screen", () => {

    beforeEach(() => {        
        axios.patch.mockReset()
        const mockResponsePayload = { status: 200, data: {message: "power changed"} };
            
            axios.patch.mockResolvedValue(mockResponsePayload);
    })
    test("With all on, there are 4 green lights", async ()=> {
        //arrange
        const mockPower = {
            fabricator: true,
            claw: true,
            magnet: true,
            scoop: true
        };
        const mockCaps = {
            maxDist: 4,
            maxPower: 4
        }

        //Act
        render(<PowerManagement power={mockPower} caps={mockCaps} />,
            { wrapper: MemoryRouter }
        )

        const greenLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/GreenLightIcon.png'));
        const redLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/RedLightIcon.png'));

        //Assert
        expect(greenLights).toHaveLength(4);
        expect(redLights).toHaveLength(0);
    })

    test("if all switched off, there are 4 red lights", async ()=> {
        //arrange
        const mockPower = {
            fabricator: true,
            claw: true,
            magnet: true,
            scoop: true
        };
        const mockCaps = {
            maxDist: 4,
            maxPower: 4
        }

        //Act
        render(<PowerManagement power={mockPower} caps={mockCaps} />,
            { wrapper: MemoryRouter }
        )

        const  clawButton = await screen.findByTestId('clawLight');
        const magnetButton = await screen.findByTestId('magnetLight');
        const scoopButton = await screen.findByTestId('scoopLight');
        const fabricatorButton = await screen.findByTestId('fabricatorLight');

        await userEvent.click(clawButton);
        await userEvent.click(magnetButton);
        await userEvent.click(scoopButton);
        await userEvent.click(fabricatorButton);

        const greenLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/GreenLightIcon.png'));
        const redLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/RedLightIcon.png'));

        //Assert
        expect(greenLights).toHaveLength(0);
        expect(redLights).toHaveLength(4);
    })

    test("With all off, there are 4 red lights", async ()=> {
        //arrange
        const mockPower = {
            fabricator: false,
            claw: false,
            magnet: false,
            scoop: false
        };
        const mockCaps = {
            maxDist: 4,
            maxPower: 4
        }

        //Act
        render(<PowerManagement power={mockPower} caps={mockCaps} />,
            { wrapper: MemoryRouter }
        )

        const greenLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/GreenLightIcon.png'));
        const redLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/RedLightIcon.png'));

        //Assert
        expect(greenLights).toHaveLength(0);
        expect(redLights).toHaveLength(4);
    })

    test("if all switched off, then switched on there are 4 green lights", async ()=> {
        //arrange
        const mockPower = {
            fabricator: false,
            claw: false,
            magnet: false,
            scoop: false
        };
        const mockCaps = {
            maxDist: 4,
            maxPower: 4
        }

        //Act
        render(<PowerManagement power={mockPower} caps={mockCaps} />,
            { wrapper: MemoryRouter }
        )

        const  clawButton = await screen.findByTestId('clawLight');
        const magnetButton = await screen.findByTestId('magnetLight');
        const scoopButton = await screen.findByTestId('scoopLight');
        const fabricatorButton = await screen.findByTestId('fabricatorLight');

        await userEvent.click(clawButton);
        await userEvent.click(magnetButton);
        await userEvent.click(scoopButton);
        await userEvent.click(fabricatorButton);

        const greenLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/GreenLightIcon.png'));
        const redLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/RedLightIcon.png'));

        //Assert
        expect(greenLights).toHaveLength(4);
        expect(redLights).toHaveLength(0);
    })

    test("if all switched off, then 2 switched while cap is at 1, all off", async ()=> {
        //arrange
        const mockPower = {
            fabricator: false,
            claw: false,
            magnet: false,
            scoop: false
        };
        const mockCaps = {
            maxDist: 1,
            maxPower: 4
        }

        //Act
        render(<PowerManagement power={mockPower} caps={mockCaps} />,
            { wrapper: MemoryRouter }
        )

        const  clawButton = await screen.findByTestId('clawLight');
        const magnetButton = await screen.findByTestId('magnetLight');
        const scoopButton = await screen.findByTestId('scoopLight');
        const fabricatorButton = await screen.findByTestId('fabricatorLight');

        await userEvent.click(clawButton);
        await userEvent.click(magnetButton);
        

        const greenLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/GreenLightIcon.png'));
        const redLights = screen.getAllByRole('img').filter(img => img.src.includes('parts/RedLightIcon.png'));

        //Assert
        expect(greenLights).toHaveLength(0);
        expect(redLights).toHaveLength(4);
    })
})