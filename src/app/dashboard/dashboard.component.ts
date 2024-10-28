import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats = [
    { title: 'Total Invoices', value: '156', trend: '+12%', icon: 'fa-file-invoice' },
    { title: 'Pending Approval', value: '23', trend: '-5%', icon: 'fa-clock' },
    { title: 'Total Amount', value: '$45,231', trend: '+8%', icon: 'fa-dollar-sign' }
  ];

  recentActivity = [
    { 
      action: 'Invoice Approved', 
      description: 'Invoice #12345 was approved by John Doe',
      time: '2 hours ago',
      status: 'success'
    },
    { 
      action: 'New Invoice', 
      description: 'Invoice #12346 was created',
      time: '5 hours ago',
      status: 'info'
    },
    // Add more mock activities
  ];

  topVendors = [
    { name: 'Vendor A', invoiceCount: 45, totalAmount: 15420 },
    { name: 'Vendor B', invoiceCount: 32, totalAmount: 12300 },
    { name: 'Vendor C', invoiceCount: 28, totalAmount: 9800 },
    { name: 'Vendor D', invoiceCount: 25, totalAmount: 8500 },
  ];

  ngOnInit() {
    this.initInvoicesChart();
    this.initStatusPieChart();
    this.initPaymentMethodsChart();
  }

  private initInvoicesChart() {
    const ctx = document.getElementById('invoicesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Number of Invoices',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              maxTicksLimit: 8 // More y-axis ticks for better readability
            }
          }
        }
      }
    });
  }

  private initStatusPieChart() {
    const ctx = document.getElementById('statusPieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [{
          data: [65, 23, 12],
          backgroundColor: [
            'rgba(34, 197, 94, 0.5)',
            'rgba(234, 179, 8, 0.5)',
            'rgba(239, 68, 68, 0.5)'
          ],
          borderColor: [
            'rgb(34, 197, 94)',
            'rgb(234, 179, 8)',
            'rgb(239, 68, 68)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  private initPaymentMethodsChart() {
    const ctx = document.getElementById('paymentMethodsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Bank Transfer', 'Credit Card', 'Check', 'Other'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: [
            'rgba(59, 130, 246, 0.5)',  // Blue
            'rgba(16, 185, 129, 0.5)',  // Green
            'rgba(249, 115, 22, 0.5)',  // Orange
            'rgba(107, 114, 128, 0.5)'  // Gray
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)',
            'rgb(249, 115, 22)',
            'rgb(107, 114, 128)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}
