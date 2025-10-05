const Profile = require("../models/Profile");

// Create or update profile
exports.createOrUpdateProfile = async (req, res) => {
  const { name, age, gender, address } = req.body;

  try {
    let profile = await Profile.findOne({ userId: req.user.id });

    if (profile) {
      // Update
      profile.name = name;
      profile.age = age;
      profile.gender = gender;
      profile.address = address;
      await profile.save();
      return res.json({ message: "Profile updated", profile });
    }

    // Create new
    profile = await Profile.create({
      userId: req.user.id,
      name,
      age,
      gender,
      address,
    });

    res.json({ message: "Profile created", profile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
