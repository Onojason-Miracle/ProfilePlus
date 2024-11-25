document.addEventListener("DOMContentLoaded", function () {
  // Detect the current page based on the URL or the presence of elements
  if (document.querySelector("#userForm")) {
    // Logic for form.html
    document
      .querySelector("#userForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const firstName = document.querySelector("#f-name").value;
        const lastName = document.querySelector("#l-name").value;
        const email = document.querySelector("#email").value;
        const number = document.querySelector("#number").value;
        const dpInput = document.querySelector("#dp").files[0];
        const gender = document.querySelector(
          "input[name='gender']:checked"
        ).value;
        const linkedin = document.querySelector("#linkedin").value;
        const instagram = document.querySelector("#instagram").value;
        const twitter = document.querySelector("#twitter").value;
        const facebook = document.querySelector("#facebook").value;
        const youtube = document.querySelector("#youtube").value;
        const website = document.querySelector("#website").value;
        const tiktok = document.querySelector("#tiktok").value;
        const resume = document.querySelector("#resume").value;

        // Generate ID
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
        const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit number
        const id = `NGN/${currentYear}/${currentMonth}/${randomNumber}`;

        const maxFileSize = 2 * 1024 * 1024; // 2MB limit
        if (dpInput.size > maxFileSize) {
          alert("Please upload an image smaller than 2MB.");
          return;
        }

        // Convert the display picture to Base64
        const reader = new FileReader();
        reader.onload = function () {
          const dpBase64 = reader.result;

          // Save data in localStorage
          const formData = {
            id,
            firstName,
            lastName,
            email,
            number,
            dpBase64,
            gender,
            linkedin,
            instagram,
            twitter,
            facebook,
            youtube,
            website,
            resume,
            tiktok,
          };
          localStorage.setItem("formData", JSON.stringify(formData));

          // Redirect to formdata.html
          window.location.href = "formData.html";
        };

        if (dpInput && dpInput.type.startsWith("image/")) {
          reader.readAsDataURL(dpInput);
        } else {
          alert("Please upload a valid image file.");
        }
      });
  } else if (document.querySelector("#displayData")) {
    // Logic for formdata.html
    const formData = JSON.parse(localStorage.getItem("formData"));

    if (formData && formData.dpBase64) {
      // console.log("Form submitted");
      // console.log("Form Data:", { gender, firstName, middleName, lastName, email, number });

      const displayDataDiv = document.querySelector("#displayData");
      displayDataDiv.innerHTML = `
      
       
          <p class=" "> <img src=${formData.dpBase64} alt="Display Picture" class="img"/></p>

           <h2 class="white">${formData.firstName} ${formData.lastName}</h2>
        
        <p class="white"><strong>ID:</strong> ${formData.id}</p>

       
       
       <a href="mailto:${formData.email}"  class = "data-a mt-3">
       <i class="fa-solid fa-envelope"></i>
         <strong>Email</strong>
       </a>
     
     
       <a  href="tel:${formData.number}" class = "data-a  mt-3">
        <i class="fa-solid fa-phone"></i>
         <strong>Phone Number</strong>
       </a>

      

       <p class="mt-3  gender">
       <i class="fa-solid fa-user"></i>
       <strong>${formData.gender}</strong></p>

       
       
       
       <a href="${formData.linkedin}" target="_blank" class="data-a ">
       <i class="fa-brands fa-linkedin"></i>
       <strong>linkedin</strong>
       </a>
       
       
       
       

        
     
       <a href="${formData.instagram}" target="_blank" class="data-a mt-3  ">
         <i class="fa-brands fa-square-instagram"></i>
          <strong>Instagram</strong>
       </a>
      
       

        
       
       <a href="${formData.twitter}" target="_blank" class="data-a mt-3 ">
       <i class="fa-brands fa-square-x-twitter"></i>
       <strong>Twitter/X</strong>
       </a>
       
       
       
      

         
       
       <a href="${formData.facebook}" target="_blank"  class="data-a mt-3 ">
       <i class="fa-brands fa-square-facebook"></i>
        <strong>Facebook</strong>
       </a>
       
       
      
      


   
      
      <a href="${formData.youtube}" target="_blank" class="data-a mt-3 ">
      <i class="fa-brands fa-youtube"></i>
      <strong>Youtube</strong>
      </a>
      
     

       
       
       <a href="${formData.website}" target="_blank" class="data-a mt-3 ">
       <i class="fa-solid fa-globe"></i>
        <strong>Website</strong>
       </a>
       
       
      
       

       
      <a href="${formData.tiktok}" target="_blank" class="data-a mt-3 ">
      <i class="fa-brands fa-tiktok"></i>
       <strong>Tiktok</strong>
      </a>
     
      

       
      
      <a href="${formData.resume}" target="_blank" class="data-a mt-3 ">
      <i class="fa-solid fa-file"></i>
       <strong>Resume</strong>
      </a>
     
   
      `;
    } else {
      document.querySelector("#displayData").innerHTML =
        "<p>No data found. Please fill out the form first.</p>";
    }
  }
});
