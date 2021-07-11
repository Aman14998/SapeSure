import tablebody from "./tableBody"; // eslint-disable-line import/no-cycle

const tableContent = document.getElementsByClassName("table")[0];
const spinner = document.getElementsByClassName("spinner")[0];
export default function handleScrollEvent() {
    const { clientHeight } = tableContent;
    const { scrollTop } = tableContent;
    const { scrollHeight } = tableContent;
    document.body.style.height = scrollHeight;
    if (Math.ceil(clientHeight + scrollTop) + 75 >= scrollHeight && scrollTop) {
        spinner.style.display = "flex";
        spinner.style = "padding-top: 235rem";
        tablebody.dataFetch("https://api.npoint.io/53133779dbef6bebd738");
        tableContent.removeEventListener("scroll", handleScrollEvent);
    }
};
