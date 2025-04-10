import '@testing-library/jest-dom';

// Mock ResizeObserver which is required by recharts but not available in jsdom
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})); 