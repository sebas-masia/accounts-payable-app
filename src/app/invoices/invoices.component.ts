import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { InvoiceService, Invoice } from '../services/invoice.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  providers: [DecimalPipe]
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;
  statusFilter = 'all';

  // Available options for items per page
  rowsPerPageOptions = [5, 10, 25, 50];

  sortColumn: keyof Invoice | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedStatus = 'all';

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
      this.filteredInvoices = [...invoices];
      this.applyFilters();
    });
    initFlowbite();
  }

  applyFilters() {
    this.filteredInvoices = this.invoices
      .filter(invoice => {
        const matchesSearch = 
          invoice.number.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          invoice.vendor.toLowerCase().includes(this.searchTerm.toLowerCase());
        
        const matchesStatus = 
          this.statusFilter === 'all' || 
          invoice.status.toLowerCase() === this.statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
      });
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 1;
    this.applyFilters();
  }

  onStatusFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.statusFilter = target.value;
    this.currentPage = 1;
    this.applyFilters();
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.itemsPerPage, this.filteredInvoices.length);
  }

  getPaginatedInvoices() {
    return this.filteredInvoices.slice(this.getStartIndex(), this.getEndIndex());
  }

  getTotalAmount(): number {
    return this.filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  }

  getPendingCount(): number {
    return this.filteredInvoices.filter(i => i.status === 'Pending').length;
  }

  getOverdueCount(): number {
    return this.filteredInvoices.filter(i => i.status === 'Overdue').length;
  }

  getPaidCount(): number {
    return this.filteredInvoices.filter(i => i.status === 'Paid').length;
  }

  // Add methods for bulk actions
  exportInvoices() {
    // Implement export functionality
    console.log('Exporting invoices...');
  }

  printInvoices() {
    // Implement print functionality
    window.print();
  }

  createNewInvoice() {
    // Implement new invoice creation
    console.log('Creating new invoice...');
  }

  // Add method for bulk selection
  selectedInvoices: Set<number> = new Set();

  toggleSelectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.filteredInvoices.forEach(invoice => this.selectedInvoices.add(invoice.id));
    } else {
      this.selectedInvoices.clear();
    }
  }

  toggleSelect(id: number) {
    if (this.selectedInvoices.has(id)) {
      this.selectedInvoices.delete(id);
    } else {
      this.selectedInvoices.add(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedInvoices.has(id);
  }

  // Method to handle items per page change
  onItemsPerPageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(select.value);
    this.currentPage = 1; // Reset to first page when changing items per page
  }

  // Sorting methods
  sort(column: keyof Invoice) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredInvoices.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return this.sortDirection === 'asc'
        ? (aValue < bValue ? -1 : 1)
        : (bValue < aValue ? -1 : 1);
    });
  }

  getSortIcon(column: keyof Invoice): string {
    if (this.sortColumn !== column) {
      return 'fas fa-sort';
    }
    return this.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  }

  // Status filtering
  onStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedStatus = select.value;
    this.filterInvoices();
  }

  filterInvoices() {
    this.filteredInvoices = this.invoices.filter(invoice => {
      const matchesStatus = this.selectedStatus === 'all' || invoice.status.toLowerCase() === this.selectedStatus.toLowerCase();
      const matchesSearch = !this.searchTerm || 
        invoice.number.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        invoice.vendor.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });

    if (this.sortColumn) {
      this.sort(this.sortColumn);
    }
  }

  // Action methods
  onEdit(invoice: Invoice) {
    console.log('Edit invoice:', invoice);
    // Implement edit functionality
  }

  onDelete(invoice: Invoice) {
    console.log('Delete invoice:', invoice);
    // Implement delete functionality
  }

  onDownload(invoice: Invoice) {
    console.log('Download invoice:', invoice);
    // Implement download functionality
  }
}
