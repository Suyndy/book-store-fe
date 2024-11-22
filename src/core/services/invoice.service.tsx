import api from "../config/api";

class InvoiceService {
  async getAllInvoices() {
    const res = await api.get("/invoices");
    return res.data;
  }
}

// Correct export syntax
export const invoiceService = new InvoiceService();
