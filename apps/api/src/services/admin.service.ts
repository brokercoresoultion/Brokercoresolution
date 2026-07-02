import { supabase } from './supabaseClient';

export class AdminService {
  async getDashboardData() {
    const [subscribers, leads, blogs, admins] = await Promise.all([
      supabase.from('subscribers').select('*').order('created_at', { ascending: false }),
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('blogs').select('*').order('created_at', { ascending: false }),
      supabase.from('admins').select('*')
    ]);

    return {
      subscribers: subscribers.data || [],
      leads: leads.data || [],
      blogs: blogs.data || [],
      admins: admins.data || []
    };
  }

  async updateLead(id: string, data: any) {
    const { error } = await supabase.from('leads').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async deleteLead(id: string) {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async updateSubscriber(id: string, data: any) {
    const { error } = await supabase.from('subscribers').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async deleteSubscriber(id: string) {
    const { error } = await supabase.from('subscribers').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async createBlog(data: any) {
    const { data: blog, error } = await supabase.from('blogs').insert([data]).select();
    if (error) throw new Error(error.message);
    return blog[0];
  }

  async updateBlog(id: string, data: any) {
    const { data: blog, error } = await supabase.from('blogs').update(data).eq('id', id).select();
    if (error) throw new Error(error.message);
    return blog[0];
  }

  async deleteBlog(id: string) {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async createUser(data: any) {
    const { error } = await supabase.from('admins').insert([data]);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async updateUser(id: string, data: any) {
    const { error } = await supabase.from('admins').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async deleteUser(id: string) {
    const { error } = await supabase.from('admins').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }
}

export const adminService = new AdminService();
