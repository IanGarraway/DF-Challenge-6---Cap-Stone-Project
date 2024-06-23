
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter, createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";

import AccountManagement from "../../pages/AccountManagement";

describe("Account Management page tests", () => {
    describe("ChangePassword tests", () => {
        test('it should render original and new password boxes', () => {
        render(
            <AccountManagement              
            />,
            { wrapper: MemoryRouter }
        )

        expect(screen.getByTestId("oldPassword")).toBeInTheDocument();
        expect(screen.getByTestId("newPassword")).toBeInTheDocument();
        
    });

    })
})