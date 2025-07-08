import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { render, screen } from '@testing-library/vue';
import { beforeEach, describe, expect, it } from 'vitest';
import CardHotel from './CardHotel.vue';
import userEvent from '@testing-library/user-event';
import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

const app = createApp({});
beforeEach(() => {
  const pinia = createPinia();
  app.use(pinia);
  setActivePinia(pinia);
});

installQuasarPlugin();

describe('CardHotel', () => {
  it("ao clicar no botao 'ver detalhes, apresentar modal", async () => {
    // Escuta o método de busca de cidades
    const user = userEvent.setup();
    render(CardHotel, {
      props: {
        hotel: {
          id: 1,
          name: 'Hotel Copacabana Palace',
          stars: 5,
          totalPrice: 580,
          dailyPrice: 290,
          tax: 80,
          thumb: 'https://cdn.quasar.dev/img/parallax2.jpg',
          amenities: [1, 2, 4, 6],
          hasBreakFast: true,
          hasRefundableRoom: true,
          district: 'Copacabana',
          placeId: 1,
        },
      },
    });

    const botaoVerDetalhes = screen.getByRole('button', { name: /ver detalhes/i });

    await user.click(botaoVerDetalhes);

    const modalHotel = screen.findByRole('dialog');

    expect(modalHotel).toBeTruthy();
  });
});
