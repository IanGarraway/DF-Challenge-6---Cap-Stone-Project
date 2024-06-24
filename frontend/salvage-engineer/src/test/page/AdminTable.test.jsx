import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter  } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";

import AdminTable from "../../components/AdminTable";

import accountData from '../data/users.json'


describe("Admin page tests", () => {
    describe("Basic display of the admin data", () => {
        test("Displays loading if no data is passed in", () => {
            //Arrange

            //Act
            render(<AdminTable accounts={[]} />,
                { wrapper: MemoryRouter }
                       
            )
            //Assert

            expect(screen.getByText("Loading data...")).toBeInTheDocument();
            
        })

        test("Displays account data if data is passed in", () => {
            //Arrange
            console.log(accountData, `<--`);

            //Act
            render(<AdminTable accounts={accountData.data} />,
                { wrapper: MemoryRouter }
                       
            )
            //Assert

            const adminEmails = screen.getAllByTestId("adminEmail");
            const adminNames = screen.getAllByTestId("adminName");

            expect(adminEmails).to.be.an('array').that.has.lengthOf(20);
            expect(adminNames).to.be.an('array').that.has.lengthOf(20);
            
        })
    })


});