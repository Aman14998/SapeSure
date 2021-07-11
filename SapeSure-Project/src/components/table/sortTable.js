import tablebody from "./tableBody";
import passClaim from '../passPopup/pass';
import denyClaim from '../denyPopup/deny';
import handleStatusFilter from './filterdropdown';

const sortTable = (buttonClassList, currentDataRecord) => {
    const sortingDirection = buttonClassList[1];
    const sortClaimField = buttonClassList[2];
    let key;
    if(sortClaimField === "sort-claimant-name"){
        key = "claimantName";
    }else if(sortClaimField === "sort-provider-name"){
        key = "providerName";
    }else if(sortClaimField === "sort-claim-date"){
        key = "claimDate";
    }else{
        console.log("no action");
    }

    const formatDateForSort = (date) => {
        const dateFormat = date.split("-");
        return `${dateFormat[2]}-${dateFormat[1]}-${dateFormat[0]}`;
    };
    
    switch (key) {
        case "claimDate":
            currentDataRecord.sort((a, b) => {
                const formattedDateFirst = formatDateForSort(a.claimDate);
                const formattedDateSecond = formatDateForSort(b.claimDate);
                const dateA = new Date(formattedDateFirst);
                const dateB = new Date(formattedDateSecond);
                if (sortingDirection === "ascending-sort") {
                    return dateA - dateB;
                }
                return dateB - dateA;
            });
            break;
        case "claimantName":
        case "providerName":
            if (sortingDirection === "ascending-sort") {
                currentDataRecord.sort((a, b) => {
                    const first = a[key].toLowerCase();
                    const second = b[key].toLowerCase();
                    if (first < second) {
                        return -1;
                    }
                    if (first > second) {
                        return 1;
                    }
                    return 0;
                });
            } else {
                currentDataRecord.sort((a, b) => {
                    const first = a[key].toLowerCase();
                    const second = b[key].toLowerCase();
                    if (first < second) {
                        return 1;
                    }
                    if (first > second) {
                        return -1;
                    }
                    return 0;
                });
            }
            break;
        default:
            break;
    }
    document.querySelector("tbody").innerHTML = "";
    tablebody.creatingTableBody(currentDataRecord);
    denyClaim(currentDataRecord);
    passClaim(currentDataRecord);
    return currentDataRecord;
};
document.getElementById("table-header").addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    const buttonClassList = e.target.parentNode.classList;
    const currentData = tablebody.dataArray();
    const currentDataRecord = handleStatusFilter(currentData);
    sortTable(buttonClassList, currentDataRecord);
});


