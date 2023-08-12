//　認証に関するAPI
const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const { User } = require("../db/dbUser");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require('dotenv').config();

router.get("/", (req, res) => {
  res.send("Hello user");
  // console.log(process.env.JWT_KEY);
});

//ユーザー新規登録のAPI
router.post(
  "/register",
  // バリデーションチェック
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //エラーだったらエラーが変数に入る
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
      return res.status(400).json({errors: errors.array() });
    }

    //DBにユーザーが存在しているか確認
    const user = User.find((user) => user.email === email);
    if(user) {
      return res.status(400).json([
        {
          message: "すでにそのユーザーは存在しています。",
        }
      ])
    }

    //パスワードの暗号化
    let hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    //DBへ保存
    User.push({
      email,
      password: hashedPassword,
    })

    // クライアントへJWTを発行
    const token = await JWT.sign(
      {
        email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    return res.json({
      token: token,      
    })
  }
);

//ログイン用のAPI
router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  const user = User.find((user) => user.email === email);
  if(!user) {
    return res.status(400).json([
      {
        message: "そのユーザーは存在しません。",
      },
    ]);
  }

  // パスワードの復号、照合
  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    return res.status(400).json([
      {
        message: "パスワードが異なります",
      },
    ]);
  }

  // クライアントへJWTを発行
  const token = await JWT.sign(
    {
      email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    }
  );

  return res.json({
    token: token,      
  });

});


//DBのユーザーを確認するAPI
router.get("/allUsers", (req, res) => {
  return res.json(User);
})

module.exports = router;
