const supabase = require('../config/supabase');

// Get all certificates (Public)
exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates.',
      error: error.message
    });
  }
};

// Get single certificate (Public)
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found.'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificate.',
      error: error.message
    });
  }
};

// Create certificate (Admin only)
exports.create = async (req, res) => {
  try {
    const { title, issuer, issue_date, image_url, credential_url, display_order } = req.body;

    if (!title || !issuer) {
      return res.status(400).json({
        success: false,
        message: 'Title and issuer are required.'
      });
    }

    const { data, error } = await supabase
      .from('certificates')
      .insert({
        title,
        issuer,
        issue_date,
        image_url,
        credential_url,
        display_order: display_order || 0
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Certificate created successfully.',
      data
    });
  } catch (error) {
    console.error('Create certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create certificate.',
      error: error.message
    });
  }
};

// Update certificate (Admin only)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, issuer, issue_date, image_url, credential_url, display_order } = req.body;

    const { data, error } = await supabase
      .from('certificates')
      .update({
        title,
        issuer,
        issue_date,
        image_url,
        credential_url,
        display_order
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Certificate updated successfully.',
      data
    });
  } catch (error) {
    console.error('Update certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update certificate.',
      error: error.message
    });
  }
};

// Delete certificate (Admin only)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Certificate deleted successfully.'
    });
  } catch (error) {
    console.error('Delete certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete certificate.',
      error: error.message
    });
  }
};
