function addRecipient(){
    recip = document.getElementById("recipient")
    let input = document.createElement("input");
    input.type = "email";
    input.name = "recipient";
    recip.appendChild(input);
}
function deleteRecipient(){
    recip = document.getElementById("recipient")
    if(recip.childElementCount > 1){
        recip.removeChild(recip.lastChild)
    }
}
function recipientsEmpty(recips) {
    recips.forEach(item => {
        if(item === "") return 1;
    })
    return 0;
}
document.getElementById("submit").addEventListener("click", ()=>{
    text = document.getElementsByName("text")[0].value
    subject = document.getElementsByName("subject")[0].value
    sender = document.getElementsByName("sender")[0].value
    recipient = []
    document.getElementsByName("recipient").forEach((item, index) => {
        if(item.innerHTML === ""){
            recipient.push(item.value)
        }
    })
    if(text === "") {
        document.getElementById("errorMessage").innerHTML = "error must have text"
    }
    else if(subject === "") {
        document.getElementById("errorMessage").innerHTML = "error must have a subject"
    }
    else if(sender === "") {
        document.getElementById("errorMessage").innerHTML = "error must have a sender"
    }
    else if(recipientsEmpty(recipient) == 1){
        document.getElementById("errorMessage").innerHTML = "recipients cannot be empty"
    }
    else{
        const msg = {
            recipient: recipient,
            sender: sender,
            subject: subject,
            text: text
        }
        console.log(msg)
        fetch("http://localhost:3001/", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(msg)
        })
    }
})