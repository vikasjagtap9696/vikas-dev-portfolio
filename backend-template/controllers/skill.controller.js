const supabase = require('../config/supabase');

// Get all skills (Public)
exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skills.',
      error: error.message
    });
  }
};

// Get single skill (Public)
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found.'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skill.',
      error: error.message
    });
  }
};

// Create skill (Admin only)
exports.create = async (req, res) => {
  try {
    const { name, category, icon, proficiency, display_order } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name and category are required.'
      });
    }

    const { data, error } = await supabase
      .from('skills')
      .insert({
        name,
        category,
        icon,
        proficiency: proficiency || 80,
        display_order: display_order || 0
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Skill created successfully.',
      data
    });
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create skill.',
      error: error.message
    });
  }
};

// Update skill (Admin only)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, icon, proficiency, display_order } = req.body;

    const { data, error } = await supabase
      .from('skills')
      .update({
        name,
        category,
        icon,
        proficiency,
        display_order
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Skill updated successfully.',
      data
    });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update skill.',
      error: error.message
    });
  }
};

// Delete skill (Admin only)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Skill deleted successfully.'
    });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete skill.',
      error: error.message
    });
  }
};
