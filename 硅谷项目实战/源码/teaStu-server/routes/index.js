var express = require("express");
var router = express.Router();

const {
  UserModel,
  ChatModel
} = require("../db/model");
const filter = {
  password: 0,
};
router.post("/register", function (req, res) {
  const {
    username,
    password,
    type
  } = req.body;
  UserModel.findOne({
      username,
    },
    function (err, user) {
      if (user) {
        res.send({
          code: 1,
          msg: "此用户名已存在",
        });
      } else {
        new UserModel({
          username,
          password,
          type,
        }).save(function (err, user) {
          res.cookie("userid", user._id, {
            maxAge: 1000 * 60 * 60 * 24,
          });
          res.send({
            code: 0,
            data: {
              _id: user._id,
              username,
              type,
            },
          });
        });
      }
    }
  );
});
router.post("/login", function (req, res) {
  const {
    username,
    password
  } = req.body;
  UserModel.findOne({
      username,
      password,
    },
    filter,
    function (err, user) {
      if (!user) {
        res.send({
          code: 1,
          msg: "用户名或者密码错误",
        });
      } else {
        res.cookie("userid", user._id, {
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.send({
          code: 0,
          data: user,
        });
      }
    }
  );
});
router.post("/update", function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({
      code: 1,
      msg: "请先登录",
    });
  }
  UserModel.findByIdAndUpdate({
      _id: userid,
    },
    req.body,
    function (err, oldUser) {
      const {
        _id,
        username,
        type
      } = oldUser;
      const data = Object.assign(req.body, {
        _id,
        username,
        type,
      });
      res.send({
        code: 0,
        data,
      });
    }
  );
});
router.get("/getuser", function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({
      code: 1,
      msg: "请先登录",
    });
  }
  UserModel.findOne({
      _id: userid,
    },
    filter,
    function (err, user) {
      return res.send({
        code: 0,
        data: user,
      });
    }
  );
});
router.get("/listuser", function (req, res) {
  const {
    type
  } = req.query;
  console.log(type);
  UserModel.find({
    type
  }, function (err, users) {
    return res.send({
      code: 0,
      data: users
    });
  });
});
router.get('/msglist', function (req, res) {
  const userid = req.cookies.userid
  UserModel.find(function (err, userDocs) {
    const users = {}
    userDocs.forEach(doc => {
      users[doc._id] = {
        username: doc.username,
        header: doc.header
      }
    })
    ChatModel.find({
      '$or': [{
        from: userid
      }, {
        to: userid
      }]
    }, function (err, chatMsgs) {
      res.send({
        code: 0,
        data: {
          users,
          chatMsgs
        }
      })
    })
  })
})
router.post('/readmsg', function (req, res) {
  const from = req.body.from //目标对方id
  const to = req.cookies.userid //我的id
  ChatModel.update({
    from,
    to,
    read: false
  }, {
    read: true
  }, {
    multi: true
  }, function (err, doc) {
    console.log(doc.nModified);
    res.send({
      code: 0,
      data: doc.nModified
    })
  })
})
module.exports = router;