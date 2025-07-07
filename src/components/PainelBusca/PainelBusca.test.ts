import { describe, expect, it, afterEach, vi } from 'vitest';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { cleanup, render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import PainelBusca from './PainelBusca.vue';
import * as cidadeService from '../../services/cidade-service';
import * as hoteisService from '../../services/hoteis-service';

installQuasarPlugin();

// Limpa a renderização após cada teste para evitar os métodos de busca por elemento de encontrarem mais de uma instância do mesmo
afterEach(() => cleanup());

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
    const spy = vi.spyOn(cidadeService, 'buscarCidades');
    const user = userEvent.setup();

    render(PainelBusca);

    const inputDestino = screen.getByPlaceholderText(/destino/i);

    // Não deve buscar cidades com menos de 3 caracteres
    await user.type(inputDestino, 'Ri');
    expect(spy).not.toHaveBeenCalled();

    // Deve buscar cidades com 3
    await user.clear(inputDestino);
    await user.type(inputDestino, 'Rio');

    // Deve buscar cidades com mais de 3 caracteres
    await user.clear(inputDestino);
    await user.type(inputDestino, 'Belo');

    expect(spy).toHaveBeenCalledOnce();
  });

  it('clicar em pesquisar deve buscar hoteis', async () => {
    // Escuta o método de busca de hotéis
    const spy = vi.spyOn(hoteisService, 'obterHoteis');
    const user = userEvent.setup();

    render(PainelBusca);

    const inputDestino = screen.getByPlaceholderText(/destino/i);
    const botaoBuscar = screen.getByRole('button', { name: /buscar hotel/i });

    await user.type(inputDestino, 'Rio');

    await user.click(botaoBuscar);

    expect(spy).toHaveBeenCalledOnce();
  });
});
