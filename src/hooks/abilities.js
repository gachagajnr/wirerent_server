const { AbilityBuilder, Ability } = require("@casl/ability");
const { toMongoQuery } = require("@casl/mongoose");
const { Forbidden } = require("@feathersjs/errors");
const TYPE_KEY = Symbol.for("type");

Ability.addAlias("update", "patch");
Ability.addAlias("read", ["get", "find"]);
Ability.addAlias("delete", "remove");

function subjectName(subject) {
  if (!subject || typeof subject === "string") {
    return subject;
  }

  return subject[TYPE_KEY];
}

function defineAbilitiesFor(user) {
  const { rules, can } = AbilityBuilder.extract();
  //
  can("create", "users");
  can(["create", "update", "read"], "authManagement");

  if (user) {
    can(["read", "update"], "users", { _id: user._id });
    can("manage", "authManagement");

    if (user.isVerified) {
      if (user.resetPassword === true) {
        can("manage", "authManagement");
      } else {
        if (user.role === "superuser") {
          can("manage", ["all"]);
        } else if (user.role === "agency_admin") {
          can("create", [
            "rooms",
            "building-admins",
            "mass-sms",
            "mass-emails",
            "notices",
            "agency-notices",
            "agency-admins",
            "single-sms",
            "single-emails",
            "contacts",
            "buildings",
            "teams",
            "inventory",
            "tenants",
            "building-mass-sms",
            "building-mass-emails",
            "special-notices",
            "payment-info",
            "chats",
          ]);
          can("manage", "agents", {
            _id: user.organization,
          });
          can("read", ["chat-rooms",], {
            agency: user.organization,
          });
          can("manage", ["buildings","rooms","add-requests"], {
            agent: user.organization,
          });


          can("manage", ["building-admins", "chats"], {
            // organization: user.organization,
          });
          can(
            "manage",
            ["mass-sms", "building-mass-sms", "building-mass-emails"],
            {
              organization: user.organization,
            }
          );
          can("manage", ["mass-emails"], {
            organization: user.organization,
          });
          can("manage", ["notices"], {
            agent: user.organization,
          });
          can("manage", ["agency-notices"], {
            agent: user.organization,
          });
          can("manage", ["agency-admins"], {
            organization: user.organization,
          });
          can(
            "manage",
            ["single-sms", "payment-info", "transactions", "add-requests"],
            {
              agency: user.organization,
            }
          );
          can("manage", ["single-emails"], {
            agency: user.organization,
          });
          can("manage", ["requests"], {
            agency: user.organization,
          });
          can("manage", ["contacts"], {
            agency: user.organization,
          });
          can("manage", ["teams"], {
            agency: user.organization,
          });
          can("manage", ["inventory"], {
            agency: user.organization,
          });
          can("manage", ["tenants", "receipts"], {
            agency: user.organization,
          });
        } else if (user.role === "building_admin") {
          can("manage", "buildings", {
            _id: user.organization,
          });
          can(["read"], ["teams"]);
          can(
            "manage",
            ["rooms", "receipts", "requests", "tenants", "notices", "contacts"],
            {
              building: user.organization,
            }
          );
        } else if (user.role === "tenant") {
          can(
            ["create"],
            ["requests", "chat-rooms", "chats", "transactions", "receipts",'add-requests']
          );
          can(["read"], ["requests", "contacts", "payment-info", "chats"]);

          can(
            ["create", "read", "patch"],
            ["requests", "chat-rooms", "chats", "tranactions", "receipts"],
            {
              author: user._id,
            }
          );
          can("manage", "rooms", {
            _id: user.organization,
          });
        }
      }
    } else {
      can("manage", "authManagement");
      can("create", "agents");
    }
  }

  // if (process.env.NODE_ENV !== "production") {
  //   can("create", ["users"]);
  // }

  return new Ability(rules, { subjectName });
}

function canReadQuery(query) {
  return query !== null;
}

module.exports = function authorize(name = null) {
  return async function (hook) {
    const action = hook.method;
    // console.log(action)
    const service = name ? hook.app.service(name) : hook.service;
    const serviceName = name || hook.path;
    const ability = defineAbilitiesFor(hook.params.user);
    const throwUnlessCan = (action, resource) => {
      if (ability.cannot(action, resource)) {
        throw new Forbidden(`You are not allowed to ${action} ${serviceName}`);
      }
    };

    hook.params.ability = ability;

    if (hook.method === "create") {
      hook.data[TYPE_KEY] = serviceName;
      throwUnlessCan("create", hook.data);
    }

    if (!hook.id) {
      const query = toMongoQuery(ability, serviceName, action);
      if (canReadQuery(query)) {
        Object.assign(hook.params.query, query);
      } else {
        // The only issue with this is that user will see total amount of records in db
        // for the resources which he shouldn't know.
        // Alternative solution is to assign `__nonExistingField` property to query
        // but then feathers-mongoose will send a query to MongoDB which for sure will return empty result
        // and may be quite slow for big datasets
        hook.params.query.$limit = 0;
      }

      return hook;
    }

    const params = Object.assign({}, hook.params, { provider: null });
    const result = await service.get(hook.id, params);

    result[TYPE_KEY] = serviceName;
    throwUnlessCan(action, result);

    if (action === "get") {
      hook.result = result;
    }

    return hook;
  };
};
