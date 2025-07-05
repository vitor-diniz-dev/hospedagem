import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { render, screen } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import CardHotel from './CardHotel.vue';
import userEvent from '@testing-library/user-event';

installQuasarPlugin();

describe('CardHotel', () => {
  it("ao clicar no botao 'ver detalhes, apresentar modal", async () => {
    const user = userEvent.setup();
    render(CardHotel);

    const botaoVerDetalhes = screen.getByRole('button', { name: /ver detalhes/i });

    await user.click(botaoVerDetalhes);

    const modalHotel = screen.findByRole('dialog');

    expect(modalHotel).toBeTruthy();
  });
});
