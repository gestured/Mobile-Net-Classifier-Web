const model_status = document.getElementById("model_status");
const spinner = document.getElementById("spinner");
const main = document.getElementById("main");
const img_input_btn = document.getElementById("img_input_btn");
const img_submit_btn = document.getElementById("img_submit_btn");
const img_wrapper = document.getElementById("img_wrapper");
const prediction = document.getElementById("prediction");
const confidence = document.getElementById("confidence");

main.style.pointerEvents = "none";
main.style.filter = "blur(5px)";


const classifier = ml5.imageClassifier("MobileNet" , (err , model) => {
    console.log("MobileNet Model Loaded");
    model_status.innerHTML = "Model Loaded";
    model_status.style.color = "cyan";
    main.style.pointerEvents = "auto";
    main.style.filter = "none";
    spinner.style.visibility = "hidden";
});

img_submit_btn.addEventListener("click" , () => {
    if(img_wrapper.childNodes.length == 1)
        img_wrapper.removeChild(img_wrapper.lastElementChild);
    
    const img = new Image();
    const file = img_input_btn.files[0];

    img.src = URL.createObjectURL(file);
    
    img.onload = () =>{
        if(img.naturalWidth < 1000 || img.naturalHeight < 1000){
        img.style.height = img.naturalHeight + "px";
        img.style.width = img.naturalWidth  + "px";
        console.log(img.naturalWidth + "  " + img.naturalHeight);
        }
        else{
            img.style.height = img.naturalHeight/3 + "px";
            img.style.width = img.naturalWidth/3  + "px";
            console.log(img.naturalWidth + "  " + img.naturalHeight);
        }
        img_wrapper.appendChild(img);

        predictImage(img);
    };


});

function predictImage(input_img) {
    classifier.predict(input_img , (err , results) => {
        pred = results[0].label;
        conf = (results[0].confidence * 100).toFixed(2);
        prediction.innerHTML = 'Prediction : ' + pred;
        confidence.innerHTML = 'Confidence : ' + conf + '%';
    });
}