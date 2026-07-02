import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as apiClient from '../lib/apiClient';

// Mock the apiClient
vi.mock('../lib/apiClient', () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

describe('AdminDashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock response for the dashboard layout
    (apiClient.get as any).mockResolvedValue({
      data: {
        subscribers: [{ id: 1, email: 'test@example.com' }],
        leads: [],
        blogs: [],
        admins: [],
        currentAdmin: { role: 'superadmin', username: 'admin' }
      }
    });
  });

  it('renders the dashboard layout and navigation tabs', async () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    // Wait for the data to load and remove the loading spinner
    await waitFor(() => {
      expect(screen.queryByText(/Loading dashboard data/i)).not.toBeInTheDocument();
    });

    // Check if main tabs exist
    expect(screen.getByText('Leads')).toBeInTheDocument();
    expect(screen.getByText('Subscribers')).toBeInTheDocument();
    expect(screen.getByText('Blog Posts')).toBeInTheDocument();
    expect(screen.getByText('Admins')).toBeInTheDocument();
  });

  it('fetches dashboard data on mount', async () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith('/admin/dashboard');
    });
  });
});
