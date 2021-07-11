import fetch from 'node-fetch';
import passClaim from '../passPopup/pass';
import denyClaim from '../denyPopup/deny';
import handleScrollEvent from './lazyLoading'; // eslint-disable-line import/no-cycle
import searchBarFilter from './claimantSearch'; // eslint-disable-line import/no-cycle

const tablebody = (() => {
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const statusType = (claimStatus) => {
    if(claimStatus==="Pending"){
      return "pending";
    }
    if(claimStatus === "Passed"){
      return "passed";
    }
    return "denied";
  }
  
  const actionBtnStatus = (claimStatus) => claimStatus === "Pending" ? "" : "disabled";
  const btnStatus = (claimStatus) =>  claimStatus === "Pending" ? "" : "disable";
  let records=[];
  const dataArray=()=>records;

  const creatingTableBody = (claimDataList) => {
    const tableBody = document.getElementById('tableBody');
  
    for(let i=0;i<claimDataList.length;i+=1) {
      const trElement = document.createElement('tr');
      trElement.setAttribute('class', 'row');
  
      const claimID = document.createElement('td');
      claimID.innerHTML = `<a href="#">${claimDataList[i].claimId}</a>`;
      trElement.appendChild(claimID);
  
      const claimantName = document.createElement('td');
      claimantName.innerHTML = claimDataList[i].claimantName;
      trElement.appendChild(claimantName);
  
      const claimantEmail = document.createElement('td');
      claimantEmail.innerHTML = `<a href="mailto:${claimDataList[i].claimantEmail}">${claimDataList[i].claimantEmail}</a>`;
      trElement.appendChild(claimantEmail);
  
      const providerName = document.createElement('td');
      providerName.innerHTML = `<div class="provider__name">${claimDataList[i].providerName}</div>`;
      trElement.appendChild(providerName);
  
      const claimDate = document.createElement('td');
      const date = claimDataList[i].claimDate;
      claimDate.innerHTML = `${date.slice(3,5)}-${date.slice(0,2)}-${date.slice(6,10)}`;
      trElement.appendChild(claimDate);
  
      const amount = document.createElement('td');
      const totalAmount = claimDataList[i].claimedAmount;
      const approvedAmount = claimDataList[i].passedAmount;
      const leftAmount = totalAmount-approvedAmount;
      const appr = approvedAmount.toString();

      const status = document.createElement('td');
      const claimStatus = capitalizeFirstLetter(claimDataList[i].status);
      
      status.innerHTML = `<span id = "status${i}" class="dropdown__check--status dropdown__check--${statusType(claimStatus)}">${claimStatus}</span>`;

      if(claimStatus === "Pending"){
        amount.innerHTML = `<span id="approveAmount${i}"> &nbsp &nbsp - &nbsp &nbsp </span> / $${totalAmount} <span id="leftAmount${i}" class="amount-${statusType(claimStatus)}">(-)</span>`;
      }
      else if(appr.length === 1){
        amount.innerHTML = `<span id="approveAmount${i}">$${approvedAmount} &nbsp &nbsp</span> / $${totalAmount} <span id="leftAmount${i}" class="amount-${statusType(claimStatus)}">($${leftAmount})</span>`;
      }else if(appr.length === 2){
        amount.innerHTML = `<span id="approveAmount${i}">$${approvedAmount} &nbsp</span> / $${totalAmount} <span id="leftAmount${i}" class="amount-${statusType(claimStatus)}">($${leftAmount})</span>`;
      }else{
      amount.innerHTML = `<span id="approveAmount${i}">$${approvedAmount}</span> / $${totalAmount} <span id="leftAmount${i}" class="amount-${statusType(claimStatus)}">($${leftAmount})</span>`;
      }
      trElement.appendChild(amount);
      trElement.appendChild(status);
      
      const buttonCol = document.createElement('td');
      buttonCol.innerHTML =
      `<button id="passClaim${i}" aria-label="pass claim" class="table__addbtn ${btnStatus(claimStatus)}" ${actionBtnStatus(claimStatus)}><i class="far fa-check-circle"><span class="table__addbtn--tooltip pass">Pass Claim</span></i></button>
      <button id="denyClaim${i}"  aria-label="deny claim" class="table__addbtn ${btnStatus(claimStatus)}" ${actionBtnStatus(claimStatus)}><i class="far fa-times-circle"><span class="table__addbtn--tooltip  deny">Deny Claim</span></i></button>
      <a href= "/claimData.zip" aria-label="download claim data" class="table__addbtn" style="color:#9c106c" target="_blank" download><i class="far fa-arrow-alt-circle-down"><span class="table__addbtn--tooltip download">Download</span></i></a>`
      
      trElement.appendChild(buttonCol);
      tableBody.appendChild(trElement);
    }
  }
  
  const spinner = document.getElementsByClassName("spinner")[0];
  function dataFetch(url) {
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        records = records.concat(res.data.records);
        spinner.style.display = "none";
        document.querySelector("tbody").innerHTML = "";
        creatingTableBody(records);
        searchBarFilter.searchListener(records);
        passClaim(records);
        denyClaim(records);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  document.onload = dataFetch('https://api.npoint.io/19c8e5c5f623da3c7576');
  
  const tableContainer = document.getElementsByClassName("table")[0];
  tableContainer.addEventListener("scroll", handleScrollEvent);
  return {
    capitalizeFirstLetter,
    dataArray,
    creatingTableBody,
    dataFetch,
 };
})();

export default tablebody;
