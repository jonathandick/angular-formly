// scripts/MainController.js

(function() {

    'use strict';

    angular
        .module('formEntryModule')
        .controller('FormEntryController', FormEntryController);

    function FormEntryController($scope,FormEntryService) {

        var vm = this;
        //var encounter = Context.getEncounterService().getEncounter(encounterUuid);
        var encounterUuid = "";

        vm.submit = function() {
            var invalid = $scope.vm.orderForm2.$invalid;
            console.log("invalid: " + invalid);
            if(invalid) alert("This form is invalid;");
            else alert("This form is valid.");

        }

        var model = {
            "obs":
            {
                "hivConceptUuid":
                    [
                        {uuid:"uuid1", "concept":"hivConceptUuid","value":"100"},
                    ],
                "orderUuid":
                {
                    "obsGroup1":
                    {
                        uuid:"uuid2",
                        "concept":"orderUuid",
                        "obs": {
                            medicineConceptUuid: [{uuid:"1987293", "concept": "medicineConceptUuid", "value": "quinineUuid"}],
                            doseConceptUuid: [{uuid:"3298098", "concept": "doseConceptUuid", "value": "500mg"}]
                        }
                    }
                }
            }
        };


        var restResult = {
            obs: [
                {uuid: "uuid1", concept:"hivConceptUuid", value:"100"},
                {uuid: "uuid2", concept:"orderUuid",
                    obs:[
                        {uuid:'1987293',concept:"medicineConceptUuid",value:"quinineUuid"},
                        {uuid:'3298098',concept:"doseConceptUuid",value:"500mg"}
                    ]
                }
            ]
        };

        vm.model = FormEntryService.restResultToModel(restResult);


        vm.fields = [
            {
                key: 'value',
                type: 'input',
                model: FormEntryService.getModel(vm.model,{obsConceptUuid:"hivConceptUuid"}),
                templateOptions: {
                    obsConceptUuid : "hivConceptUuid",
                    type: 'text',
                    label: 'HIV Status:',
                    placeholder: 'Enter hiv status',
                    required: true
                },
                validators: {
                    foo: function($viewValue,$modelValue,scope) {
                        return ($viewValue === "300");
                    }
                }

            },
            {
                className: 'obsGroup2',
                fieldGroup: [
                    {
                        key: 'value',
                        model: FormEntryService.getModel(vm.model,{obsConceptUuid:"medicineConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup1"}),
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
                        model: FormEntryService.getModel(vm.model,{obsConceptUuid:"doseConceptUuid",obsGroupUuid:"orderUuid",groupName:"obsGroup1"}),
                        templateOptions: {
                            type: 'text',
                            label: 'Dose',
                            placeholder: 'Enter dose',
                            required: true
                        }
                    }

                ]
            }

        ]

    }

})();