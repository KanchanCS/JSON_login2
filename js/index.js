var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var stuDBName = 'STUDENT-Table';
var stuRelationName = 'Stu-DB';
var connToken = "90932720|-31949277007940880|90954260";

$("#rollno").focus();
function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
  }
  
  function getRollNoAsJsonObj() {
    var rollno = $('#rollno').val();
    var jsonStr = {
      no: rollno
    };
    return JSON.stringify(jsonStr);
  }
  
  function fillData() {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#fullname').val(record.fullname_);
    $('#class').val(record.class_);
    $('#address').val(record.address_);
    $('#birthdate').val(record.birthdate_);
    $('#enrolldate').val(record.enrolldate_);
  }
  
function resetForm() {
    $('#rollno').val("");
    $('#fullname').val("");
    $('#class').val("");
    $('#address').val("");
    $('#birthdate').val("");
    $('#enrolldate').val("");
    $('#rollno').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#change').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#rollno').focus();
}

function validateData() {
    var rollno_, fullname_, class_, address_, birthdate_, enrolldate_;
    rollno_ = $('#rollno').val();
    fullname_ = $('#fullname').val();
    class_ = $('#class').val();
    address_ = $('#address').val();
    birthdate_ = $('#birthdate').val();
    enrolldate_ = $('#enrolldate').val();
  
    if (rollno_ === '') {
      alert("Employee ID missing");
      $('#rollo').focus();
      return "";
    }
    if (fullname_ === '') {
      alert("Employee NAME missing");
      $('#fullname').focus();
      return "";
    }
    if (class_ === '') {
      alert("Employee SALARY missing");
      $('#class').focus();
      return "";
    }
    if (address_ === '') {
      alert("Employee hra missing");
      $('#address').focus();
      return "";
    }
    if (birthdate_ === '') {
      alert("Employee da missing");
      $('#birthdate').focus();
      return "";
    }
    if (enrolldate_ === '') {
      alert("Employee deduct missing");
      $('#enrolldate').focus();
      return "";
    }
    var jsonStrObj = {
      no: rollno_,
      name: fullname_,
      class: class_,
      address: address_,
      birthdate: birthdate_,
      enrolldate: enrolldate_
    };
    return JSON.stringify(jsonStrObj);
  }
  

function getStu() {
    var rollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, stuIdJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });
    if (resJsonObj.status === 400) {
      $("#save").prop('disabled', false);
      $("#reset").prop('disabled', false);
      $("#fullname").focus();
    }
    else if (resJsonObj.status === 200) {
      $("#rollno").prop("disabled", true);
      fillData(resJsonObj);
  
      $("#change").prop("disabled", false);
      $("#reset").prop("disabled", false);
      $("#rollname").focus();
    }
  }

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === '') {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
    jQuery.ajaxSetup({
        async: false
    });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({
        async: true
    });
    resetForm();
    $('#rollno').focus();
}
function changeData() {
    $('#change').prop('disabled', true);
    jsonChg = validateData();
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetForm();
    $('#rollno').focus();
  }