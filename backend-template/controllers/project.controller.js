const supabase = require('../config/supabase');

// Get all projects (Public)
exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects.',
      error: error.message
    });
  }
};

// Get single project (Public)
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project.',
      error: error.message
    });
  }
};

// Create project (Admin only)
exports.create = async (req, res) => {
  try {
    const { title, description, image_url, tech_stack, github_url, live_url, featured, display_order } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required.'
      });
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({
        title,
        description,
        image_url,
        tech_stack: tech_stack || [],
        github_url,
        live_url,
        featured: featured || false,
        display_order: display_order || 0
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project.',
      error: error.message
    });
  }
};

// Update project (Admin only)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, tech_stack, github_url, live_url, featured, display_order } = req.body;

    const { data, error } = await supabase
      .from('projects')
      .update({
        title,
        description,
        image_url,
        tech_stack,
        github_url,
        live_url,
        featured,
        display_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Project updated successfully.',
      data
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project.',
      error: error.message
    });
  }
};

// Delete project (Admin only)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Project deleted successfully.'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project.',
      error: error.message
    });
  }
};
