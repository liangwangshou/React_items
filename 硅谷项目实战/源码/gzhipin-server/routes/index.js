var express = require("express");
var router = express.Router();
const md5 = require("blueimp-md5");
const {
  UserModel,
  ChatModel
} = require("../db/model");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
  });
});
const filter = {
  password: 0,
}; // 查询时过滤出指定的属性
//注册路由
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
          msg: "此用户已存在",
        });
      } else {
        new UserModel({
          username,
          password: md5(password),
          type,
        }).save(function (err, user) {
          // 生成一个 cookie(userid: user._id), 并交给浏览器保存
          console.log(user._id);
          res.cookie("userid", user._id, {
            maxAge: 1000 * 60 * 60 * 24,
          });
          // 持久化 cookie, 浏览器会保存在本地文件
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
//登陆路由
router.post("/login", function (req, res) {
  const {
    username,
    password
  } = req.body;
  UserModel.findOne({
      username,
      password: md5(password),
    },
    filter,
    function (err, user) {
      if (!user) {
        res.send({
          code: 1,
          msg: "用户名或者密码错误",
        });
      } else {
        // 生成一个 cookie(userid: user._id), 并交给浏览器保存
        console.log(user._id);
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
router.post("/update", (req, res) => {
  const userid = req.cookies.userid;
  // console.log(req.cookies);
  if (!userid) {
    //没有cookide
    return res.send({
      code: 1,
      msg: "请先登录",
    });
  }
  const user = req.body;
  UserModel.findByIdAndUpdate({
      _id: userid,
    },
    user,
    function (err, oldUser) {
      if (!oldUser) {
        //有cookid但是没有对应的数据或者对应的id的cookid被篡改
        res.clearCookie("useid");
        res.send({
          code: 1,
          msg: "请先登录",
        });
      }
      const {
        _id,
        username,
        type
      } = oldUser;
      const data = Object.assign(user, {
        _id,
        username,
        type,
      });
      // console.log(data);
      res.send({
        code: 0,
        data,
      });
    }
  );
});
router.get("/user", function (req, res) {
  //从请求的cookie得到userid
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({
      code: 1,
      msg: "请先登陆"
    });
  }
  console.log(userid);
  UserModel.findOne({
    _id: userid
  }, filter, function (err, user) {
    res.send({
      code: 0,
      data: user
    });
  });
});
router.get("/userlist", (req, res) => { //用户列表
  const {
    type
  } = req.query;
  UserModel.find({
    type
  }, filter, function (err, users) {
    res.send({
      code: 0,
      data: users
    });
  });
});
router.get('/msglist', function (req, res) { //所有信息列表
  // 获取 cookie 中的 userid
  const userid = req.cookies.userid
  // 查询得到所有 user 文档数组
  UserModel.find(function (err, userDocs) {
    // 用对象存储所有 user 信息: key 为 user 的_id, val 为 name 和 header 组成的 user 对象
    const users = {};
    userDocs.forEach(doc => {
      users[doc._id] = {
        username: doc.username,
        header: doc.header
      }
    });
    //查询 userid 相关的所有聊天信息
    //参数 1: 查询条件   参数 2: 过滤条件  参数 3: 回调函数

    ChatModel.find({
      '$or': [{
        from: userid
      }, {
        to: userid
      }]
    }, filter, function (err, chatMsgs) {
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
/*修改指定消息为已读
 */
router.post('/readmsg', function (req, res) {
  const from = req.body.from
  const to = req.cookies.userid
  /*更新数据库中的 chat 数据
  参数 1: 查询条件
  参数 2: 更新为指定的数据对象
  参数 3: 是否 1 次更新多条, 默认只更新一条
  参数 4: 更新完成的回调函数
  */
  ChatModel.update({
    from,
    to,
    read: false
  }, {
    read: true
  }, {
    multi: true
  }, function (err, doc) {
    console.log('/readmsg', doc);
    res.send({
      code: 0,
      data: doc.nModified
    }) // 更新的数量
  })
})
module.exports = router;