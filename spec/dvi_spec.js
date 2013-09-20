describe('DVI', function(){
    it('sets the DVI global variable', function(){
        expect(DVI).toBeDefined();
    });



    describe('DVI.data', function(){
        it('can instantiate a Data object', function(){
            expect(new DVI.data(function(){}, 'dummy')).toBeDefined();
        });

        describe('DVI.data operations', function(){
            var dataObj, dataCallback, queryObj;


            beforeEach(function(){

                queryObj = {foo: 'FOO', bar: 'BAR'};

                dataCallback = function(arg, cb){
                    cb(queryObj[arg]);
                };

                dataObj =  new DVI.data(dataCallback,['foo']);
            });

            describe('get', function(){
                it('will get the data', function(){
                    dataObj.get();
                    expect(dataObj.data).toEqual('FOO');
                });
            });


            describe('update', function(){
                it('re-queries for the data', function(){
                    queryObj.foo = "FOOFYFOO"
                    dataObj.update();
                    expect(dataObj.data).toEqual('FOOFYFOO');
                });
            });

            describe('change', function(){
               it('resets the callback function and the arguments', function(){
                   var newCallBack = function(arg, cb){
                       cb(queryObj[arg]); //reverse the string
                   };
                   dataObj.change(newCallBack, 'foo');
                   console.log(dataObj);
                   expect(dataObj.data).toEqual('abc');
               })
            });

        });
    });

});