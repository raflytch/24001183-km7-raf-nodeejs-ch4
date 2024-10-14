const { User } = require("../models");
const imagekit = require("../lib/imagekit");

async function userPage(req, res) {
  try {
    const users = await User.findAll();
    res.render("users/index", {
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
    res.render("users/create");
  } catch (error) {
    res.render("error", {
      message: error.message,
    });
  }
}

async function createUser(req, res) {
  const newUser = req.body;
  const file = req.file;
  console.log(file);

  const split = file.originalname.split(".");
  const ext = split[split.length - 1];
  const filename = `Profile-${Date.now()}.${ext}`;

  const uploadedImage = await imagekit.upload({
    file: file.buffer,
    fileName: filename,
  });

  console.log(newUser);

  try {
    await User.create({ ...newUser, photoProfile: uploadedImage.url });

    res.redirect("/dashboard/admin/users");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
}

module.exports = { userPage, createPage, createUser };
