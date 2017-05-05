const log = require('pino')({
  name: 'dms'
})

const config = {} ;
config.mongodb = {
  uri:  process.env.MONGODB_URI ||'mongodb://192.168.1.7:20017/DMS',
  autoIndex: true
}

const {initDB} = require('./init-db')

const mgService = require('../index.js')

let count = 0 ;
let num = 0 ;

initDB(config, () => {
   log.info("DB init Ready !!! ")

   const Item = require('./model')('Test_Items');

   mgService.start( Item.find({status:'done'}) , (doc) => {
       
       console.log(count ++ , '----> ' , doc.toObject().id , doc.get('_id'));
       doc.set( "status" , "new");
       doc.save();
   } , 1000 , ( err , done) => {
        console.log(err , done , '*** ' , num ++ );
   })

}, false );

