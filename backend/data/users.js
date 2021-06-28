import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@emaple.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Trichipalli Narayan",
    email: "trichipalli@maxbox.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Monica Advitya",
    email: "monica@admitya.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
