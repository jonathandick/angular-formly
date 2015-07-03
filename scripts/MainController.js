// scripts/MainController.js

(function() {

    'use strict';

    angular
        .module('formlyApp')
        .controller('MainController', MainController);

    function MainController() {

        var vm = this;

        // The model object that we reference
        // on the  element in index.html
        vm.model = {
            "obs":
            {
                "durationConceptUuid":
                    [
                        {uuid:"12345", "concept":"durationConceptUuid","value":"100"}
                    ],
                "orderUuid":
                {
                    "obsGroup1":
                    {
                        "concept":"orderUuid",
                        "obs": {
                            medicineConceptUuid: [{uuid:"1987293", "concept": "medicineConceptUuid", "value": "quinineUuid"}],
                            doseConceptUuid: [{uuid:"3298098", "concept": "doseConceptUuid", "value": "500mg", checked:true}]
                        }
                    }
                }
            }
        };
        var o, obs;


        function getLast(array) {
            return array[array.length-1];
        }


        function getFirstNonLoaded(obsSet,params) {
            var result, fieldDef;
            _.each(obsSet,function(e) {
                if(e.loaded === undefined) {
                    if(!params.isCheckbox || (params.isCheckbox && e.value === params.checkboxValue)) {
                        result = e;
                        return;
                    }
                }
            });
            return result;
        }


        function getModelForObsConcept(obsGroup,params) {
            var m;
            var obs = {concept:params.obsConceptUuid};
            if(params.isCheckbox) obs.value = params.checkboxValue;

            if(params.obsConceptUuid in obsGroup) {

                if(params.addField) {
                    m = obs;
                    obsGroup[params.obsConceptUuid].push(obs);
                }
                else {
                    m = getFirstNonLoaded(obsGroup[params.obsConceptUuid], params);
                    if (m === undefined) {

                        /*
                        ** NEED TO ADD WAY TO ADD FIELD IF IN MODEL BUT NOT IN FIELDSET, E.G. A FIELD WAS ADDED
                        ** AT DATA ENTRY TIME
                        _.each(vm.fields,function(f){
                            console.log(f);
                            if(f.uuid !== undefined) console.log(f.uuid);
                        });
                        */

                        obsGroup[params.obsConceptUuid].push(obs);
                        m = obs;

                    }
                    else {
                        if (params.isCheckbox) m.checked = true;
                        m.loaded = true;
                        m.initialValue = m.value;
                    }
                }
            }
            else {
                obsGroup[params.obsConceptUuid] = [obs];
                m = obsGroup[params.obsConceptUuid][0];
            }
            return m;
        }


        /*
         params: obsConceptUuid, obsGroupUuid, groupName, isCheckbox, checkboxValue
         */
        function getModelForObsGroup(obsGroup,params) {
            if(obsGroup[params.obsGroupUuid] === undefined) {
                obsGroup[params.obsGroupUuid] = {};
            }
            var m,g;
            if(params.groupName in obsGroup[params.obsGroupUuid]) {
                g = obsGroup[params.obsGroupUuid][params.groupName].obs;
                m = getModelForObsConcept(g,params);
            }
            else {
                obsGroup[params.obsGroupUuid][params.groupName] =
                {
                    concept: params.obsGroupUuid,
                    obs: [{concept: params.obsConceptUuid}]
                };
                m = obsGroup[params.obsGroupUuid][params.groupName]["obs"][0]
            }
            return m;
        }


        function getModel(params) {
            if(params.obsGroupUuid !== undefined) {
                return getModelForObsGroup(vm.model.obs,params);
            }
            else {
                return getModelForObsConcept(vm.model.obs,params);
            }
        }


        vm.addField = function(fieldDef) {
            vm.fields.push(fieldDef);
        }


        vm.buildOpenmrsRestPayload = function(formObs) {
            var payload = [];
            // Need to write code
            return payload;
        }

        vm.loadOpenmrsRestResult = function(restResult) {

        }

        // An array of our form fields with configuration
        // and options set. We make reference to this in
        // the 'fields' attribute on the  element

        var f =
        {
            uuid:'uuid',
            groupUuid:'groupUuid',
            label:'label',
            type:'checkbox',
            options:{},
            checkboxValue:"value",
            placeholder:'placeHolder',
        }


        vm.fields = [
            {
                key: 'value',
                type: 'input',
                model: getModel({obsConceptUuid:"durationConceptUuid",isCheckbox:true,checkboxValue:"100"}),
                templateOptions: {
                    type: 'text',
                    label: 'Duration',
                    placeholder: 'Enter duration',
                    required: true
                }
            },

            {
                key: 'value',
                type: 'input',
                model: getModel({obsConceptUuid:"durationConceptUuid"}),
                templateOptions: {
                    type: 'text',
                    label: 'Duration',
                    placeholder: 'Enter duration',
                    required: true
                }
            },


            {
                //className: 'obsGroup1',
                fieldGroup: [
                    {
                        key: 'value',
                        model: getModel({obsConceptUuid:"medicineConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup1"}),
                        type: 'select',
                        templateOptions: {
                            label: 'Medicine',
                            placeholder: 'Enter medicine',
                            required: true,
                            options:
                                [
                                    {name:"",value:""},
                                    {name:"quinine",value:"quinineUuid"},
                                    {name:"mefloquine",value:"mefloquineUuid"}
                                ]


                        }
                    },
                    {
                        key: 'checked',
                        type: 'input',
                        model: getModel({obsConceptUuid:"doseConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup1"}),
                        templateOptions: {
                            type: 'text',
                            label: 'Dose',
                            placeholder: 'Enter dose',
                            required: true
                        }
                    },
                ]
            },

            {
                className: 'obsGroup2',
                fieldGroup: [
                    {
                        key: 'value',
                        model: getModel({obsConceptUuid:"medicineConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup2"}),
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Medicine',
                            placeholder: 'Enter medicine',
                            required: true
                        }
                    },
                    {
                        key: 'value',
                        type: 'input',
                        model: getModel({obsConceptUuid:"doseConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup2"}),
                        templateOptions: {
                            type: 'text',
                            label: 'Dose',
                            placeholder: 'Enter dose',
                            required: true
                        }
                    },

                ]
            },
        ];

    }

})();