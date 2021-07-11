import focusTrap from "../focus";

export default function passClaim(recordData) {
    const modal = document.getElementById('myModal');
    const passClaimentName=document.getElementById("passClaimName");
    const passClaimentAmount=document.getElementById("passClaimAmt");
    const slider = document.getElementById("myinput");
    let statusRowElement;
    let leftAmount;
    let approveAmount;
    let passClaimIcon;
    let denyClaimIcon;
    let maxRangeValue;

    function passPopup(x, y, index) {
      modal.style.display = 'block';
      passClaimentAmount.innerHTML= 0;
      passClaimentName.innerHTML= y;
      statusRowElement = document.getElementById(`status${index}`);
      leftAmount = document.getElementById(`leftAmount${index}`); 
      approveAmount = document.getElementById(`approveAmount${index}`);
      passClaimIcon = document.getElementById(`passClaim${index}`);
      denyClaimIcon = document.getElementById(`denyClaim${index}`);
      slider.min = 0;
      slider.max = x;
      maxRangeValue = x;
      focusTrap();
    }

    for(let i=0;i<recordData.length;i+=1){
      document.getElementById(`passClaim${i}`).addEventListener('click', ()=>{
        passPopup(recordData[i].claimedAmount, recordData[i].claimantName ,i);
      });
    }
    function passCancel() {
      modal.style.display = 'none';
      slider.value = 0;
      slider.style.background = "linear-gradient(to right, #9c106c 0%, #fff 0%, #fff 100%, #fff 100%)";
    }
    document.getElementById('passCancelBtn').addEventListener('click', passCancel);

    function passSubmit(){
      modal.style.display = "none";
      statusRowElement.innerHTML = "Passed";
      statusRowElement.style = "border: 1.5px solid #9c106c; background-color: #ffecf9; color: #9c106c; padding: 1.5px 5.2px; border-radius: 4px;";
      leftAmount.style = "color: #1d872e";
      passClaimIcon.disabled = true;
      denyClaimIcon.disabled = true;
      passClaimIcon.classList.add("disable");
      denyClaimIcon.classList.add("disable");

      leftAmount.innerHTML = `($${maxRangeValue - passClaimentAmount.innerHTML})`;
      approveAmount.innerHTML = `$${passClaimentAmount.innerHTML}`;
      slider.value = 0;
      slider.style.background = "linear-gradient(to right, #9c106c 0%, #fff 0%, #fff 100%, #fff 100%)";
    }
    document.getElementById("passSubmitBtn").addEventListener("click", passSubmit);
    
    slider.oninput = function() {
      passClaimentAmount.innerHTML= this.value;
      const value = ((this.value - this.min) / (this.max - this.min)) * 100;
      this.style.background = `linear-gradient(to right, #9c106c 0%, #9c106c ${value}%, #fff ${value}%, white 100%)`;
    };
}

