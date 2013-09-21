describe('DVI', function(){
    it('sets the DVI global variable', function(){
        expect(DVI).toBeDefined();
    });

    var dataObj, dataCallback, queryObj;


    beforeEach(function(){

        queryObj = {foo: 'FOO', bar: 'BAR'};

        dataCallback = function(arg, cb){
            cb(queryObj[arg]);
        };

        dataObj =  new DVI.data(dataCallback,['foo']);
    });



    describe('DVI.data', function(){
        it('can instantiate a Data object', function(){
            expect(new DVI.data(function(){}, ['dummy'])).toBeDefined();
        });

        describe('DVI.data operations', function(){


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
                       cb(queryObj[arg].split("").reverse().join("")); //reverse the string
                   };
                   dataObj.change(newCallBack, ['bar']);
                   expect(dataObj.data).toEqual('RAB');
               })
            });

            describe('DVI.view', function(){
                var domTestingId = 'dvi-view-testing-id';
                var domTesting, viewDivId, viewDiv;

                beforeEach(function(){
                    domTesting = setUpDomTestArea(domTestingId);
                    viewDivId = 'view-div-id';
                    viewDiv = document.createElement('div');
                    viewDiv.setAttribute('id', viewDivId);
                    domTesting.appendChild(viewDiv);
                });

                afterEach(function(){
                    tearDownDomTestArea(domTestingId)
                });

                it('setup passes sanity checks', function(){
                    expect(domTesting).toBeDefined();
                    expect(document.getElementById(domTestingId)).toBe(domTesting);

                });

                describe('DVI.view class', function(){
                    it('can instantiate a new view object', function(){
                        var dummyDataObj = new DVI.data(function(){}, ['dummy'])
                        expect(new DVI.view('viewName', function(){}, dummyDataObj)).toBeDefined();
                    })
                });

                describe('DVI.view object operations', function(){
                    var viewObj, viewFooFn;

                    beforeEach(function(){

                        viewFooFn = function(data){
                            document.getElementById(viewDivId).innerHTML = data;
                        };

                        viewObj = new DVI.view('fooView', viewFooFn, dataObj);

                    });

                    afterEach(function(){})

                    describe('attach', function(){
                        it('attaches a data to the view directly', function(){
                            //Nothing there yet
                            expect(document.getElementById(viewDivId)).toBe(viewDiv);
                            expect(document.getElementById(viewDivId).innerHTML).toBeUndefined;
                            viewObj.load('updated data');
                            expect(document.getElementById(viewDivId).innerHTML).toBe('updated data');
                        });

                        it('attaches a data to the view via the Data Object', function(){
                            //Nothing there yet
                            expect(document.getElementById(viewDivId)).toBe(viewDiv);
                            expect(document.getElementById(viewDivId).innerHTML).toBeUndefined;
                            console.log(dataObj.args)
                            viewObj.load();
                            expect(document.getElementById(viewDivId).innerHTML).toBe('FOO');
                        });
                    })
                })



            })

        });
    });

});