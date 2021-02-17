export default {
  printTemplate: `<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=windows-1256">
  <style>
    .printPreview{font-family:verdana;width: 720px;border:1px solid #b2b2b2;font-size:12px;margin-bottom: 20px; padding:0;-webkit-print-color-adjust: exact;}
    .printPreview table.width100 td{font-size:12px;padding:5px 5px 5px 10px;}
    .printPreview .generalStatus{border-radius: 5px;text-align: center;padding:5px;margin:5px;color:#fff;font-weight: 700;-webkit-print-color-adjust: exact;}
    .printPreview .logo-image{  content: "";
    display: block;
    background-repeat: no-repeat;
    background-size: 153px 60px;
    background-image: url('data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4RjEzOTNGNzIxQzkxMUVBQkYxNjk2RkM4NjE2RjBEQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RjEzOTNGODIxQzkxMUVBQkYxNjk2RkM4NjE2RjBEQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhGMTM5M0Y1MjFDOTExRUFCRjE2OTZGQzg2MTZGMERDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhGMTM5M0Y2MjFDOTExRUFCRjE2OTZGQzg2MTZGMERDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEB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');      height: 60px;
    height: 60px;
    width: 153px;}
    .printPreview .generalStatus.completed{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.approved{background:#af7300;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.approve{background:#af7300;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.accept{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.satisfied{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.pending{background:#af7300;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.rejected{background:#F44336;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.reject{background:#F44336;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.unsatisfied{background:#F44336;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.cancelled{background:#F44336;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.cancel{background:#F44336;-webkit-print-color-adjust: exact;}

    .printPreview .generalStatus.COMPLETED{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.APPROVE{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.APPROVED{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.ACCEPT{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.APPROVED{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.ENDORSE{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.SATISFIED{background:#00a651;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.PENDING{background:#af7300;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.REJECTED{background:#F44336;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.REJECT{background:#F44336;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.UNSATISFIED{background:#F44336;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.CANCELLED{background:#F44336;-webkit-print-color-adjust: exact;}
    .printPreview .generalStatus.CANCEL{background:#F44336;-webkit-print-color-adjust: exact;}
    
    .printPreview .status{border:1px solid #000;border-radius: 5px;text-align: center;padding:5px;margin:5px;}
    .printPreview .status.approved{color:#00a651;border:1px solid #af7300;}
    .printPreview .status.approve{color:#00a651;border:1px solid #af7300;}
    .printPreview .status.accept{color:#00a651;border:1px solid #af7300;}
    .printPreview .status.satisfied{color:#00a651;border:1px solid #00a651;}
    .printPreview .status.pending{color:#af7300;border:1px solid #af7300;}
    .printPreview .status.rejected{color:#F44336;border:1px solid #F44336;}
    .printPreview .status.reject{color:#F44336;border:1px solid #F44336;}
    .printPreview .status.unsatisfied{color:#F44336;border:1px solid #F44336;}
    .printPreview .status.cancelled{color:#F44336;border:1px solid #F44336;}
    .printPreview .status.cancel{color:#F44336;border:1px solid #F44336;}

    .printPreview .status.APPROVE{color:#00a651;border:1px solid #af7300;}
    .printPreview .status.APPROVED{color:#00a651;border:1px solid #af7300;}
    .printPreview .status.ENDORSE{color:#00a651;border:1px solid #af7300;}
    .printPreview .status.ACCEPT{color:#00a651;border:1px solid #af7300;}
    .printPreview .status.SATISFIED{color:#00a651;border:1px solid #00a651;}
    .printPreview .status.PENDING{color:#af7300;border:1px solid #af7300;}
    .printPreview .status.REJECTED{color:#F44336;border:1px solid #F44336;}
    .printPreview .status.REJECT{color:#F44336;border:1px solid #F44336;}
    .printPreview .status.UNSATISFIED{color:#F44336;border:1px solid #F44336;}
    .printPreview .status.CANCELLED{color:#F44336;border:1px solid #F44336;}
    .printPreview .status.CANCEL{color:#F44336;border:1px solid #F44336;}

    .printPreview .formTitle{color:#712c81;font-size:18px;margin-bottom: 5px;}
    .printPreview .formInformation{color:#4c4c4c;font-size:10px;}
    .printPreview .header{margin-bottom: 5px;}
    .printPreview .width100,.header{width:100%}
    .printPreview .width50{width:50%}
    .printPreview .width40{width:40%}
    .printPreview .width45{width:45%}
    .printPreview .width15{width:15%}
    .printPreview .requesterName{background: #f7f7f7;border:1px solid #b2b2b2;font-size: 14px;font-weight: 700;color:#712c81;padding:10px 5px !important;border-right:0px;border-left:0px;}
    .printPreview .label{white-space: normal; padding: 0; color:#414142;font-weight: 700;font-size:11px; margin: 3px 5px 0 0;display:inline-block}
    .printPreview .innerTitleTr td{background: #999999;border:1px solid #b2b2b2;font-weight: 700;color:#fff;padding:2px 5px !important;border-right:0px;border-left:0px;height:37px;-webkit-print-color-adjust: exact;}
    .printPreview .innerTitleTr td .status{background: #fff;border:0}

    .DependantTh {border:1px solid black; background: #999; color:#fff; }
    .DependantTr { background: #999; color:#fff; }
    .DependantTd { border:1px solid black; }
    .printPreview .sublabel{ display inline; font-size:11px; padding-left: 5px; font-weight: bold;color:#414142;}
    .printPreview .sublabel + p { display: inline; font-size:11px; padding-left: 5px;}
   
  
  </style>
</head>
<body onload="window.print()" dir='ltr'>
  <center>

    <div class='printPreview' cellpadding="0">

      <table cellpadding="0" cellspacing="0" class="header">
        <tr>
          <td width='25%'><div class="logo-image"></td>
          <td width='60%'>
            <div class="formTitle"><b>{{i18nTranslate 'formTitle'}}</b></div>
            <div class="formInformation"><span>{{form.header.formId}}</span> | <span>{{dateFormat form.header.creationDate}}</span></div>
          </td>
          <td  width='15%'>
            <div class="generalStatus {{form.header.status.key}}">{{form.header.status.value}}</div>
          </td>
        </tr>
      </table>

      <table cellpadding="0" cellspacing="0" class="width100">
        <tr>
          <td colspan="2" class="requesterName">{{form.profileInfoDrop.fullName}}</td>
        </tr>

        <tr>
          <td class="width50">
          	<label class="label">{{ i18nTranslate 'departmentName'}} :</label>
          	{{form.profileInfoDrop.departmentName}}
          </td>
          <td class="width50">
          		<label class="label">{{ i18nTranslate 'jobPosition'}}</label>
          		{{form.profileInfoDrop.jobPosition}}
          </td>
        </tr>

        <tr>
          <td class="width50">
          	<label class="label">{{i18nTranslate 'generalDepartmentName'}} :</label>
          	{{form.profileInfoDrop.generalDepartmentName}}
          </td>
          <td class="width50">
          	<label class="label">{{i18nTranslate 'generalDepartmentCode'}} :</label>
          	{{form.profileInfoDrop.generalDepartmentCode}}
          </td>
        </tr>

        <tr>
          <td class="width50">
          	<label class="label">{{i18nTranslate 'nationality'}} :</label>
          	{{form.profileInfoDrop.nationality}}
          </td>
          <td class="width50">
          	<label class="label">{{i18nTranslate 'employeeEmail'}} </label>
          	{{form.profileInfoDrop.employeeEmail}}
          </td>
        </tr>

        <tr>
          <td class="width50">
          	<label class="label">{{i18nTranslate 'businessPhone'}} :</label>
          	{{form.profileInfoDrop.businessPhone}}
          </td>
          <td class="width50">
          	<label class="label">{{i18nTranslate 'humanResourcesLocation'}} :</label>
          	{{form.profileInfoDrop.humanResourcesLocation}}
          </td>
        </tr>
      </table>

    </div>
   
    {{#each form.sections}}
    {{> (getPartialName @root this.id @last) i18n=@root.i18n lovs=@root.form.lovs sectionTitle=(getSectionTitle id @root.segmentDynamicLoader)}}
  {{/each}}



  </center>
</body>
</html>
`
  , requestDetails :`
<div class="printPreview" onload="window.print();window.close()">




<table cellpadding="0" cellspacing="0" class="width100">
<tr class="innerTitleTr">
<td class="width40">{{sectionTitle}}</td>
<td  class="width45">{{header.personTo}}</td>
 <td  class="width15">

{{#if body.details.decision.key}}
<div class="status {{body.details.decision.key}}">{{body.details.decision.value}}</div>
{{/if}}
</td>
</tr>
</table>



{{#if body.details.familyProfileSegment.familyProfile}}


<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'familyProfile'}}</td>
</tr>
</table>

{{#each body.details.familyProfileSegment.familyProfile }}




<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{firstNameEn}} {{relationship.value}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">


<tr>
  <td> <label class='label'>{{i18nTranslate 'title'}}</label></td> 
  <td>{{title.value }}</td>
</tr>
<tr>

<td> <label class='label'>{{i18nTranslate 'firstNameAr'}}</label></td> 
 <td>{{ firstNameAr }}
 </td>
 </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'firstNameEn'}}</label></td> 
 <td>{{ firstNameEn }}
 </td>

 </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'fatherNameAr'}}</label></td> 
 <td>{{ fatherNameAr }}</td>
 </tr>
 <tr>
<td> <label class='label'>{{i18nTranslate 'fatherNameEn'}}</label></td>
 <td>{{ fatherNameEn }}</td>

 </tr>
 <tr>


 </tr>
 <tr>
<td> <label class='label'>{{i18nTranslate 'grandFatherNameEn'}}</label></td>
 <td>{{ grandFatherNameEn }}</td>

 </tr>
<tr>


<td> <label class='label'>{{i18nTranslate 'grandFatherNameAr'}}</label></td> 
 <td>{{ grandFatherNameAr }}</td>
 </tr>
<tr>

<td> <label class='label'>{{i18nTranslate 'familyNameEn'}}</label></td>
 <td>{{ familyNameEn }}</td>
</tr>
<tr>
<td> <label class='label'>{{i18nTranslate 'familyNameAr'}}</label></td> 
 <td>{{ familyNameAr }}</td>
 </tr>
<tr>

<td> <label class='label'>{{i18nTranslate 'nationality'}}</label></td>
 <td>{{ nationality.value }}</td>
</tr>
<tr>

</tr>
<tr>
<td> <label class='label'>{{i18nTranslate 'newToSaudi'}}</label></td> 
 <td>
  {{#if (eq newToSaudi 'true')}}
  <input id="c1" type="checkbox"  checked name="g">
  {{/if}}

  {{#if (eq newToSaudi 'false')}}
  <input id="c1" type="checkbox"   name="g">
  {{/if}}

 </td>
 </tr>
 <tr>
<td> <label class='label'>{{i18nTranslate 'maritalStatus'}}</label></td>
 <td>{{ maritalStatus.value }}</td>
 </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'borderBirthNumber'}}</label></td>
 <td>{{ borderBirthNumber }}</td>

 
</tr>
<tr>
<td> <label class='label'>{{i18nTranslate 'idNumber'}}</label></td> 
 <td>{{ idNumber }}</td>

</tr>
<tr>
<td> <label class='label'>{{i18nTranslate 'birthDate'}}</label></td> 
 <td>{{dateFormatHelper3 birthDate }}</td>
 </tr>
<tr>
<td> <label class='label'>{{i18nTranslate 'age'}}</label></td>
 <td>{{ age }}</td>
</tr>



<tr>
<td> <label class='label'>{{i18nTranslate 'gender'}}</label></td> 
 <td>{{gender }}</td>
<tr>

<tr>
<td> <label class='label'>{{i18nTranslate 'relationship'}}</label></td> 
 <td>{{relationship.value }}</td>
<tr>

<tr>
<td> <label class='label'>{{i18nTranslate 'disabilityFlag'}}</label></td> 
 <td>{{disabilityFlag.value }}</td>
<tr>

<tr>
<td> <label class='label'>{{i18nTranslate 'disabilityType'}}</label></td> 
 <td>{{disabilityType.value }}</td>
<tr>



<tr>
<td> <label class='label'>{{i18nTranslate 'chronicDisease'}}</label></td> 
 <td>{{chronicDisease.value }}</td>
<tr>



<tr>
<td> <label class='label'>{{i18nTranslate 'chronicDiseaseType'}}</label></td> 
 <td>{{chronicDiseaseType.value }}</td>
<tr>


<tr>
<td> <label class='label'>{{i18nTranslate 'working'}}</label></td> 
 <td>{{working.value }}</td>
<tr>


<tr>
<td> <label class='label'>{{i18nTranslate 'noNeedMedical'}}</label></td> 
 <td>{{noNeedMedical.value }}</td>
<tr>

<tr>
<td> <label class='label'>{{i18nTranslate 'coverageNote'}}</label></td> 
 <td>{{ coverageNote }}</td>

</tr>

<tr>

<td> <label class='label'>{{i18nTranslate 'justification'}}</label></td>
 <td>{{ justification }}</td>
</tr>
<tr>
<td> <label class='label'>{{i18nTranslate 'note'}}</label></td> 
 <td>{{ note }}</td>

</tr>
</table>
{{/each}}
 {{/if}}

 {{#if body.details.parentProfileSegment.parentProfile}}


 <table cellpadding="0" cellspacing="0" class="width100">
 <tr>
   <td colspan="2" class="requesterName">{{i18nTranslate 'parentProfile'}}</td>
 </tr>
 </table>
 
 {{#each body.details.parentProfileSegment.parentProfile }}
 
 
 
 
 <table cellpadding="0" cellspacing="0" class="width100">
 <tr>
   <td colspan="2" class="requesterName">{{firstNameEn}} ({{relationship.value}})</td>
 </tr>
 </table>
 
 
 <table border="1" cellpadding="0" cellspacing="0" class="width100">
 
 
 <tr>
     <td colspan = "2" align = "center" > <label class='label' >{{i18nTranslate 'title'}}</label></td> 
     <td colspan = "2" >{{title.value }}</td>
     
   </td>
 </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'firstNameEn'}}</label></td> 
 <td>{{ firstNameEn }}
 <td> <label class='label'>{{i18nTranslate 'firstNameAr'}}</label></td> 
 <td>{{ firstNameAr }}
 </td>
 
 </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'fatherNameEn'}}</label></td> 
 <td>{{ fatherNameEn }}</td>
 <td> <label class='label'>{{i18nTranslate 'fatherNameAr'}}</label></td>
 <td>{{ fatherNameAr }}</td>
 </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'grandFatherNameEn'}}</label></td>
 <td>{{ grandFatherNameEn }}</td>
 <td> <label class='label'>{{i18nTranslate 'grandFatherNameAr'}}</label></td> 
 <td>{{ grandFatherNameAr }}</td>
 
 
 </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'familyNameEn'}}</label></td>
 <td>{{ familyNameEn }}</td>
 <td> <label class='label'>{{i18nTranslate 'familyNameAr'}}</label></td> 
 <td>{{ familyNameAr }}</td>
 </tr>
 <tr>
 <tr>
 
 <td> <label class='label'>{{i18nTranslate 'nationality'}}</label></td>
  <td>{{ nationality.value }}</td>
  <td> <label class='label'>{{i18nTranslate 'idNumber'}}</label></td> 
  <td>{{ idNumber }}</td>
 </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'gender'}}</label></td> 
  <td>{{gender.value }}</td>
  <td> <label class='label'>{{i18nTranslate 'relationship'}}</label></td> 
  <td>{{relationship.value }}</td>
 </tr>
  <tr>
 <td> <label class='label'>{{i18nTranslate 'maritalStatus'}}</label></td>
  <td>{{ maritalStatus.value }}</td>
  <td> <label class='label'>{{i18nTranslate 'birthDate'}}</label></td> 
  <td>{{dateFormatHelper3 birthDate }}</td>
 </tr>
 <tr>
 
  </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'age'}}</label></td>
  <td>{{ age }}</td>
  <td> <label class='label'>{{i18nTranslate 'disabilityFlag'}}</label></td> 
  <td>{{disabilityFlag.value }}</td>
 </tr>
 
 <tr>
 <td> <label class='label'>{{i18nTranslate 'disabilityType'}}</label></td> 
  <td>{{disabilityType.value }}</td>
  <td> <label class='label'>{{i18nTranslate 'chronicDisease'}}</label></td> 
  <td>{{chronicDisease.value }}</td>
 </tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'chronicDiseaseType'}}</label></td> 
  <td>{{chronicDiseaseType.value }}</td>
  <td> <label class='label'>{{i18nTranslate 'idAttachment'}}</label></td> 
  <td>{{idAttachment.fileName }}</td>
 <tr>
 <tr>
 <td> <label class='label'>{{i18nTranslate 'familyCard'}}</label></td> 
  <td>{{familyCard.fileName }}</td>
 <td> <label class='label'>{{i18nTranslate 'note'}}</label></td> 
  <td>{{ note }}</td>
 </tr>
 
 <tr>
  <td> <label class='label'>{{i18nTranslate 'justification'}}</label></td>
  <td colspan = "3" >{{ justification }}</td>
 </tr>
 
 </table>
 {{/each}}
  {{/if}}
  

{{#if body.details.nationalAddressSegment.nationalAddress}}

<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'nationalAddressSegment'}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">

<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'buildingNumber'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'streetName'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'district'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'city'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'postalCode'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'additionalNumber'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'note'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'counter'}}</label></td> 
</tr>


{{#each body.details.nationalAddressSegment.nationalAddress }}

<tr>
  <td class="width20">{{buildingNumber }}</td>
  <td class="width20">{{streetName }}</td>
  <td class="width20">{{district }}</td>
  <td class="width20">{{city.value }}</td>
  <td class="width20">{{postalCode }}</td>
  <td class="width20">{{additionalNumber }}</td>
  <td class="width20">{{note }}</td>
  <td class="width20">{{counter }}</td>
</tr>
{{/each}}



</table>
{{/if}}

{{#if body.details.officialDocumentSegment.officialDocument}}


<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'officialDocumentSegment'}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'documentType'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'documentNumber'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'issuePlace'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'issueDate'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'expiryDate'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'profession'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'version'}}</label></td> 
</tr>


{{#each body.details.officialDocumentSegment.officialDocument }}

<tr>
  <td class="width20">{{documentType.value }}</td>
  <td class="width20">{{documentNumber }}</td>
  <td class="width20">{{issuePlace.value }}</td>
  <td class="width20">{{ dateFormatHelper3 issueDate }}</td>
  <td class="width20">{{ dateFormatHelper3 expiryDate }}</td>
  <td class="width20">{{profession }}</td>
  <td class="width20">{{version }}</td>
</tr>
{{/each}}



</table>

{{/if}}


{{#if body.details.officeLocationSegment.officeLocation}}


<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'officeLocation'}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'costCenter'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'region'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'districts'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'campus'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'building'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'floor'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'officeNo'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'note'}}</label></td> 
</tr>


<tr>
  <td class="width20">{{ body.details.officeLocationSegment.officeLocation.costCenter }}</td>
  <td class="width20">{{ body.details.officeLocationSegment.officeLocation.region }}</td>
  <td class="width20">{{ body.details.officeLocationSegment.officeLocation.district }}</td>
  <td class="width20">{{ body.details.officeLocationSegment.officeLocation.campus }}</td>
  <td class="width20">{{ body.details.officeLocationSegment.officeLocation.building }}</td>
  <td class="width20">{{body.details.officeLocationSegment.officeLocation.floor }}</td>
  <td class="width20">{{body.details.officeLocationSegment.officeLocation.officeNo }}</td>
  <td class="width20">{{body.details.officeLocationSegment.officeLocation.note }}</td>
  
</tr>



</table>

{{/if}}



{{#if body.details.previousExperienceSegment.previousExperience}}


<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'previousExperience'}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'jobTitle'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'country'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'city'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'companyName'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'jobField'}}</label></td> 
 
 
</tr>


{{#each body.details.previousExperienceSegment.previousExperience }}

<tr>
  <td class="width20">{{ jobTitle }}</td>
  <td class="width20">{{ country.value }}</td>
  <td class="width20">{{ city }}</td>
  <td class="width20">{{ companyName }}</td>
  <td class="width20">{{ jobField.value }}</td>
   
</tr>
{{/each}}


</table>
<br/>
<br/>
<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
    <td class="width20"> <label class='label'>{{i18nTranslate 'companySector'}}</label></td> 
    <td class="width20"> <label class='label'>{{i18nTranslate 'startDate'}}</label></td> 
    <td class="width20"> <label class='label'>{{i18nTranslate 'endDate'}}</label></td> 
    <td class="width20"> <label class='label'>{{i18nTranslate 'duration'}}</label></td> 
    <td class="width20"> <label class='label'>{{i18nTranslate 'responsibilities'}}</label></td> 
</tr>

{{#each body.details.previousExperienceSegment.previousExperience }}

<tr>
  <td class="width20">{{companySector.value }}</td>
  <td class="width20">{{dateFormatHelper3 startDate }}</td>
  <td class="width20">{{dateFormatHelper3 endDate }}</td>
  <td class="width20">{{duration.periodYears  }} Years and {{duration.periodMonths  }} months </td>
  <td class="width20">{{responsibilities }}</td>
</tr>
{{/each}}



</table>

{{/if}}


{{#if body.details.qualificationSegment.qualification}}


<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'qualification'}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td class="width15"> <label class='label'>{{i18nTranslate 'educationLevel'}}</label></td> 
  <td class="width15"> <label class='label'>{{i18nTranslate 'universityInstitute'}}</label></td> 
  <td class="width15"> <label class='label'>{{i18nTranslate 'country'}}</label></td> 
  <td class="width15"> <label class='label'>{{i18nTranslate 'city'}}</label></td> 
  <td class="width15"> <label class='label'>{{i18nTranslate 'major'}}</label></td> 
  <td class="width15"> <label class='label'>{{i18nTranslate 'subMajor'}}</label></td>
  <td class="width15"> <label class='label'>{{i18nTranslate 'scale'}}</label></td>
  <td class="width15"> <label class='label'>{{i18nTranslate 'gpa'}}</label></td> 
  
 

</tr>


{{#each body.details.qualificationSegment.qualification }}

<tr>
  <td class="width15">{{ educationLevel.value }}</td>
  <td class="width15">{{ universityInstitute.value }}</td>
  <td class="width15">{{ country.value }}</td>
  <td class="width15">{{ city.value }}</td>
  <td class="width15">{{ major.value }}</td>
  <td class="width15">{{subMajor.value }}</td>
  <td class="width15">{{scale.value }}</td>
  <td class="width15">{{gpa }}</td>

</tr>
{{/each}}



</table>

<br/>

<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
 
 
  <td class="width15"> <label class='label'>{{i18nTranslate 'evaluationNo'}}</label></td>
  <td class="width15"> <label class='label'>{{i18nTranslate 'evaluationDate'}}</label></td>
  <td class="width15"> <label class='label'>{{i18nTranslate 'startDate'}}</label></td> 
  <td class="width15"> <label class='label'>{{i18nTranslate 'graduatedDate'}}</label></td>
  <td class="width15"> <label class='label'>{{i18nTranslate 'note'}}</label></td> 
  <td class="width15"> <label class='label'>{{i18nTranslate 'justification'}}</label></td>
  

</tr>


{{#each body.details.qualificationSegment.qualification }}

<tr>
  <td class="width15">{{evaluationNo }}</td>
  <td class="width15">{{dateFormatHelper3 evaluationDate  }}</td>
  <td class="width15">{{dateFormatHelper3 startDate  }}</td>
  <td class="width15">{{dateFormatHelper3 graduatedDate  }}</td>
  <td class="width15">{{  note }}</td>
  <td class="width15">{{ justification  }}</td>
</tr>
{{/each}}



</table>

{{/if}}


{{#if body.details.professionalCertificateSegment.professionalCertificate}}


<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'professionalCertificate'}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'certificateNo'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'certificateOrganization'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'certificateName'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'certificateDate'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'expiryDate'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'certificate'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'justification'}}</label></td> 


</tr>


{{#each body.details.professionalCertificateSegment.professionalCertificate }}

<tr>
  <td class="width20">{{ certificateNo }}</td>
  <td class="width20">{{ certificateOrganization.value }}</td>
  <td class="width20">{{ certificateName.value }}</td>
  <td class="width20">{{dateFormatHelper3 certificateDate  }}</td>
  <td class="width20">{{dateFormatHelper3 expiryDate  }}</td>
  <td class="width20">{{certificate.fileName }}</td>
  <td class="width20">{{justification }}</td>


</tr>
{{/each}}



</table>

{{/if}}

{{#if body.details.originalAddressSegment.originalAddress}}


<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'originalAddress'}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'country'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'city'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'districtName'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'streetName'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'postalCode'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'buildingNumber'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'unitNumber'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'additionalNumber'}}</label></td> 

</tr>


{{#each body.details.originalAddressSegment.originalAddress }}

<tr>
  <td class="width20">{{ country.value }}</td>
  <td class="width20">{{ city }}</td>
  <td class="width20">{{ districtName  }}</td>
  <td class="width20">{{streetName  }}</td>
  <td class="width20">{{postalCode }}</td>
  <td class="width20">{{buildingNumber }}</td>
  <td class="width20">{{unitNumber }}</td>
  <td class="width20">{{additionalNumber }}</td>
</tr>
{{/each}}



</table>

{{/if}}

{{#if body.details.contactInformationSegment.contactInformation}}


<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'contactInformation'}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'type'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'countryCode'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'areaCode'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'phone'}}</label></td> 
  <td class="width20"> <label class='label'>{{i18nTranslate 'primary'}}</label></td> 
  
 

</tr>


{{#each body.details.contactInformationSegment.contactInformation }}

<tr>
  <td class="width20">{{ type.value }}</td>
  <td class="width20">{{ countryCode.value }}</td>
  <td class="width20">{{ areaCode.value  }}</td>
  <td class="width20">{{ phone  }}</td>
  <td class="width20">{{ primary }}</td>
 
  

</tr>
{{/each}}



</table>

{{/if}}

{{#if body.details.medicalDetailsSegment.medicalDetails}}


<table cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td colspan="2" class="requesterName">{{i18nTranslate 'medicalDetail'}}</td>
</tr>
</table>


<table border="1" cellpadding="0" cellspacing="0" class="width100">
<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'bloodType'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.bloodType.value }}</td>
  <td class="width20"> <label class='label'>{{i18nTranslate 'weight'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.weight }}</td>
  <td class="width20"> <label class='label'>{{i18nTranslate 'height'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.height }}</td>
</tr>

<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'smoker'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.smoker.value }}</td>
  <td class="width20"> <label class='label'>{{i18nTranslate 'chronicDiseaseFlag'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.chronicDisease.value }}</td>
  <td class="width20"> <label class='label'>{{i18nTranslate 'chronicDiseaseType'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.chronicDiseaseType.value }}</td>
</tr>

<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'disabilityFlag'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.disabilityFlag.value }}</td>
  <td class="width20"> <label class='label'>{{i18nTranslate 'disabilityType'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.disabilityType.value }}</td>
  <td class="width20"> <label class='label'>{{i18nTranslate 'medicalReport'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.medicalReport.fileName }}</td>
</tr>
<tr>
  <td class="width20"> <label class='label'>{{i18nTranslate 'disabilityCard'}}</label></td> 
  <td class="width20">{{ body.details.medicalDetailsSegment.medicalDetails.disabilityCard.fileName }}</td>
  <td class="width20"> </td> 
  <td class="width20"></td>
  <td class="width20"> </td> 
  <td class="width20"></td>
</tr>

</table>

{{/if}}


</div>
`
      

};
