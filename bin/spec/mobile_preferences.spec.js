var mp = require('../lib/mobile_preferences.js');

describe("mobile_preferences.js module", function() {

    it("exists", function() {
        expect(mp).not.toBeNull();
    });
    
    describe("ios functions", function() {
    
        it("maps a texfield control", function() {

            var config = {
                type: "textfield",
                default: "test_value",
                name: "test_key"
            };

            var element = mp.iosConfigMap(config);

            expect(element.Key).toEqual(config.name);
            expect(element.DefaultValue).toEqual(config.default);        
        });

        it("builds array of ios preference items", function() {

            var configs = [{},{}];

            var items = mp.iosBuildItems(configs);
            expect(items.length).toEqual(2);
        });

        it("flattens group items", function() {

            var configs = [{
                type: "group",
                items: [
                    { type: "textfield", name: "child 1" },
                    { type: "textfield", name: "child 2" }
                ]
            }];

            var items = mp.iosBuildItems(configs);
            expect(items.length).toEqual(3);
        });
    
    });


    describe("android functions", function() {

        it("generates group items", function() {

            var config = {
                type: "group",
                title: "test group",
                items: [
                    { type: "textfield", name: "child 1" },
                    { type: "textfield", name: "child 2" }
                ]
            };

            var item = mp.androidConfigMap(config);
            console.log(item);
            expect(item.tagname).toEqual('PreferenceCategory');
            expect(item.children).not.toBeNull();
        });
        
        it("maps a texfield control", function() {

            var config = {
                type: "textfield",
                default: "test_value",
                name: "test_key"
            };

            var element = mp.androidConfigMap(config);

            expect(element.tagname).toEqual('EditTextPreference');
            expect(element.atts).not.toBeNull();        
        });
        
        it("builds the item array", function() {

            var configs = [{
                type: "group",
                title: "test group",
                items: [
                    { type: "textfield", name: "child 1" },
                    { type: "textfield", name: "child 2" }
                ]
            }];

            var prefsDocuments = mp.androidBuildSettings(configs);
console.log(prefsDocuments);
            expect(prefsDocuments.preferencesDocument).not.toBeNull();
            expect(prefsDocuments.stringsArrays).not.toBeNull();
        });

    });

});
