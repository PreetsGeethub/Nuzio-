const getPreferences = (req, res) => {
    res.json({
      success: true,
      preferences: req.user.preferences || null,
    });
  };
  
  const savePreferences = (req, res) => {
    const {
      language,
      locationEnabled,
      profession,
      interests,
      voice,
      length,
      deliveryTime,
      notifications,
    } = req.body;
  
    req.user.preferences = {
      language: language || "English",
  
      locationEnabled:
        locationEnabled ?? false,
  
      profession:
        profession || null,
  
      interests:
        interests || [],
  
      voice:
        voice || null,
  
      length:
        length || null,
  
      deliveryTime:
        deliveryTime || null,
  
      notifications:
        notifications ?? false,
    };
  
    res.json({
      success: true,
      message: "Preferences saved successfully",
      preferences: req.user.preferences,
    });
  };
  
  module.exports = {
    getPreferences,
    savePreferences,
  };