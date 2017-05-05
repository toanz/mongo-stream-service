
let nextTimer ;
let delayTimeOut;
let workerFn;
let cbFn;
let queryFn;

let running = false ;

function start(query , worker , delay ,cb ) {
    // default to concurrency of 10
  if (typeof delay === 'function') {
    cb = delay
    delay = 5000 // miniseconds
  }

  if(running) return ;

  running = true 
 
  try {

    delayTimeOut = parseInt(delay);
    queryFn = query;
    cbFn = cb ;
    workerFn = worker ;

    process(queryFn.cursor() , workerFn , cbFn );
    
  } catch (err) {
    cb(err);
  }

  
}

function next() {

    nextTimer = setTimeout( () => {
        process(queryFn.cursor() ,workerFn , cbFn )
    } , delayTimeOut );

}


function process(cursor , worker , cb) {
    cursor.eachAsync(worker)
        .then( () => {
            cursor.close();
            cb(null,"done");
            next(); })
        .catch(error => {
            cursor.close();
            cb(error);
        });

}

function cancel() {
    if(nextTimer) 
        clearTimeout(nextTimer);
}


module.exports =  {
    start,
    cancel,
};
