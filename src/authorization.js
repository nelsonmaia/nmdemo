export const isAuthenticated = user => !!user;

export const isAllowed = (user, rights) =>
  rights.some(right => user.rights.includes(right));

export const hasRole = (user, roles) =>
  roles.some(role => user.roles.includes(role));

export const getGroups = (userProfile) => {

    var userGroups = [];

    if(userProfile){
        if(userProfile["https://nmdemo.com/groups"]){
          userProfile["https://nmdemo.com/groups"].map(((name, index) => {
            userGroups.push(name);
          }));
        }
      }

    return userGroups;
}

export const getRoles = (userProfile) => {

    var userRoles = [];

    if(userProfile){
        if(userProfile["https://nmdemo.com/roles"]){
          userProfile["https://nmdemo.com/roles"].map(((name, index) => {
            userRoles.push(name);
          }));
        }
      }

    return userRoles;
}

export const getPermissions = (userProfile) => {

    var userPermissions = [];

    if(userProfile){
        if(userProfile["https://nmdemo.com/permissions"]){
          userProfile["https://nmdemo.com/permissions"].map(((name, index) => {
            userPermissions.push(name);
          }));
        }
      }

    return userPermissions;
}

