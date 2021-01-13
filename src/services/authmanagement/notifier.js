module.exports = function (app, result) {
  function getLink(type, hash) {
    //url for app
    const url = "http://localhost:3000/" + type + "?token=" + hash;
    return url;
  }
  async function sendSms(sms) {
    try {
      const res = await app.service("sms").create(sms);
      console.log("SMS SENT SUCCESSFULLY", res);
    } catch (error) {
      console.log("SMS SENDING FAILED", error);
    }
  }
  async function createMail(email) {
    // console.log(email);
    try {
      const res = await app.service("mailer").create(email);
      //console.log(res);
    } catch (error) {
      //console.log(error);
    }
  }

  return {
    //identifyUserProps: ["phoneNumber"],

    notifier: async function (
      type,
      user,
      res,
      result,
      ems,
      mess,
      singlesms,
      singleemail,
      customsms,
      notifierOptions,
      data
    ) {
      const pin = "jjk";
      let tokenLink;
      let email, sms;
      switch (type) {
        case "resendVerifySignup": //sending the user the verification email
        // console.log("VERIFY USER",user)
          tokenLink = getLink("verify", user.verifyToken);
          email = {
            from: "gachagapius21@pepisandbox.com",
            to: [user.email],
            html: tokenLink,
            // `Hello ${user.email} use the Link to Verify your Account ` +
            // tokenLink,
            subject: "Verify Signup",
          };
          sms = {
            from: "",
            to: user.phone,
            message: `Your verification pin is ${user.verifyShortToken}`,
          };

          return createMail(email)
          break;

        case "adminInvite": //sending the user the verification email
          tokenLink = getLink("/verifyphone");
          email = {
            from: "me@samples.mailgun.org",
            to: user.email,
            subject: "Use email with id number on first login",
            text: "Enter your phone number to verify it" + user.resetPassword,
          };

          return createMail(email) || sendSms(sms);
          break;

        case "verifySignup": // confirming verification
          tokenLink = getLink("/", user.verifyToken);
          email = {
            from: "gachagapius21@pepisandbox.com",
            to: [user.email],
            subject: "Confirm Signup",
            html: "Thanks for verifying your email",
          };
          return createMail(email) || sendSms(sms);
          break;

        case "sendResetPwd":
          tokenLink = getLink("reset", user.resetToken);
          email = {
            from: "gachagapius21@pepisandbox.com",
            to: [user.email],
            subject: "Reset Password Request",
            html: tokenLink,
          };
          return createMail(email) || sendSms(sms);
          break;

        case "resetPwd":
          tokenLink = getLink("/");
          email = {
            from: "gachagapius21@pepisandbox.com",
            to: [user.email],
            subject: "Reset Password Successful",
            text: "Your Password has been changed successfully",
          };
          return createMail(email) || sendSms(sms);
          break;

        case "inviteExistingtenant":
          tokenLink = getLink("/");
          email = {
            from: process.env.GMAIL,
            to: user,
            subject: " Inviting Existing User To Room" + result,
            html: "Where the Room is " + result,
          };
          return createMail(email) || sendSms(sms);
          break;

        case "inviteTenantByMail":
          email = {
            from: process.env.GMAIL,
            to: user,
            subject: " Creating New Tenant To Room" + result,
            html: "Where the Room is " + result,
          };
          return createMail(email) || sendSms(sms);
          break;

        case "passwordChange":
          email = {
            from: "gachagapius21@pepisandbox.com",
            to: [user.email],
            subject: "Password Changed",
            text: "Password has been changed successfully ",
          };
          return createMail(email) || sendSms(sms);
          break;

        case "identityChange":
          tokenLink = getLink("verifyChanges", user.verifyToken);
          email = {};
          return createMail(email) || sendSms(sms);
          break;

        case "invite":
          tokenLink = getLink("signup");
          email = {
            from: process.env.GMAIL,
            to: user.email,
            subject: "Signup with us to manage the Agency",
            html: tokenLink,
          };
          return createMail(email) || sendSms(sms);
          break;

        case "invite_tenant":
          sms = {
            to: `+` + user,
            message: "Verify Signup Fucker",
          };
          return sendMessage(sms) || sendSms(sms);
          break;

        case "sendMassSMS":
          const contacts = res.data;
          const dddd = await contacts.reduce((acc, d) => {
            const found = acc.find((a) => a.phone === d.phone);
            if (!found) {
              acc.push(d.phone);
            }
            return acc;
          }, []);

          sms = {
            to: dddd,
            from: "",
            message: result.message,
          };
          console.log(sms);

          return sendSms(sms);
          break;

        case "sendMassEmails":
          const emails = ems.data;
          const recepients = emails.reduce((acc, d) => {
            const found = acc.find((a) => a.email === d.email);
            if (!found) {
              acc.push(d.email);
            }
            return acc;
          }, []);

          email = {
            from: "PeckerInc@pepisandbox.com",
            to: recepients,
            html: mess.message,
            subject: mess.title,
          };
          return createMail(email);
          break;

        case "sendSingleSms":
          //tokenLink = getLink("signup");
          // console.log("AT noooreoirdnfsdjk", singlesms);
          sms = {
            from: "",
            to: singlesms.to,
            message: singlesms.text,
          };
          return sendSms(sms);
          break;
        case "sendCustomSms":
          //tokenLink = getLink("signup");
          console.log("AT custom", customsms);
          sms = {
            from: "",
            to: customsms.phone,
            message:
              customsms.topic +
              " " +
              customsms.title +
              " " +
              customsms.description,
          };
          return sendSms(sms);
          break;

        case "sendSingleEmail":
          console.log(singleemail);
          email = {
            from: "PeckerInc@pepisandbox.com",
            to: [singleemail.to],
            html: singleemail.text,
            subject: "Admin Console",
          };
          return createMail(email);
          break;

        default:
          break;
      }
    },
  };
};
