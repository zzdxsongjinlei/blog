'use strict';

/** @type Egg.EggPlugin */
exports.mysql = {
	enable:true,
	package:'egg-mysql'
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
}
exports.cors={
    enable: true,
    package: 'egg-cors'
}
