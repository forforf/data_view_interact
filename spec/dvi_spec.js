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

        //default dataObj for testing
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
                        var dummyDataObj = new DVI.data(function(){}, ['dummy']);
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

                    describe('load', function(){
                        it('loads data to the view directly', function(){
                            //Verifies there's no data in the dom
                            expect(document.getElementById(viewDivId)).toBe(viewDiv);
                            expect(document.getElementById(viewDivId).innerHTML).toBeUndefined;

                            //Update the dom
                            viewObj.load('updated data');
                            expect(document.getElementById(viewDivId).innerHTML).toBe('updated data');
                        });

                        it('loads data to the view via the Data Object', function(){
                            //Verifies there's no data in the dom
                            expect(document.getElementById(viewDivId)).toBe(viewDiv);
                            expect(document.getElementById(viewDivId).innerHTML).toBeUndefined;

                            //Update the dom
                            viewObj.load();
                            expect(document.getElementById(viewDivId).innerHTML).toBe('FOO');
                        });
                    });

                    describe('detach', function(){
                        it('detaches the data from the view', function(){
                            //Verifies there's no data in the dom
                            expect(document.getElementById(viewDivId)).toBe(viewDiv);
                            expect(document.getElementById(viewDivId).innerHTML).toBeUndefined;

                            //update the dom
                            viewObj.load();
                            expect(document.getElementById(viewDivId).innerHTML).toBe('FOO');

                            //This is failing I don't know why yet
                            viewObj.detach();
                            expect('test thing').toBe('actual thing')
                        });


                    });
                });



            });

            describe('DVI.interface', function(){
                var domTestingId = 'dvi-view-testing-id';
                var domTesting, viewDivId, viewDiv, selectHtml,
                    interfaceDiv, interfaceDivId, selectFrag;

                beforeEach(function(){
                    domTesting = setUpDomTestArea(domTestingId);
                    viewDivId = 'view-div-id';
                    viewDiv = document.createElement('div');
                    viewDiv.setAttribute('id', viewDivId);
                    domTesting.appendChild(viewDiv);

                    selectHtml = [
                        "<select id='select-id'>",
                        "   <option value='foo'>foo name</option>",
                        "   <option value='bar'>bar name</option>",
                        "</select>"
                    ].join("\n");

                    interfaceDiv = document.createElement('div');
                    interfaceDivId = 'interface-div-id';
                    interfaceDiv.setAttribute('id', interfaceDivId);
                    interfaceDiv.innerHTML = selectHtml;

                    domTesting.appendChild(interfaceDiv);

                });

                afterEach(function(){
                    tearDownDomTestArea(domTestingId)
                });

                it('setup passes sanity checks', function(){
                    expect(domTesting).toBeDefined();
                    expect(document.getElementById(domTestingId)).toBe(domTesting);

                });

                describe('DVI.interface class', function(){
                    it('can instantiate a new interface object', function(){
                        var dummyDataObj = new DVI.data(function(){}, ['dummy']);
                        expect(new DVI.interface('interfaceName', function(){}, dummyDataObj)).toBeDefined();
                    })
                });

                describe('DVI.view object operations', function(){
                    it('tests are pending until jQuery dependency cleared up', function(){
                        expect('pending').toEqual('completed');
                    });
                });


            });




        });
    });

});