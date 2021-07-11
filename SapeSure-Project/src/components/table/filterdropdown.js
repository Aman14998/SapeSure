import searchBarFilter from "./claimantSearch";

const filterState = () => {
    const passCheckBox = document.getElementById("Passed");
    const denyCheckbox = document.getElementById("Denied");
    const pendingCheckbox = document.getElementById("Pending");
    const statusObject = {
        passed: passCheckBox.checked,
        denied: denyCheckbox.checked,
        pending: pendingCheckbox.checked,
    };
    return statusObject;
};

const handleStatusFilter = (dataArray) => {
    const filterList = filterState();
    if (filterList.passed && filterList.pending && filterList.denied) {
        return dataArray;
    }
    const filterDataArray = [];
    dataArray.forEach((data) => {
        if (data.status === "passed" && filterList.passed) {
            filterDataArray.push(data);
        } else if (data.status === "denied" && filterList.denied) {
            filterDataArray.push(data);
        } else if (data.status === "pending" && filterList.pending) {
            filterDataArray.push(data);
        }
    });

    searchBarFilter.searchListener(filterDataArray); 
    return filterDataArray;
};
export default handleStatusFilter;
