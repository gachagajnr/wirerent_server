const users = require("./users/users.service.js");
const buildingAdmins = require("./building-admins/building-admins.service.js");

const agents = require("./agents/agents.service.js");
const buildings = require("./buildings/buildings.service.js");
const chats = require("./chats/chats.service.js");

const profile = require("./profile/profile.service.js");
const roles = require("./roles/roles.service.js");
const rooms = require("./rooms/rooms.service.js");
const tenants = require("./tenants/tenants.service.js");
const sms = require("./sms/sms.service.js");
const authmanagement = require("./authmanagement/authmanagement.service.js");
const mailer = require("./mailer/mailer.service.js");
const permissions = require('./permissions/permissions.service.js');
const agencyAdmins = require('./agency-admins/agency-admins.service.js');
const notices = require('./notices/notices.service.js');
const requests = require('./requests/requests.service.js');
const teams = require('./teams/teams.service.js');
const uploads = require('./uploads/uploads.service.js');
const massSms = require('./mass-sms/mass-sms.service.js');
const massEmails = require('./mass-emails/mass-emails.service.js');
const agencyNotices = require('./agency-notices/agency-notices.service.js');
const singleSms = require('./single-sms/single-sms.service.js');
const singleEmails = require('./single-emails/single-emails.service.js');
const contacts = require('./contacts/contacts.service.js');
const inventory = require('./inventory/inventory.service.js');
const buildingMassSms = require('./building-mass-sms/building-mass-sms.service.js');
const buildingMassEmails = require('./building-mass-emails/building-mass-emails.service.js');
const chatRooms = require('./chat-rooms/chat-rooms.service.js');
const messages = require('./messages/messages.service.js');
const specialNotices = require('./special-notices/special-notices.service.js');
const paymentInfo = require('./payment-info/payment-info.service.js');
const transactions = require('./transactions/transactions.service.js');
const uploadReceipts = require('./upload-receipts/upload-receipts.service.js');
const receipts = require('./receipts/receipts.service.js');
// eslint-disable-next-line no-unused-vars
const addRequests = require('./add-requests/add-requests.service.js');
module.exports = function(app) {
 app.configure(users);
 app.configure(buildingAdmins);

 app.configure(agents);
 app.configure(buildings);
 app.configure(chats);

 app.configure(profile);
 app.configure(roles);
 app.configure(rooms);
 app.configure(tenants);
 app.configure(sms);

 app.configure(authmanagement);
 app.configure(mailer);
 app.configure(permissions);
 app.configure(agencyAdmins);
 app.configure(notices);
 app.configure(requests);
 app.configure(teams);
 app.configure(uploads);
 app.configure(massSms);
 app.configure(massEmails);
 app.configure(agencyNotices);
 app.configure(singleSms);
 app.configure(singleEmails);
 app.configure(contacts);
 app.configure(inventory);
 app.configure(buildingMassSms);
 app.configure(buildingMassEmails);
 app.configure(chatRooms);
 app.configure(messages);
 app.configure(specialNotices);
 app.configure(paymentInfo);
 app.configure(transactions);
 app.configure(uploadReceipts);
 app.configure(receipts);
 app.configure(addRequests);
};
