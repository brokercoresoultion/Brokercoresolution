import { supabase } from './src/lib/supabase';
import { blogData } from './src/data/blogData';

async function seed() {
  console.log('Seeding blogs to Supabase...');
  
  try {
    for (const blog of blogData) {
      const { error } = await supabase.from('blogs').insert({
        slug: blog.slug,
        title: blog.title,
        content: blog.content,
        category: blog.category,
        author_name: blog.author,
        cover_image: blog.image,
        created_at: new Date(blog.date).toISOString()
      });
      
      if (error) {
        console.error('Error inserting:', blog.title, error.message);
      } else {
        console.log('Successfully inserted:', blog.title);
      }
    }
    
    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

seed();
