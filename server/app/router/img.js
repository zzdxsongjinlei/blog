
module.exports = app => {
  const { router, controller } = app;

  router.post('/img/postLifeImg',controller.img.life.postLifeImg)

};