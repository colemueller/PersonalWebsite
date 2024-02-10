var doc = document;
var easterEl;
var easterContainer;
var easterStage;
var portfolioStage;
var currentPortfolioContent;
var carouselImgs;
var carouselCurrImg;
var bugsplatFrame;
var request;
var dropdown;
var dropBtn;

function init()
{
    console.log(" ");
    console.log("Any warnings/errors you see in here are from Vimeo/Youtube/WebGL embedding...");
    console.log(" ");

    easterEl = doc.getElementById("easterEgg");
    easterContainer = doc.getElementById("easterContainer");
    easterStage = doc.getElementById("easterStage");
    portfolioStage = doc.getElementById("portfolioStage");
    dropdown = doc.getElementsByClassName("myDropdown")[0];
    dropBtn = doc.getElementById("dropbtn");
    doc.body.style.scrollBehavior = "smooth";
    $("body").fadeIn(3000);
    //ClearForm();

    carouselImgs = doc.getElementsByClassName("carouselImg");
    carouselCurrImg = 0;

    let year = new Date().getFullYear();
    doc.getElementById("thisYear").innerHTML = year;
}

const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

function EasterClick()
{
    var winX = doc.documentElement.clientWidth;
    var winY = doc.documentElement.clientHeight;
    console.log(winX + ", " + winY);

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    var result = gl instanceof WebGLRenderingContext
      ? "WebGl"
      : "!WebGl";
    
    if(winX > 1354 && winY > 1017 && result == "WebGl" && detectDeviceType() == 'Desktop')
    {
        var newFrame = doc.createElement("iframe");
        newFrame.setAttribute("src", "./BugSplat/index.html");
        newFrame.setAttribute("title", "Bug-Splat");
        easterStage.appendChild(newFrame);
        bugsplatFrame = newFrame;

        easterContainer.className = "easterClicked";
        setTimeout(function(){$(easterStage).fadeIn(1000);},500)
        doc.getElementsByTagName("body")[0].style = "overflow:hidden;";
        //easterStage.getElementsByTagName("iframe")[0].contentWindow.location.reload();
    }
}

function EasterClose()
{
    easterContainer.className = "easterClose";
    easterStage.style = "display:none;";
    bugsplatFrame.remove();
    setTimeout(function(){
        easterContainer.className = "";
        doc.getElementsByTagName("body")[0].style = "";
    }, 500);
}

function PortfolioClick(clickObj)
{
    /* clickObj.classList.add("noMouse");
    clickObj.classList.remove("box"); */
    portfolioStage.classList.add("portfolioClicked");
    content = doc.getElementById("portfolioContent");

    //unhide desire portfolio content
    var thisContent = clickObj.getElementsByTagName("h2")[0].innerHTML;
    switch(thisContent)
    {
        case "Gromelski &amp; Associates":
            currentPortfolioContent = doc.getElementById("gaiDetail");
            break;
        case "K'NEX® 3D":
            currentPortfolioContent = doc.getElementById("knexDetail");
            break;
        case "Groundless":
            currentPortfolioContent = doc.getElementById("groundlessDetail");
            break;
        case "Mocean":
            currentPortfolioContent = doc.getElementById("moceanDetail");
            break;
        case "Bebris":
            currentPortfolioContent = doc.getElementById("bebrisDetail");
            break;
        case "Drippy":
            currentPortfolioContent = doc.getElementById("drippyDetail");
            break;
        case "Miscellaneous":
            currentPortfolioContent = doc.getElementById("miscDetail");
            break;
    }
    currentPortfolioContent.style = "";
    
    setTimeout(function(){
        $(content).fadeIn(800);
        doc.body.style.top = window.pageYOffset+"px";
        doc.body.style.position = "fixed";
        doc.body.style.scrollBehavior = "auto";
        
        SetIframeHeight(currentPortfolioContent);

        var tmpHeight = currentPortfolioContent.offsetHeight/2;
        currentPortfolioContent.style = "top: calc(50% - "+tmpHeight+"px);";

    },300);

}

function PortfolioClose()
{
    if(currentPortfolioContent != undefined)
    {
        const scrollY = doc.body.style.top;
        doc.body.style.position = '';
        doc.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0'));

        //cover = doc.getElementsByClassName("portfolioAnimClicked")[0];
        //var clickObj = cover.parentElement;
        
        portfolioStage.classList.remove("portfolioClicked");
        //currentPortfolioContent.style = "display:none;";
        //portfolioStage.style = "display:none;";
        content = doc.getElementById("portfolioContent");
        $(content).fadeOut(100);
        pauseAllVideos();
        setTimeout(function(){
            
            /* clickObj.classList.remove("noMouse");
            clickObj.classList.add("box"); */
            doc.body.style.scrollBehavior = "smooth";
            currentPortfolioContent.style = "display:none;";
            currentPortfolioContent = undefined;
        }, 500);
    }
}

