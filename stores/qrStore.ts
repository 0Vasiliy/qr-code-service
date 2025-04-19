import { defineStore } from 'pinia'

interface QRCode {
  id: string;
  data: {
    email: string;
    phone: string;
  };
  template: {
    name: string;
    color: string;
    background: string;
  };
  createdAt: string;
}

export const useQRStore = defineStore('qr', {
  state: () => ({
    qrCodes: [] as QRCode[]
  }),

  actions: {
    loadQRCodes() {
      const savedCodes = localStorage.getItem('qrCodes')
      if (savedCodes) {
        this.qrCodes = JSON.parse(savedCodes)
      }
    },

    saveQRCode(qrCode: Omit<QRCode, 'id' | 'createdAt'>) {
      const newQRCode: QRCode = {
        ...qrCode,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }
      
      this.qrCodes.push(newQRCode)
      localStorage.setItem('qrCodes', JSON.stringify(this.qrCodes))
    },

    deleteQRCode(id: string) {
      this.qrCodes = this.qrCodes.filter(code => code.id !== id)
      localStorage.setItem('qrCodes', JSON.stringify(this.qrCodes))
    }
  },

  getters: {
    getQRCodeById: (state) => (id: string) => {
      return state.qrCodes.find(code => code.id === id)
    }
  }
}) 