import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeAll } from "vitest"; // Ensure you import all necessary functions
import '@testing-library/jest-dom'; 
import { MemoryRouter } from "react-router-dom";



// Mock matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), 
      removeListener: vi.fn(), 
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});