import tablebody from "./tableBody";  // eslint-disable-line import/no-cycle
import passClaim from '../passPopup/pass';
import denyClaim from '../denyPopup/deny';

const searchBarFilter = (() => {

    const searchDataRecord = (value, records) => {
        const searchInputValue = value.trim().toLowerCase();
        const searchRegex = new RegExp(`${value.trim()}`, "gi");
        const updatedDataRecord = [];
        records.forEach((record) => {
            if (
                record.claimId.toLowerCase().includes(searchInputValue) ||
                record.claimantName.toLowerCase().includes(searchInputValue) ||
                record.claimantEmail.toLowerCase().includes(searchInputValue) ||
                record.providerName.toLowerCase().includes(searchInputValue)
            ) {
                const matchRecords = JSON.parse(JSON.stringify(record));
                matchRecords.claimId = matchRecords.claimId.replace(
                    searchRegex,
                    (match) => `<mark>${match}</mark>`
                );

                matchRecords.claimantName = matchRecords.claimantName.replace(
                    searchRegex,
                    (match) => `<mark>${match}</mark>`
                ); 

                matchRecords.claimantEmail = matchRecords.claimantEmail.replace(
                    searchRegex,
                    (match) => `<mark>${match}</mark>`
                );

                matchRecords.providerName = matchRecords.providerName.replace(
                    searchRegex,
                    (match) => `<mark>${match}</mark>`
                );
                // matchRecords.hrefEmail = record.claimantEmail;
                updatedDataRecord.push(matchRecords);
            }
        });

        if(updatedDataRecord.length===0){
            const noRecordMsg= document.querySelector("tbody");
            noRecordMsg.innerHTML = "<span class='empty-record' >No records found</span>";
            noRecordMsg.firstChild.style = "font-size:1rem;font-weight:600;color:#312b2b;";
        }
        else{
            document.querySelector("tbody").innerHTML = "";
        }
        tablebody.creatingTableBody(updatedDataRecord);
        denyClaim(updatedDataRecord);
        passClaim(updatedDataRecord);
        return JSON.stringify(updatedDataRecord);
    };

    // This method will listen for the changes in searchbar text
    const searchListener = (records) => {
        let searchTime;
        const searchInput = document.getElementById("search");
        searchInput.addEventListener("input", () => {
            clearTimeout(searchTime);
            searchTime = setTimeout(() => {
                searchDataRecord(searchInput.value, records);
            },500);
        });
    };

    return {
         searchListener,
    };
})();

export default searchBarFilter;


