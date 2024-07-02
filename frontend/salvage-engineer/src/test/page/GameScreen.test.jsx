import { findAllByTestId, findByTestId, fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter  } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, vi } from "vitest";

import axios from "axios";
import GameScreen from "../../pages/GameScreen";

import gameData from "../data/gamedata.json"

vi.mock('axios');

const mockQuerySelector = vi.fn();
const mockBackGround = vi.fn();
document.querySelector = mockQuerySelector;

describe("Tests of GameScreen", () => {
    

    it("should say loading if no data is returned", async () => {
        //Arrange

        const mockResponsePayload = { status: 401, message: "Unauthorised" };
            
        axios.get.mockResolvedValue(mockResponsePayload);

        //Act
        render(<GameScreen
            setBackGroundImg={mockBackGround}
        />,
            { wrapper: MemoryRouter }
        )

        //Assert
        expect(screen.getByText("Loading")).toBeInTheDocument();

    })

    it("should display data from the gamedata if passed in", async () => {
        //Arrange

        const mockResponsePayload = { status: 200, data: gameData };
            
        axios.get.mockResolvedValue(mockResponsePayload);

        //Act
        render(<GameScreen setBackGroundImg={mockBackGround} />,
            { wrapper: MemoryRouter }
        )

        //Assert
        await waitFor(() => {
            expect(screen.getByText("Novatech ShredTech GrindGear")).toBeInTheDocument();
        })
        expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/data',
            { withCredentials: true }
        );


    })

    describe("Parts Storage tests", () => {
        let mockResponsePayload;

        beforeEach(() => {
            mockResponsePayload = { status: 200, data: gameData };
            
            axios.get.mockResolvedValue(mockResponsePayload);
            
        })

        test("the first item in storage has a gold bg warning in it's class, the 2nd item has bg-dark", async () => {
            //Arrange
            let invButton;
            let invItems;

            //Act
            render(<GameScreen setBackGroundImg={mockBackGround} />,
                { wrapper: MemoryRouter }
            )

            await waitFor(() => {
                invButton = screen.getByTestId("invButton");
            })

            await userEvent.click(invButton);
            
            invItems = screen.getAllByTestId("invItems")

            //Assert

            await waitFor(() => {

                expect(invItems[0]).toHaveClass('card bg-warning text-white');
                expect(invItems[1]).toHaveClass('card bg-dark text-white');
                expect(invItems).toHaveLength(3);
                
            });
        })

        test(" after clicking on it the 2nd item in storage has a bg warning in it's class, the 1st item has bg-dark", async () => {
            //Arrange
            let invbutton;
            let invItems;

            //Act
            render(<GameScreen setBackGroundImg={mockBackGround} />,
                { wrapper: MemoryRouter }
            )

            await waitFor(() => {
                invbutton = screen.getByTestId("invButton");
            })

            await userEvent.click(invbutton);
            
            invItems = screen.getAllByTestId("invItems")
            
            await userEvent.click(invItems[1]);

            //Assert

            expect(invItems[1]).toHaveClass('card bg-warning text-white');
            expect(invItems[0]).toHaveClass('card bg-dark text-white');
        })

        test(" clicking the equip button triggers the axios fetch ", async () => {
            //Arrange
            let invbutton;
            let invItems;
            mockResponsePayload = { status: 200, message: "part changed" };
            axios.patch.mockResolvedValue(mockResponsePayload);
            const mockPart = {
                "name": "Novatech Motor mk2",
                "type": "magnetMotor",
                "manufacturer": "Salvage Tech",
                "mlogo": "salvageTechLogo.png",
                "gathSpd": 2,
                "gathVol": 1
            }

            
            render(<GameScreen setBackGroundImg={mockBackGround} />,
                { wrapper: MemoryRouter }
            )

            await waitFor(() => {
                invbutton = screen.getByTestId("invButton");
            })

            await userEvent.click(invbutton);
            
            invItems = screen.getAllByTestId("invItems")
            //Act

            await userEvent.click(screen.getByTestId("equipButton"))

            //Assert

            expect(axios.patch).toHaveBeenCalledWith(
                'http://localhost:3000/changepart',
                { part: mockPart },
                { withCredentials: true }
            );
            
        })

        test(" clicking the equip button triggers the axios fetch, with a different item selected ", async () => {
            //Arrange
            let invbutton;
            let invItems;
            mockResponsePayload = { status: 200, message: "part changed" };
            axios.patch.mockResolvedValue(mockResponsePayload);
            const mockPart = {
                "name": "Novatech Magnet Core mk2",
                "type": "magnetCore",
                "manufacturer": "Salvage Tech",
                "mlogo": "salvageTechLogo.png",
                "maxQual": 1,
                "gathVol": 2
            }

            
            render(<GameScreen setBackGroundImg={mockBackGround} />,
                { wrapper: MemoryRouter }
            )

            await waitFor(() => {
                invbutton = screen.getByTestId("invButton");
            })

            await userEvent.click(invbutton);
            
            invItems = screen.getAllByTestId("invItems")
            
            await userEvent.click(invItems[1]);
            //Act

            await userEvent.click(screen.getByTestId("equipButton"))

            //Assert

            expect(axios.patch).toHaveBeenCalledWith(
                'http://localhost:3000/changepart',
                { part: mockPart },
                { withCredentials: true }
            );
            
        })

        test(" clicking the scrap button triggers the axios post to /scrappart ", async () => {
            //Arrange
            let invbutton;
            let invItems;
            mockResponsePayload = { status: 200, message: "part scrapped" };
            axios.post.mockResolvedValue(mockResponsePayload);
            const mockPart = {
                "name": "Novatech Motor mk2",
                "type": "magnetMotor",
                "manufacturer": "Salvage Tech",
                "mlogo": "salvageTechLogo.png",
                "gathSpd": 2,
                "gathVol": 1
            }

            
            render(<GameScreen setBackGroundImg={mockBackGround} />,
                { wrapper: MemoryRouter }
            )

            await waitFor(() => {
                invbutton = screen.getByTestId("invButton");
            })

            await userEvent.click(invbutton);
            
            invItems = screen.getAllByTestId("invItems")
            //Act

            await userEvent.click(screen.getByTestId("scrapButton"))

            //Assert

            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3000/scrappart',
                { part: mockPart },
                { withCredentials: true }
            );
            
        })

        test(" clicking the equip button triggers the axios fetch, with a different item selected ", async () => {
            //Arrange
            let invbutton;
            let invItems;
            mockResponsePayload = { status: 200, message: "part changed" };
            axios.patch.mockResolvedValue(mockResponsePayload);
            const mockPart = {
                "name": "Novatech Magnet Core mk2",
                "type": "magnetCore",
                "manufacturer": "Salvage Tech",
                "mlogo": "salvageTechLogo.png",
                "maxQual": 1,
                "gathVol": 2
            }

            
            render(<GameScreen setBackGroundImg={mockBackGround} />,
                { wrapper: MemoryRouter }
            )

            await waitFor(() => {
                invbutton = screen.getByTestId("invButton");
            })

            await userEvent.click(invbutton);
            
            invItems = screen.getAllByTestId("invItems")
            
            await userEvent.click(invItems[1]);
            //Act

            await userEvent.click(screen.getByTestId("scrapButton"))

            //Assert

            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3000/scrappart',
                { part: mockPart },
                { withCredentials: true }
            );
            
        })

        test("Clicking on a part displays only the parts for that slot", async () => {
            //arrange

            //act
            render(<GameScreen setBackGroundImg={mockBackGround} />,
                { wrapper: MemoryRouter }
            )

            await waitFor(async () => {

                await userEvent.click(screen.getByTestId("magnetCoreIcon"))
            });

            //assert

            let invItems = screen.getAllByTestId("invItems")

            //Assert

            await waitFor(() => {

                expect(invItems[0]).toHaveClass('card bg-warning text-white');
                expect(invItems[1]).toHaveClass('card bg-dark text-white');
                expect(invItems).toHaveLength(2);
            });
        })
    });
    test("Clicking on a part displays only the parts for that slot even if there is only 1", async () => {
        //arrange

        //act
        render(<GameScreen setBackGroundImg={mockBackGround} />,
            { wrapper: MemoryRouter }
        )

        await waitFor(async () => {

            await userEvent.click(screen.getByTestId("magnetMotorIcon"))
        });

        //assert

        let invItems = screen.getAllByTestId("invItems")

        //Assert

        await waitFor(() => {

            expect(invItems[0]).toHaveClass('card bg-warning text-white');
            
            expect(invItems).toHaveLength(1);
        });
    });
    test("Clicking on a part displays only the parts for that slot even if there is none", async () => {
        //arrange

        //act
        render(<GameScreen setBackGroundImg={mockBackGround} />,
            { wrapper: MemoryRouter }
        )

        await waitFor(async () => {

            await userEvent.click(screen.getByTestId("magnetMotorIcon"))
        });

        //assert

        let invItems = screen.getAllByTestId("invItems")

        //Assert

        await waitFor(() => {

            expect(invItems[0]).toHaveClass('card bg-warning text-white');
            // const emptyCount = screen.getAllByText("empty");
            // expect(emptyCount).toHaveLength(2)
            
            expect(invItems).toHaveLength(1);
        });
    });

    test("Clicking on a Stats displays the stats screen", async () => {
        //arrange

        //act
        render(<GameScreen setBackGroundImg={mockBackGround} />,
            { wrapper: MemoryRouter }
        )

        await waitFor(async () => {

            await userEvent.click(screen.getByTestId("statsButton"))
        });

        //assert        

        await waitFor(() => {

            expect(screen.getByTestId("clawGathVol").firstChild.nodeValue).to.equal('1')
        });
    });

    test("Clicking on the close Stats hides the stats screen", async () => {
        //arrange

        //act
        render(<GameScreen setBackGroundImg={mockBackGround} />,
            { wrapper: MemoryRouter }
        )

        await waitFor(async () => {

            await userEvent.click(screen.getByTestId("statsButton"))
        });
        await waitFor(() => {

            expect(screen.getByTestId("clawGathVol").firstChild.nodeValue).to.equal('1')
        });

        await userEvent.click(screen.getByTestId("statsClose"))

        let statsCloseCount;

        await waitFor(() => {
            statsCloseCount = screen.getAllByTestId("statsClose");
        })
        


        //assert  
        //expect(statsCloseCount).toHaveLength(0);
    });


    
})