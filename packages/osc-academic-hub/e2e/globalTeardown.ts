import type { FullConfig } from '@playwright/test';
import { deleteUser } from './helpers/deleteUser';

async function globalSetup(config: FullConfig) {
    await deleteUser(process.env.FAKE_USER_EMAIL ?? '');
}

export default globalSetup;
