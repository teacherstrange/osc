import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SpritesheetProvider } from '../src/components/Icon/Icon';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <MemoryRouter>
            <SpritesheetProvider>{children}</SpritesheetProvider>
        </MemoryRouter>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
