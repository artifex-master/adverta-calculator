function sendEmail() {
    Email.send({
    Host: "smtp.elasticemail.com",
    Username : "zharmukhamet@gmail.com",
    Password : "312D94DDA478EE317BC798373AC0FE405399",
    To : 'recipient’s email address',
    From : "zharmukhamet@gmail.com",
    Subject : "email subject",
    Body : "email body",
    Attachments : [
        {
            name : "smtpjs.png",
            path:"https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
        }]
    }).then(
        message => alert("mail sent successfully")
    );
  }