const { User } = require("../models");
const imagekit = require("../lib/imagekit");

async function userPage(req, res) {
  try {
    const users = await User.findAll();
    res.render("users/index", {
      title: "Users Page",
      users,
    });
  } catch (error) {
    res.render("error", {
      message: error.message,
    });
  }
}

async function createPage(req, res) {
  try {
    res.render("users/create", {
      title: "Create Page",
    });
  } catch (error) {
    res.render("error", {
      message: error.message,
    });
  }
}

async function createUser(req, res) {
  const newUser = req.body;

  try {
    let uploadedImage = null;

    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];
      const filename = `Profile-${Date.now()}.${ext}`;

      uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: filename,
      });
    }

    await User.create({
      ...newUser,
      photoProfile: uploadedImage ? uploadedImage.url : null,
    });

    res.redirect("/dashboard/admin/users");
  } catch (error) {
    console.log("Error:", error);
    res.redirect("/error");
  }
}

module.exports = { userPage, createPage, createUser };
