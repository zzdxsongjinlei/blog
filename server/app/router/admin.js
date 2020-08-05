module.exports = app => {
  const { router, controller } = app;
  var adminauth=app.middleware.adminauth()

  router.get('/admin/getArticleList',controller.admin.article.getArticleList)
  router.get('/admin/delArticle/:id',controller.admin.article.delArticle)
  router.get('/admin/getArticleById/:id',controller.admin.article.getArticleById)
  router.post('/admin/addArticle',controller.admin.article.addArticle)
  router.post('/admin/updateArticle',controller.admin.article.updateArticle)

  router.get('/admin/getBookList',controller.admin.book.getBookList)
  router.get('/admin/delBook/:id',controller.admin.book.delBook)
  router.get('/admin/getBookById/:id',controller.admin.book.getBookById)
  router.post('/admin/addBook',controller.admin.book.addBook)
  router.post('/admin/updateBook',controller.admin.book.updateBook)


  router.get('/admin/getDemoList',controller.admin.demo.getDemoList)
  router.get('/admin/delDemo/:id',controller.admin.demo.delDemo)
  router.get('/admin/getDemoById/:id',controller.admin.demo.getDemoById)
  router.post('/admin/addDemo',controller.admin.demo.addDemo)
  router.post('/admin/updateDemo',controller.admin.demo.updateDemo)


  router.get('/admin/getNoticeList',controller.admin.notice.getNoticeList)
  router.get('/admin/delNotice/:id',controller.admin.notice.delNotice)
  router.get('/admin/getNoticeById/:id',controller.admin.notice.getNoticeById)
  router.post('/admin/addNotice',controller.admin.notice.addNotice)
  router.post('/admin/updateNotice',controller.admin.notice.updateNotice)


  router.get('/admin/getResourcesList',controller.admin.resources.getResourcesList)
  router.get('/admin/delResources/:id',controller.admin.resources.delResources)
  router.get('/admin/getResourcesById/:id',controller.admin.resources.getResourcesById)
  router.post('/admin/addResources',controller.admin.resources.addResources)
  router.post('/admin/updateResources',controller.admin.resources.updateResources)


  router.get('/admin/getLifeList',controller.admin.life.getLifeList)
  router.get('/admin/delLife/:id',controller.admin.life.delLife)
  router.get('/admin/getLifeById/:id',controller.admin.life.getLifeById)
  router.post('/admin/addLife',controller.admin.life.addLife)
  router.post('/admin/updateLife',controller.admin.life.updateLife)



  router.get('/admin/getWebTime',controller.admin.default.getWebTime)

  router.get('/admin/getWebCount',controller.admin.default.getWebCount)


  router.post('/admin/checkLogin',controller.admin.login.checkLogin)
  router.post('/admin/checkIsLogin',adminauth,controller.admin.login.checkIsLogin)

 
  
  
  
  

  
  
};

