var JUserServiceFactory = Packages.com.google.appengine.api.users.UserServiceFactory;
var usrv = JUserServiceFactory.getUserService();

exports.GET = function(env) {
    res = {
        time: new Date(),
        test: "this works just great"
    }
    
    if (!usrv.isUserLoggedIn()) {
    	res["login"] = usrv.createLoginURL("/");
    } else {
    	res["logout"] = usrv.createLogoutURL("/");
    	res["name"] = usrv.getCurrentUser().getNickname();
    }
    
    return res;
}

/*
<%
UserService userService = UserServiceFactory.getUserService();
if (!userService.isUserLoggedIn()) {
%>
 Please <A HREF="<%= 
     userService.createLoginURL("/newlogin.jsp") 

   %>">log in</A>>
<% } else { %>
 Welcome, <%= userService.currentUser().getNickname(); %>!
   (<A HREF="<%= 
       userService.createLogoutURL("/")

     %>">log out</A>>)
<%
}
%>
*/