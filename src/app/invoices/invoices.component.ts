import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { initFlowbite } from 'flowbite';

interface Invoice {
  id: number;
  number: string;
  vendor: string;
  amount: number;
  dueDate: string;
  status: string;
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  providers: [DecimalPipe]
})
export class InvoicesComponent implements OnInit {
  invoices = [
    { id: 1, number: 'INV-001', vendor: 'Tech Solutions Inc.', amount: 1500.00, dueDate: '2024-04-15', status: 'Pending' },
    { id: 2, number: 'INV-002', vendor: 'Office Supplies Co.', amount: 750.50, dueDate: '2024-04-20', status: 'Paid' },
    { id: 3, number: 'INV-003', vendor: 'Marketing Agency Ltd', amount: 2500.00, dueDate: '2024-03-30', status: 'Overdue' },
    { id: 4, number: 'INV-004', vendor: 'Cloud Services Pro', amount: 899.99, dueDate: '2024-04-25', status: 'Pending' },
    { id: 5, number: 'INV-005', vendor: 'IT Hardware Corp', amount: 3299.99, dueDate: '2024-04-10', status: 'Paid' },
    { id: 6, number: 'INV-006', vendor: 'Software Solutions LLC', amount: 4500.00, dueDate: '2024-04-18', status: 'Pending' },
    { id: 7, number: 'INV-007', vendor: 'Digital Marketing Co.', amount: 1200.00, dueDate: '2024-03-25', status: 'Overdue' },
    { id: 8, number: 'INV-008', vendor: 'Office Furniture Ltd', amount: 2800.00, dueDate: '2024-04-30', status: 'Paid' },
    { id: 9, number: 'INV-009', vendor: 'Web Hosting Services', amount: 450.00, dueDate: '2024-04-22', status: 'Pending' },
    { id: 10, number: 'INV-010', vendor: 'Consulting Group Inc.', amount: 5000.00, dueDate: '2024-04-05', status: 'Paid' },
    { id: 11, number: 'INV-011', vendor: 'Security Systems Co.', amount: 1750.00, dueDate: '2024-03-28', status: 'Overdue' },
    { id: 12, number: 'INV-012', vendor: 'Training Services Ltd', amount: 950.00, dueDate: '2024-04-28', status: 'Pending' },
    { id: 13, number: 'INV-013', vendor: 'Network Solutions', amount: 3200.00, dueDate: '2024-04-12', status: 'Paid' },
    { id: 14, number: 'INV-014', vendor: 'Data Analytics Pro', amount: 2100.00, dueDate: '2024-04-19', status: 'Pending' },
    { id: 15, number: 'INV-015', vendor: 'Cloud Storage Inc.', amount: 800.00, dueDate: '2024-03-22', status: 'Overdue' },
    { id: 16, number: 'INV-016', vendor: 'Hardware Supplies Co.', amount: 1600.00, dueDate: '2024-04-26', status: 'Pending' },
    { id: 17, number: 'INV-017', vendor: 'Software Licenses Ltd', amount: 4200.00, dueDate: '2024-04-08', status: 'Paid' },
    { id: 18, number: 'INV-018', vendor: 'IT Consulting Group', amount: 3800.00, dueDate: '2024-04-17', status: 'Pending' },
    { id: 19, number: 'INV-019', vendor: 'Office Equipment Co.', amount: 2300.00, dueDate: '2024-03-20', status: 'Overdue' },
    { id: 20, number: 'INV-020', vendor: 'Tech Support Services', amount: 1100.00, dueDate: '2024-04-23', status: 'Pending' }
  ];

  filteredInvoices = [...this.invoices];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;
  statusFilter = 'all';

  // Available options for items per page
  rowsPerPageOptions = [5, 10, 25, 50];

  sortColumn: keyof Invoice | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedStatus = 'all';

  ngOnInit() {
    this.applyFilters();
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
