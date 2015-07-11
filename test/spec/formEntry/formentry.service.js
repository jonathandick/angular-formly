'use strict';

//describe('Service: FormEntryService', function () {
describe('Service: FormEntryService', function () {

  // load the controller's module
  beforeEach(module('formEntryModule'));

  var FormEntryService,scope;


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

  var payload = {
    obs:[
      {concept:"hivConceptUuid",value:"100"},
      {concept:"orderUuid",
        obs:
          [
            {concept:"medicineConceptUuid",value:"quinineUuid"},
            {concept:"doseConceptUuid",value:"500mg"}
          ]
      }
    ]
  };


  beforeEach(inject(function ($injector) {
    FormEntryService = $injector.get('FormEntryService');
  }));


  it('should convert a restResult to the "right" formly model', function () {
    var testModel = FormEntryService.restResultToModel(restResult);
    expect(angular.equals(testModel,model)).toBe(true);
  });

  it('should have an obs array of length 0 if no model is given to toOpenmrsRestPayload', function() {
    var testPayload = FormEntryService.toOpenmrsRestPayload();
    expect(testPayload.obs.length).toBe(0);
  });

  it('should have an obs array of length 1 if model has one obs',function() {
    var testModel = {
      "obs":
      {
        "hivConceptUuid":
          [
            {uuid:"uuid1", "concept":"hivConceptUuid","value":"100"},
          ]
      }
    };
    var payload = {obs:[{concept:"hivConceptUuid",value:"100"}]};
    var testPayload = FormEntryService.toOpenmrsRestPayload(testModel);
    expect(testPayload.obs.length).toBe(1);
    //expect(angular.equals(payload,testPayload)).toBe(true);
    expect(testPayload).toEqual(payload);
  });


  it('should have an obsgroup when a model has an obsgroup',function() {
      var testModel = {
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

      var payload = {
        obs:[
          {concept:"hivConceptUuid",value:"100"},
          {concept:"orderUuid",
            obs:
              [
                {concept:"medicineConceptUuid",value:"quinineUuid"},
                {concept:"doseConceptUuid",value:"500mg"}
              ]
          }
        ]
      };

      var testPayload = FormEntryService.toOpenmrsRestPayload(testModel);
      expect(testPayload).toEqual(payload);

    }
  );


});
