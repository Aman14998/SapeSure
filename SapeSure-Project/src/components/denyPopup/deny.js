import focusTrap from "../focus";

export default function denyClaim(recordData){
    const modal = document.getElementById("mydenyModal");
    const claimantName = document.getElementById("claimName");
    const claimentAmount = document.getElementById("claimAmt");
    const textAreaComment = document.getElementById("modal__comment");
    const errorMsg = document.getElementsByClassName("ErrorMsg")[0];
    let statusRowElement;
    let leftAmount;
    let approveAmount;
    let totalAmount;
    let passClaimIcon;
    let denyClaimIcon;

    function denyPopup(x, y, index){
        modal.style.display = "block";
        claimentAmount.innerHTML= x;
        claimantName.innerHTML= y; 
        statusRowElement = document.getElementById(`status${index}`);
        leftAmount = document.getElementById(`leftAmount${index}`); 
        approveAmount = document.getElementById(`approveAmount${index}`);
        passClaimIcon = document.getElementById(`passClaim${index}`);
        denyClaimIcon = document.getElementById(`denyClaim${index}`);
        totalAmount = x;
        focusTrap();
    }

    for(let i=0;i<recordData.length;i+=1){
        document.getElementById(`denyClaim${i}`).addEventListener("click",()=> {
            denyPopup(recordData[i].claimedAmount, recordData[i].claimantName, i)
        });
    }
    function denyCancel(){
        modal.style.display = "none";
        textAreaComment.value = "";
        errorMsg.style.display = "none";
        textAreaComment.style.border = "2px solid gray";
    }
    document.getElementById("denyCancelBtn").addEventListener("click", denyCancel);

    function denySubmit(){
        if(textAreaComment.value === "" || textAreaComment.value === null){
            errorMsg.style.display = "block";
            textAreaComment.style.border = "1px solid red";
        }
        else{
            modal.style.display = "none";
            errorMsg.style.display = "none";
            textAreaComment.style.border = "2px solid gray";
            textAreaComment.value = "";
            statusRowElement.innerHTML = "Denied";
            statusRowElement.style = "border: 1.5px solid #0e6b8c; background-color: #d6f5ff; color: #0e6b8c; padding: 1.5px 6.6px; border-radius: 4px;";
            approveAmount.innerHTML = `$0 &nbsp &nbsp`;
            leftAmount.innerHTML = `($${totalAmount})`;
            leftAmount.style = "color: #e60000";
            passClaimIcon.disabled = true;
            denyClaimIcon.disabled = true;
            passClaimIcon.classList.add("disable");
            denyClaimIcon.classList.add("disable");
        }
    }
    document.getElementById("denySubmitBtn").addEventListener("click", denySubmit);
}
