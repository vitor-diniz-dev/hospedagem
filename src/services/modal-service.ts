import { ref } from 'vue';

export const modalHotel = ref(false);

export function abrirModalHotel() {
  modalHotel.value = true;
}
