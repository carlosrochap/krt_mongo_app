<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	if(session.getAttribute("page_load") == null)
	{
		String search = request.getParameter("search");
		System.out.println("From Page: "+search);
		if(request.getParameter("search") == null)
		{
			session.setAttribute("page_load", true);
		}
		else
		{
			response.sendRedirect(request.getContextPath()+"/SearchPath?flag=search&search="+search);
		}
	}
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Search Application</title>
</head>
<body>
<a href = "<%=request.getContextPath()%>">Home</a>
<form action = "<%=request.getContextPath()%>/SearchPath" method = "get">
<p>Enter Search Term: </p>
<input type = "text" name = "search">
<input type = "hidden" name ="flag" value = "search">
<input type = "submit" value = "Search">
</form>
<c:choose>
<c:when test="${not empty list_actor }">
Results: <%=session.getAttribute("size")%><br>
<c:forEach items="${sessionScope.list_actor}" var="x" >
<h1><a href="actor.jsp?flag=byActor&id=${x.id}">${x.actor}</a></h1>
<img src = "${x.image_url}"/>
<p> ${x.biography}</p>
</c:forEach>
<%session.setAttribute("list_actor", null); %>  
</c:when>
<c:otherwise>
<p>Your search matched no result!! Try searching again.</p>    
</c:otherwise>
</c:choose>
<c:if test="${not empty list_actor }">

</c:if>
<%session.setAttribute("page_load", null); %>
</body>
</html>