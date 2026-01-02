const supabase = require('../config/supabase');

// Get all experiences (Public)
exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experiences.',
      error: error.message
    });
  }
};

// Get single experience (Public)
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found.'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Get experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experience.',
      error: error.message
    });
  }
};

// Create experience (Admin only)
exports.create = async (req, res) => {
  try {
    const { 
      title, 
      company, 
      location, 
      period, 
      description, 
      technologies, 
      experience_type,
      is_current,
      display_order 
    } = req.body;

    if (!title || !company || !period) {
      return res.status(400).json({
        success: false,
        message: 'Title, company, and period are required.'
      });
    }

    const { data, error } = await supabase
      .from('experiences')
      .insert({
        title,
        company,
        location,
        period,
        description: description || [],
        technologies: technologies || [],
        experience_type: experience_type || 'job',
        is_current: is_current || false,
        display_order: display_order || 0
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Experience created successfully.',
      data
    });
  } catch (error) {
    console.error('Create experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create experience.',
      error: error.message
    });
  }
};

// Update experience (Admin only)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      company, 
      location, 
      period, 
      description, 
      technologies, 
      experience_type,
      is_current,
      display_order 
    } = req.body;

    const { data, error } = await supabase
      .from('experiences')
      .update({
        title,
        company,
        location,
        period,
        description,
        technologies,
        experience_type,
        is_current,
        display_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Experience updated successfully.',
      data
    });
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update experience.',
      error: error.message
    });
  }
};

// Delete experience (Admin only)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Experience deleted successfully.'
    });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete experience.',
      error: error.message
    });
  }
};
