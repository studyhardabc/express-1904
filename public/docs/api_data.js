define({ "api": [
  {
    "type": "delete",
    "url": "http://localhost:3000/posts/:id",
    "title": "删除帖子",
    "group": "Post",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/postRouter.js",
    "groupTitle": "Post",
    "name": "DeleteHttpLocalhost3000PostsId"
  },
  {
    "type": "get",
    "url": "/posts",
    "title": "查询帖子",
    "group": "Post",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "pageNum",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "pageSize",
            "defaultValue": "2",
            "description": "<p>每页显示条数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>帖子数组.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/postRouter.js",
    "groupTitle": "Post",
    "name": "GetPosts"
  },
  {
    "type": "post",
    "url": "http://localhost:3000/posts",
    "title": "创建一个帖子",
    "name": "create",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>帖子标题.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/postRouter.js",
    "groupTitle": "Post"
  },
  {
    "type": "put",
    "url": "http://localhost:3000/posts/:id",
    "title": "编辑帖子",
    "name": "update",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>帖子标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>帖子内容</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/postRouter.js",
    "groupTitle": "Post"
  }
] });
