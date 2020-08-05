
module.exports = app => {
  const { router, controller } = app;

  router.get('/default/getAuthor',controller.default.home.getAuthor)
  router.get('/default/updateWebCount',controller.default.home.updateWebCount)
  router.get('/default/getResources',controller.default.home.getResources)
  router.get('/default/getNotice',controller.default.home.getNotice)



  router.get('/default/getDemoList',controller.default.demo.getDemoList)
  router.get('/default/getDemoById/:id',controller.default.demo.getDemoById)
  router.get('/default/updateDemoCount/:id',controller.default.demo.updateDemoCount)
  router.get('/default/getDemoNew',controller.default.demo.getDemoNew)
  router.get('/default/getDemoHot',controller.default.demo.getDemoHot)
  router.get('/default/getDemoNew5',controller.default.demo.getDemoNew5)


  router.get('/default/getArticleList',controller.default.article.getArticleList)
  router.get('/default/getArticleById/:id',controller.default.article.getArticleById)
  router.get('/default/updateArticleCount/:id',controller.default.article.updateArticleCount)
  router.get('/default/getArticleNew',controller.default.article.getArticleNew)
  router.get('/default/getArticleNew5',controller.default.article.getArticleNew5)
  router.get('/default/getArticleHot',controller.default.article.getArticleHot)

  router.get('/default/getBookList',controller.default.book.getBookList)
  router.get('/default/getBookById/:id',controller.default.book.getBookById)
  router.get('/default/updateBookCount/:id',controller.default.book.updateBookCount)
  router.get('/default/getBookNew',controller.default.book.getBookNew)
  router.get('/default/getBookNew5',controller.default.book.getBookNew5)
  router.get('/default/getBookHot',controller.default.book.getBookHot)


  router.get('/default/getLifeList',controller.default.life.getLifeList)
  router.get('/default/getLifeById/:id',controller.default.life.getLifeById)
  router.get('/default/updateLifeCount/:id',controller.default.life.updateLifeCount)
  router.get('/default/getLifeNew',controller.default.life.getLifeNew)



};