/* eslint-disable @typescript-eslint/unbound-method */
import { describe, expect, it, afterEach, vi, beforeEach } from 'vitest';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import PainelBusca from './PainelBusca.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createApp } from 'vue';
import axios from 'axios';

const app = createApp({});
beforeEach(() => {
  const pinia = createPinia();
  app.use(pinia);
  setActivePinia(pinia);
});

// Limpa a renderização após cada teste para evitar os métodos de busca por elemento de encontrarem mais de uma instância do mesmo
afterEach(() => cleanup());

installQuasarPlugin();

const debounce = () => new Promise((resolve) => setTimeout(resolve, 600));

describe('PainelBusca', () => {
  it('deve conter a aba hotel', () => {
    render(PainelBusca);

    const tabHotel = screen.getByRole('tab', { name: 'Hotel' });

    expect(tabHotel).toBeTruthy();
  });

  it('ao clicar na aba hotel, deve exibir o conteúdo do hotel', async () => {
    const user = userEvent.setup();
    render(PainelBusca);

    const tabHotel = screen.getByRole('tab', { name: 'Hotel' });
    await user.click(tabHotel);

    const botaoBuscar = screen.findByRole('button', { name: /buscar hotel/i });
    const inputDestino = screen.getByPlaceholderText(/destino/i);

    expect(botaoBuscar).toBeTruthy();
    expect(inputDestino).toBeTruthy();
  });

  it('ao digitar o terceiro caracter no campo destino, deve buscar cidades', async () => {
    // Escuta o método de busca de cidades
    const spy = vi.spyOn(axios, 'get').mockResolvedValue({
      name: 'Rio de Janeiro',
      state: 'RJ',
      placeId: 1,
    });
    const user = userEvent.setup();

    render(PainelBusca);

    const inputDestino = screen.getByPlaceholderText(/destino/i);

    // Não deve buscar cidades com menos de 3 caracteres
    await user.type(inputDestino, 'Ri');
    expect(spy).not.toHaveBeenCalled();

    // Deve buscar cidades com 3
    await user.clear(inputDestino);
    await user.type(inputDestino, 'Rio');

    // waitFor compensa o tempo de debounce do campo de seleção de destino
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledOnce();
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/cities?name_like=Rio'));
    });

    // Deve buscar cidades com mais de 3 caracteres
    await user.clear(inputDestino);
    await user.type(inputDestino, 'Belo');

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/cities?name_like=Belo'));
    });
  });

  it('clicar em pesquisar deve buscar hoteis', async () => {
    // Escuta o método de busca de hotéis
    const spy = vi.spyOn(axios, 'get').mockResolvedValue({
      data: [
        {
          name: 'Rio de Janeiro',
          state: 'RJ',
          placeId: 1,
        },
      ],
    });
    const user = userEvent.setup();

    render(PainelBusca);

    const inputDestino = screen.getByPlaceholderText(/destino/i);
    const botaoBuscar = screen.getByRole('button', { name: /buscar hotel/i });

    // Digita o destino a pesquisar
    await user.type(inputDestino, 'Rio');
    // Aguarda o debounce
    await debounce();

    // Seleciona uma das cidades
    const cidade = screen.getByRole('option', { name: /rio de janeiro/i });
    await user.click(cidade);

    // Clica em buscar
    await user.click(botaoBuscar);

    expect(spy).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('/hotels'),
      expect.objectContaining({
        params: expect.objectContaining({
          placeId: 1,
        }),
      }),
    );
  });
});