function navTo(el)
{
    var scrollToMe = doc.getElementById(el);
    var elementOffset = $(scrollToMe).offset().top;

    //var offset = (window.innerHeight/2) - scrollToMe.clientHeight/2;
    var offset = 140;
    var distance = elementOffset - offset;
    
    window.scroll({
        top:distance,
        left:0,
        behavior: 'smooth'
    });

    const tmpStyle = getComputedStyle(dropdown.parentElement);
    const dVal = tmpStyle.display;
    if(dVal == "block")
    {
        toggleMenu();
    }
}

/* function ClearForm()
{
    doc.getElementById("name").value = "";
    doc.getElementById("email").value = "";
    doc.getElementById("message").value = "";
}

function FormSubmit()
{
    var name = doc.getElementById("name").value;
    var email = doc.getElementById("email").value;
    var nameErr = doc.getElementById("nameErr");
    var emailErr = doc.getElementById("emailErr");
    var submitReturn = doc.getElementById("submitReturn");
    var message = doc.getElementById("message").value;

    var namePassed = false;
    var emailPassed = false;

    if (request) {
        request.abort();
    }
    
    if(name == "")
    {
        nameErr.innerHTML = "Name is required";
    }
    else if(ValidateName(name) == false)
    {
        nameErr.innerHTML = "Only letters and white space allowed";
    }
    else
    {
        nameErr.innerHTML = "";
        namePassed = true;
    }

    if(email == "")
    {
        emailErr.innerHTML = "Email is required";
    }
    else if(ValidateEmail(email) == false)
    {
        emailErr.innerHTML = "Invalid email format";
    }
    else
    {
        emailErr.innerHTML = "";
        emailPassed = true;
    }

    if(namePassed && emailPassed)
    {
        submitReturn.innerHTML = "Thank you for the message! I'll get back to you as soon as I can.";
        request = $.ajax({
            type: "POST",
            url: "contact.php",
            data: { name: name, email: email, message: message }
        });
        
        request.done(function (response, textStatus, jqXHR){
            // Log a message to the console
            console.log("Email sent!");
        });
    
        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error(
                "Email failed with error: "+
                textStatus, errorThrown
            );
        });
        
    }
    else
    {
        submitReturn.innerHTML = "";
    }

    delete name;
    delete email;
    delete message;
}

function test_input(data) {
    data = data.trim();
    data = data.replace(/[\/\\]/mg, '');
    data = escapeHtml(data);
    return data;
  }

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function ValidateEmail(e)
{
    var re = /\S+@\S+\.\S+/;
    var testEmail = test_input(e);

    return re.test(testEmail);
}

function ValidateName(n)
{
    var testName = test_input(n);
    var nameRe = /^[a-zA-Z-' ]*$/;

    return nameRe.test(testName);
} */

function SetIframeHeight(obj)
{
    var ifrm = obj.getElementsByClassName("portfolioDetailGraphic")[0].getElementsByTagName("iframe")[0];
    if(ifrm != undefined)
    {
        var newHeight = ifrm.offsetWidth / 1.77777778;
        ifrm.setAttribute("height", newHeight+"px");
        //console.log(ifrm.offsetHeight + " : " + newHeight);
    }
    
}

function carouselGoNext()
{
    if(carouselCurrImg == carouselImgs.length - 1)
    {
        $(carouselImgs[carouselCurrImg]).fadeOut(500);
        //$(carouselImgs[0]).fadeIn(500);
        carouselCurrImg = 0;
    }
    else
    {
        $(carouselImgs[carouselCurrImg]).fadeOut(500);
        //$(carouselImgs[carouselCurrImg + 1]).fadeIn(500);
        carouselCurrImg = carouselCurrImg + 1;
    }

    setTimeout(function(){
        $(carouselImgs[carouselCurrImg]).fadeIn(500);
    }, 300);
}

function carouselGoBack()
{
    if(carouselCurrImg == 0)
    {
        $(carouselImgs[carouselCurrImg]).fadeOut(500);
        //$(carouselImgs[carouselImgs.length - 1]).fadeIn(500);
        carouselCurrImg = carouselImgs.length - 1;
    }
    else
    {
        $(carouselImgs[carouselCurrImg]).fadeOut(500);
        //$(carouselImgs[carouselCurrImg - 1]).fadeIn(500);
        carouselCurrImg = carouselCurrImg - 1;
    }

    setTimeout(function(){
        $(carouselImgs[carouselCurrImg]).fadeIn(500);
    }, 300);
}

function toggleMenu()
{
    if(dropdown.classList.contains("showDropdown"))
    {
        dropdown.classList.remove("showDropdown");
        dropBtn.innerHTML = "☰";
    }
    else
    {
        dropdown.classList.add("showDropdown");
        dropBtn.innerHTML = "✕";
    }
}

function pauseAllVideos() 
{ 
    const videos = doc.querySelectorAll('iframe');
    videos.forEach(i => {
        const source = i.src
        i.src = ''
        i.src = source
     });
}